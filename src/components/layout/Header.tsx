'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const session = useSession();

  console.log(session, 'session');
  const SessionStatus = session?.status;

  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName?.includes(' ')) {
    userName = userName?.split(' ')[0];
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href="">
          ST PIZZA
        </Link>
        <nav className="flex gap-8 text-gray-400 font-semibold items-center">
          <Link href={''}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>About</Link>
          <Link href={''}>Contact</Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-400 font-semibold">
          {SessionStatus === 'authenticated' ? (
            <>
              <Link href={'/profile'} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-primary text-white px-4 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={'/register'}>Register</Link>
              <Link
                href={'/login'}
                className="bg-primary text-white px-4 py-2 rounded-full"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
