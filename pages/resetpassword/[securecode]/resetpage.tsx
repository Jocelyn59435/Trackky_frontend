import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Header from '../../../src/components/Header';
import { motion } from 'framer-motion';
import {
  useCheckSecureCodeQuery,
  useResetPasswordMutation,
} from '../../../graphql/generated';
import Link from 'next/link';

type ResetPasswordFormData = {
  password: string;
  passwordToConfirm: string;
};

export default function ResetPage() {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
  } = useForm<ResetPasswordFormData>({ mode: 'onChange' });

  const router = useRouter();
  const { securecode } = router.query;

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useCheckSecureCodeQuery({
    variables: {
      reset_password_secure_code: securecode as string,
    },
  });

  const [
    resetPasswordMutation,
    { data: resetData, loading: resetLoading, error: resetError },
  ] = useResetPasswordMutation();

  const password = useRef({}); // initialize a blank object
  // update current value when password field changes
  password.current = watch('password', '');

  const [showResetError, setShowResetError] = useState('');

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (formData) => {
    try {
      const result = await resetPasswordMutation({
        variables: {
          passwordInput: formData.password,
          reset_password_secure_code: securecode as string,
        },
      });
      if (result.errors) {
        throw new Error('Cannot reset password' + result.errors);
      }
    } catch (e) {
      setShowResetError(e.message);
    }
  };

  return (
    <>
      <Header notSignedIn={false} />

      <div className='text-center py-5'>
        <span className=' text-indigo font-black font-sans text-3xl pl-5'>
          Reset Password
        </span>
      </div>
      {!queryData?.checkSecureCode?.isValidCode && (
        <p className='text-red'>{queryError?.message}</p>
      )}
      {queryData?.checkSecureCode?.isValidCode && (
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
                disabled={!isDirty || !isValid}
                type='submit'
                className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
              />
            </motion.div>
            {resetError && <p className='text-red m-8'>{showResetError}</p>}
            {resetData?.resetPassword?.email && (
              <p>
                {`Congrats! Your password for ${resetData?.resetPassword?.email}
                has been reset successfully.`}
                <Link href='/signin'>
                  <a className='ml-2 font-bold hover:underline'>sign in here</a>
                </Link>
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
