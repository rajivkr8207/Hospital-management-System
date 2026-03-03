import ImageKit, { toFile } from '@imagekit/nodejs';
import config from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGE_KIT,
});

class ImageService {
    async CreateAvatar(file) {
        const imgurl = await client.files.upload({
            file: await toFile(Buffer.from(file.buffer), 'file'),
            fileName: `post_${Date.now()}`,
            folder: "/hospital/avatar"
        });
        return imgurl
    }
}

export default new ImageService;





