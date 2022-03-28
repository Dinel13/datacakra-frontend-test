import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-5 text-gray-700">
        <div className="text-5xl lg:text-6xl font-bold">
          404
        </div>
        <p className="text-3xl py-2 font-light leading-normal">
          Halaman tidak ditemukan.
        </p>
        <Link to="/" className="py-2 text-blue-500">
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
