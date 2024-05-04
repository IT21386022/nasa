// SignUp.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignUp from './Signup';

test('renders sign up form', async () => {
  render(<SignUp />);

  // Fill out form fields
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

  // Submit form
  fireEvent.click(screen.getByText('Sign Up'));

  // Wait for success message
  await waitFor(() => {
    expect(screen.getByText('Successfully signed up!')).toBeInTheDocument();
  });
});
