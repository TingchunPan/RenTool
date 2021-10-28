import express from "express";
import multer from "multer";
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/multer
 * @reference https://github.com/basir/amazona/blob/master/backend/routers/uploadRouter.js
 */
const imageRouter = express.Router();
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'imageUpload/');
    },

})
const upload = multer({ storage });
imageRouter.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default imageRouter;