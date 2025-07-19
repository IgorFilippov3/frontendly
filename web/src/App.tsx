import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "./store";
import { lazy, useCallback, useEffect, useState } from "react";
import { fetchUser } from "./store/auth/auth-thunks";
import { PublicRoute } from "./components/app/public-route/public-route";
import { PrivateRoute } from "./components/app/private-route/private-route";
import { NotFound } from "./components/app/not-found/not-found";
import { LoadingSpinner } from "./components/app/loading-spinner/loading-spinner";
import { InitError } from "./components/app/init-error/init-error";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "./pages/home/home";
import { Signup } from "./pages/signup/signup";
import { Me } from "./pages/me/me";
import { meRoutes } from "./pages/me/me-routes";

const Tutorial = lazy(() => import("./pages/tutorial/tutorial"));

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false);
  const [initError, setInitError] = useState<string | null>(null);

  const initializeApp = useCallback(() => {
    dispatch(fetchUser())
      .unwrap()
      .then(() => {
        setIsAppInitialized(true);
      })
      .catch((error) => {
        setInitError(error.message || "Failed to initialize app");
        setIsAppInitialized(true);
      });
  }, [dispatch]);

  const retryInitializeApp = useCallback(() => {
    setInitError(null);
    setIsAppInitialized(false);
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <>
      <BrowserRouter>
        {!isAppInitialized ? (
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" text="Data fetching..." />
          </div>
        ) : initError ? (
          <InitError error={initError} onRetry={retryInitializeApp} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path=":userSlug/:tutorialKey/:lessonKey?"
              element={<Tutorial />}
            />

            <Route element={<PublicRoute redirectTo="/me" />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Route>

            <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="/me" element={<Me />}>
                {meRoutes}
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
};
