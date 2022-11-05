import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FAIconMap } from '../helpers';
import './WeatherItem.less';

export type WeatherItemProps = {
  day: string,
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
  const renderedIcon = (
    <div className="icon" title={description}>
      <FontAwesomeIcon icon={FAIconMap[icon]} color="#61AEBC" size="2x" fixedWidth />
    </div>
  );

  return (
    <div className="WeatherItem">
      <div className="day">{day}</div>
      {showDescription ? (
        <div className="details">
          {renderedIcon}
          <div>
            <div className="temp">{temp}</div>
            <div>{description}</div>
          </div>
        </div>
      ) : (
        <>
          {renderedIcon}
          <div>
            <div className="temp">{temp}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherItem;
