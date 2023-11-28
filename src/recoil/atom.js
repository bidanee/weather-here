import { atom } from "recoil";

export const firstNameState = atom({
  key: "First",
  default: "서울특별시",
});

export const secondNameState = atom({
  key: "Second",
  default: "강남구",
});

export const weatherDataState = atom({
  key: "WeatherData",
  default: {},
});
