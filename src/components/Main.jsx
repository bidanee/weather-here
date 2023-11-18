import { PiSunBold } from "react-icons/pi";
// import data from "../json/objectData.json";
import { LocationDialog } from "./locationDialog";

export default function Main() {
  return (
    <main className="w-full flex items-center justify-center h-full">
      <div className="w-[32rem] flex flex-col p-2 border-2">
        <div className="flex items-center justify-center">
          <div className="mx-2 text-4xl my-2">여기 날씨</div>
          <LocationDialog />
        </div>
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
          <div>
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
            <div className="flex justify-center p-2">
              <button className=" focus:border-blue-300 focus:border-b-2 focus:font-bold mx-4 text-xl hover:bg-gray-100 ">
                날씨
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
          </div>
        </div>
      </div>
    </main>
  );
}
