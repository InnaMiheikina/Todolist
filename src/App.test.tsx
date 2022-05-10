import React from 'react';
import { render } from '@testing-library/react';
import AppRedux from "./AppRedux";


test('renders learn react link', () => {
  const { getByText } = render(<AppRedux/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
