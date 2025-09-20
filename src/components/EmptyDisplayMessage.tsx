import React from "react";
import { useAppContext } from "@/context/AppContext";
import Source from "./source";
const EmptyDisplayMessage = () => {
  const { sources, modelName } = useAppContext();

  return (
    // <div className="p-2 text-center lg:text-start lg:px-0 max-w-2xl mx-auto text-text-tertiary py-12">
    <div className="h-full">
      <div className="mx-auto w-[600px] px-2 flex flex-col justify-center h-full">
        <h3 className="text-lg font-medium text-text-secondary dark:text-slate-300 mb-2">
          Welcome to NutrientNet: {modelName}
        </h3>
        <div className="mx-auto text-md text-muted-foreground space-y-4">
          <p>
            A RAG (Retreival Augmented Generation) pipeling for testing and
            evaluating a small (5GB) Llama 3 model. This model is fed with
            documents about nutrition. Ask it anything related to nutrition and
            evaluate its performance.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-1">
          {sources &&
            sources.map((source, idx) => (
              <Source key={`${source.filename}-${idx}`} {...source} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyDisplayMessage;
