// This is a generated file, use `npm run generate` to regenerate
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddProductPayload = {
  current_price: Scalars['Float'];
  desired_price: Scalars['Float'];
  email_sent_time: Scalars['DateTime'];
  original_price: Scalars['Float'];
  platform: Scalars['String'];
  price_update_time: Scalars['DateTime'];
  product_image_src: Scalars['String'];
  product_name: Scalars['String'];
  status: ProductStatus;
  user_id: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct: Product;
  deleteProduct: Scalars['Int'];
  signIn: AuthResponse;
  signUp: AuthResponse;
};


export type MutationAddProductArgs = {
  input: AddProductPayload;
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationSignInArgs = {
  input: SignInPayload;
};


export type MutationSignUpArgs = {
  input: SignUpPayload;
};

/** type definition for product */
export type Product = {
  __typename?: 'Product';
  created_at: Scalars['DateTime'];
  current_price: Scalars['Float'];
  desired_price: Scalars['Float'];
  email_sent_time: Scalars['DateTime'];
  id: Scalars['ID'];
  original_price: Scalars['Float'];
  platform: Scalars['String'];
  price_update_time: Scalars['DateTime'];
  product_image_src: Scalars['String'];
  product_name: Scalars['String'];
  status: ProductStatus;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getProductById: Product;
  getUserInfo: User_Info;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserInfoArgs = {
  email: Scalars['String'];
};

export type SignInPayload = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpPayload = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

/** type definition for user_info */
export type User_Info = {
  __typename?: 'User_info';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export enum ProductStatus {
  Active = 'active',
  Finished = 'finished'
}


export const SignUpDocument = gql`
    mutation signUp($input: SignUpPayload!) {
  signUp(input: $input) {
    email
    token
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export type SignUpMutationVariables = Exact<{
  input: SignUpPayload;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthResponse', email: string, token: string } };
