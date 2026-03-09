import React, { useEffect, useState } from "react";
import {
  getAllScans,
  deleteScan,
  ScanItem,
} from "../services/libraryService";

const Library: React.FC = () => {
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [selected, setSelected] = useState<ScanItem | null>(null);

  useEffect(() => {
    setScans(getAllScans());
  }, []);

  const handleDelete = (id: string) => {
    deleteScan(id);
    setScans(getAllScans());
    if (selected?.id === id) setSelected(null);
  };

  if (selected) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="text-brand-orange underline"
        >
          ← Back to Library
        </button>

        <h2 className="text-xl font-bold">Scanned Document</h2>

        <div className="bg-brand-secondary p-4 rounded border">
          <h3 className="font-semibold mb-2">Mapped OCR Text</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {selected.mappedText}
          </pre>
        </div>

        <div className="bg-brand-secondary p-4 rounded border">
          <h3 className="font-semibold mb-2">English Translation</h3>
          <p>{selected.translatedText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Library</h2>

      {scans.length === 0 && (
        <p className="text-gray-400">
          No scanned documents yet.
        </p>
      )}

      <ul className="space-y-3">
        {scans.map((scan) => (
          <li
            key={scan.id}
            className="bg-brand-secondary border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                Scan on{" "}
                {new Date(scan.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 truncate max-w-md">
                {scan.mappedText.slice(0, 80)}...
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelected(scan)}
                className="text-brand-orange"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(scan.id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
