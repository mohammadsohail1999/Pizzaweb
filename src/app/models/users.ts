import { Schema, model, models } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: function (val: string) {
        if (!val?.length || val?.length < 6) {
          new Error('Password must be at leat 6 char');
        }
      },
    },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw new Error('Some error occured while storing data');
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      console.log(this, 'this');
      next();
    });
  });
});

export const User = models?.User || model('User', UserSchema);
