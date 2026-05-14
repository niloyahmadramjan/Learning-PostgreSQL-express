import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  dburl: process.env.DBURL as string,
  port: process.env.PORT,
};

export default config;
