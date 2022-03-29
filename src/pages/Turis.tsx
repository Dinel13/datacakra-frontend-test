import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch} from "react-redux";

import Pagination from "../components/common/Pagination";
import TurisCard from "../components/TurisCard";
import UpdateTuris from "../components/UpdateTuris";
import DeleteTuris from "../components/DeleteTuris";
import AddTuris from "../components/AddTuris";

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

const Turiss: FC = () => {
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState(1);
  const [tPage, setTPage] = useState(0);
  const [turises, setTurises] = useState<Turis[] | []>([]);
  const [needUpdate, setNeedUpdate] = useState<Turis | null>(null);
  const [needDelete, setNeedDelete] = useState<Turis | null>(null);
  const [needAdd, setNeedAdd] = useState(false)
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

  // const removeHandler = useCallback(
  //   async (id: number, setPdButton :React.Dispatch<React.SetStateAction<boolean>>) => {
  //     try {
  //       setPdButton(true)
  //       const response = await fetch(
  //         `${process.env.REACT_APP_SERVER_URL}/Tourist/${id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error(data.message || "Tidak bisa hapus");
  //       }
  //       dispatch(
  //         showAlert({
  //           status: "Success",
  //           message: "Data berhasil dihapus",
  //           action: null,
  //         })
  //       );
  //       setTurises(prev => prev.filter(t => t.id !== id));
  //     } catch (error: any) {
  //       dispatch(
  //         showAlert({
  //           status: "Error",
  //           message: error.message,
  //           action: null,
  //         })
  //       );
  //     } finally {
  //       setPdButton(false)
  //     }
  //   }, [dispatch]
  // );

  return pending ? (
    <Loading />
  ) : turises ? (
    <div className="wrapper">
      {needUpdate && (
        <UpdateTuris
          turis={needUpdate}
          cancel={() => setNeedUpdate(null)}
          setTurises={setTurises}
        />
      )}
      {needDelete && (
        <DeleteTuris
          turis={needDelete}
          cancel={() => setNeedDelete(null)}
          setTurises={setTurises}
        />
      )}
      {needAdd && (
        <AddTuris
          cancel={() => setNeedAdd(false)}
        />
      )}
      <div className="flex flex-wrap justify-between items-center mb-3">
        <p className="text-3xl font-semibold tracking-wider">Daftar turis</p>
        <button onClick={()=> setNeedAdd(true)} className="btn-pri py-1 px-3">Tambah Turis</button>
      </div>
      <div className="flex flex-wrap items-start -mx-2">
        {turises.map((turis: Turis) => (
          <TurisCard
            key={turis.id}
            turis={turis}
            update={setNeedUpdate}
            delete={setNeedDelete}
          />
        ))}
      </div>
      <Pagination setPage={setPage} cPage={page} tPages={tPage} />
    </div>
  ) : (
    <div>No Turis</div>
  );
};

export default Turiss;
