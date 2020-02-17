import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { createServer } from "https";
import { readFileSync } from "fs";
const path = require("path");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const privateKey = readFileSync(path.resolve("server.key")).toString();
const certificate = readFileSync(path.resolve("server.crt")).toString();

const options = {
  key: privateKey,
  cert: certificate
};

const app = polka();

app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  sapper.middleware()
);

createServer(options, app.handler).listen(PORT, err => {
  if (err) console.log("error", err);
  console.log("[info] Https Server started at port", PORT);
});
