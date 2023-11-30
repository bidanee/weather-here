import { useEffect } from "react";
import { getThreeDaysInfo, timeTransform } from "../../api/weather";
import { useRecoilState } from "recoil";
import { OneDaysState } from "../../recoil/atom";
import TmpChart from "./chart";

// import TmpChart from "./chart";

export default function OneDays() {
  const [oneDays, setOneDays] = useRecoilState(OneDaysState);
  const [base_date, base_time] = timeTransform();
  const currentHours = new Date();
  const currentHour = () => {
    if (currentHours.getHours() === 0) return "0000";
    if (currentHours.getHours().length === 1)
      return `0${currentHours.getHours()}00`;
    return `${currentHours.getHours()}00`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowResponse = await getThreeDaysInfo(
          base_date,
          base_time,
          "61",
          "125"
        );
        const dataSet = nowResponse.filter((x) => currentHour() < x.fcstTime);
        const tmpDataSet = dataSet
          .filter((x) => x.category === "TMP")
          .slice(0, 12);
        const oneDayData = {};
        oneDayData["tmp"] = tmpDataSet.map((x) => x.fcstValue);

        const popDataSet = dataSet
          .filter((x) => x.category === "POP")
          .slice(0, 12);

        oneDayData["pop"] = popDataSet.map((x) => x.fcstValue);

        const rehDataSet = dataSet
          .filter((x) => x.category === "REH")
          .slice(0, 12);

        oneDayData["reh"] = rehDataSet.map((x) => x.fcstValue);
        setOneDays(oneDayData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-2">
        <button className=" focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 ">
          기온
        </button>
        <button className=" focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 ">
          강수
        </button>
        <button className=" focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 ">
          바람
        </button>
        <button className=" focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 ">
          습도
        </button>
      </div>
      <TmpChart />
    </div>
  );
}
