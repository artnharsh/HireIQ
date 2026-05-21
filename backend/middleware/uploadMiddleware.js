import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and DOCX files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { 
        fileSize: 5 * 1024 * 1024,// 5MB limit
        files: 50
    } 
});

export default upload;