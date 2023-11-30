import axios from "axios";

const weatherAPI = axios.create({
  baseURL: `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`,
});

export const timeTransform = () => {
  const current = new Date(Date.now() - 1000 * 60 * 60);
  const hour = current.getHours();
  let date = `${current.getFullYear()}${
    current.getMonth() + 1
  }${current.getDate()}`;
  if (hour === 0 || hour === 1) {
    date = `${current.getFullYear()}${current.getMonth() + 1}${
      current.getDate() - 1
    }`;
  }
  const time = () => {
    switch (true) {
      case hour < 2:
        return "2300";
      case hour < 5:
        return "0200";
      case hour < 8:
        return "0500";
      case hour < 11:
        return "0800";
      case hour < 14:
        return "1100";
      case hour < 17:
        return "1400";
      case hour < 20:
        return "1700";
      case hour < 23:
        return "2000";
      case hour === 23:
        return "2300";
    }
  };
  return [date, time()];
};

export const getWeatherInfo = async (base_date, base_time, nx, ny) => {
  const response = await weatherAPI({
    params: {
      serviceKey: import.meta.env.VITE_API_KEY,
      numOfRows: "288",
      pageNo: "1",
      base_date: base_date,
      base_time: base_time,
      nx: nx,
      ny: ny,
      dataType: "JSON",
    },
  });

  return response.data?.response?.body?.items?.item;
};

export const getThreeDaysInfo = async (base_date, base_time, nx, ny) => {
  const response = await weatherAPI({
    params: {
      serviceKey: import.meta.env.VITE_API_KEY,
      numOfRows: "1000",
      pageNo: "1",
      base_date: base_date,
      base_time: base_time,
      nx: nx,
      ny: ny,
      dataType: "JSON",
    },
  });

  return response.data?.response?.body?.items?.item;
};
