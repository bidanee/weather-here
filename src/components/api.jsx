import axios from "axios";

const weatherAPI = axios.create({
  baseURL: `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
});

export const getWeatherData = async (date, time) => {
  try {
    const res = await weatherAPI({
      params: {
        serviceKey: import.meta.env.VITE_API_KEY,
        pageNo: 1,
        numOfRows: 35,
        base_date: date,
        base_time: time,
        nx: "102",
        ny: "84",
        dataType: "JSON",
      },
    });
    return res.data;
  } catch (error) {
    console.error(`weatherData Error: Time(${new Date()}) ERROR ${error}`);
  }
};
