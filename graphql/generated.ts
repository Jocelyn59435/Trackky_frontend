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
  desired_price: Scalars['Float'];
  product_link: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Float'];
  last_name: Scalars['String'];
  token: Scalars['String'];
};

export type CheckProductPriceResponse = {
  __typename?: 'CheckProductPriceResponse';
  original_price: Scalars['Float'];
  product_image_src: Scalars['String'];
  product_link: Scalars['String'];
  product_name: Scalars['String'];
};

export type CheckSecureCodeResponse = {
  __typename?: 'CheckSecureCodeResponse';
  email: Scalars['String'];
  isValidCode: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct: Product;
  deleteProduct: Scalars['Int'];
  resetPassword: ResetPasswordResponse;
  resetPasswordRequest: ResetPasswordRequestResponse;
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


export type MutationResetPasswordArgs = {
  passwordInput: Scalars['String'];
  reset_password_secure_code: Scalars['String'];
};


export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
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
  email_sent_time: Scalars['Float'];
  id: Scalars['ID'];
  original_price: Scalars['Float'];
  platform: Scalars['String'];
  price_update_time: Scalars['Float'];
  product_image_src: Scalars['String'];
  product_link: Scalars['String'];
  product_name: Scalars['String'];
  status: ProductStatus;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkProductPriceByUrl: CheckProductPriceResponse;
  checkSecureCode: CheckSecureCodeResponse;
  getProductByUserId: Array<Product>;
  getUserInfo: User_Info;
};


export type QueryCheckProductPriceByUrlArgs = {
  url: Scalars['String'];
};


export type QueryCheckSecureCodeArgs = {
  reset_password_secure_code: Scalars['String'];
};


export type QueryGetProductByUserIdArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUserInfoArgs = {
  email: Scalars['String'];
};

export type ResetPasswordRequestResponse = {
  __typename?: 'ResetPasswordRequestResponse';
  id: Scalars['Float'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  email: Scalars['String'];
  id: Scalars['Float'];
};

export type SignInPayload = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpPayload = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
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


export const ResetPasswordDocument = gql`
    mutation resetPassword($passwordInput: String!, $reset_password_secure_code: String!) {
  resetPassword(
    passwordInput: $passwordInput
    reset_password_secure_code: $reset_password_secure_code
  ) {
    email
    id
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      passwordInput: // value for 'passwordInput'
 *      reset_password_secure_code: // value for 'reset_password_secure_code'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordRequestDocument = gql`
    mutation resetPasswordRequest($email: String!) {
  resetPasswordRequest(email: $email) {
    id
  }
}
    `;
export type ResetPasswordRequestMutationFn = Apollo.MutationFunction<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordRequestMutation, { data, loading, error }] = useResetPasswordRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, options);
      }
export type ResetPasswordRequestMutationHookResult = ReturnType<typeof useResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationResult = Apollo.MutationResult<ResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationOptions = Apollo.BaseMutationOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInPayload!) {
  signIn(input: $input) {
    email
    token
    id
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpPayload!) {
  signUp(input: $input) {
    email
    token
    id
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
export const CheckProductPriceByUrlDocument = gql`
    query checkProductPriceByUrl($url: String!) {
  checkProductPriceByUrl(url: $url) {
    product_name
    product_link
    product_image_src
    original_price
  }
}
    `;

/**
 * __useCheckProductPriceByUrlQuery__
 *
 * To run a query within a React component, call `useCheckProductPriceByUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckProductPriceByUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckProductPriceByUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCheckProductPriceByUrlQuery(baseOptions: Apollo.QueryHookOptions<CheckProductPriceByUrlQuery, CheckProductPriceByUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckProductPriceByUrlQuery, CheckProductPriceByUrlQueryVariables>(CheckProductPriceByUrlDocument, options);
      }
export function useCheckProductPriceByUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckProductPriceByUrlQuery, CheckProductPriceByUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckProductPriceByUrlQuery, CheckProductPriceByUrlQueryVariables>(CheckProductPriceByUrlDocument, options);
        }
