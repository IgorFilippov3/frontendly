import type { RootState } from "@/store";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  redirectTo: string;
}

export const PublicRoute: FC<PublicRouteProps> = ({ redirectTo }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
