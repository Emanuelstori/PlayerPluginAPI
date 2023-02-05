import cors from "cors";
import "dotenv/config";
import express from "express";

const api = require("./api");
const server = express();

var bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    preflightContinue: false,
  })
);
server.options(
  "*",
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
server.use("/api", api);
server.get("/", (req, res) => res.send({ teste: "working" }).json());

export { server };

