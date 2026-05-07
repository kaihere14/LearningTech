export type IngestionInput = {
  sourcePath: string;
  chunkSize: number;
  chunkOverlap: number;
};

export type IngestionResult = {
  sourcePath: string;
  totalChunks: number;
};
