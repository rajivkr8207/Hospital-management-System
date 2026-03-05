import { Worker } from "bullmq";
import redis from "../config/redis.js";
import mailHandlers from "../handlers/mail.handlers.js";
import { failMailQueue } from "../queues/mail.queue.js";

const mailWorker = new Worker(
  "mailQueue",
  async (job) => {

    const handler = mailHandlers[job.name];

    if (!handler) {
      throw new Error(`No handler found for job: ${job.name}`);
    }

    return handler(job.data);

  },
  {
    connection: redis,
    concurrency: 10
  }
);

mailWorker.on("completed", (job) => {
  console.log(`Mail job ${job.name} completed`);
});

mailWorker.on("failed", async (job, err) => {

  console.error(`Mail job ${job?.name} failed: ${err.message}`);

  if (job.attemptsMade >= 2) {

    await failMailQueue.add(job.name, job.data, {
      attempts: 1,
      removeOnComplete: true
    });

  }

});

export default mailWorker;