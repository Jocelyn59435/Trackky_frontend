import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../graphql/generated';
import useAuth from '../lib/useAuth';

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function signUpComponent() {
  const { register, handleSubmit } = useForm<SignUpFormData>();
  const [signUpMutation, { data, loading, error }] = useSignUpMutation();
  const { setToken } = useAuth();
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const result = await await signUpMutation({
        variables: {
          input: data,
        },
      });

      if (result.errors) {
        throw new Error('Cannot sign up' + result.errors);
      }
      if (result.data) {
        setToken(result.data.signUp.token);
        console.log(result.data.signUp.token);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input
        className='w-1/4'
        {...register('firstName', { required: true, maxLength: 20 })}
      />
      <label>Last Name:</label>
      <input
        className='w-1/4'
        {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/i })}
      />
      <label>Email:</label>
      <input
        className='w-1/4'
        {...register('email', {
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />
      <label>Password:</label>
      <input
        className='w-1/4'
        {...register('password', { required: true, maxLength: 15 })}
      />
      <input type='submit' />
    </form>
  );
}
