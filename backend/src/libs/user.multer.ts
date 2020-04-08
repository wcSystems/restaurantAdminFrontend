import multer from 'multer'
import path from 'path'
import uuid from 'uuid/v4';

// Settings
const storage = multer.diskStorage({
    destination: 'uploads/img/users',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});


export default multer({storage, fileFilter: 
    function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'), true)
        }
        cb(null, true)
    }

});
