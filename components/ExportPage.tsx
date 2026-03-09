import React, { useState } from "react";
import { useOcrStore } from "../store/useOcrStore";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { PDFDocument } from "pdf-lib";

const ExportPage: React.FC = () => {
  const { mappedText, translatedText } = useOcrStore();
  const [format, setFormat] = useState("pdf");
  const [password, setPassword] = useState("");

  const content = `Mapped OCR Text:\n\n${mappedText}\n\n-------------------\n\nEnglish Translation:\n\n${translatedText}`;

  // ================= TXT =================
  const downloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "devascan.txt");
  };

  // ================= WORD =================
  const downloadDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map((line) => new Paragraph(line)),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "devascan.docx");
  };

  // ================= PDF (DEVANAGARI SAFE – RUNTIME FONT) =================
  const downloadPdf = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      // Load font from public folder
      const res = await fetch("/fonts/NotoSansDevanagari-Regular.ttf");
      if (!res.ok) {
        throw new Error("Font file not found");
      }

      const buffer = await res.arrayBuffer();
      const fontBytes = new Uint8Array(buffer);

      let fontBinary = "";
      for (let i = 0; i < fontBytes.length; i++) {
        fontBinary += String.fromCharCode(fontBytes[i]);
      }

      // Register font
      pdf.addFileToVFS(
        "NotoSansDevanagari-Regular.ttf",
        fontBinary
      );
      pdf.addFont(
        "NotoSansDevanagari-Regular.ttf",
        "NotoDeva",
        "normal"
      );

      pdf.setFont("NotoDeva");
      pdf.setFontSize(14);

      const lines = pdf.splitTextToSize(content, 180);
      pdf.text(lines, 15, 20);

      pdf.save("devascan.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("PDF generation failed. Check console.");
    }
  };

  // ================= ENCRYPTED PDF =================
  const downloadEncryptedPdf = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      // Load font from public folder
      const res = await fetch("/fonts/NotoSansDevanagari-Regular.ttf");
      if (!res.ok) {
        throw new Error("Font file not found");
      }

      const buffer = await res.arrayBuffer();
      const fontBytes = new Uint8Array(buffer);

      let fontBinary = "";
      for (let i = 0; i < fontBytes.length; i++) {
        fontBinary += String.fromCharCode(fontBytes[i]);
      }

      pdf.addFileToVFS(
        "NotoSansDevanagari-Regular.ttf",
        fontBinary
      );
      pdf.addFont(
        "NotoSansDevanagari-Regular.ttf",
        "NotoDeva",
        "normal"
      );

      pdf.setFont("NotoDeva");
      pdf.setFontSize(14);

      const lines = pdf.splitTextToSize(content, 180);
      pdf.text(lines, 15, 20);

      const pdfBytes = pdf.output("arraybuffer");

      // Encrypt using pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: { printing: "highResolution" },
      });

      const encryptedBytes = await pdfDoc.save();
      const blob = new Blob([encryptedBytes], {
        type: "application/pdf",
      });

      saveAs(blob, "devascan-protected.pdf");
    } catch (err) {
      console.error("Encrypted PDF error:", err);
      alert("Encrypted PDF failed. Check console.");
    }
  };

  // ================= HANDLER =================
  const handleDownload = async () => {
    if (!mappedText && !translatedText) {
      alert("No OCR data available to export");
      return;
    }

    if (format === "txt") downloadTxt();
    else if (format === "docx") await downloadDocx();
    else if (format === "pdf" && password) await downloadEncryptedPdf();
    else await downloadPdf();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Export Document</h2>

      <div className="space-y-2">
        <label>File format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full px-4 py-2 rounded bg-brand-secondary border"
        >
          <option value="pdf">PDF</option>
          <option value="docx">Word</option>
          <option value="txt">TXT</option>
        </select>
      </div>

      <div className="space-y-2">
        <label>Optional password (PDF only)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty for no encryption"
          className="w-full px-4 py-2 rounded bg-brand-secondary border"
        />
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-brand-orange py-3 rounded-lg font-semibold"
      >
        Download
      </button>
    </div>
  );
};

export default ExportPage;
