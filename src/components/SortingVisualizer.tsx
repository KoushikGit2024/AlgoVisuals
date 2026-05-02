"use client";

import React, { useState, useEffect, useMemo } from "react";

// ==========================================
// MODULE A: THE ALGORITHM ENGINE (GENERATOR)
// ==========================================
// This is a pure function. It knows nothing about React or the DOM.
// It simply runs the algorithm and yields "Frames" of state.

type Frame = {
  array: number[];
  comparing: number[]; // Indices currently being compared
  swapping: number[];  // Indices currently being swapped
  sorted: number[];    // Indices that are fully sorted
};

function getBubbleSortFrames(initialArray: number[]): Frame[] {
  const frames: Frame[] = [];
  const arr = [...initialArray];
  const sorted: number[] = [];

  // Push the initial state
  frames.push({ array: [...arr], comparing: [], swapping: [], sorted: [...sorted] });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 1. Frame: Comparing two elements
      frames.push({ array: [...arr], comparing: [j, j + 1], swapping: [], sorted: [...sorted] });

      if (arr[j] > arr[j + 1]) {
        // 2. Frame: Elements are about to swap
        frames.push({ array: [...arr], comparing: [], swapping: [j, j + 1], sorted: [...sorted] });

        // Actually perform the swap in our engine
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // 3. Frame: Elements after swap
        frames.push({ array: [...arr], comparing: [], swapping: [], sorted: [...sorted] });
      }
    }
    // Mark the last element of this pass as fully sorted
    sorted.push(arr.length - i - 1);
  }
  // Mark the very first element as sorted when the loop finishes
  sorted.push(0);
  
  // Final Frame: Everything is sorted
  frames.push({ array: [...arr], comparing: [], swapping: [], sorted: [...sorted] });

  return frames;
}


// ==========================================
// MODULE B: THE PLAYBACK CONTROLLER (HOOK)
// ==========================================
// This hook bridges the static frames to React's rendering cycle.

function useVisualizer(frames: Frame[], speedMs: number = 100) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // If playing and we haven't reached the end, advance the frame
    if (isPlaying && currentFrameIndex < frames.length - 1) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => prev + 1);
      }, speedMs);
    } 
    // Stop playing if we reach the end
    else if (currentFrameIndex >= frames.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentFrameIndex, frames.length, speedMs]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
  };

  return {
    currentFrame: frames[currentFrameIndex],
    currentFrameIndex,
    totalFrames: frames.length,
    isPlaying,
    play,
    pause,
    reset,
  };
}


// ==========================================
// MODULE C: THE UI / RENDERING LAYER
// ==========================================
// A "dumb" component that just renders whatever the Controller gives it.

export default function SortingVisualizer() {
  // 1. Initialize data
  const [initialArray, setInitialArray] = useState([50, 20, 80, 40, 90, 10, 30, 70, 60]);
  
  // 2. Generate all frames using Module A (memoized so it doesn't recalculate on every render)
  const frames = useMemo(() => getBubbleSortFrames(initialArray), [initialArray]);
  
  // 3. Pass frames to Module B to get playback controls
  const { currentFrame, currentFrameIndex, totalFrames, isPlaying, play, pause, reset } = useVisualizer(frames, 150);

  // Helper to generate a new random array
  const handleRandomize = () => {
    reset();
    const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 10);
    setInitialArray(newArr);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Bubble Sort Visualizer</h1>

      {/* Rendering the Array Bars */}
      <div className="flex items-end justify-center space-x-1 h-64 w-full max-w-3xl border-b-2 border-gray-600 pb-2">
        {currentFrame.array.map((value, index) => {
          // Determine the color based on the current frame's state
          let bgColor = "bg-blue-400"; // Default
          if (currentFrame.comparing.includes(index)) bgColor = "bg-yellow-400"; // Comparing
          if (currentFrame.swapping.includes(index)) bgColor = "bg-red-500";     // Swapping
          if (currentFrame.sorted.includes(index)) bgColor = "bg-green-500";     // Sorted

          return (
            <div
              key={index}
              className={`w-10 rounded-t-md transition-all duration-150 ${bgColor}`}
              style={{ height: `${value}%` }}
            >
              <span className="flex justify-center text-xs mt-2 opacity-50">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Playback Controls */}
      <div className="flex space-x-4 mt-8">
        <button 
          onClick={isPlaying ? pause : play} 
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button 
          onClick={reset} 
          className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
        >
          Reset
        </button>
        <button 
          onClick={handleRandomize} 
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded font-semibold"
        >
          Randomize Array
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-gray-400 font-mono">
        Frame: {currentFrameIndex + 1} / {totalFrames}
      </div>
    </div>
  );
}