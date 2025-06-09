//===============================================================================
// name: multerMiddleware.ts
// desc: Creates de upload for image loading
//===============================Dependency Imports==============================
import multer from 'multer';
import { Request } from 'express'
import fs from 'fs';
import path from 'path';
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

export const upload = multer({ storage: storage });

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


