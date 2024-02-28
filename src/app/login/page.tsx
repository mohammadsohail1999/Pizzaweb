'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { RegisterSchema } from '../register/page';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterSchema),
  });

  const data = useSession();

  const authStatus = data?.status;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const { ok } = await fetch('/api/login', {
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'POST',
    // });

    // if (ok) {
    // } else {
    // }

    await signIn('credentials', {
      email: data?.email,
      password: data?.password,
      redirect: false,
    }).then(({ ok, error }) => {
      console.log({ ok, error });
    });
  };

  if (authStatus === 'loading') {
    return <>Loding....</>;
  }

  if (authStatus === 'authenticated') {
    return redirect('/');
  }

  return (
    <section>
      <section className="mt-6">
        <div className="space-y-3">
          <h1 className="text-center text-primary text-4xl">Login</h1>

          {/* {createdUser && (
            <p className="text-center">
              User created <br />
              Now you can{' '}
              <Link href={'/login'} className="underline">
                Login
              </Link>
            </p>
          )} */}
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

          <button type="submit">Login</button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            onClick={() =>
              signIn('google', { redirect: true, callbackUrl: '/' })
            }
            type="button"
            className="flex gap-3 items-center justify-center"
          >
            <FcGoogle size={'2rem'} />
            Login with Google
          </button>
          <div className="text-center mt-3">
            Didn't Have account ?{' '}
            <Link className="underline" href={'/register'}>
              Register Here
            </Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
