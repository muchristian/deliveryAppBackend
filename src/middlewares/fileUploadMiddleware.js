import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "documents") {
            cb(null, path.join(__dirname, '..', '..', 'public/uploads/driverDocs'));
        } else if (file.fieldname === "shopLogo") {
          cb(null, path.join(__dirname, '..', '..', 'public/uploads/shopsLogo'));
        } else {
          cb(null, path.join(__dirname, '..', '..', 'public/uploads/avatar'));
        }
      
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === "documents") { // if uploading resume
      if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) { // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    } else { // else uploading image
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) { // check file type to be png, jpeg, or jpg
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    }
}


  export const driverUploadFile = multer({
    storage: storage,
    limits: { fileSize: '2mb' },
    fileFilter: fileFilter 
  }).fields(
    [
      { 
        name: 'driverAvatar', 
        maxCount: 1 
      }, 
      { 
        name: 'documents', 
        maxCount: 3 
      }
    ]
  );

  export const customerUploadAvatar = multer({
    storage: storage,
    limits: { fileSize: '1mb' },
    fileFilter: fileFilter 
  }).single("customerAvatar");

  export const uploadLogo = multer({
    storage: storage,
    limits: { fileSize: '1mb' },
    fileFilter: fileFilter 
  }).single("shopLogo");
