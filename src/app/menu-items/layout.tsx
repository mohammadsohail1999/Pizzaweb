'use client';
import AdminLayout from '@/components/layout/AdminLayout';
import React from 'react';
import authHoc from '../Hoc/AuthHoc';
import { redirect } from 'next/navigation';

const MenuItemLayout = ({ profile, children }) => {
  if (profile && profile?.admin === false) {
    return redirect('/profile');
  }

  return (
    <AdminLayout admin={profile && profile?.admin}>{children}</AdminLayout>
  );
};

export default authHoc(MenuItemLayout);
