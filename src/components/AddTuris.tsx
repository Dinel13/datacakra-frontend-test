import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { showAlert } from "../store/alertSlice";
import LoadingButton from "./common/LoadingButton";

interface IProps {
  cancel: () => void;
}

const AddTuris: FC<IProps> = ({ cancel }) => {
  const [input, setInput] = useState({
    tourist_name : "",
    tourist_email : "",
    tourist_location : "",
  });
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setPending(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/Tourist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.Message || "Tidak bisa menambah");
      }
      dispatch(
        showAlert({
          status: "Success",
          message: "Data berhasil ditambah",
          action: null,
        })
      );
      navigate("/turis/"+data.id);
      cancel();
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
                  Tambah Turis
                </span>
              </div>
              <form onSubmit={submitHandler} className="p-4 mt-2">
                <div>
                  <label htmlFor="Name">Nama</label>
                  <input
                    type="text"
                    name="tourist_name"
                    value={input.tourist_name}
                    onChange={handleChange}
                    required
                    className="input-field mt-1"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="tourist_email"
                    value={input.tourist_email}
                    onChange={handleChange}
                    required
                    className="input-field mt-1"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email">Lokasi</label>
                  <input
                    type="text"
                    name="tourist_location"
                    value={input.tourist_location}
                    onChange={handleChange}
                    required
                    className="input-field mt-1"
                  />
                </div>
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
                        type="submit"
                      >
                        Tambah
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTuris;
