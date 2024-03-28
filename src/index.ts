import express from "express";
import config from "../config.js";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(config.server.port, () => {
  console.log(
    `\n\n> Server running on port ${config.server.port} (http://localhost:${config.server.port})`
  );
});
