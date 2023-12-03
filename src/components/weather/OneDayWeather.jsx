import { useEffect, useState } from "react";
import { getThreeDaysInfo, timeTransform } from "../../api/weather";
import { useRecoilState } from "recoil";
import { OneDaysState, nxnyState } from "../../recoil/atom";
import { TmpChart, PopChart, RehChart } from "./chart";

export default function OneDays() {
  const [loading, setLoading] = useState(true);
  const [, setOneDays] = useRecoilState(OneDaysState);
  const [nxny] = useRecoilState(nxnyState);
  const [category, setCategory] = useState("tmp");
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
          nxny[0],
          nxny[1]
        );
        const dataSet = nowResponse?.filter(
          (x) => currentHour() < x.fcstTime || x.fcstDate > base_date
        );
        const tmpDataSet = dataSet
          ?.filter((x) => x.category === "TMP")
          .slice(0, 12);
        const oneDayData = {};
        oneDayData["tmp"] = tmpDataSet?.map((x) => x.fcstValue);

        const popDataSet = dataSet
          ?.filter((x) => x.category === "POP")
          .slice(0, 12);

        oneDayData["pop"] = popDataSet?.map((x) => x.fcstValue);

        const rehDataSet = dataSet
          ?.filter((x) => x.category === "REH")
          .slice(0, 12);

        oneDayData["reh"] = rehDataSet?.map((x) => x.fcstValue);
        setOneDays(oneDayData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [nxny]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-center p-2 mb-2">
            <button
              className="btn  focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 hover:text-black"
              onClick={() => setCategory("tmp")}
            >
              기온
            </button>
            <button
              className="btn focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 "
              onClick={() => setCategory("pop")}
            >
              강수
            </button>

            <button
              className="btn focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 "
              onClick={() => setCategory("reh")}
            >
              습도
            </button>
          </div>
          <div className="mb-4">
            {category === "tmp" ? (
              <TmpChart />
            ) : category === "pop" ? (
              <PopChart />
            ) : (
              <RehChart />
            )}
          </div>
        </div>
      )}
    </>
  );
}
