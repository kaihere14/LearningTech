import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import { env } from "../../config/env";

export const createEmbeddings = () =>
  new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-2",
    apiKey: env.geminiApiKey
  });
