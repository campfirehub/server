import express from "express";
import config from "./config.js";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors(config.server.cors));
app.use(compression());
app.use(morgan("combined"));

interface RoutesModule {
  default: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
}

app.use(async (req, res, next) => {
  const routesModule = (await import("./routes/index.js")) as RoutesModule;
  routesModule.default(req, res, next);
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

async function fixBug() {
  // For some reason there is a bug at startup and for every first request it returns 404
  fetch(`http://localhost:${config.server.port}/checkAuth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function connectToDb() {
  const connectionOptions = {
    dbName: `db`,
  };
  try {
    console.log("> Connecting to database");
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(
      config.database.connection_string,
      connectionOptions
    );
    console.log("> Connected");
  } catch (e) {
    console.log("> Error while connectiing to database");
    console.error(e);
    console.log("> Retrying in 5 seconds...");
    setTimeout(() => {
      connectToDb();
    }, 5000);
  }
}

app.listen(config.server.port, async () => {
  console.log(
    `\n\n> Server running on port ${config.server.port} (http://localhost:${config.server.port})`
  );
  fixBug();
  connectToDb();
});

process.on("uncaughtException", function (err) {
  console.error(err);
});

export default app;
