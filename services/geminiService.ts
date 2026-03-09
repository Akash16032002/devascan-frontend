// services/geminiService.ts
const API_BASE = "http://127.0.0.1:8000";

// -------- OCR --------
export const extractTextFromImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/ocr`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("OCR request failed");
  }

  const data = await res.json();
  return data.text;
};

// -------- SUMMARY --------
export const generateSummary = async (text: string): Promise<string> => {
  const res = await fetch(`${API_BASE}/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Summary request failed");
  }

  const data = await res.json();
  return data.summary_english;
};
