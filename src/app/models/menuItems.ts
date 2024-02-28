import { Schema, model, models } from 'mongoose';

const MenuItemsSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

export const MenuItemsModel =
  models?.MenuItems || model('MenuItems', MenuItemsSchema);
