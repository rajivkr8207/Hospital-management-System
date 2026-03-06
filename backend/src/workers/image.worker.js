import { Worker } from "bullmq"
import redis from "../config/redis.js"
import ImageHandlers from "../handlers/image.handlers.js"
import ConnectDB from "../config/database.js";
await ConnectDB();
const imageWorker = new Worker(
  "imageQueue",
  async (job) => {
    const imghandler = ImageHandlers[job.name];

    if (!imghandler) {
      throw new Error(`No imghandler found for job: ${job.name}`);
    }
    return imghandler(job.data);
  },
  { connection: redis }
)

imageWorker.on("completed", (job) => {
  console.log(`Job completed ${job.id}`);
});

imageWorker.on("failed", (job, err) => {
  console.log(`Job failed ${job.id}`, err);
});

export default imageWorker