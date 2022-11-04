import { City, Weather } from './types';

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeather(city: City): Promise<Weather> {
  const url = `${weatherApiUrl}/weather?q=${city.name},${city.country}&units=metric&appid=${weatherApiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new Error(data.message);
}
