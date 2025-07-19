import { Button } from "@/components/ui/button";
import { type AppDispatch } from "@/store";
import { logoutUser } from "@/store/auth/auth-thunks";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const MeHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200 no-underline"
      >
        Frontendly
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          asChild
          className={
            pathname === "/me"
              ? "bg-accent text-accent-foreground cursor-default"
              : ""
          }
        >
          <Link to="/me">Getting started</Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className={
            pathname === `/me/tutorials`
              ? "bg-accent text-accent-foreground cursor-default"
              : ""
          }
        >
          <Link to="/me/tutorials">Tutorials</Link>
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer ml-4"
          onClick={handleLogout}
        >
          <LogOut />
        </Button>
      </div>
    </nav>
  );
};
