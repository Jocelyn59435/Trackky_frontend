import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../../src/components/Header';
import { useAuth } from '../../../lib/useAuth';
import jwtDecode from 'jwt-decode';
import { useCheckProductPriceByUrlQuery } from '../../../graphql/generated';

export default function LandingPage() {
  const router = useRouter();
  const { userid } = router.query;
  const { token, setToken } = useAuth();

  const { data, loading, error } = useCheckProductPriceByUrlQuery({
    variables: {
      url: 'https://www.chemistwarehouse.com.au/buy/94824/healthy-way-great-goji-berries-200g',
    },
  });
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
        <div>
          <input type='search' placeholder='Please enter your product URL' />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header notSignedIn={true} />
        {<p>data?.checkProductPriceByUrl?.original_price</p>}
        <span>
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
