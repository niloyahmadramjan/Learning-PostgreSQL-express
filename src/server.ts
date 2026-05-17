import app from "./app";
import config from "./config";
import { initDB } from "./db";

const server = () => {
  initDB();

  app.listen(config.port, () => {
    console.log(`server is running on http://localhost:${config.port}`);
  });
};

server();
