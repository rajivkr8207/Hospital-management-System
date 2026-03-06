import authService from "../service/auth.service.js";
import imageService from "../service/image.service.js";


const ImageHandlers = {

    uploadAvatar: async ({ userId, file }) => {
        const img = await imageService.CreateAvatar(file)
        return await authService.UpdateImageAvatar(userId, img.url);
    },

};

export default ImageHandlers;