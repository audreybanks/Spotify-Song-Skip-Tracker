import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const signOut = () => {
  console.log("sign out test");
}

test('renders learn react link', () => {
  render(<App signOut={signOut}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
