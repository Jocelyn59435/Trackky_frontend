import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useResetPasswordRequestMutation } from '../graphql/generated';
import { resultKeyNameFromField } from '@apollo/client/utilities';

type ResetPasswordRequestFormData = {
  email: string;
};

export default function ResetPasswordRequestComponent() {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<ResetPasswordRequestFormData>({ mode: 'onChange' });

  const [resetPasswordRequestMutation, { data, loading, error }] =
    useResetPasswordRequestMutation();

  const [showError, setShowError] = useState('');

  const onSubmit: SubmitHandler<ResetPasswordRequestFormData> = async (
    formData
  ) => {
    try {
      const result = await resetPasswordRequestMutation({
        variables: {
          email: formData.email,
        },
      });
      if (result.errors) {
        throw new Error('Failed to send request' + result.errors);
      }
      console.log(result);
    } catch (e) {
      setShowError(e.message);
    }
  };

  return (
    <>
      <Header notSignedIn={false} />
      <div className='text-center py-5'>
        <span className=' text-indigo font-black font-sans text-3xl pl-5'>
          Send Reset Password Request
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

          <motion.div
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.8 }}
          >
            {loading ? (
              <div className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg text-center font-bold items-center opacity-50'>
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
          {data?.resetPasswordRequest?.id && (
            <p>
              The validation code is sent to your email, please click on this
              link to reset your password with the code.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
