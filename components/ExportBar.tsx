import React from "react";
import { View } from "../App";

interface ExportBarProps {
  view: View;
  onExport: () => void;
  onSave: () => void;
}

const ExportBar: React.FC<ExportBarProps> = ({
  view,
  onExport,
  onSave,
}) => {
  // Show only on OCR screen
  if (view !== "ocr") return null;

  return (
    <div className="flex justify-end gap-4 px-6 py-2">
      <button
        onClick={onSave}
        className="bg-brand-orange px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Save
      </button>

      <button
        onClick={onExport}
        className="bg-brand-orange px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Export
      </button>
    </div>
  );
};

export default ExportBar;
