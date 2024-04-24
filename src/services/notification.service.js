import QueryBuilder from "../builder/QueryBuilder.js";
import Notification from "../models/notification.model.js";
import { emitMessage } from "../utils/socket.utils.js";
const insertNotificationIntoDB = async (payload, session) => {
  const result = await Notification.create(payload, { session });
  emitMessage(result[0]?.receiver, result[0]);
  return result;
};
const insertNotificationIntoDBv2 = async (payload) => {
  const result = await Notification.create(payload);
  return result;
};
const getUserSpecificNotifications = async (query) => {
  const notificationQuery = new QueryBuilder(Notification.find(), query)
    .search()
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await notificationQuery.modelQuery;
  const meta = await notificationQuery.meta();

  return {
    result,
    meta,
  };
};

const deleteNotification = async (id) => {
  const result = await Notification.findByIdAndDelete(id);
  return result;
};

const markAsAllRead = async (id) => {
  const result = await Notification.updateMany(
    { receiver: id },
    {
      $set: {
        read: true,
      },
    },
    { new: true }
  );
  return result;
};

const notificationServices = {
  insertNotificationIntoDB,
  getUserSpecificNotifications,
  insertNotificationIntoDBv2,
  deleteNotification,
  markAsAllRead,
};
export default notificationServices;
