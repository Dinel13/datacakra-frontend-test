import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/common/Pagination";
import TurisCard from "../components/TurisCard";

import Loading from "../layouts/Loading";
import { showAlert } from "../store/alertSlice";

export interface Turis {
  id: number;
  tourist_name: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  createdat: string;
}

const Turis: FC = () => {
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState(1);
  const [tPage, setTPage] = useState(0);
  const [turises, setTurises] = useState<Turis[] | []>([]);
  const dispatch = useDispatch();

  const getData = useCallback(
    async (p: number = 1) => {
      try {
        setPending(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/Tourist?page=${p}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Tidak bisa mendapat data");
        }
        setTurises(data.data);
        setTPage(data.total_pages);
      } catch (error: any) {
        console.log(error);
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
    },
    [dispatch]
  );

  useEffect(() => {
    getData(page);
  }, [getData, page]);

  const removeHandler = useCallback(
    async (id: number, setPdButton :React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
        setPdButton(true)
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
        setTurises(prev => prev.filter(t => t.id !== id));
      } catch (error: any) {
        console.log(error);
        dispatch(
          showAlert({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      } finally {
        setPdButton(false)
      }
    }, [dispatch]
  );

  return pending ? (
    <Loading />
  ) : turises ? (
    <div className="wrapper">
      <div className="flex flex-wrap items-start">
        {turises.map((turis: Turis) => (
          <TurisCard key={turis.id} turis={turis} remove={removeHandler} />
        ))}
      </div>
      <Pagination
        setPage={setPage}
        cPage={page}
        tPages={tPage}
      />
    </div>
  ) : (
    <div>No Turis</div>
  );
};

export default Turis;
