import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OcrInterface from "./components/OcrInterface";
import Library from "./components/Library";
import Settings from "./components/Settings";
import Help from "./components/Help";
import ExportBar from "./components/ExportBar";
import ExportPage from "./components/ExportPage";

import { saveScan } from "./services/libraryService";
import { useOcrStore } from "./store/useOcrStore";

export type View =
  | "home"
  | "ocr"
  | "library"
  | "settings"
  | "help"
  | "export";

const App: React.FC = () => {
  const [view, setView] = useState<View>("home");

  // ✅ Get OCR data from global store
  const { mappedText, translatedText } = useOcrStore();

  // ✅ SAVE HANDLER (manual save only)
  const handleSave = () => {
    if (!mappedText && !translatedText) {
      alert("Nothing to save yet");
      return;
    }

    saveScan(mappedText, translatedText);
    alert("Saved to Library");
  };

  return (
    <div className="min-h-screen bg-brand-dark text-gray-200">
      <Header onNavigate={setView} />

      {/* ✅ SAVE + EXPORT BAR */}
      <ExportBar
        view={view}
        onSave={handleSave}
        onExport={() => setView("export")}
      />

      <main className="container mx-auto px-4 py-10">
        {view === "home" && <Hero onGetStarted={() => setView("ocr")} />}
        {view === "ocr" && <OcrInterface />}
        {view === "library" && <Library />}
        {view === "settings" && <Settings />}
        {view === "help" && <Help />}

        {view === "export" && <ExportPage />}
      </main>
    </div>
  );
};

export default App;
