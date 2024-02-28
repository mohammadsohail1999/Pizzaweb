import cloudinary from 'cloudinary';
import { MenuItemsModel } from '@/app/models/menuItems';
import mongoose from 'mongoose';

export const cloudinaryInstance = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  const data = await req.formData();

  const file = data?.get('file');

  const restData = JSON?.parse(data?.get('restData'));

  mongoose.connect(process.env.MONGO_URL);

  if (file) {
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    try {
      const response = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            { folder: 'pizzaOrderApp/menuItems' },
            (error, uploadResult) => {
              if (error) {
                return reject(error);
              }
              return resolve(uploadResult);
            }
          )
          .end(buffer);
      });

      console.log(response);

      const newMenuItem = await MenuItemsModel.create({
        ...restData,
        image: response?.secure_url,
      });

      console.log(newMenuItem, 'item');

      return Response.json({ ok: true });
    } catch (error) {
      console.log(error);
      return Response.json({ ok: 'error' });
    }
  }

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(await MenuItemsModel.find());

}
