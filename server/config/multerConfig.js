import multer from "multer"
import path from "path"

// Define storage logic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = req.params.file_type // e.g. 'resume' or 'profile_pictures'

        // Allow only 'resume' or 'profile_pictures' or 'company_logo'
        if (fileType !== "resume" && fileType !== "profile_picture") {
            return cb(new Error("Invalid upload type."))
        }

        // Define destination based on type
        const uploadPath = path.join("uploads", fileType === "resume" ? "resumes" : "profile_pictures")

        // uploads/profile_picture 

        cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    },
})

const upload = multer({ storage })

export { upload }