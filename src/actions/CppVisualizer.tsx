'use client'

import { useEffect, useState, useRef } from 'react';
// 1. Import the types for TypeScript
import type { Node } from 'web-tree-sitter';

// 2. Import the actual JavaScript module using the CommonJS require pattern
const Parser = require('web-tree-sitter');

export default function CppVisualizer() {
  const [isReady, setIsReady] = useState(false);
  const [parsedNodes, setParsedNodes] = useState<{ id: number; type: string; text: string }[]>([]);
  
  // Notice we type this as 'any' to bypass strict class instantiation errors 
  // if your TS environment is still being stubborn after the tsconfig change.
  const parserRef = useRef<any>(null);

  // Default C++ algorithm to visualize
  const [code, setCode] = useState(
`int bubbleSort(int arr[], int n) {
  int i, j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]);
      }
    }
  }
  return 0;
}`
  );

  useEffect(() => {
    async function initParser() {
      // 1. Initialize Wasm module
      await Parser.init({
        locateFile: (path: string) => `/wasm/${path}`,
      });

      // 2. Load C++ Grammar
      const parser = new Parser();
      const CppLang = await Parser.Language.load('/wasm/tree-sitter-cpp.wasm');
      parser.setLanguage(CppLang);
      
      parserRef.current = parser;
      setIsReady(true);
      
      // Parse the initial code
      analyzeCode(code, parser);
    }

    initParser();
  }, []);

  const analyzeCode = (sourceCode: string, activeParser = parserRef.current) => {
    if (!activeParser) return;

    // Generate the AST
    const tree = activeParser.parse(sourceCode);
    const extractedData: { id: number; type: string; text: string }[] = [];
    let nodeId = 0;

    // Fixed Line 57: Now using the imported 'Node' type directly
    const walkTree = (node: Node) => {
      if (
        node.type === 'function_definition' ||
        node.type === 'declaration' ||
        node.type === 'for_statement' ||
        node.type === 'if_statement' ||
        node.type === 'call_expression'
      ) {
        extractedData.push({
          id: nodeId++,
          type: node.type,
          text: node.text.split('\n')[0], // Grab just the first line
        });
      }

      // Traverse children
      for (let i = 0; i < node.childCount; i++) {
        const child = node.child(i);
        if (child) walkTree(child);
      }
    };

    walkTree(tree.rootNode);
    setParsedNodes(extractedData);

    // CRITICAL: Prevent memory leaks
    tree.delete();
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    analyzeCode(newCode);
  };

  if (!isReady) {
    return <div className="p-8 text-center animate-pulse">Loading C++ Parser Engine...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 h-screen bg-[#0d1117] text-gray-200 font-sans">
      
      {/* Code Input Side */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">C++ Source Code</h2>
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="flex-1 w-full p-4 bg-[#161b22] border border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
          spellCheck="false"
        />
      </div>

      {/* Visualizer/AST Output Side */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider">Detected Algorithm Steps</h2>
        <div className="flex-1 overflow-y-auto bg-[#161b22] border border-gray-700 rounded-lg p-4 flex flex-col gap-3">
          
          {parsedNodes.map((node) => (
            <div 
              key={node.id} 
              className="p-3 bg-[#21262d] border border-gray-600 rounded flex flex-col gap-1 hover:border-gray-400 transition-colors"
            >
              <span className="text-xs font-mono text-purple-400">{node.type}</span>
              <code className="text-sm text-gray-300 truncate">{node.text}</code>
            </div>
          ))}

          {parsedNodes.length === 0 && (
            <div className="text-gray-500 text-sm italic">No structural nodes detected.</div>
          )}
        </div>
      </div>

    </div>
  );
}