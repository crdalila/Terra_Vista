//===============================================================================
// name: multerMiddleware.ts
// desc: Creates de upload for image loading
//===============================Dependency Imports==============================
import multer from 'multer';
import { Request } from 'express'
import fs from 'fs';
import path from 'path';
import { InvalidFileTypeError } from '../errors/multerError';
//===============================================================================
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: function (_: Request, __: Express.Multer.File, cb: DestinationCallback) {
    cb(null, 'public/images');
  },
  filename: function (_: Request, file: Express.Multer.File, cb: FileNameCallback) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new InvalidFileTypeError());
  }
};

export const upload = multer({ 
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 1024 * 1024 * 50 }
});

export function removeFile(fileName : string,folder="images") {
    try{
        const filePath = path.join(process.cwd(), 'public', folder, `${fileName}`);
        fs.unlinkSync(filePath);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}


