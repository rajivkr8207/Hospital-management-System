import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const mailQueue = new Queue("mailQueue", {
  connection: redis
});