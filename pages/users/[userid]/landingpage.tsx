import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../src/components/Header';
import SearchForm from '../../../src/components/SearchForm';
import { useAuth } from '../../../lib/useAuth';
import jwtDecode from 'jwt-decode';

export default function LandingPage() {
  const router = useRouter();
  const { userid } = router.query;
  const { token, setToken } = useAuth();

  let sameRoute = false;
  if (token) {
    try {
      const decoded = jwtDecode(token) as any;
      const expires = new Date(decoded.exp * 1000);
      if (new Date() >= expires) {
        throw new Error('Expired Token.');
      }
      if (parseInt(userid as string) != parseInt(decoded.id)) {
        throw new Error('Unauthorized Route.');
      }
      sameRoute = true;
    } catch (e) {
      setToken(null);
      console.log(e.message);
    }
  }
  if (token && sameRoute) {
    return (
      <>
        <Header notSignedIn={false} />
        <div className='text-center py-5'>
          <span className=' text-indigo font-black font-sans text-3xl pl-5'>
            Fetch the Price
          </span>
        </div>
        <div>
          <SearchForm userId={userid as string} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header notSignedIn={true} />
        <span className='ml-10 mt-10'>
          You are not authorized, please&nbsp;
          <Link href='/signin'>
            <a className='font-bold hover:underline'>sign in&nbsp;</a>
          </Link>
          first.
        </span>
      </>
    );
  }
}
