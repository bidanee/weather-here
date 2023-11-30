import { Location } from "../location/Location";
import OneDays from "../weather/OneDayWeather";
import TodayWeather from "../weather/TodayWeather";

export default function Main() {
  return (
    <main className="w-full flex items-center justify-center h-full">
      <div className="w-[32rem] flex flex-col p-2 border-2">
        <Location />
        <div className="w-full flex justify-end mb-4">
          <div className="flex items-center border-black bg-blue-800 w-[6rem] rounded-full p-1 mr-4">
            <img
              className="w-4 mr-2 rounded-full"
              src="src/assets/korea.jpg"
              alt="Korea Meteorological Administration"
            />
            <span className=" text-xs text-white">기상청 제공</span>
          </div>
        </div>
        <div>
          <TodayWeather />
          <OneDays />
        </div>
      </div>
    </main>
  );
}
