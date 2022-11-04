import { Weather } from '../types';
import WeatherItem from './WeatherItem';

function getShortDayFromDate(timestamp: number) {
  const msTs = timestamp * 1000;
  return new Date(msTs).toDateString().slice(0, 3);
}

export type WeatherCardProps = {
  weather: Weather,
};

function WeatherCard({ weather }: WeatherCardProps) {
  const today = {
    day: 'Today' as const,
    temp: Math.round(weather.main.temp),
    description: weather.weather[0].main,
    icon: weather.weather[0].icon,
  };

  return (
    <div className="WeatherCard">
      <div>
        <WeatherItem
          {...today}
          showDescription
        />
      </div>
    </div>
  );
}

export default WeatherCard;
