import React from "react";
import { useNavigate } from "react-router-dom";

import { Turis } from "../pages/Turis";

interface IProps {
  turis: Turis;
  update: React.Dispatch<React.SetStateAction<Turis | null>>;
  delete: React.Dispatch<React.SetStateAction<Turis | null>>;
}

const TurisCard: React.FC<IProps> = ({ turis, update, delete: del }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 2xl:w-3/12">
      <div className="flex gap-3 m-2.5 rounded-lg bg-blue-50 overflow-hidden shadow-blue-400 relative hover:bg-white cursor-pointer hover:shadow-xl">
        <div className="relative w-20 rounded-l-lg">
          <img
            src={turis.tourist_profilepicture}
            alt="blog"
            className="rounded-l-lg object-cover h-full w-full"
          />
        </div>
        <div className="grow py-2 pr-1 text-sm text-gray-700 overflow-hidden">
          <h5 className="font-semibold text-lg leading-6 truncate text-gray-800">
            {turis.tourist_name}
          </h5>
          <p className="truncate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline -mr-1"
              fill="currentColor"
              viewBox="0 0 28 28"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {turis.tourist_location}
          </p>
          <p className="truncate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline -mr-1 mt-1"
              fill="currentColor"
              viewBox="0 0 28 28"
            >
              <path
                fillRule="evenodd"
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clipRule="evenodd"
              />
            </svg>
            {turis.tourist_email}
          </p>
          <div className="text-right mt-2 z-10">
            <button
              onClick={() => del(turis)}
              className="bg-red-400 w-14 py-0.5 border border-gray-400 rounded-l"
            >
              hapus
            </button>
            <button
              onClick={() => update(turis)}
              className="w-14 py-0.5 border-y border-gray-400"
            >
              update
            </button>
            <button
              onClick={() => navigate(`/turis/${turis.id}`)}
              className=" bg-blue-400 w-14 py-0.5 border border-gray-400 rounded-r"
            >
              detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurisCard;
