import { Worker } from "bullmq";
import redis from "../config/redis.js";
import mailHandlers from "../handlers/mail.handlers.js";

const failMailWorker = new Worker(
    "failMailQueue",
    async (job) => {

        const handler = mailHandlers[job.name];

        if (!handler) {
            throw new Error("handler not found");
        }

        return handler(job.data);
    },
    {
        connection: redis
    }
);

failMailWorker.on("failed", (job, err) => {
  console.error("Final mail failure:", err.message);
  job.remove();
});
export default failMailWorker;