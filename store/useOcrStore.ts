import { create } from "zustand";

interface OcrState {
  mappedText: string;
  translatedText: string;
  setMappedText: (text: string) => void;
  setTranslatedText: (text: string) => void;
}

export const useOcrStore = create<OcrState>((set) => ({
  mappedText: "",
  translatedText: "",
  setMappedText: (text) => set({ mappedText: text }),
  setTranslatedText: (text) => set({ translatedText: text }),
}));
