import express, { Request, Response } from 'express';
import fs from 'fs';
import { newsize } from './utilities';
import newpath from './utilities';

const route = express.Router();

route.get(
  '/images',
  async (req: Request, res: Response): Promise<void> => {
    //The req.query has 3 parameters (filename, width, height).
    // We must use these 3 parameters in both 'URL' and 'coding'.
    /*i.e in coding we type (query.filename), (query.width), (query.height)
    and in url we type http://localhost:8080/images/?filename=pic1&width=400&height=550*/
    

    //first query parameter is the filename
    const photo = req.query.filename;

    //Second query parameter is the width of the photo

    const width = req.query.width;

    //Third query parameter is the height of the photo

    const height = req.query.height;

    const oldPath = `photos/${photo}.jpg`;
    const newPath = newpath(photo, width, height);

    //if the output file exists, we will only send it to the server without processing
    if (fs.existsSync(newPath)) {
      fs.readFile(newPath, function(err: unknown, data: unknown): void {
        if (err) throw err;
      // why do we use (.end) not (.send)?  I don't know.        
        res.end(data);
      });

      //if the width or height of the photo are not numbers , the server will send an error message
    } else if (isNaN(Number(width)) || isNaN(Number(height))) {
      res.send('Error: width and height must be Numbers');

      //if the width or height of the photo are not greater than 0, the server will send an error message
    } else if (Number(width) <= 0 || Number(height) <= 0) {
      res.send('Error: width and height must be values greater than 0');

      //if the output file doesn't exist (but there is a source photo with such name), we create anit
    } else if (fs.existsSync(oldPath)) {
      //We use sharp to resize the image

      await newsize(photo, width, height);

      //then, we send this photo

      fs.readFile(newPath, function(err: unknown, data: unknown): void {
        if (err) throw err;
        res.end(data);
      });

      //if there is a problem, send an error message
    } else {
      res.send('Failed processing. The image may be not existant');
    }
  }
);

export default route;
