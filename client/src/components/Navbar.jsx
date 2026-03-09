import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    /* Glassmorphism Wrapper */
    <div className="sticky top-0 z-100 w-full bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3 text-slate-800 transition-all">
        {/* Logo Section */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          {/* User Identity - Quartz Style */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50/50 border border-slate-100 rounded-2xl max-sm:hidden">
            <div className="size-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <User size={14} className="text-white" />
            </div>
            <p className="text-sm font-bold text-slate-700">
              {user?.name || "Guest"}
            </p>
          </div>

          {/* Logout Action */}
          <button
            onClick={logoutUser}
            className="group flex items-center gap-2 px-6 py-2 bg-white text-slate-600 text-sm font-bold border border-slate-200 rounded-xl hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-300 active:scale-95 shadow-sm"
          >
            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;