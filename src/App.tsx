import React from 'react';

import './App.less';
import { City, Weather } from './types';
import WeatherCard from './components/WeatherCard';
import { getWeather } from './api';

type AppState = {
  selectedCity: City,
  weather: {} | null,
  loading: boolean,
};

const cities = [
  { name: 'manila', country: 'PH' },
  { name: 'london', country: 'GB' },
  { name: 'ottawa', country: 'CA' },
];

class App extends React.Component<{}, AppState> {
  state: AppState = {
    selectedCity: cities[0],
    weather: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps: {}, prevState: AppState) {
    const { selectedCity } = this.state;

    if (prevState.selectedCity.name !== selectedCity.name) {
      this.fetchWeather();
    }
  }

  handleTabClick(city: City) {
    this.setState({
      selectedCity: city,
    });
  }

  async fetchWeather() {
    const { selectedCity } = this.state;
    this.setState({ loading: true });

    try {
      const weather: Weather = await getWeather(selectedCity);
      this.setState({
        weather,
        loading: false,
      });
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  render() {
    const { selectedCity, weather, loading } = this.state;

    return (
      <div className="App">
        <div className="tabs">
          {cities.map((city) => (
            <button
              className={selectedCity?.name === city.name ? 'selected' : ''}
              key={city.name}
              type="button"
              role="tab"
              onClick={() => this.handleTabClick(city)}
            >
              {city.name}
            </button>
          ))}
        </div>
        {loading ? 'Loading...' : (weather && <WeatherCard weather={weather} />)}
      </div>
    );
  }
}

export default App;
