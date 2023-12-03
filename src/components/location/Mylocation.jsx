import { useEffect, useState } from "react";
import Convert from "./convert";
import { MdOutlineMyLocation } from "react-icons/md";
import {
  firstNameState,
  locationOpenState,
  nxnyState,
  secondNameState,
} from "../../recoil/atom";
import { useRecoilState } from "recoil";
import jsonData from "../../json/objectData.json";

export default function MyLocation() {
  const [loading, setLoading] = useState(false);
  const [latLng, setLatLng] = useState([]);
  const [nxny, setNxny] = useRecoilState(nxnyState);
  const [, setOpen] = useRecoilState(locationOpenState);
  const [, setFirstName] = useRecoilState(firstNameState);
  const [, setSecondName] = useRecoilState(secondNameState);

  // // const getPosition = () => {
  // //   if (navigator.geolocation) {
  // //     navigator.geolocation.getCurrentPosition((position) => {
  // //       setLatLng([
  // //         `${position.coords.latitude}`,
  // //         `${position.coords.longitude}`,
  // //       ]);
  // //     });
  // //   } else {
  // //     setLatLng(latLng);
  // //   }
  // // };

  // useEffect(() => {
  //   const getPosition = async () => {
  //     try {
  //       if (navigator.geolocation) {
  //         const position = await new Promise((res, rej) => {
  //           navigator.geolocation.getCurrentPosition(res, rej);
  //         });
  //         console.log(position);
  //         setLatLng([
  //           `${position?.coords.latitude}`,
  //           `${position?.coords.longitude}`,
  //         ]);
  //       } else {
  //         console.error("suppoerted error");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     //   if (navigator.geolocation) {
  //     //     navigator.geolocation.getCurrentPosition((position) => {
  //     //       setLatLng([
  //     //         `${position.coords.latitude}`,
  //     //         `${position.coords.longitude}`,
  //     //       ]);
  //     //     });
  //     //   } else {
  //     //     setLatLng(latLng);
  //     //   }
  //   };
  //   getPosition();
  // }, [nxny]);
  // const myLocationClick = () => {
  // const convert = Convert("toXY", latLng[0], latLng[1]);
  //   const nx = convert?.x;
  //   const ny = convert?.y;
  //   const locationName = jsonData.find((x) => x.nx === nx && x.ny === ny);
  //   setNxny(`${nx}`, `${ny}`);
  //   setFirstName(locationName.first);
  //   setSecondName(locationName.second);
  //   setOpen(false);
  // };
  // console.log(latLng);
  const getPosition = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
        const currentLatLng = [
          position?.coords.latitude,
          position?.coords.longitude,
        ];
        setLatLng(currentLatLng);

        const convert = Convert("toXY", currentLatLng[0], currentLatLng[1]);
        const nx = convert.x;
        const ny = convert.y;
        const locationName = jsonData.find((x) => x.nx === nx && x.ny === ny);
        setNxny([`${nx}`, `${ny}`]);
        setFirstName(locationName.first);
        setSecondName(locationName.second);
        setOpen(false);
        setLoading(false);
      } else {
        console.error("Geolocation is not supported");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const myLocationClick = () => {
    setLoading(true);
    getPosition();
  };
  return (
    <div className=" flex justify-center items-center mt-1">
      {loading ? (
        <div>
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <button
          className="flex justify-center items-center btn btn-sm p-1 btn-outline w-[10rem] "
          onClick={myLocationClick}
        >
          <span className="mr-1">내 위치</span>
          <MdOutlineMyLocation className="text-xl leading-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
}
