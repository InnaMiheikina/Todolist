import React from 'react';
import { render } from '@testing-library/react';
import AppRedux from "./App";


test('renders learn react link', () => {
  const { getByText } = render(<AppRedux/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
