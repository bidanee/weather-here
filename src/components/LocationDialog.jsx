import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import jsonData from "../json/objectData.json";

export function LocationDialog() {
  const first = [...new Set(jsonData.map((x) => x.first))];
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [open, setOpen] = useState(false);
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
    <div>
      <div
        className="flex items-center justify-center relative"
        onClick={() => setOpen(!open)}
      >
        <FaSearchLocation className="text-3xl hover:text-4xl cursor-pointer" />
      </div>
      {open === true ? (
        <div className="absolute flex justify-center items-center top-[8.2rem] left-[7rem] w-[19rem] h-[2.2rem] border-2">
          {firstName === "" ? (
            <ul>
              {first.map((x, idx) => (
                <li key={idx} onClick={() => setFirstName(x)}>
                  {x}
                </li>
              ))}
            </ul>
          ) : (
            <div>{firstName}</div>
          )}
          {secondName === "" ? (
            <ul>
              {firstName !== ""
                ? second.map((x, idx) => (
                    <li key={idx} onClick={() => setSecondName(x)}>
                      {x}
                    </li>
                  ))
                : null}
            </ul>
          ) : (
            <div className="mx-2">{secondName}</div>
          )}
          <div>날씨확인</div>
        </div>
      ) : null}
    </div>
  );
}
