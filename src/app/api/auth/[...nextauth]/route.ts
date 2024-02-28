import { User } from '@/app/models/users';
import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import clientPromise from '@/app/libs/mongo-connect';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

export const authOptions = {
  secret: process?.env?.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      id: 'credentials',

      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const { email, password } = credentials;

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });

        console.log({ password, user });

        const isPasswordOK =
          user && bcryptjs.compareSync(password, user?.password);

        if (isPasswordOK) {
          return user;
        } else {
          throw new Error('Password is incorrect');
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
