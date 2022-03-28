import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
  return (
    <div className="w-full bg-blue-400 p-4">
      Navbar
      <Link to="/loginm" className="px-4 py-2 font-medium btn-pri">
        Login
      </Link>
    </div>
  );
}

export default Navbar;
