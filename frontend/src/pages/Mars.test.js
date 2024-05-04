import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MarsRoverPhotosPage from './Mars';

jest.mock('./api', () => ({
    fetchRoverPhotos: jest.fn(() => Promise.resolve([
        {
            id: 102693,
            img_src: 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG',
            sol: 1000,
            earth_date: "2015-05-30",
            camera: { full_name: 'Front Hazard Avoidance Camera' },
            rover: { name: 'Curiosity', landing_date: '2012-08-06', launch_date: '2011-11-26', status: 'active' }
          },
    ]))
}));
  
describe('MarsRoverPhotosPage', () => {
    it('renders Mars Rover Photos page', async () => {
      render(<MarsRoverPhotosPage />);
      // Wait for photos to load (assuming the component fetches photos on mount)
      await screen.findByRole('img');
      expect(screen.getAllByRole('img')).toHaveLength(1); // Assuming one photo is rendered
    });
  
    it('filters photos by camera', () => {
      render(<MarsRoverPhotosPage />);
      const selectCamera = screen.getByRole('combobox', { name: /filter by camera/i });
      fireEvent.change(selectCamera, { target: { value: 'Front Hazard Avoidance Camera' } });
      expect(screen.getAllByRole('img')).toHaveLength(1); // Assuming only one photo matches the filter
    });
  
    it('filters photos by Earth date', () => {
      render(<MarsRoverPhotosPage />);
      const selectDate = screen.getByRole('combobox', { name: /filter by earth date/i });
      fireEvent.change(selectDate, { target: { value: '2015-05-30' } });
      expect(screen.getAllByRole('img')).toHaveLength(1); // Assuming only one photo matches the filter
    });
  });
