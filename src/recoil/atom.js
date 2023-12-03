import { atom } from "recoil";

export const locationOpenState = atom({
  key: "LocationOpen",
  default: false,
});
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

export const OneDaysState = atom({
  key: "OneDayData",
  default: {},
});

export const nxnyState = atom({
  key: "Nxny",
  default: ["61", "126"],
});
