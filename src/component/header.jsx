import { useState } from "react";
import dev from "../assets/devchallenges.svg";
import Dropdown from "./dropdown";

export default function Header({ img, user }) {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <img src={dev} alt={dev} />
        <div
          className="flex items-center space-x-3"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            style={{ backgroundImage: `url(${img})` }}
            className="h-8 w-8 rounded-md bg-cover bg-center bg-gray-300"
          ></div>
          <p className="text-sm font-semibold">{user?.substring(0, 12)}...</p>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`flex justify-end transition-opacity ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      >
        <Dropdown setHover={setHover} />
      </div>
    </>
  );
}
