import { FaSearchLocation } from "react-icons/fa";
import { getWeatherData } from "./api";

export default function Weather() {
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

  const time = () => {
    if (today.getHours().length === 1) return `0${today.getHours()}00`;
    return `${today.getHours()}00`;
  };

  console.log(getWeatherData(date(), time()));

  return (
    <button className="border-black btn btn-sm btn-square btn-outline btn-info">
      <FaSearchLocation className="text-xl leading-6 text-black cursor-pointer" />
    </button>
  );
}
