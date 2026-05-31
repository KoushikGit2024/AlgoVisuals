// types/web-tree-sitter.d.ts
declare module 'web-tree-sitter' {
  class Parser {
    static init(options?: object): Promise<void>;
    static Language: any;
    parse(input: string | Parser.Input, previousTree?: Parser.Tree, options?: Parser.Options): Parser.Tree;
    setLanguage(language: any): void;
  }
  namespace Parser {
    export type Tree = any;
    export type SyntaxNode = any;
    export type Node = any;
  }
  export = Parser;
}