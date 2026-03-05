import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const imageQueue = new Queue("imageQueue", {
  connection: redis
});