import { lazy, ReactElement, Suspense } from "react";

import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Footer from "./layouts/Footer";
import Loading from "./layouts/Loading/LoadingFull";
import Navbar from "./layouts/Navbar";
import Alert from "./layouts/Alert";
import { selectToken } from "./store/authSlice";
import ErrorBoundary from "./layouts/ErrorBoundaries";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Turis = lazy(() => import("./pages/Turis"));
const TurisDetail = lazy(() => import("./pages/TurisDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App(): JSX.Element {
  const token: string = useSelector(selectToken);
  const location = useLocation();

  let routes: ReactElement;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/turis">
          <Route index element={<Turis />} />
          <Route path=":id" element={<TurisDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/turis">
          <Route
            index
            element={
              <Navigate to="/signup" state={{ from: "/turis" }} replace />
            }
          />
          <Route
            path=":id"
            element={
              <Navigate
                to="/signup"
                state={{ from: location.pathname }}
                replace
              />
            }
          />
        </Route>
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
      <ErrorBoundary>
        <Navbar />
        <Alert />
        <main style={{ minHeight: "85vh" }}>
          <Suspense fallback={<Loading />}>{routes}</Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
  );
}

export default App;
