'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type RegisterInputs = {
  email: string;
  password: string;
};

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .max(8, 'Not more tha 8 Char')
    .min(6, 'At least 8 Char'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(RegisterSchema),
  });

  const [creatingUser, setCreatingUser] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setCreatingUser(true);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response, 'resp');

    if (response.ok) {
      setCreatedUser(true);
    } else {
      toast.error('Something Went wrong', {
        duration: 4000,
        position: 'top-right',
      });
    }

    setCreatingUser(false);
  };

  const data = useSession();

  const authStatus = data?.status;

  if (authStatus === 'loading') {
    return <>Loding....</>;
  }

  if (authStatus === 'authenticated') {
    return redirect('/');
  }

  return (
    <>
      <section className="mt-6">
        <div className="space-y-3">
          <h1 className="text-center text-primary text-4xl">Register</h1>

          {createdUser && (
            <p className="text-center">
              User created <br />
              Now you can{' '}
              <Link href={'/login'} className="underline">
                Login
              </Link>
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="block max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { required: true })}
          />
          {errors?.email && (
            <p role="alert" className="text-primary">
              {errors?.email?.message}
            </p>
          )}

          <input
            type="password"
            placeholder="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { required: true, maxLength: 8 })}
          />

          {errors?.password && (
            <p role="alert" className="text-primary">
              {errors?.password?.message}
            </p>
          )}

          <button disabled={creatingUser} type="submit">
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            onClick={() =>
              signIn('google', { callbackUrl: '/', redirect: true })
            }
            type="button"
            className="flex gap-3 items-center justify-center"
          >
            <FcGoogle size={'2rem'} />
            Login with Google
          </button>
          <div className="text-center mt-3">
            Existing account?{' '}
            <Link className="underline" href={'/login'}>
              Login Here
            </Link>
          </div>
        </form>
      </section>
      <Toaster />
    </>
  );
};

export default Register;
