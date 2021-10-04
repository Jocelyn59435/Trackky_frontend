import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import LandingPage from '../../pages/users/[userid]/landingpage';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
it('renders landing page correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <LandingPage />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
