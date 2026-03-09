import React, { useState, useRef } from "react";
import { useOcrStore } from "../store/useOcrStore";
import {
  UploadCloudIcon,
  ClipboardIcon,
  CheckIcon,
  AlertTriangleIcon,
  WandIcon,
} from "./icons";

const OcrInterface: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [extractedText, setExtractedText] = useState("");
  const [translation, setTranslation] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ GLOBAL STORE (for Export & Save button)
  const setMappedText = useOcrStore((s) => s.setMappedText);
  const setTranslatedText = useOcrStore((s) => s.setTranslatedText);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setExtractedText("");
      setTranslation("");
      setError(null);

      // clear old export/save data
      setMappedText("");
      setTranslatedText("");
    };
    reader.readAsDataURL(file);
  };

  const runExtraction = async () => {
    if (!imageFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("https://devascan.onrender.com/sloka-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("OCR failed. No text detected.");
      }

      const data = await res.json();

      if (!data.recognized_text || data.recognized_text.trim() === "") {
        setExtractedText("❌ Could not detect any Devanagari text.");
        setTranslation("");

        setMappedText("");
        setTranslatedText("");
      } else {
        setExtractedText(data.recognized_text);
        setTranslation(data.translation || "");

        // ✅ update global store (for Save / Export)
        setMappedText(data.recognized_text);
        setTranslatedText(data.translation || "");
      }
    } catch (err: any) {
      setError(err.message || "OCR request failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
      {/* LEFT */}
      <div className="space-y-6">
        <div
          className="relative border-2 border-dashed rounded-xl p-8 text-center border-brand-border hover:border-brand-orange/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />

          {!imagePreview ? (
            <div className="flex flex-col items-center gap-4 py-10 cursor-pointer">
              <UploadCloudIcon className="w-10 h-10 text-brand-orange" />
              <p className="text-gray-400">
                Upload handwritten Devanagari image
              </p>
            </div>
          ) : (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-[450px] mx-auto rounded-lg"
            />
          )}
        </div>

        {imageFile && !isProcessing && !extractedText && (
          <button
            onClick={runExtraction}
            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <WandIcon className="w-5 h-5" />
            Extract Text
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        {/* MAPPED TEXT */}
        <div className="bg-brand-secondary border border-brand-border rounded-xl">
          <div className="p-4 border-b flex justify-between">
            <h3 className="font-semibold">Mapped Text Output</h3>
            <button onClick={handleCopy}>
              {isCopied ? <CheckIcon /> : <ClipboardIcon />}
            </button>
          </div>

          <div className="p-4 min-h-[200px] whitespace-pre-wrap font-mono text-gray-300">
            {extractedText || "No text extracted yet"}
          </div>
        </div>

        {/* TRANSLATION */}
        <div className="bg-brand-secondary border border-brand-border rounded-xl">
          <div className="p-4 border-b font-semibold">
            English Translation
          </div>
          <div className="p-4 text-gray-300 min-h-[120px]">
            {translation || "Translation will appear here"}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded text-red-400 flex gap-2">
            <AlertTriangleIcon />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default OcrInterface;
