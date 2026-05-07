import { env } from "../../config/env";
import { createApp } from "./createApp";

export const startHttpServer = () => {
  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};
