import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Weather, Forecast } from '../types';
import WeatherItem from './WeatherItem';
import './WeatherCard.less';

export type WeatherCardProps = {
  weather: Weather | null,
  forecast: Forecast | null,
  loading?: boolean,
};

function WeatherCard({ weather, forecast, loading = false }: WeatherCardProps) {
  return (
    <div className="WeatherCard">
      {loading || !weather || !forecast ? (
        <FontAwesomeIcon icon={faSpinner} color="#5FB0E8" size="xl" spin />
      ) : (
        <>
          <div className="primary">
            <WeatherItem
              day="Today"
              temp={weather.temp}
              description={weather.description}
              icon={weather.icon}
              showDescription
            />
          </div>
          {forecast.list.map((fcWeather) => (
            <div className="secondary" key={fcWeather.day}>
              <WeatherItem
                {...fcWeather}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default WeatherCard;
