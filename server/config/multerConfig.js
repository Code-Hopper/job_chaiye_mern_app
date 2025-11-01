import multer from "multer"

let storage = multer.diskStorage({
    // upload
    destination: (req, file, cb) => {
        cb(null, `uploads/${req.params.file_type}/`) //where file is going to be saved !
    },
    // filename
    filename: (req, file, cb) => {
        console.log(file)
        const extension = file.originalname;
        const uniqueName = `${new Date().getTime()}-${req.params.file_type}-${req.user._id}-${extension}`;
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })

export { upload }