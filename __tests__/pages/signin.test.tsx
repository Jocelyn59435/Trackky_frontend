import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from '../../pages/signin';
import { MockedProvider } from '@apollo/client/testing';

it('renders sign in page correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <SignIn />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
