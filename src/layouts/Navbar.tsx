import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectName } from "../store/authSlice";

function Navbar(): JSX.Element {
  const user = useSelector(selectName);
  const dispatch = useDispatch();

  return (
    <header className="text-white shadow-lg sticky top-0 w-full z-20 bg-gradient-to-r from-blue-500 to-sky-400">
      <nav className="flex flex-wrap items-center justify-between py-2.5 px-3 md:px-5 lg:px-8 ">
        <Link to="/" className="text-xl font-bold tracking-widest">
          Data-Turis
        </Link>
        <div className="flex grow items-center justify-end text-lg">
          {user ? (
            <div className="flex items-center mr-1.5 gap-x-3">
              <Link to="/turis" className="p-1 link-scale hover:text-gray-200">
                Turis
              </Link>
              <Link to="/my-account" className="p-1 link-scale">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 mb-0.5 inline"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                {user}
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center p-1 link-scale"
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center mr-1.5 gap-x-2">
              <Link to="/login" className="p-1 link-scale hover:text-gray-200">
                Login
              </Link>
              <Link to="/signup" className="p-1 link-scale hover:text-gray-200">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
