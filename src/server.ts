import { createApp } from "./app";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

const bootstrap = async () => {
  await AppDataSource.initialize();

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`ERP Lite API listening on http://localhost:${env.port}${env.apiPrefix}`);
  });
};

void bootstrap().catch((error) => {
  console.error("Failed to start ERP Lite API.", error);
  process.exit(1);
});
