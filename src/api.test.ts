import { getWeather } from './api';
import { City, Weather } from './types';

const mockWeatherData: Weather = {
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03n',
    },
  ],
  main: {
    temp: 7.91,
  },
  sys: {
    country: 'GB',
  },
  name: 'London',
};

const mockFetch = jest.spyOn(global, 'fetch');

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

describe('getWeather', () => {
  it('returns data when response is ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData),
    } as Response);

    const city: City = { name: 'London', country: 'GB' };
    const data: Weather = await getWeather(city);

    const url = `${weatherApiUrl}/weather?q=${city.name},${city.country}&units=metric&appid=${weatherApiKey}`;

    expect(fetch).toHaveBeenCalledWith(url);
    expect(data).toEqual(mockWeatherData);
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
