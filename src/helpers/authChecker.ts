import jwt from "jsonwebtoken";
import config from "../config.js";

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "No auth token found" });
  }

  jwt.verify(token, config.auth.jwt_secret, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, error: "Invalid auth token" });
    req.user = user;
    next();
  });
}
export default checkAuth;
