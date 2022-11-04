import { Weather } from '../types';
import './WeatherItem.less';

export type WeatherItemProps = {
  day: 'Today' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun',
  temp: number,
  description: string,
  icon: string,
  showDescription?: boolean,
};

function WeatherItem({
  day,
  temp,
  description,
  icon,
  showDescription = false,
}: WeatherItemProps) {
  return (
    <div className="WeatherItem">
      <div className="WeatherItem__day">{day}</div>
      <div className="WeatherItem__temp">{temp}</div>
      {showDescription && <div>{description}</div>}
    </div>
  );
}

export default WeatherItem;
