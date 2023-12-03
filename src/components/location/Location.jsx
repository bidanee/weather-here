import { useState } from "react";

import jsonData from "../../json/objectData.json";
import { useRecoilState } from "recoil";
import {
  firstNameState,
  locationOpenState,
  nxnyState,
  secondNameState,
} from "../../recoil/atom";
import { IoIosArrowDown } from "react-icons/io";

import { FaSearchLocation } from "react-icons/fa";
import MyLocation from "./Mylocation";

export function Location() {
  const [firstName, setFirstName] = useRecoilState(firstNameState);
  const [secondName, setSecondName] = useRecoilState(secondNameState);
  const [open, setOpen] = useRecoilState(locationOpenState);
  const [modal, setModal] = useState(false);
  const [sido, setSido] = useState(false);
  const [gugun, setGugun] = useState(false);
  const [, setNxny] = useRecoilState(nxnyState);
  const first = [...new Set(jsonData.map((x) => x.first))];
  const second = [
    ...new Set(
      jsonData
        .filter((x) => x.first === firstName && x.second) // undefined를 필터링
        .map((x) => x.second)
    ),
  ];
  const findNxny = jsonData.find(
    (x) => x.first === firstName && x.second === secondName
  );
  const locationClick = () => {
    if (!!secondName === false && second.length > 2) {
      setModal(true);
      document.getElementById("my_modal_1").showModal();
      setTimeout(() => {
        document.getElementById("my_modal_1").close();
      }, 1000);
    } else {
      setOpen(false);
      setNxny([`${findNxny?.nx}`, `${findNxny?.ny}`]);
      setFirstName(findNxny.first);
      setSecondName(findNxny.second);
    }
  };
  const currentLocationClick = () => {
    setOpen(true);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className=" flex justify-center items-center">
        <div
          className="flex justify-center items-center mx-2 text-2xl my-2 cursor-pointer"
          onClick={currentLocationClick}
        >
          <span className="text-xl mr-1">현재 위치 :</span>
          <span className=" font-bold">
            {firstName}
            {secondName}
          </span>
        </div>

        {open === true ? (
          <div className="flex flex-col absolute top-[0.2rem]  w-[29rem] h-[6rem] border-2 text-lg bg-white px-1">
            <div className=" flex justify-center items-center my-2">
              <div className="relative w-[17.8rem] mr-[1px] border h-[2rem] flex justify-between ">
                <span className="ml-2">{firstName}</span>
                <div
                  className="flex items-center border-l px-[1px]"
                  onClick={() => setSido(!sido)}
                >
                  <IoIosArrowDown />
                </div>
                {sido === true ? (
                  <ul className="absolute top-[0.2rem] w-full h-[5rem] overflow-auto bg-white border-x border-b">
                    {first.map((x, idx) => (
                      <li
                        key={idx}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFirstName(x);
                          setSecondName("");
                          setSido(false);
                        }}
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="relative w-[17.8rem] mr-1 border h-[2rem] flex justify-between ">
                <span className="ml-2">{secondName}</span>
                <div
                  className="flex items-center border-l px-[1px]"
                  onClick={() => setGugun(!gugun)}
                >
                  <IoIosArrowDown />
                </div>

                {gugun === true ? (
                  <ul className="absolute top-[1.9rem] w-full h-[4rem] overflow-auto bg-white border-x border-b">
                    {second.map((x, idx) => (
                      <li
                        key={idx}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSecondName(x);
                          setGugun(!gugun);
                        }}
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <button
                className="border-black btn btn-sm btn-square btn-outline btn-info"
                onClick={locationClick}
              >
                <FaSearchLocation className="text-xl leading-6 text-black cursor-pointer" />
              </button>
            </div>
            <MyLocation />
          </div>
        ) : null}
      </div>
      {modal === true ? (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <p className="flex justify-center py-2 text-xl text-orange-400">
              구/군을 선택해 주세요
            </p>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
