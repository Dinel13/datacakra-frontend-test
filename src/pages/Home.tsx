import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="py-24 flex items-center">
      HOme
      <Link to="/turis" className="px-4 py-2 font-medium btn-pri">
        Turis
      </Link>
    </div>
  );
};

export default Home;
