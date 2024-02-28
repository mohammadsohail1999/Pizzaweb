import { MenuItemsModel } from '@/app/models/menuItems';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  console.log(params, 'params');

  const _id = params?.menuItemId;

  if (_id) {
    mongoose.connect(process.env.MONGO_URL);

    const item = await MenuItemsModel.findOne({ _id });

    return Response.json(item);
  } else {
    return new Response('Not found', {
      status: 404,
    });
  }

  //   return Response.json('Okay');
}
