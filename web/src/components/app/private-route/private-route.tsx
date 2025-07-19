import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  redirectTo: string;
}

export const PrivateRoute = ({ redirectTo }: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};
