'use client';
import { Input } from '@/components/FormHelpers/Input';
import Tabs from '@/components/Tabs/Tabs';
import CircularLoader from '@/components/loader/CircularLoader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import 'yup-phone';
import { AdminUserTabs, userTabs } from '../staticData/userProfileTabsData';

export interface ProfileInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

const ProfileSchema = yup.object({
  name: yup
    .string()
    .required('name is required')
    .min(4, 'min 4 char required')
    .max(20, 'max 20 char required'),
  email: yup
    .string()
    .email('invalid email address')
    .required('email is required'),
  phone: yup
    .string()
    .phone('IN', true, 'Invalid Number')
    .required('Number is required'),
  address: yup.string().required('address is required'),
  postalCode: yup
    .string()
    .required('postal code is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits'),
  city: yup
    .string()
    .required('City is required')
    .min(5, 'Must be 5 Characters'),
  country: yup
    .string()
    .required('Country is required')
    .min(5, 'Must be 5 Characters'),
});

const ProfilePage = () => {
  const data = useSession();

  const authState = data?.status;

  const userData = data?.data;

  const [profileSaved, setProfileSaved] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [admin, setAdmin] = useState(false);

  const stopLoading = () => setLoading(false);
  const startLoading = () => setLoading(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ProfileInputs>({
    resolver: yupResolver(ProfileSchema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;

    if (files?.length === 1) {
      const data = new FormData();
      data?.set('files', files[0]);

      startLoading();

      const res = await (
        await fetch('/api/upload', {
          method: 'Post',
          body: data,
          // headers: { 'Content-Type': 'mulltipart/form-data' },
        })
      ).json();

      await onSubmit({ image: res });

      setProfileImage(res);

      stopLoading();
    }
  };

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    startLoading();
    //   {
    //     "email": "mohammadsohail099@gmail.com",
    //     "name": "Mohammad Sohail",
    //     "phone": "+919560670716",
    //     "address": "B-85 JHILMIL COLONY SHAHDARA SHAHDARA Vivek Vihar Shahdara Delhi India 110095",
    //     "postalCode": "110095",
    //     "city": "Shahdara",
    //     "country": "India"
    // }

    try {
      const response = await fetch('/api/profile', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          name: data?.name ? data?.name : userData?.user?.name,
          image: data?.image ? data?.image : userImage,
        }),
      });

      fetchprofile();
      if (response.ok) setProfileSaved(true);
    } catch (error) {
    } finally {
      stopLoading();
    }
  };

  const fetchprofile = () => {
    fetch('/api/profile', {
      method: 'get',
    })
      .then((res) => {
        return res.json();
      })
      .then((res: ProfileInputs) => {
        console.log(res, 'response');
        if (res) {
          setValue('phone', res?.phone ? res?.phone : '');
          setValue('address', res?.address ? res?.address : '');
          setValue('postalCode', res?.postalCode ? res?.postalCode : '');
          setValue('city', res?.city ? res?.city : '');
          setValue('country', res?.country ? res?.country : '');
          setAdmin(res?.admin ? true : false);
        }
      });
  };

  useEffect(() => {
    setValue('email', userData?.user?.email || '');
    setValue('name', userData?.user?.name || '');
    if (userData?.user?.image) setProfileImage(userData?.user?.image);
    fetchprofile();
  }, [userData?.user?.email, userData?.user?.name, userData?.user?.image]);

  if (authState === 'loading') {
    return <>Loading....</>;
  }

  if (authState === 'unauthenticated') {
    return redirect('/login');
  }

  const userImage = userData?.user?.image || '';

  return (
    <>
      <CircularLoader open={loading} handleClose={stopLoading} />
      <section className="mt-8">
        <Tabs tabsData={admin ? AdminUserTabs : userTabs} />
        <h1 className="text-center text-primary text-3xl">Profile</h1>
        <form
          className="max-w-xl mx-auto border p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
            <div className="bg-gray-50 p-2 rounded-lg w-[125px] h-[125px] relative space-y-3">
              {profileImage && (
                <Image
                  className="w-[125px] h-[100px]"
                  src={profileImage}
                  width={125}
                  height={125}
                  alt="image"
                />
              )}
              <label className="block">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="block border rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
            <div className="grow space-y-5 pt-3">
              {profileSaved && (
                <h2 className="text-center bg-green-100 p-4 rounded-lg border-4 border-green-400 font-bold">
                  Profile Saved!
                </h2>
              )}

              <div>
                <Input
                  register={register}
                  name={'name'}
                  errors={errors}
                  placeholder={'enter username'}
                  type="text"
                  label="Name"
                />
              </div>

              <div>
                <Input
                  type="email"
                  register={register}
                  name="email"
                  disabled={true}
                  errors={errors}
                  placeholder="enter email"
                  label="Email Address"
                />
              </div>

              <div>
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="Enter Phone Number"
                  register={register}
                  errors={errors}
                  name="phone"
                />
              </div>
              <div>
                <Input
                  label="Address"
                  type="text"
                  register={register}
                  name="address"
                  errors={errors}
                  placeholder="Enter Address"
                />
              </div>
              <div className="flex space-x-4 items-center">
                <Input
                  label="Postal Code"
                  type="tel"
                  register={register}
                  name="postalCode"
                  errors={errors}
                  placeholder="enter pincode"
                />
                <Input
                  label="City"
                  type="text"
                  register={register}
                  name="city"
                  errors={errors}
                  placeholder="enter city"
                />
              </div>
              <div>
                <Input
                  label="Country"
                  type="text"
                  register={register}
                  name="country"
                  errors={errors}
                  placeholder="Enter Country"
                />
              </div>

              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ProfilePage;
