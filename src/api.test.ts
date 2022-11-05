import { getForecast, getWeather } from './api';
import {
  City, Forecast, OWMForecast, OWMWeather, Weather,
} from './types';

const mockResponseWeatherData: OWMWeather = {
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'clouds',
      icon: '03n',
    },
  ],
  main: {
    temp: 7.91,
  },
  dt: 1667532842,
  sys: {
    country: 'GB',
  },
  name: 'London',
};

const mockResponseForecastData: OWMForecast = {
  city: {
    name: 'London',
    country: 'GB',
  },
  list: Array(8).concat([{
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'rain',
        icon: '10n',
      },
    ],
    main: {
      temp: 8.29,
    },
    // Saturday
    dt: 1667617200,
  }]),
};

const mockFetch = jest.spyOn(global, 'fetch');

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

describe('getWeather', () => {
  it('returns data when response is ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseWeatherData),
    } as Response);

    const city: City = { name: 'London', country: 'GB' };
    const data: Weather = await getWeather(city);

    const url = `${weatherApiUrl}/weather?q=${city.name},${city.country}&units=metric&appid=${weatherApiKey}`;

    expect(fetch).toHaveBeenCalledWith(url);
    expect(data).toEqual({
      city,
      day: 'Today',
      description: 'Clouds',
      icon: 'clouds',
      temp: 8,
    });
  });

  it('throws error when response is not ok', async () => {
    const responseError = { message: 'Error message' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(responseError),
    } as Response);
    const city: City = { name: 'London', country: 'GB' };

    await expect(getWeather(city)).rejects.toThrow(new Error(responseError.message));
  });

  it('throws error when fetch fails', async () => {
    const error = new Error('Error message');
    mockFetch.mockRejectedValueOnce(error);
    const city: City = { name: 'London', country: 'GB' };

    await expect(getWeather(city)).rejects.toThrow(error);
  });
});

describe('getForecast', () => {
  it('returns data when response is ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseForecastData),
    } as Response);

    const city: City = { name: 'London', country: 'GB' };
    const data: Forecast = await getForecast(city);

    const url = `${weatherApiUrl}/forecast?q=${city.name},${city.country}&units=metric&appid=${weatherApiKey}`;

    expect(fetch).toHaveBeenCalledWith(url);
    expect(data).toEqual({
      city,
      list: [{
        day: 'Sat',
        description: 'Rain',
        icon: 'rain',
        temp: 8,
      }],
    });
  });

  it('throws error when response is not ok', async () => {
    const responseError = { message: 'Error message' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(responseError),
    } as Response);
    const city: City = { name: 'London', country: 'GB' };

    await expect(getWeather(city)).rejects.toThrow(new Error(responseError.message));
  });

  it('throws error when fetch fails', async () => {
    const error = new Error('Error message');
    mockFetch.mockRejectedValueOnce(error);
    const city: City = { name: 'London', country: 'GB' };

    await expect(getWeather(city)).rejects.toThrow(error);
  });
});
