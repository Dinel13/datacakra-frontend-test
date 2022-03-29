import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="wrapper text-center">
      <h2 className="text-2xl sm:text-4xl mt-10">
        Temukan dan Kelola{" "}
        <span className="font-black tracking-widest">Data Turis</span>
      </h2>
      <Link to="/turis" className="mt-10 inline-block px-6 py-2 font-medium btn-pri">
        Lihat Data Turis
      </Link>
    </div>
  );
};

export default Home;
