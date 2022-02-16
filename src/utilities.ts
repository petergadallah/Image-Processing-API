import sharp from 'sharp';
function newpath(photo: unknown, width: unknown, height: unknown): string {
  const newpath = `output/${photo}_${width}_${height}.jpg`;
  return newpath;
}

const resizing = async (
  photo: unknown,
  width: unknown,
  height: unknown
): Promise<void> => {
  // sharp(name of the photo).resize(width,height).toFile(path of the output file)
  await sharp(`photos/${photo}.jpg`)
    .resize(Number(width) as number, Number(height))
    //then create a new file whose name contains photo name, width and height
    .toFile(`output/${photo}_${width}_${height}.jpg`);
};

export default newpath;
export const newsize = resizing;
/* if we run this function, a new photo will be created at output folder
resizing('pic6', 120,240)*/
