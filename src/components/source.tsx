import { FileCode, FileText } from "lucide-react";
import React from "react";

interface SourceProps {
  name: string;
  filename: string;
  path: string;
  type?: string; // optional; fallback from filename
}

const Source = ({ name, filename, path, type }: SourceProps) => {
  const Icon =
    type === "PDF" ? FileText : type === "HTML" ? FileCode : FileCode;

  return (
    <div className="flex items-center gap-2 bg-[#4d4857aa] hover:bg-[#645f6daa] rounded-full pr-3 overflow-hidden">
      <div
        className={`h-8 w-8 flex justify-center items-center ${
          type === "PDF" ? "bg-[#4073ff]" : "bg-[#ff4d40]"
        } pl-1`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <a
        href={path}
        target="_blank"
        rel="noreferrer"
        className="text-foreground"
      >
        {name}
      </a>
    </div>
  );
};

export default Source;
