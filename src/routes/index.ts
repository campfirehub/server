import express from "express";
const router = express.Router();

async function importRoute(path: string) {
  router.use("/", (await import(path)).default);
}

importRoute("./user/login.js");
importRoute("./user/register.js");

export default router;
