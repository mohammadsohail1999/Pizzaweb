import cloudinary from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import mongoose from 'mongoose';
import { User } from '@/app/models/users';

export const cloudinaryInstance = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  const data = await req.formData();

  const file = data?.get('files');

  if (file) {
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    try {
      const response = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: 'pizzaOrderApp' }, (error, uploadResult) => {
            if (error) {
              return reject(error);
            }
            return resolve(uploadResult);
          })
          .end(buffer);
      });

      return Response.json(response?.secure_url);
    } catch (error) {
      console.log(error);
      return Response.json({ ok: 'error' });
    }
  }

  return Response.json(true);
}
