import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../graphql/generated';
import { useAuth } from '../utils/useAuth';
import { motion } from 'framer-motion';
import Header from '../src/components/Header';

type SignUpFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordToConfirm: string;
};

export default function signUpComponent() {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    watch,
  } = useForm<SignUpFormData>({ mode: 'onChange' });
  const [signUpMutation, { data, loading, error }] = useSignUpMutation();
  const [showError, setShowError] = useState('');

  // reference.current accesses the reference value,
  // and reference.current = newValue updates the reference value.
  // The value of the reference is persisted (stays the same) between component re-renderings;
  // Updating a reference doesn’t trigger a component re-rendering.

  const password = useRef({}); // initialize a blank object

  // update current value when password field changes
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
    // remove passwordToConfirm
    const { passwordToConfirm, ...restData } = formData;
    try {
      const result = await signUpMutation({
        variables: {
          input: restData,
        },
      });

      if (result.errors) {
        throw new Error('Cannot sign up' + result.errors);
      }
      if (result.data) {
        const { setToken } = useAuth();
        setToken(result.data.signUp.token);
        window.location.href = `/users/${result.data.signUp.id}/landingpage`;
      }
    } catch (e) {
      setShowError(e.message);
    }
  };

  return (
    <>
      <Header notSignedIn={false} />
      <div className='text-center py-5'>
        <span className=' text-indigo font-black font-sans text-3xl pl-5'>
          Sign Up
        </span>
      </div>

      <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block'>First Name:</label>
            <input
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('first_name', {
                required: 'This is required.',
                maxLength: { value: 20, message: 'Max input length is 20.' },
              })}
            />
          </div>
          {errors.first_name && (
            <p className='text-red'>{errors.first_name.message}</p>
          )}
          <div>
            <label className='block'>Last Name:</label>
            <input
              className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
              {...register('last_name', {
                required: 'This is required.',
                maxLength: { value: 20, message: 'Max input length is 20.' },
              })}
            />
          </div>

          {errors.last_name && (
            <p className='text-red'>{errors.last_name.message}</p>
          )}
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
        </form>
      </div>
    </>
  );
}
