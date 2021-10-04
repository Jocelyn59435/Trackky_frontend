import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignInMutation } from '../graphql/generated';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../lib/useAuth';
import Header from '../src/components/Header';
import { useRouter } from 'next/router';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<SignInFormData>({ mode: 'onChange' });
  const [signInMutation, { data, loading, error }] = useSignInMutation();
  const [showError, setShowError] = useState('');
  const { setToken } = useAuth();
  const onSubmit: SubmitHandler<SignInFormData> = async (formData) => {
    try {
      const result = await signInMutation({
        variables: {
          input: formData,
        },
      });

      if (result.errors) {
        throw new Error('Cannot sign in: ' + result.errors);
      }
      if (result.data) {
        setToken(result.data.signIn.token);
      }
      router.push(`/users/${result.data.signIn.id}/landingpage`);
    } catch (e) {
      setShowError(e.message);
    }
  };

  return (
    <>
      <Header notSignedIn={false} />
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
              {...register('password', {
                required: 'This is required.',
                maxLength: { value: 15, message: 'Max input length is 15.' },
                minLength: { value: 8, message: 'Min input length is 8.' },
              })}
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
                disabled={!isDirty || !isValid}
                type='submit'
                className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
              />
            )}
          </motion.div>
          {error && <p className='text-red'>{showError}</p>}
        </form>
        <div className='text-center '>
          <hr className='border-0 bg-gray-300 text-gray-500 h-px my-10' />
          <span>New to Trackky?</span>{' '}
          <Link href='/signup'>
            <a className='font-bold hover:underline'>Sign up</a>
          </Link>
        </div>
        <div className='text-center mt-5'>
          <span>Forget your password?</span>{' '}
          <Link href='/resetpasswordrequest'>
            <a className='font-bold hover:underline'>Reset here</a>
          </Link>
        </div>
      </div>
    </>
  );
}
