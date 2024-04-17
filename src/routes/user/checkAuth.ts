import express from "express";
import checkAuth from "../../authChecker.js";
const router = express.Router();

/* 
Path: "/login"
Method: POST
Body: {
    "username": "actual username",
    "password": "actual password"
}
*/
router.post(
  "/checkAuth",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
