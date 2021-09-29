// add jwt token function
// send email

import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useResetPasswordMutation } from '../graphql/generated';

type ResetPasswordFormData = {
  password: string;
  passwordToConfirm: string;
};

export default function signUpComponent() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<ResetPasswordFormData>();
  const [resetPasswordMutation, { data, loading, error }] =
    useResetPasswordMutation();

  const password = useRef({}); // initialize a blank object

  // update current value when password field changes
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      const result = await resetPasswordMutation({
        variables: {
          passwordInput: data.password,
        },
      });

      if (result.errors) {
        throw new Error('Cannot reset password' + result.errors);
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
          Reset Password
        </span>
      </div>

      <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block'>Password:</label>
            <input
              autoComplete='current-password'
              type='password'
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('password', {
                required: 'This is required.',
                maxLength: { value: 15, message: 'Max input length is 15.' },
                minLength: { value: 8, message: 'Min input length is 8.' },
              })}
            />
          </div>
          {errors.password && (
            <p className='text-red'>{errors.password.message}</p>
          )}
          <div>
            <label className='block'>Confirm Password:</label>
            <input
              type='password'
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('passwordToConfirm', {
                required: 'This is required.',
                maxLength: { value: 15, message: 'Max input length is 15.' },
                minLength: { value: 8, message: 'Min input length is 8.' },
                validate: (value) =>
                  value === password.current || 'The passwords do not match.',
              })}
            />
          </div>
          {errors.passwordToConfirm && (
            <p className='text-red'>{errors.passwordToConfirm.message}</p>
          )}
          <motion.div
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.8 }}
          >
            <input
              type='submit'
              className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg font-bold'
            />
          </motion.div>
        </form>
      </div>
    </>
  );
}
