import { render, screen } from '@testing-library/react';

import { Forecast, Weather } from '../types';
import WeatherCard from './WeatherCard';
import { WeatherItemProps } from './WeatherItem';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: function MockFontAwesomeIcon() {
    return <div>spinner</div>;
  },
}));

jest.mock(
  './WeatherItem',
  () => function MockWeatherItem(props: WeatherItemProps) {
    return <div>{JSON.stringify(props)}</div>;
  },
);

const weather: Weather = {
  city: {
    name: 'London',
    country: 'GB',
  },
  day: 'Today',
  description: 'Clouds',
  icon: '03n',
  temp: 11,
};

const forecast: Forecast = {
  city: {
    name: 'London',
    country: 'GB',
  },
  list: [{
    day: 'Sat',
    description: 'Clouds',
    icon: '03n',
    temp: 11,
  }, {
    day: 'Sun',
    description: 'Clouds',
    icon: '03n',
    temp: 13,
  }, {
    day: 'Mon',
    description: 'Rain',
    icon: '10n',
    temp: 12,
  }, {
    day: 'Tue',
    description: 'Rain',
    icon: '10n',
    temp: 11,
  }],
};

it('renders Today weather details', () => {
  render(<WeatherCard weather={weather} forecast={forecast} />);
  const todayDetails = screen.getByText(/today/i);

  expect(todayDetails).toHaveTextContent(`${weather.temp}`);
  expect(todayDetails).toHaveTextContent(weather.description);
});

it('renders weather forecast details', () => {
  render(<WeatherCard weather={weather} forecast={forecast} />);

  forecast.list.forEach(({ day, temp }) => {
    expect(screen.getByText(new RegExp(day, 'i'))).toHaveTextContent(`${temp}`);
  });
});

it('renders loading spinner when loading data', () => {
  render(<WeatherCard weather={weather} forecast={forecast} loading />);

  expect(screen.getByText(/spinner/i)).toBeInTheDocument();
});
