'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { redirect } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/FormHelpers/Input';
import { FileUploadHelper } from '@/components/FormHelpers/FIleUploadHelper';
import Link from 'next/link';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

interface MenuItemFields {
  name: string;
  desc: string;
  price: number;
  image?: any;
}

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string, fileType: string) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

const MAX_FILE_SIZE = 102400 * 1000 * 1000;

const MenuItemsSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  desc: yup.string().required('desc is required'),
  price: yup
    .number()
    .typeError('price is required')
    .required('Price is required')
    .min(5, 'min price should be 5'),
  image: yup
    .mixed()
    .required('image is required')
    .test('is-valid-type', 'Invalid image type', (value) => {
      console.log(value, 'values image');

      let val = value?.length ? value?.[0] : null;

      return isValidFileType(val && val?.name?.toLowerCase(), 'image');
    })
    .test('is-valid-size', 'Max allowed size is 1MB', (value) => {
      let val = value?.length ? value?.[0] : null;

      return val && val?.size <= MAX_FILE_SIZE;
    }),
});

const MenuItemsPage = ({ profile }) => {
  const [imgStr, setImgStr] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<MenuItemFields>({
    resolver: yupResolver(MenuItemsSchema),
    defaultValues: {
      image: null,
      name: '',
      desc: '',
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<MenuItemFields> = async (data) => {
    const uploadedFile = data?.image?.[0];

    const formData = new FormData();

    const restData = { ...data };
    delete restData?.image;

    formData.append('file', uploadedFile);

    formData.append('restData', JSON.stringify(restData));

    fetch('/api/menu-items', {
      method: 'POST',
      body: formData,
    });
  };

  const price = watch('price');

  const imageObj = watch('image');

  if (profile && profile?.admin === false) {
    return redirect('/profile');
  }

  return (
    <>
      <Link
        href={'/menu-items'}
        className="border-gray-400 border px-4 py-4 block font-bold text-sm rounded-lg flex items-center justify-between"
      >
        Go Back
        <IoArrowForwardCircleOutline size={'2em'} />
      </Link>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="self-start">
            <FileUploadHelper
              register={register}
              name={'image'}
              image={imgStr}
              setImageStr={setImgStr}
              type="file"
              errors={errors}
              accept="image/*"
              imageObj={imageObj}
            />
          </div>

          <div className="grow">
            <div>
              <Input
                register={register}
                name={'name'}
                errors={errors}
                placeholder={'enter menu name'}
                type="text"
                label="Item name"
              />
            </div>
            <div>
              <Input
                register={register}
                name={'desc'}
                errors={errors}
                placeholder={'enter description'}
                type="text"
                label="Description"
              />
            </div>
            <div>
              <Input
                register={register}
                name={'price'}
                errors={errors}
                placeholder={'Enter Price'}
                type="number"
                label="Base price"
                value={price === 0 ? '' : price}
              />
            </div>

            <button className="" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MenuItemsPage;
