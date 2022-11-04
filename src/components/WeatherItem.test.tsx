import { render, screen } from '@testing-library/react';

import WeatherItem from './WeatherItem';

it('renders day, temperature, and weather description', () => {
  const props = {
    day: 'Today' as const, temp: 19, description: 'Clouds', icon: '04n', showDescription: true,
  };

  render(<WeatherItem {...props} />);

  expect(screen.getByText(props.day)).toBeInTheDocument();
  expect(screen.getByText(props.temp)).toBeInTheDocument();
  expect(screen.getByText(props.description)).toBeInTheDocument();
});

it('renders day and temperature without description', () => {
  const props = {
    day: 'Today' as const, temp: 19, description: 'Clouds', icon: '04n',
  };

  render(<WeatherItem {...props} />);

  expect(screen.getByText(props.day)).toBeInTheDocument();
  expect(screen.getByText(props.temp)).toBeInTheDocument();
  expect(screen.queryByText(props.description)).not.toBeInTheDocument();
});
