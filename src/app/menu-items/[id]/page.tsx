'use client';
import authHoc from '@/app/Hoc/AuthHoc';
import MenuItemCreateForm from '@/components/menu/MenuItemCreateForm';
import { redirect, useParams } from 'next/navigation';
import React from 'react';

const EditMenuItemPage = ({ profile }) => {
  if (profile && profile?.admin === false) {
    return redirect('/profile');
  }

  return (
    <>
      <MenuItemCreateForm mode="edit" />
    </>
  );
};

export default authHoc(EditMenuItemPage);
