import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import CryptoJS from "crypto-js";

/* Encrypt text if password is provided */
const encryptIfNeeded = (text: string, password?: string) => {
  if (!password) return text;
  return CryptoJS.AES.encrypt(text, password).toString();
};

/* Save as TXT */
export const saveAsTxt = (text: string, password?: string) => {
  const content = encryptIfNeeded(text, password);
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "shloka.txt");
};

/* Save as PDF */
export const saveAsPdf = (text: string, password?: string) => {
  const doc = new jsPDF();
  const content = encryptIfNeeded(text, password);

  doc.setFont("Times", "Normal");
  doc.text(content, 10, 20);
  doc.save("shloka.pdf");
};

/* Save as Word */
export const saveAsWord = async (text: string, password?: string) => {
  const content = encryptIfNeeded(text, password);

  const doc = new Document({
    sections: [
      {
        children: [new Paragraph(content)],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "shloka.docx");
};
