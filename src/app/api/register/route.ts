import { User } from '@/app/models/users';
import mongoose from 'mongoose';
import { NextApiRequest } from 'next';

export async function POST(req: Request) {
  const body = await req.json();

  mongoose.connect(process.env.MONGO_URL);

  const createdUser = await User.create(body);

  return Response.json(createdUser);
}



function outerFunc(outerParam) {  function innerFunc(innerParam) {     outerParam["b"] = innerParam;  }  return innerFunc;}const obj = {a:1}const example = outerFunc(obj);const answer = example(2)console.log(obj);