export type City = {
  name: string,
  country: string
};

export type Weather = {
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
