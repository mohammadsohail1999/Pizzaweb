import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useProfile = () => {
  const session = useSession();

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);

  const authStatus = session?.status;

  useEffect(() => {
    if (session?.status === 'loading') {
      setLoading(true);
    }

    if (session?.status === 'authenticated') {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((res) => {
          setProfile(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (session?.status === 'unauthenticated') {
      setLoading(false);
    }
  }, [session?.status]);

  return {
    loading,
    profile,
    authStatus,
  };
};

export default useProfile;
