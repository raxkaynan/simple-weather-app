import React from 'react';

import './App.less';
import { City, Weather, Forecast } from './types';
import Tabs from './components/Tabs';
import WeatherCard from './components/WeatherCard';
import { getWeather, getForecast } from './api';
import appConfig from './app-config.json';

type AppState = {
  selectedCity: City,
  weather: Weather | null,
  forecast: Forecast | null,
  loading: boolean,
};

const { cities }: { cities: City[] } = appConfig;

class App extends React.Component<{}, AppState> {
  state: AppState = {
    selectedCity: cities[0],
    weather: null,
    forecast: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchWeather();
  }

  handleTabChange(tabIdx: number) {
    this.setState({
      selectedCity: cities[tabIdx],
    }, this.fetchWeather);
  }

  async fetchWeather() {
    const { selectedCity } = this.state;
    this.setState({ loading: true });

    try {
      const [weather, forecast]: [Weather, Forecast] = await Promise.all([
        getWeather(selectedCity),
        getForecast(selectedCity),
      ]);

      this.setState({
        weather,
        forecast,
        loading: false,
      });
    } catch (error) {
      alert((error as Error).message);
    }
  }

  render() {
    const {
      selectedCity, weather, forecast, loading,
    } = this.state;

    return (
      <div className="App">
        <Tabs
          values={cities.map((city) => city.name)}
          selected={selectedCity.name}
          onChange={(tabIdx: number) => this.handleTabChange(tabIdx)}
        />
        <WeatherCard weather={weather} forecast={forecast} loading={loading} />
      </div>
    );
  }
}

export default App;
