import CircularLoader from '@/components/loader/CircularLoader';
import useProfile from '@/hooks/useProfile';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const authHoc = (Component: React.JSX.Element) => {
  const AuthHoc = ({ ...props }) => {
    const { authStatus, loading, profile } = useProfile();
    if (authStatus === 'loading') {
      return <CircularLoader open={true} handleClose={() => {}} />;
    }
    if (authStatus === 'unauthenticated') {
      redirect('/login');
    }

    return <Component profile={profile} {...props} />;
  };

  return AuthHoc;
};

export default authHoc;