export type CheckProductPriceByUrlQueryHookResult = ReturnType<typeof useCheckProductPriceByUrlQuery>;
export type CheckProductPriceByUrlLazyQueryHookResult = ReturnType<typeof useCheckProductPriceByUrlLazyQuery>;
export type CheckProductPriceByUrlQueryResult = Apollo.QueryResult<CheckProductPriceByUrlQuery, CheckProductPriceByUrlQueryVariables>;
export const CheckSecureCodeDocument = gql`
    query checkSecureCode($reset_password_secure_code: String!) {
  checkSecureCode(reset_password_secure_code: $reset_password_secure_code) {
    isValidCode
    email
  }
}
    `;

/**
 * __useCheckSecureCodeQuery__
 *
 * To run a query within a React component, call `useCheckSecureCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSecureCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSecureCodeQuery({
 *   variables: {
 *      reset_password_secure_code: // value for 'reset_password_secure_code'
 *   },
 * });
 */
export function useCheckSecureCodeQuery(baseOptions: Apollo.QueryHookOptions<CheckSecureCodeQuery, CheckSecureCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSecureCodeQuery, CheckSecureCodeQueryVariables>(CheckSecureCodeDocument, options);
      }
export function useCheckSecureCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSecureCodeQuery, CheckSecureCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSecureCodeQuery, CheckSecureCodeQueryVariables>(CheckSecureCodeDocument, options);
        }
export type CheckSecureCodeQueryHookResult = ReturnType<typeof useCheckSecureCodeQuery>;
export type CheckSecureCodeLazyQueryHookResult = ReturnType<typeof useCheckSecureCodeLazyQuery>;
export type CheckSecureCodeQueryResult = Apollo.QueryResult<CheckSecureCodeQuery, CheckSecureCodeQueryVariables>;
export const GetProductByUserIdDocument = gql`
    query getProductByUserId($userId: Float!) {
  getProductByUserId(userId: $userId) {
    product_name
    product_link
    product_image_src
    original_price
    current_price
    desired_price
    price_update_time
    email_sent_time
    status
    user_id
  }
}
    `;

/**
 * __useGetProductByUserIdQuery__
 *
 * To run a query within a React component, call `useGetProductByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProductByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByUserIdQuery, GetProductByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByUserIdQuery, GetProductByUserIdQueryVariables>(GetProductByUserIdDocument, options);
      }
export function useGetProductByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByUserIdQuery, GetProductByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByUserIdQuery, GetProductByUserIdQueryVariables>(GetProductByUserIdDocument, options);
        }
export type GetProductByUserIdQueryHookResult = ReturnType<typeof useGetProductByUserIdQuery>;
export type GetProductByUserIdLazyQueryHookResult = ReturnType<typeof useGetProductByUserIdLazyQuery>;
export type GetProductByUserIdQueryResult = Apollo.QueryResult<GetProductByUserIdQuery, GetProductByUserIdQueryVariables>;
export const GetUserInfoDocument = gql`
    query getUserInfo($email: String!) {
  getUserInfo(email: $email) {
    id
    created_at
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export type ResetPasswordMutationVariables = Exact<{
  passwordInput: Scalars['String'];
  reset_password_secure_code: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordResponse', email: string, id: number } };

export type ResetPasswordRequestMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordRequestMutation = { __typename?: 'Mutation', resetPasswordRequest: { __typename?: 'ResetPasswordRequestResponse', id: number } };

export type SignInMutationVariables = Exact<{
  input: SignInPayload;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', email: string, token: string, id: number } };

export type SignUpMutationVariables = Exact<{
  input: SignUpPayload;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthResponse', email: string, token: string, id: number } };

export type CheckProductPriceByUrlQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type CheckProductPriceByUrlQuery = { __typename?: 'Query', checkProductPriceByUrl: { __typename?: 'CheckProductPriceResponse', product_name: string, product_link: string, product_image_src: string, original_price: number } };

export type CheckSecureCodeQueryVariables = Exact<{
  reset_password_secure_code: Scalars['String'];
}>;


export type CheckSecureCodeQuery = { __typename?: 'Query', checkSecureCode: { __typename?: 'CheckSecureCodeResponse', isValidCode: boolean, email: string } };

export type GetProductByUserIdQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetProductByUserIdQuery = { __typename?: 'Query', getProductByUserId: Array<{ __typename?: 'Product', product_name: string, product_link: string, product_image_src: string, original_price: number, current_price: number, desired_price: number, price_update_time: number, email_sent_time: number, status: ProductStatus, user_id: string }> };

export type GetUserInfoQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo: { __typename?: 'User_info', id: string, created_at: any } };
