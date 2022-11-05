import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { WeatherCardProps } from './components/WeatherCard';
import { City } from './types';

jest.mock(
  './components/WeatherCard',
  () => function MockWeatherCard({ weather, forecast }: WeatherCardProps) {
    return weather && forecast
      && <div>{weather.city.name}-weather {forecast.city.name}-forecast</div>;
  },
);

jest.mock('./api', () => ({
  getWeather: (city: City) => Promise.resolve({ city }),
  getForecast: (city: City) => Promise.resolve({ city }),
}));

let container: HTMLElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container && document.body.removeChild(container);
  container = null;
});

it('renders city tabs', () => {
  render(<App />);
  const tabs = screen.getAllByRole('tab');

  expect(tabs[0]).toHaveTextContent(/london/i);
  expect(tabs[1]).toHaveTextContent(/manila/i);
  expect(tabs[2]).toHaveTextContent(/ottawa/i);
});

it('renders weather details of default city on mount', async () => {
  render(<App />);

  expect(await screen.findByText(/london-weather/i)).toBeInTheDocument();
  expect(await screen.findByText(/london-forecast/i)).toBeInTheDocument();
});

it('renders weather details of selected city when switching to another tab', async () => {
  render(<App />);
  userEvent.click(screen.getByRole('tab', { name: /manila/i }));

  expect(await screen.findByText(/manila-weather/i)).toBeInTheDocument();
  expect(await screen.findByText(/manila-forecast/i)).toBeInTheDocument();
});
