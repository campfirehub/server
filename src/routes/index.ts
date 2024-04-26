import express from "express";
const router = express.Router();

async function importRoute(path: string) {
  router.use("/", (await import(path)).default);
}

importRoute("./user/login.js");
importRoute("./user/register.js");
importRoute("./user/checkAuth.js");

importRoute("./projects/create.js");
importRoute("./projects/fetchMany.js");
importRoute("./projects/fetch.js");
importRoute("./projects/save.js");
importRoute("./projects/delete.js");

export default router;
