import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unqiue: true },
  },
  { timestamps: true }
);

export const CategoryModel =
  models?.Category || model('Category', CategorySchema);
