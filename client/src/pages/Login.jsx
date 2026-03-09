import { Lock, Mail, User2Icon, ArrowRight } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50 font-poppins overflow-hidden">
      {/* Background Decorative Mesh - Consistent with Dashboard */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-indigo-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] size-[400px] bg-violet-200/30 blur-[100px] rounded-full" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sm:w-[400px] w-full text-center bg-white/70 backdrop-blur-2xl border border-white rounded-4xl px-10 shadow-quartz animate-in fade-in zoom-in duration-500"
      >
        <div className="mt-12 mb-8">
          <h1 className="text-slate-900 text-3xl font-bold tracking-tight">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {state === "login"
              ? "Login to manage your professional journey"
              : "Start building your dream career today"}
          </p>
        </div>

        {state !== "login" && (
          <div className="group flex items-center mt-6 w-full bg-slate-50 border border-slate-200 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <User2Icon
              size={18}
              className="text-slate-400 group-focus-within:text-indigo-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="group flex items-center w-full mt-4 bg-slate-50 border border-slate-200 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
          <Mail
            size={16}
            className="text-slate-400 group-focus-within:text-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="group flex items-center mt-4 w-full bg-slate-50 border border-slate-200 h-12 rounded-xl overflow-hidden pl-4 gap-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
          <Lock
            size={16}
            className="text-slate-400 group-focus-within:text-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-right">
          <button
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            type="button"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="group mt-6 w-full h-12 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {state === "login" ? "Login" : "Join CraftedCV"}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        <div className="mt-8 mb-12 border-t border-slate-100 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="text-indigo-600 font-bold hover:underline ml-1"
            >
              {state === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
