import { useEffect, useState } from "react";
import { getWeatherInfo, timeTransform } from "../../api/weather";
import { day } from "./day";
import { useRecoilState } from "recoil";
import { weatherDataState } from "../../recoil/atom";

export default function TodayWeather() {
  const [base_date, base_time] = timeTransform();
  const [data, setData] = useRecoilState(weatherDataState);
  const [highLow, setHighLow] = useState([]);
  const sky = ["맑음", "구름 적음", "구름 많음", "흐림"];
  const skyImgSrc = [
    "public/img/sunny.png",
    "public/img/cloudOne.png",
    "public/img/cloudTwo.png",
    "public/img/cloudy.png",
    "public/img/rain.png",
    "public/img/rainSnow.png",
    "public/img/snow.png",
    "public/img/shower.png",
  ];
  const today = new Date();
  const date = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${day()}요일 ${today.getHours()}:00`;
  const fcstTime = () => {
    if (today.getHours() === 0) return "0000";
    if (today.getHours().length === 1) return `0${today.getHours()}00`;
    return `${today.getHours()}00`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let weatherData = {};
        const nowResponse = await getWeatherInfo(
          base_date,
          base_time,
          "61",
          "125"
        );
        const dataSet = nowResponse.filter((x) => x.fcstTime === fcstTime());
        dataSet.forEach(
          (value) => (weatherData[value.category] = value.fcstValue)
        );
        setData(weatherData);
        const highLowRes = await getWeatherInfo(
          `${Number(base_date) - 1}`,
          "2300",
          "61",
          "125"
        );
        const highLowData = highLowRes.filter((x) => {
          return (
            (x.fcstTime !== "2300" && x.category === "TMN") ||
            (x.fcstTime !== "2300" && x.category === "TMX")
          );
        });
        let highLowObj = {};
        highLowData.forEach(
          (value) => (highLowObj[value.category] = value.fcstValue)
        );
        setHighLow(highLowObj);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(skyImgSrc[Number(data?.PTY) + 3]);
  return (
    <div className="flex flex-col m-4 justify-center">
      <div className="flex text-xl justify-center items-center">
        <span className="mr-2">{date}</span>
        {sky[Number(data?.SKY) - 1]}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center p-2">
          {data?.PTY === "0" ? (
            <img src={skyImgSrc[Number(data?.SKY) - 1]} className="w-[5rem]" />
          ) : (
            <img src={skyImgSrc[Number(data?.PTY) + 3]} className="w-[5rem]" />
          )}

          {Number(data?.TMP) > 0 ? (
            <span className="text-[4rem] ml-3 font-bold text-red-500">
              {data?.TMP}°
            </span>
          ) : (
            <span className="text-[4rem] ml-3 font-bold text-blue-500">
              {data?.TMP}°
            </span>
          )}
          <div className="flex text-sm flex-col justify-center ml-2 items-center">
            <div>
              <span className=" mt-1 ml-2">최고기온 : </span>
              <span className="ml-1">{highLow?.TMX}°</span>
            </div>
            <div>
              <span className=" mt-1 ml-2">최저기온 : </span>
              <span className="ml-1">{highLow?.TMN}°</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-sm justify-center items-center">
        <span className="mr-2">강수 확률 : {data?.POP}%</span>
        <span className="mr-2">습도 : {data?.REH}%</span>
        <span className=" ">풍속 : {data?.WSD} m/s</span>
      </div>
    </div>
  );
}