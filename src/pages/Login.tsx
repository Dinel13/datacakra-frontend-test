import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "../components/common/LoadingButton";
import { showAlert } from "../store/alertSlice";
import { login } from "../store/authSlice";

const Login: FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const password = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [isShowPass, setIShowPass] = useState(false);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: "/" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await await fetch(
        `${process.env.REACT_APP_SERVER_URL}/authaccount/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Tidak bisa daftar");
      }
      if (result.code === 0) {
        dispatch(login({
          id: result.data.Id.toString(),
          name: result.data.Name.toString(),
          token: result.data.Token.toString(),
        }));
        navigate(from, { replace: true });
      } else {
        throw new Error(result.message || "Tidak bisa daftar");
      }
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

  const showPassword = () => {
    const x = password.current;
    if (x?.type === "password") {
      x.type = "text";
      setIShowPass(true);
    } else if (x?.type === "text") {
      x.type = "password";
      setIShowPass(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full max-w-sm py-6 px-8 my-8 mx-auto rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-semibold text-center">Daftar</h1>
      <form className="mt-4" onSubmit={loginHandler}>
        <div className="mt-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
            className="input-field mt-1"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
          </div>
          <div className="relative mb-6">
            <input
              ref={password}
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
              className="input-field mt-1"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2 top-3.5 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={showPassword}
            >
              {!isShowPass ? (
                <>
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </>
              ) : (
                <>
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </>
              )}
            </svg>
          </div>
        </div>
        <div className="my-6">
          {pending ? (
            <LoadingButton />
          ) : (
            <button type="submit" className="btn-pri w-full py-2">
              Masuk
            </button>
          )}
        </div>
      </form>
      <p className="text-sm font-light text-center">
        Belum Punya Akun?{" "}
        <button
          onClick={() => navigate("/signup", { state: { from } })}
          className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
        >
          DAFTAR
        </button>
      </p>
    </div>
  );
};

export default Login;
