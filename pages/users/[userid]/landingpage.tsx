import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../src/components/Header';
import { FilterSection } from '../../../src/components/FilterSection';
import SearchForm from '../../../src/components/SearchForm';
import { useAuth } from '../../../lib/useAuth';
import jwtDecode from 'jwt-decode';

export default function LandingPage() {
  const router = useRouter();
  const { userid } = router.query;
  const { token, destroyToken } = useAuth();

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
      destroyToken();
      console.log(e.message);
    }
  }
  if (token && sameRoute) {
    return (
      <>
        <Header notSignedIn={false} isLandingPage={true} />
        <div className='text-center py-5'>
          <span className=' text-indigo font-black font-sans text-3xl pl-5'>
            Fetch the Price
          </span>
        </div>
        <div>
          <SearchForm userId={userid as string} />
        </div>
        <div className='w-5/6 m-auto'>
          <hr className='m-auto border-0 bg-gray-300 text-gray-500 h-px my-10' />
          <div className='text-center py-5'>
            <span className=' text-indigo font-black font-sans text-3xl pl-5'>
              Your Track List
            </span>
          </div>
          <FilterSection userId={userid.toString()} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header notSignedIn={true} />
        <div className='m-8 text-2xl'>
          You are not authorized, please&nbsp;
          <Link href='/signin'>
            <a className='font-bold hover:underline'>sign in&nbsp;</a>
          </Link>
          first.
        </div>
      </>
    );
  }
}
