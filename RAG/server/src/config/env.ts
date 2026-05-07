import "dotenv/config";
import path from "node:path";

const getEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 4000),
  geminiApiKey: getEnv("GEMINI_API_KEY"),
  qdrantEndpoint: getEnv("QDRANT_ENDPOINT"),
  qdrantApiKey: getEnv("QDRANT_API_KEY"),
  qdrantCollection: process.env.QDRANT_COLLECTION ?? "langchainjs-testing",
  sourcePdfPath:
    process.env.INGEST_SOURCE_PDF ??
    path.resolve(process.cwd(), "data/documents/arman_thakur_rag_data.pdf")
};
