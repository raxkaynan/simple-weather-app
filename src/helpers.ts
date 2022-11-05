import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
  faSmog,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

import {
  Forecast, OWMForecast, OWMWeather, Weather,
} from './types';

const FAIconMap: Record<string, IconDefinition> = {
  'clear-d': faSun,
  'clear-n': faMoon,
  clear: faCloud,
  clouds: faCloud,
  drizzle: faCloudRain,
  rain: faCloudShowersHeavy,
  thunderstorm: faCloudBolt,
  snow: faSnowflake,
  mist: faSmog,
};

const OWMIconMap: Record<string, string> = {
  '01': 'clear',
  '02': 'clouds',
  '03': 'clouds',
  '04': 'clouds',
  '09': 'drizzle',
  10: 'rain',
  11: 'thunderstorm',
  13: 'snow',
  50: 'mist',
};

function convertOWMIconToIcon(owmIcon: string, today: boolean = false): string {
  const code = owmIcon.slice(0, 2);
  const icon = OWMIconMap[code];
  const todayClear = today && icon === 'clear';

  return todayClear ? `${icon}-${owmIcon[2]}` : icon;
}

function getShortDayFromDt(timestamp: number) {
  const msTs = timestamp * 1000;
  return new Date(msTs).toDateString().slice(0, 3);
}

function convertOWMWeatherToWeather(owmWeather: OWMWeather): Weather {
  const {
    weather, main: { temp }, sys: { country }, name,
  } = owmWeather;

  return {
    city: { name, country },
    day: 'Today',
    description: weather[0].main,
    icon: convertOWMIconToIcon(weather[0].icon, true),
    temp: Math.round(temp),
  };
}

function convertOWMForecastToForecast(owmForecast: OWMForecast): Forecast {
  const { city, list } = owmForecast;

  return {
    city,
    list: list.slice(8).filter((_, idx) => idx % 8 === 0)
      .map(({ weather, main: { temp }, dt }) => ({
        day: getShortDayFromDt(dt),
        description: weather[0].main,
        icon: convertOWMIconToIcon(weather[0].icon),
        temp: Math.round(temp),
      })),
  };
}

export function getFAIcon(icon: string) {
  return FAIconMap[icon];
}

export {
  convertOWMWeatherToWeather,
  convertOWMForecastToForecast,
  FAIconMap,
};
