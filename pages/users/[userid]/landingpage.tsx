import React from 'react';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../../src/components/Header';
import { useAuth } from '../../../lib/useAuth';
import jwtDecode from 'jwt-decode';
import { useCheckProductPriceByUrlLazyQuery } from '../../../graphql/generated';

type SearchProductByUrlData = {
  url: string;
};

const ACTIONS = {
  SET_DESIRED_PRICE: 'set-desired-price',
  SET_DESIRED_DISCOUNT: 'set-desired-discount',
  SET_ORIGINAL_PRICE: 'set-original-price',
};

export default function LandingPage() {
  const router = useRouter();
  const { userid } = router.query;
  const { token, setToken } = useAuth();

  const [
    checkProductPriceByUrl,
    {
      data: checkPriceQueryData,
      loading: checkPriceQueryLoading,
      error: checkPriceQueryError,
    },
  ] = useCheckProductPriceByUrlLazyQuery();

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<SearchProductByUrlData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SearchProductByUrlData> = async (formData) => {
    await checkProductPriceByUrl({
      variables: {
        url: formData.url,
      },
    });
  };

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
          <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 '>
                <div className='sm:col-span-3 md:col-span-5 lg:col-span-5'>
                  <input
                    type='search'
                    className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
                    placeholder='Please enter your product URL'
                    {...register('url', {
                      required: 'This is required.',

                      pattern: {
                        value:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                        message: 'Invalid product link.',
                      },
                    })}
                  />
                </div>
                {errors.url && <p className='text-red'>{errors.url.message}</p>}
                <motion.div
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {checkPriceQueryLoading ? (
                    <div
                      className='w-full
                   h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg text-center font-bold items-center'
                    >
                      <span>Fetching ...</span>
                    </div>
                  ) : (
                    <input
                      disabled={!isDirty || !isValid}
                      type='submit'
                      className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                    />
                  )}
                </motion.div>
                {checkPriceQueryError && (
                  <p className='text-red'>{checkPriceQueryError.message}</p>
                )}
              </div>
            </form>
            {checkPriceQueryData && (
              <div className='w-full flex align-middle justify-center mt-10 space-x-10'>
                <div>
                  <Image
                    src={
                      checkPriceQueryData?.checkProductPriceByUrl
                        ?.product_image_src
                    }
                    width={150}
                    height={200}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2'>
                    <p className='text-2xl'>
                      {
                        checkPriceQueryData?.checkProductPriceByUrl
                          ?.product_name
                      }
                    </p>
                  </div>
                  <div className='col-span-2'>
                    <p>
                      <span className='font-bold'>Price:&nbsp;</span>
                      {
                        checkPriceQueryData?.checkProductPriceByUrl
                          ?.original_price
                      }
                    </p>
                  </div>

                  <div>
                    {' '}
                    <label>Desired Price:&nbsp;</label>
                  </div>
                  <div>
                    <input
                      className='w-3/4 border-darkgrey border-2 rounded-lg  hover:border-indigo focus:bg-transparent'
                      type='number'
                    />
                  </div>

                  <div>
                    <label>Desired Discount:&nbsp;</label>
                  </div>
                  <div>
                    {' '}
                    <input
                      className='w-3/4'
                      type='range'
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>
                  <div className='col-span-2'>
                    {' '}
                    <button
                      className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                      type='submit'
                    >
                      Add to Track List
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header notSignedIn={true} />
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
