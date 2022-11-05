export type City = {
  name: string,
  country: string
};

export type Weather = {
  city: City,
  day: string,
  temp: number,
  description: string,
  icon: string,
};

export type Forecast = {
  city: City,
  list: Omit<Weather, 'city'>[],
};

export type OWMWeather = {
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string,
  }[],
  main: {
    temp: number,
  },
  dt: number,
  sys: {
    country: string,
  },
  name: string,
};

export type OWMForecast = {
  city: City,
  list: Omit<OWMWeather, 'sys' | 'name'>[],
};
