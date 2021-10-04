import React from 'react';
import renderer from 'react-test-renderer';
import ResetPasswordRequest from '../../pages/resetpasswordrequest';
import { MockedProvider } from '@apollo/client/testing';

it('renders reset password request page correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <ResetPasswordRequest />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
