import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../layouts/Loading";
import { showAlert } from "../store/alertSlice";
import { logout, selectId, selectToken } from "../store/authSlice";

interface User {
  id: number;
  name: string;
  email: string;
  profilepicture: string;
  location: string;
  createdat: string;
}

const MyAccount: FC = () => {
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchUser = async (id: number) => {
      try {
        setPending(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Tidak bisa daftar");
        }
        setUser(data);
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
    userId && fetchUser(userId);
  }, [userId, token, dispatch]);

  return pending ? (
    <Loading />
  ) : user ? (
    <div className="flex items-start wrapper md:w-5/6 lg:md-4/6">
      <div>
        <img
          alt="test"
          className="bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          style={{ height: "110px", width: "110px" }}
          src={user.profilepicture}
        />
      </div>
      <div className="mt-2">
        <h3 className="text-xl leading-none font-semibold tracking-wide">
          {user.name}
        </h3>
        <p className="mb-2 text-gray-500 text-sm">
          {user.createdat.slice(0, 10)}
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
          {user.email}
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
          {user.location}
        </p>
        <button onClick={() => dispatch(logout())} className="btn-sec mt-3 px-2">Logout</button>
      </div>
    </div>
  ) : (
    <div>No user</div>
  );
};

export default MyAccount;
