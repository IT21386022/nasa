import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockedPhotoData = [
  {
    date: '2023-05-01',
    explanation: 'Explanation 1',
    title: 'Photo Title 1',
    url: 'https://example.com/photo1.jpg'
  },
  {
    date: '2023-05-02',
    explanation: 'Explanation 2',
    title: 'Photo Title 2',
    url: 'https://example.com/photo2.jpg'
  },
];

describe('App', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockedPhotoData });
  });

  it('renders photo of the day', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('NASA Astronomy Picture of the Day')).toBeInTheDocument());
    expect(screen.getAllByRole('img')).toHaveLength(mockedPhotoData.length);
  });

  it('renders photo details when clicked on', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('NASA Astronomy Picture of the Day')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Open Explanation'));

    expect(screen.getByText('Explanation 1')).toBeInTheDocument();
    expect(screen.getByText('Close Explanation')).toBeInTheDocument();
  });

  it('searches for photo on specific date', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('NASA Astronomy Picture of the Day')).toBeInTheDocument());

    const searchDateInput = screen.getByRole('textbox', { name: 'search-date-input' });
    fireEvent.change(searchDateInput, { target: { value: '2023-05-01' } });

    const searchButton = screen.getByRole('button', { name: 'search-button' });
    fireEvent.click(searchButton);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/apod?api_key=ztAA72aycIHWLS1WjtdWhSIZzB7M5MvVnSCTEIu4&date=2023-05-01`
    );
  });
});
