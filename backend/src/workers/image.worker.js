import { Worker } from "bullmq"
import redis from "../config/redis.js"
import User from "../models/user.model.js"
import imageService from "../service/image.service.js"

const imageWorker = new Worker(
  "imageQueue",
  async (job) => {

    const { userId, tempUrl } = job.data

    const img = await imageService.CreateAvatar(tempUrl)

    await User.findByIdAndUpdate(userId, {
      photo: img.url
    })

  },
  { connection: redis }
)

export default imageWorker