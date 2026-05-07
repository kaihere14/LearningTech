import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { IngestionInput, IngestionResult } from "../../domain/ingestion/types";
import { loadPdfDocuments } from "../../infrastructure/loaders/pdfLoader";
import { getQdrantVectorStore } from "../../infrastructure/vectorstore/qdrantVectorStore";

export const runIngestion = async (
  input: IngestionInput
): Promise<IngestionResult> => {
  const docs = await loadPdfDocuments(input.sourcePath);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: input.chunkSize,
    chunkOverlap: input.chunkOverlap
  });
  const chunks = await splitter.splitDocuments(docs);

  const vectorStore = await getQdrantVectorStore();
  await vectorStore.addDocuments(chunks, {
    ids: chunks.map(() => crypto.randomUUID())
  });

  return {
    sourcePath: input.sourcePath,
    totalChunks: chunks.length
  };
};
