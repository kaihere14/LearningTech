import cors, { CorsOptions } from "cors";
import express, { Application, Request, Response } from "express";

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
};

export const createApp = (): Application => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      message: "Server is healthy"
    });
  });

  app.get("/", (_req: Request, res: Response) => {
    return res.status(200).json({
      status: "ok",
      message: "You are peaking into the RAG server"
    });
  });

  return app;
};
