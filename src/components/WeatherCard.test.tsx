import { render, screen, within } from '@testing-library/react';

import { Weather } from '../types';
import WeatherCard from './WeatherCard';
import { WeatherItemProps } from './WeatherItem';

jest.mock(
  './WeatherItem',
  () => function MockWeatherItem(props: WeatherItemProps) {
    return <div>{JSON.stringify(props)}</div>;
  },
);

it('renders Today weather details', () => {
  const weather: Weather = {
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03n',
      },
    ],
    main: {
      temp: 12.91,
    },
    dt: 1667532842,
    sys: {
      country: 'GB',
    },
    name: 'London',
  };

  render(<WeatherCard weather={weather} />);
  const todayDetails = screen.getByText(/today/i);

  expect(todayDetails).toHaveTextContent(`${Math.round(weather.main.temp)}`);
  expect(todayDetails).toHaveTextContent(weather.weather[0].main);
});
