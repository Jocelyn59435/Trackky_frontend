import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignInMutation } from '../graphql/generated';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../lib/useAuth';

type SignInFormData = {
  email: string;
  password: string;
};

export default function signInComponent() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const [signInMutation, { data, loading, error }] = useSignInMutation();
  const { setToken } = useAuth();
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const result = await signInMutation({
        variables: {
          input: data,
        },
      });

      if (result.errors) {
        throw new Error('Cannot sign in: ' + result.errors);
      }
      if (result.data) {
        setToken(result.data.signIn.token);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <div className='bg-indigo py-3 flex justify-between'>
        <Link href='/'>
          <div className='p-2 cursor-pointer'>
            <Image
              layout='fixed'
              src='/trackky_header.png'
              width={180}
              height={50}
            />
          </div>
        </Link>
      </div>
      <div className='text-center py-5'>
        <span className=' text-indigo font-black font-sans text-3xl pl-5'>
          Sign In
        </span>
      </div>

      <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block'>Email:</label>
            <input
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('email', {
                required: 'This is required.',
                maxLength: { value: 35, message: 'Max input length is 35.' },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address.',
                },
              })}
            />
          </div>
          {errors.email && <p className='text-red'>{errors.email.message}</p>}
          <div>
            <label className='block'>Password:</label>
            <input
              type='password'
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('password', { required: true, maxLength: 15 })}
            />
          </div>
          <div></div>
          <motion.div
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.8 }}
          >
            {loading ? (
              <div className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg text-center font-bold items-center'>
                <span>Loading ...</span>
              </div>
            ) : (
              <input
                type='submit'
                className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg font-bold'
              />
            )}
          </motion.div>
        </form>
        <div className='text-center '>
          <hr className='border-0 bg-gray-300 text-gray-500 h-px my-10' />
          <span>New to Trackky?</span>{' '}
          <Link href='/signup'>
            <a className='hover:underline'>Sign up</a>
          </Link>
        </div>
      </div>
    </>
  );
}
