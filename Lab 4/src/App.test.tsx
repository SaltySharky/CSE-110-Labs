import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Budget Plan link', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Budget Plan/i);
  expect(linkElement).toBeInTheDocument();
});
