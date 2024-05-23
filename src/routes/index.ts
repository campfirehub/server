import express from "express";
const router = express.Router();

// async function importRoute(path: string) {
//   try {
//     router.use("/", (await import(path)).default);
//   } catch (err) {
//     console.error(err);
//   }
// }

// User
import checkAuth from "./user/checkAuth.js";
import login from "./user/login.js";
import register from "./user/register.js";
import changePassword from "./user/changePassword.js";
import updateUserData from "./user/updateData.js";
import getUserData from "./user/getUserData.js";

router.use("/", checkAuth);
router.use("/", login);
router.use("/", register);
router.use("/", changePassword);
router.use("/", updateUserData);
router.use("/", getUserData);

// Projects
import fetchMany from "./projects/fetchMany.js";
import fetch from "./projects/fetch.js";
import create from "./projects/create.js";
import deleteProject from "./projects/delete.js";
import save from "./projects/save.js";
import updateInfo from "./projects/updateInfo.js";
import publish from "./projects/publish.js";
import unpublish from "./projects/unpublish.js";
import setThumbnail from "./projects/set_thumbnail.js";
import uploadImage from "./projects/uploadImage.js";

router.use("/", fetchMany);
router.use("/", fetch);
router.use("/", create);
router.use("/", deleteProject);
router.use("/", save);
router.use("/", updateInfo);
router.use("/", publish);
router.use("/", unpublish);
router.use("/", setThumbnail);
router.use("/", uploadImage);

// Comments
import getComments from "./comments/getComments.js";
import postComment from "./comments/postComment.js";
import deleteComment from "./comments/deleteComment.js";
import fetchReplies from "./comments/fetchReplies.js";

router.use("/", getComments);
router.use("/", postComment);
router.use("/", deleteComment);
router.use("/", fetchReplies);

// Explore
import viewProject from "./explore/viewproject.js";
import embed from "./explore/embed.js";
import like from "./explore/like.js";
import unlike from "./explore/unlike.js";
import explore from "./explore/explore.js";

router.use("/", viewProject);
router.use("/", embed);
router.use("/", like);
router.use("/", unlike);
router.use("/", explore);

// Notifications
import getNotifications from "./notifications/get.js";

router.use("/", getNotifications);

export default router;
