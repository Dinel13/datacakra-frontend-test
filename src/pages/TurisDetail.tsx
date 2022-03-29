import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import UpdateTuris from "../components/UpdateTuris";
import DeleteTuris from "../components/DeleteTuris";
import Loading from "../layouts/Loading";
import { showAlert } from "../store/alertSlice";
import { Turis } from "./Turis";

const TurisDetail: FC = () => {
  const [pending, setPending] = useState(false);
  const [needUpdate, setNeedUpdate] = useState<Turis | null>(null);
  const [needDelete, setNeedDelete] = useState<Turis | null>(null);
  const [turis, setTuris] = useState<Turis | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async (idTuris: string) => {
      try {
        setPending(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/Tourist/${idTuris}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Tidak bisa mendapat data");
        }
        setTuris(data);
      } catch (error: any) {
        dispatch(
          showAlert({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      } finally {
        setPending(false);
      }
    };
    id && getData(id);
  }, [dispatch, id]);

  return pending ? (
    <Loading />
  ) : turis ? (
    <>
      {needUpdate && (
        <UpdateTuris
          turis={needUpdate}
          cancel={() => setNeedUpdate(null)}
          setTuris={setTuris}
        />
      )}
      {needDelete && (
        <DeleteTuris
          turis={needDelete}
          cancel={() => setNeedDelete(null)}
          back={() => navigate(-1)}
        />
      )}
      <div className="flex flex-wrap items-start gap-4 wrapper">
        <div className="w-40">
          <img
            alt="test"
            className="bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src={turis.tourist_profilepicture}
          />
        </div>
        <div className="grow mt-2">
          <h3 className="text-xl leading-none font-semibold tracking-wide">
            {turis.tourist_name}
          </h3>
          <p className="mb-2 text-gray-500 text-sm">
            {turis.createdat.slice(0, 10)}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-1"
              fill="none"
              viewBox="0 0 28 28"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            {turis.tourist_email}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-1"
              fill="currentColor"
              viewBox="0 0 28 28"
              stroke="none"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {turis.tourist_location}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setNeedDelete(turis)}
              className="btn-sec px-3 mr-3"
            >
              hapus
            </button>
            <button
              onClick={() => setNeedUpdate(turis)}
              className="btn-pri px-3"
            >
              update
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>No Turis</div>
  );
};

export default TurisDetail;
