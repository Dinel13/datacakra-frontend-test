import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { Turis } from "../pages/Turis";
import { showAlert } from "../store/alertSlice";
import LoadingButton from "./common/LoadingButton";

interface IProps {
  turis: Turis;
  cancel: () => void;
  setTurises?: React.Dispatch<React.SetStateAction<[] | Turis[]>> ;
  back?: () => void;
}

const DeteleTuris: FC<IProps> = ({ turis, cancel, setTurises, back }) => {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async (id: number) => {
    try {
      setPending(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/Tourist/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Tidak bisa hapus");
      }
      dispatch(
        showAlert({
          status: "Success",
          message: "Data berhasil dihapus",
          action: null,
        })
      );
      setTurises && setTurises((prev) => prev.filter((t) => t.id !== id));
      cancel()
      back && back();
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

  return (
    <>
      <div className="opacity-30 fixed inset-0 z-20 bg-black"></div>
      <div className="flex justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-30">
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-sky-400">
                <span className="text-white text-xl font-bold ">
                  Hapus Turis
                </span>
              </div>
              <div className="p-4 mt-2">
                <p>
                  Apakah kamu yakin akan menghapus turis{" "}
                  <span className="font-semibold">{turis.tourist_name}</span>{" "}
                </p>
                <div className="flex mt-6 text-center pb-3">
                  {pending ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <button onClick={cancel} className="w-full btn-sec h-10">
                        batal
                      </button>
                      <button
                        className="w-full btn-pri h-10 ml-4"
                        onClick={() => deleteHandler(turis.id)}
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeteleTuris;
