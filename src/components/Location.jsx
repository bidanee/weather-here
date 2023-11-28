import { useState } from "react";

import jsonData from "../json/objectData.json";
import { useRecoilState } from "recoil";
import { firstNameState, secondNameState } from "../recoil/atom";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";

export function Location() {
  const [firstName, setFirstName] = useRecoilState(firstNameState);
  const [secondName, setSecondName] = useRecoilState(secondNameState);

  const [open, setOpen] = useState(false);
  const [sido, setSido] = useState(false);
  const [gugun, setGugun] = useState(false);
  const first = [...new Set(jsonData.map((x) => x.first))];
  const second = [
    ...new Set(
      jsonData.map((x) => {
        if (x.first === firstName) {
          return x.second;
        }
      })
    ),
  ];

  return (
    <div className="relative flex items-center justify-center">
      <div className=" flex justify-center items-center">
        <div
          className="flex justify-center items-center mx-2 text-2xl my-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="text-xl mr-1">현재 위치 :</span>
          <span className=" font-bold">
            {firstName} {secondName}
          </span>
        </div>
        <button className=" btn btn-sm p-1 btn-outline">
          <div className="flex justify-center items-center">
            <span className="mr-1">내 위치</span>
            <MdOutlineMyLocation className="text-xl leading-6 cursor-pointer" />
          </div>
        </button>
        {open === true ? (
          <div className="absolute flex justify-center items-center top-[2.7rem] left-[1.5rem] w-[22rem] h-[3rem] border-2 text-lg bg-white px-1">
            <div className="relative w-[17.8rem] mr-[1px] border h-[2rem] flex justify-between ">
              <span className="ml-2">{firstName}</span>
              <div
                className="flex items-center border-l px-[1px]"
                onClick={() => setSido(!sido)}
              >
                <IoIosArrowDown />
              </div>
              {sido === true ? (
                <ul className="absolute top-[1.9rem] w-full h-[5rem] overflow-auto bg-white border-x border-b">
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
            <button className="border-black btn btn-sm btn-square btn-outline btn-info">
              <FaSearchLocation className="text-xl leading-6 text-black cursor-pointer" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
    // <div className="relative">
    //   <div
    //     className="flex items-center justify-center "
    //     onClick={() => setOpen(!open)}
    //   >
    //     <FaSearchLocation className="text-3xl hover:text-4xl cursor-pointer" />
    //   </div>
    //   {open === true ? (
    //     <div className="absolute flex justify-center items-center top-[-0.1rem] left-[-15rem] w-[19.5rem] h-[3rem] border-2 text-lg bg-white">
    //       <div className="w-[8rem] relative mr-1">
    //         {firstName === "" ? (
    //           <div>
    //             <div className="w-full border h-[2rem] flex justify-center">
    //               시/도
    //             </div>
    //             <ul className="absolute top-[2.1rem] w-full h-[5rem] overflow-auto bg-white border-x border-b">
    //               {first.map((x, idx) => (
    //                 <li
    //                   key={idx}
    //                   className="hover:bg-gray-100 cursor-pointer"
    //                   onClick={() => {
    //                     setFirstName(x);
    //                     setSecondName("");
    //                   }}
    //                 >
    //                   {x}
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         ) : (
    //           <div
    //             className="text-center border"
    //             onClick={() => setFirstName("")}
    //           >
    //             {firstName}
    //           </div>
    //         )}
    //       </div>

    //       <div className="relative w-[8rem] mr-1">
    //         {firstName !== "" && secondName === "" ? (
    //           <div>
    //             <div className="w-full border h-[2rem] flex justify-center">
    //               구/군
    //             </div>
    //             <ul className="absolute top-[1rem] h-[4rem] w-full overflow-auto bg-white border-2">
    //               {firstName !== ""
    //                 ? second.map((x, idx) => (
    //                     <li
    //                       key={idx}
    //                       className="hover:bg-gray-100 cursor-pointer"
    //                       onClick={() => setSecondName(x)}
    //                     >
    //                       {x}
    //                     </li>
    //                   ))
    //                 : null}
    //             </ul>
    //           </div>
    //         ) : (
    //           <div
    //             className="text-center border h-[2rem]"
    //             onClick={() => setSecondName("")}
    //           >
    //             {secondName}
    //           </div>
    //         )}
    //       </div>
    //       <button
    //         className=" btn btn-circle btn-sm btn-neutral"
    //         onClick={() => setOpen(!open)}
    //       >
    //         날씨
    //       </button>
    //     </div>
    //   ) : null}
    // </div>
  );
}
