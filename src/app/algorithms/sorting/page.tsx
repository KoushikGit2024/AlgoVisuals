import type { Metadata } from "next";
import SortingVisualizer from "@/components/SortingVisualizer";

export const metadata: Metadata = {
  title: "Sorting",
  description: "Visualize Bubble Sort, Insertion Sort, Selection Sort and Merge Sort step by step.",
};

export default function SortingPage() {
  return (
    <div className="h-full w-full overflow-hidden">
      <SortingVisualizer />
    </div>
  );
}