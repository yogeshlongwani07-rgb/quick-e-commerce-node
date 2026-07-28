import dotenv from "dotenv";
import { envVar } from "./src/constant.js";
import connectToDB from "./src/config/mongo.js";
import createApp from "./src/app.js";
import http from "http";

dotenv.config();

for (let varName of envVar) {
  if (!process.env[varName]) {
    throw new Error(`${varName} not found`);
  }
}
let server;
async function startServer() {
  try {
    await connectToDB();
    const app = createApp();
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`Server Connected ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
