import { lazy, ReactElement, Suspense } from "react";

import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Footer from "./layouts/Footer";
import Loading from "./layouts/Loading";
import Navbar from "./layouts/Navbar";
import Alert from "./layouts/Alert";
import { selectToken } from "./store/authSlice";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Turis = lazy(() => import("./pages/Turis"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App(): JSX.Element {
  const token: string = useSelector(selectToken);

  let routes: ReactElement;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/turis" element={<Turis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/turis"
          element={<Navigate to="/signup" state={{ from: "/turis" }} replace />}
        />
        <Route
          path="/my-account"
          element={
            <Navigate to="/Login" state={{ from: "/my-account" }} replace />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <Alert />
      <main style={{ minHeight: "85vh" }}>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
