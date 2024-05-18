import express from "express";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
const router = express.Router();

let options = {
  page: 1,
  limit: 10,
  collation: {
    locale: "en",
  },
  sort: [["createdAt", -1]],
  populate: {
    path: "owner",
    select: "username",
  },
  projection: "name createdAt lastUpdate forked public thumbnail type engine",
};

router.get("/explore", async (req: express.Request, res: express.Response) => {
  if (req.query.page && !isNaN(Number(req.query.page)))
    options.page = Number(req.query.page);
  let query = { public: true, name: new RegExp("", "i") };
  //@ts-ignore
  if (req.query.q) query.name = new RegExp(req.query.q, "i");
  const projects = await Project.paginate(query, options);
  res.status(200).json({
    success: true,
    data: projects,
  });
});

export default router;
