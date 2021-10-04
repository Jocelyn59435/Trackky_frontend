import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from '../../pages/signup';
import { MockedProvider } from '@apollo/client/testing';

it('renders sign up page correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
