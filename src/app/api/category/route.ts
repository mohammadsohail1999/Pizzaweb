import { CategoryModel } from '@/app/models/categories';

export async function POST(req) {
  const { name } = await req.json();
  const categoryDoc = await CategoryModel.create({ name });
  return Response.json(categoryDoc);
}

export async function GET(req) {
  return Response.json(await CategoryModel.find());
}

export async function PUT(req) {
  const { name, _id } = await req.json();

  await CategoryModel.updateOne({ _id }, { name });

  return Response.json(true);
}
