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
    <a
      href={path}
      target="_blank"
      rel="noreferrer"
      className="text-muted-foreground flex items-center gap-2 hover:text-[#a0b4ce] hover:underline borderw-[fit-content] duration-200 group"
    >
      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-[#a0b4ce] transition-colors" />

      {name}
    </a>
  );
};

export default Source;
