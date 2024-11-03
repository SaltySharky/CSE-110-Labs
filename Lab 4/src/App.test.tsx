import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/dummy element/i); // this doesn't exist. test should fail.
  expect(linkElement).toBeInTheDocument();
});
