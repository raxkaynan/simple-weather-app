import { render, screen } from '@testing-library/react';

import WeatherItem from './WeatherItem';

it('renders day, temperature, icon, and weather description', () => {
  const props = {
    day: 'Today', temp: 19, description: 'Clear', icon: 'clear-d', showDescription: true,
  };

  render(<WeatherItem {...props} />);

  expect(screen.getByText(props.day)).toBeInTheDocument();
  expect(screen.getByText(props.temp)).toBeInTheDocument();
  expect(screen.getByText(props.description)).toBeInTheDocument();
  expect(screen.getByTitle(props.description).children[0]).toHaveAttribute('data-icon', 'sun');
});

it('renders day, temperature, and icon without description', () => {
  const props = {
    day: 'Tue', temp: 19, description: 'Clear', icon: 'clear',
  };

  render(<WeatherItem {...props} />);

  expect(screen.getByText(props.day)).toBeInTheDocument();
  expect(screen.getByText(props.temp)).toBeInTheDocument();
  expect(screen.queryByText(props.description)).not.toBeInTheDocument();
  expect(screen.getByTitle(props.description).children[0]).toHaveAttribute('data-icon', 'cloud');
});
