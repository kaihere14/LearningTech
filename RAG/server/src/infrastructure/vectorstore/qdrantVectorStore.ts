import { QdrantVectorStore } from "@langchain/qdrant";

import { env } from "../../config/env";
import { createEmbeddings } from "../embeddings/geminiEmbeddings";

export const getQdrantVectorStore = async () =>
  QdrantVectorStore.fromExistingCollection(createEmbeddings(), {
    url: env.qdrantEndpoint,
    apiKey: env.qdrantApiKey,
    collectionName: env.qdrantCollection
  });
