import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useAuth } from '../../../utils/useAuth';

export default function LandingPage() {
  const { token } = useAuth();
  if (token) {
    return <Header notSignedIn={true} />;
  } else {
    return (
      <>
        <Header notSignedIn={false} />
        <span>
          You are not authorized, please
          <Link href='/signin'>
            <a className='hover:underline'>sign in</a>
          </Link>
          first.
        </span>
      </>
    );
  }
}
