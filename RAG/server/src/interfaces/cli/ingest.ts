import { runIngestion } from "../../application/ingestion/runIngestion";
import { env } from "../../config/env";

const main = async () => {
  const result = await runIngestion({
    sourcePath: env.sourcePdfPath,
    chunkSize: 700,
    chunkOverlap: 200
  });

  console.log(
    `Ingestion complete: ${result.totalChunks} chunks from ${result.sourcePath}`
  );
};

main().catch((error: unknown) => {
  console.error("Ingestion failed", error);
  process.exit(1);
});
