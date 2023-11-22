import { PiSunBold } from "react-icons/pi";
import { getNowWeatherData } from "./api";

export default function TodayWeather() {
  const today = new Date();
  const date = () => {
    if (today.getHours() === 0) {
      return `${today.getFullYear()}${today.getMonth() + 1}${
        today.getDate() - 1
      }`;
    } else {
      return `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    }
  };
  const fcstTime = () => {
    if (today.getHours() === 0) return "2400";
    if (today.getHours().length === 1) return `0${today.getHours()}00`;
    return `${today.getHours()}00`;
  };

  const nowTime = today.getHours();
  const time = () => {
    switch (nowTime) {
      case 2:
      case 3:
      case 4:
        return "0200";
      case 5:
      case 6:
      case 7:
        return "0500";
      case 8:
      case 9:
      case 10:
        return "0800";
      case 11:
      case 12:
      case 13:
        return "1100";
      case 14:
      case 15:
      case 16:
        return "1400";
      case 17:
      case 18:
      case 19:
        return "1700";
      case 20:
      case 21:
      case 22:
        return "2000";
      case 23:
      case 0:
      case 1:
        return "2300";
    }
  };

  const data = getNowWeatherData(date(), time(), "61", "126").then((result) => {
    const dataSet = result.filter((x) => x.fcstTime === fcstTime());
    return dataSet;
  });
  console.log(data);
  return (
    <div className="flex m-4 justify-center">
      <div className="flex justify-center items-center mr-4 p-2">
        <PiSunBold size="8rem" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl mb-2 ">맑음</span>
        <span className="text-xl mb-2 ">현재 기온 10°</span>
        <span className="text-xl mb-2 ">강수 확률</span>
        <span className="text-xl ">습도</span>
      </div>
    </div>
  );
}
