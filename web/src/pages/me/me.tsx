import { Outlet } from "react-router-dom";
import { MeHeader } from "./components/me-header";

export const Me = () => {
  return (
    <>
      <MeHeader />
      <Outlet />
    </>
  );
};
