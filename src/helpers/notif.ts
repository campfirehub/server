import Notification from "../models/Notification.js";
import { ObjectId } from "mongodb";

async function sendNotification(
  type: string,
  from: ObjectId,
  to: ObjectId,
  data: object
) {
  await Notification.create({
    type: type,
    author: from,
    to: to,
    seen: false,
    data: {
      ...data,
    },
  });
}

export default { sendNotification };
