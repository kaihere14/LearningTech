import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const loadPdfDocuments = async (sourcePath: string) => {
  const loader = new PDFLoader(sourcePath);
  return loader.load();
};
