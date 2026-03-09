const STORAGE_KEY = "devascan-library";

export interface ScanItem {
  id: string;
  mappedText: string;
  translatedText: string;
  createdAt: string;
}

export const saveScan = (
  mappedText: string,
  translatedText: string
) => {
  const existing = getAllScans();

  const newScan: ScanItem = {
    id: crypto.randomUUID(),
    mappedText,
    translatedText,
    createdAt: new Date().toISOString(),
  };

  const updated = [newScan, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getAllScans = (): ScanItem[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const getScanById = (id: string): ScanItem | undefined => {
  return getAllScans().find((s) => s.id === id);
};

export const deleteScan = (id: string) => {
  const updated = getAllScans().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
export const clearLibrary = () => {
  localStorage.removeItem(STORAGE_KEY);
};