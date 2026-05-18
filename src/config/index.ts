// src/config/index.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT || 3000,
  connection_string: process.env.DBURL as string,
  jwtsecret: process.env.JWT_SECRET,
};

export default config;
