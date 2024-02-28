'use client';

import React, { useState } from 'react';
import authHoc from '../Hoc/AuthHoc';
import AdminLayout from '@/components/layout/AdminLayout';
import { redirect } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/FormHelpers/Input';
import { FileUploadHelper } from '@/components/FormHelpers/FIleUploadHelper';
import Link from 'next/link';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import useMenuItems from '@/hooks/useMenuItems';
import Image from 'next/image';

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

const MenuItemsPage = () => {
  const { menuItems, menuItemsLoading } = useMenuItems();

  console.log(menuItems, 'menu Items');

  return (
    <>
      <Link
        href={'/menu-items/new'}
        className="border-gray-400 border px-4 py-4 block font-bold text-sm rounded-lg flex items-center justify-between"
      >
        Create New Menu Item
        <IoArrowForwardCircleOutline size={'2em'} />
      </Link>

      <section className="grid grid-cols-3 gap-2 mt-5">
        {menuItems?.length
          ? menuItems?.map((menu) => {
              return (
                <Link
                  href={`/menu-items/${menu?._id}`}
                  key={menu?._id}
                  className="space-y-5 flex flex-col items-center p-3 bg-gray-200 rounded-md"
                >
                  <Image
                    src={menu?.image}
                    alt="menu"
                    width={100}
                    height={100}
                    className="w-36 h-32"
                  />
                  <span>{menu?.name}</span>
                </Link>
              );
            })
          : null}
      </section>
    </>
  );
};

export default MenuItemsPage;
