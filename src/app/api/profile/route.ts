import { User } from '@/app/models/users';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req?.json();

  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const arr = [
    'name',
    'image',
    'address',
    'phone',
    'postalCode',
    'city',
    'country',
  ];

  let dataToSent = {};

  arr.forEach((el) => {
    if (data[el]) {
      dataToSent[el] = data[el];
    }
  });

  if (Object.keys(dataToSent)?.length) {
    // update user
    const user = await User.findOneAndUpdate({ email }, dataToSent, {
      new: true,
    });
  }

  return Response.json({
    ok: 'ok',
  });
}

export async function GET(req) {
  mongoose.connect(process?.env?.MONGO_URL);

  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  try {
    const user = await User.findOne({ email });

    return Response.json(user);
  } catch (error) {}
}
