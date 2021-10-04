import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import ResetPage from '../../pages/resetpassword/[securecode]/resetpage';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
it('renders reset page correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <ResetPage />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
