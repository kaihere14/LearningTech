import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

dotenv.config({ path: ".env.local" });

const convexUrl = process.env.CONVEX_URL;
if (!convexUrl) {
  throw new Error("Missing CONVEX_URL in express-api/.env.local");
}

const app = express();
const convex = new ConvexHttpClient(convexUrl);
const port = Number(process.env.PORT ?? 3000);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const createFromExpressRef = makeFunctionReference<"mutation", { text: string; origin: string }, null>(
  "tasks:createFromExpress",
);
const addLogRef = makeFunctionReference<"mutation", { message: string; source: string }, null>(
  "logs:addLog",
);

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "express-api" });
});

// Temporary route: write data into Convex from Express.
app.post("/debug/add-task", async (req, res) => {
  const text = String(req.body?.text ?? "").trim();
  if (!text) {
    res.status(400).json({ error: "text is required" });
    return;
  }

  try {
    await convex.mutation(createFromExpressRef, {
      text,
      origin: "express-api",
    });
    await convex.mutation(addLogRef, {
      message: `Express inserted task: ${text}`,
      source: "express-api",
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      error: "Failed to write task to Convex",
      detail: error instanceof Error ? error.message : "unknown_error",
    });
  }
});

app.listen(port, () => {
  console.log(`express-api running on http://localhost:${port}`);
});
