import React from "react";
import PropTypes from "prop-types";
import { useSwal } from "@utils/Customswal.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

// --- Icons ---
const MailIcon = () => (
  <svg className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  authtype,
}) => {
  const Swal = useSwal();
  const navigate = useNavigate();
  const { login } = useAuth();

  async function loginUser(e) {
    e.preventDefault();
    
    if (!email || !password) {
      Swal.fire({
        title: `Please fill in your ${!email ? "Email" : ""} ${!email && !password ? "&" : ""} ${!password ? "Password" : ""}`,
        icon: "warning",
        confirmButtonColor: "#F59E0B"
      });
      return;
    }

    const result = await login({ email, password });

    if (result.meta.requestStatus === "fulfilled") {
      Swal.fire({
        icon: "success",
        title: "Welcome Back! 🐾",
        text: "Login Successful",
        confirmButtonColor: "#10B981"
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: result.payload || "Incorrect credentials.",
        icon: "error",
        confirmButtonColor: "#EF4444"
      });
    }
  }

  return (
    <form onSubmit={loginUser} className="w-full flex flex-col gap-6 animate-fade-in-up">
      
      {/* Email Input */}
      <div>
        <label className="block text-sm font-bold text-stone-600 mb-1 ml-1 uppercase tracking-wide">
          Email Address
        </label>
        <div className="relative">
          <MailIcon />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-bold text-stone-800 placeholder-stone-400"
            autoFocus
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-bold text-stone-600 mb-1 ml-1 uppercase tracking-wide">
          Password
        </label>
        <div className="relative">
          <LockIcon />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all font-bold text-stone-800"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button type="button" className="text-xs font-bold text-stone-500 hover:text-emerald-600">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="brand-button-primary w-full text-lg mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        {authtype !== "login" ? "Next" : "Log In"}
      </button>

    </form>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  authtype: PropTypes.string,
};

export default Login;