# Overview

## **NPM Scripts**

- `npm run dev`: Start the project in `dev` mode.
- `npm run start`: Build and start the project with the built bundle.
- `npm run lint`: to lint 
- `npm run build`: Compile typescript to js & bundle up
- `npm run test`: run tests
- `npm run generate`: Generate code from GraphQL schema and operations

## **GraphQL**

`Graphql Code Generator` will generate query hooks in [generated.ts](./graphql/generated.ts) based on uri defined in [codegen.yml](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/codegen.yml#L2):

### Query:

**Check Product Price By URL**
- [Operation](../graphql/query/checkProductPriceByUrl.graphql): 
```
query checkProductPriceByUrl($url: String!) {
  checkProductPriceByUrl(url: $url) {
    product_name
    product_link
    product_image_src
    original_price
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/src/components/SearchForm.tsx#L16):
```
const [
    checkProductPriceByUrl,
    {
      data: checkPriceQueryData,
      loading: checkPriceQueryLoading,
      error: checkPriceQueryError,
    },
  ] = useCheckProductPriceByUrlLazyQuery();
```

**Check Secure Code**
- [Operation](../graphql/query/checkSecureCode.graphql): 
```
query checkSecureCode($reset_password_secure_code: String!) {
  checkSecureCode(reset_password_secure_code: $reset_password_secure_code) {
    isValidCode
    email
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/pages/resetpassword/%5Bsecurecode%5D/resetpage.tsx#L29):
```
const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useCheckSecureCodeQuery({
    variables: {
      reset_password_secure_code: securecode as string,
    },
  });
```

**Get Product By User ID**
- [Operation](../graphql/query/getProductByUserId.graphql): 
```
query getProductByUserId($userId: String!, $status: String!) {
  getProductByUserId(userId: $userId, status: $status) {
    id
    product_name
    product_link
    product_image_src
    original_price
    current_price
    desired_price
    status
    user_id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/src/components/FilterSection.tsx#L14):
```
const [getProductByUserId, { data, loading, error }] =
    useGetProductByUserIdLazyQuery({
      fetchPolicy: 'network-only', // Used for first execution
      nextFetchPolicy: 'network-only',
    });
```

**Get User Info**
- [Operation](../graphql/query/getUserInfo.graphql): 
```
query getUserInfo($email: String!) {
  getUserInfo(email: $email) {
    id
    created_at
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/graphql/generated.ts#L764)


### Mutation:

**Add Product**
- [Operation](../graphql/mutation/addProduct.graphql): 
```
mutation addProduct($input: AddProductPayload!) {
  addProduct(input: $input) {
    id
    product_name
  }
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/src/components/SearchResult.tsx#L20):
```
const [addProductMutation, { data, loading, error }] =
    useAddProductMutation();
```

**Delete Product**
- [Operation](../graphql/mutation/deleteProduct.graphql): 
```
mutation deleteProduct($user_id: String!, $id: String!) {
  deleteProduct(user_id: $user_id, id: $id) {
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/src/components/ProductInfo.tsx#L40):
```
const [
    deleteProductMutation,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useDeleteProductMutation();
```

**Reset Password**
- [Operation](../graphql/mutation/resetPassword.graphql): 
```
mutation resetPassword(
  $passwordInput: String!
  $reset_password_secure_code: String!
) {
  resetPassword(
    passwordInput: $passwordInput
    reset_password_secure_code: $reset_password_secure_code
  ) {
    email
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/pages/resetpassword/%5Bsecurecode%5D/resetpage.tsx#L39):
```
const [
    resetPasswordMutation,
    { data: resetData, loading: resetLoading, error: resetError },
  ] = useResetPasswordMutation();
```

**Reset Password Request**
- [Operation](../graphql/mutation/resetPasswordRequest.graphql): 
```
mutation resetPasswordRequest($email: String!) {
  resetPasswordRequest(email: $email) {
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/pages/resetpasswordrequest.tsx#L18):
```
const [resetPasswordRequestMutation, { data, loading, error }] =
    useResetPasswordRequestMutation();
```

**Sign In**
- [Operation](../graphql/mutation/signIn.graphql): 
```
mutation signIn($input: SignInPayload!) {
  signIn(input: $input) {
    email
    token
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/pages/signin.tsx#L22):
```
 const [signInMutation, { data, loading, error }] = useSignInMutation();
```

**Sign Up**
- [Operation](../graphql/mutation/signUp.graphql): 
```
mutation signUp($input: SignUpPayload!) {
  signUp(input: $input) {
    email
    token
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/pages/signup.tsx#L26):
```
  const [signUpMutation, { data, loading, error }] = useSignUpMutation();
```

**Update Desired Price**
- [Operation](../graphql/mutation/updateDesiredPrice.graphql): 
```
mutation updateDesiredPrice(
  $desired_price: Float!
  $user_id: String!
  $id: String!
) {
  updateDesiredPrice(
    desired_price: $desired_price
    user_id: $user_id
    id: $id
  ) {
    id
  }
}
```

- [Generated Hook](https://github.com/Jocelyn59435/Trackky_frontend/blob/75c7e69c1e94e6c48c4ac435198a83adf16a2448/src/components/ProductInfo.tsx#L35):
```
const [
    updateDesiredPriceMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateDesiredPriceMutation();
```

## **State Management**
State Management is involved in user's landing page, here is the structure of components:
 ![landingPageStructure](/diagrams/LandingPageStructure.png)
 Accordingly, `Search Result` and `Filter List` are peer components, `Product Info` is the child component of `Filter list`.\
 The goal is `Filter List` will be re-rendered when:
 - The `Add to Track List` in `Search Result` is clicked.
 - The `Update` in `Pruduct Info` is clicked.

Generally props are passed down from parent component to child one, in order to achieve this outcome, [`Reactive Variables`](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables) in Apollo Client is intruduced:\
[Initialize a reactive variable with a boolean value:](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/lib/toggleProductStatus.tsx#L3)
```
import { makeVar } from '@apollo/client';

export const toggleProductStatus = makeVar<boolean>(false);
```
[Define the field policy:](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/lib/cacheForLocalState.tsx#L4)
```
import { InMemoryCache } from '@apollo/client';
import { toggleProductStatus } from './toggleProductStatus';

export const cacheForLocalState: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        local: {
          read() {
            return toggleProductStatus();
          },
        },
      },
    },
  },
});
```
Use `useReactiveVar` hook to toggle product status:\
in [SearchResult Component](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/src/components/SearchResult.tsx#L22):
```
const state = useReactiveVar(toggleProductStatus);
```
in [Product Info Component](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/src/components/ProductInfo.tsx#L33):
```
const state = useReactiveVar(toggleProductStatus);
```
in [Filter List Component](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/src/components/FilterSection.tsx#L20):
```
const state = useReactiveVar(toggleProductStatus);
```

## **Authorization**
Authorization is accomplished via `JWT token` and `Nookie`:\
[useAuth.tsx](/lib/useAuth.tsx) has token validation, and returns token, setToken() and destroyToken() funtions which can be utilized in other components or pages.\
Moreover, `protected routes` also relies on `useAuth()`, for example, [user landing page](https://github.com/Jocelyn59435/Trackky_frontend/blob/f7d2b01212af6a30b71b614fd776a9e2562fa9c6/pages/users/%5Buserid%5D/landingpage.tsx#L12):

```
  const router = useRouter();
  const { userid } = router.query;
  const { token, setToken } = useAuth();

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
```
`useRouter()` gets the `userId` from the route, if it matches the `userId` in `JWT token payload`, and the token is not expired, then render page contents.  

## **Tests**
There are 6 [snapshot tests](./__tests__) for each page.

## **Pipeline Process**
[CI](../.github/workflows/CI.yml):
- Install all dependencies--`npm ci`
- Generate TypeScript typings from Graphql schema--`npm run generate`
- Check code--`npm run lint`
- Run tests--`npm run test`
- Build the app--`npm run build`


[CD](../.github/workflows/CD.yml):
- Install all dependencies--`npm ci`
- Generate TypeScript typings from Graphql schema--`npm run generate`
- Check code--`npm run lint`
- Run tests--`npm run test`
- Build the app--`npm run build`
- Deloy to Vercel--`uses: amondnet/vercel-action@v20`