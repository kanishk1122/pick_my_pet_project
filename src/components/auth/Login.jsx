import React from "react";
import PropTypes from "prop-types";
import Custominputfields, { Passwordcustomfiled } from "../Custominputfields";
import { useSwal } from "@utils/Customswal.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/Usercontext";
import { useAuth } from "@hooks/useAuth";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  authtype,
  setauthtype,
  showPassword,
  setShowPassword,
  passwordFocused,
  setPasswordFocused,
}) => {
  const Swal = useSwal();
  const navigate = useNavigate();
  const { login } = useAuth();

  async function loginUser(email, password) {
    const result = await login({ email, password });

    if (result.meta.requestStatus === "fulfilled") {
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: "Login Successful",
      }).then(() => {
        navigate("/");
      });
    } else {
      Swal.fire({
        title: result.payload || "Login failed",
        icon: "error",
      });
    }
  }

  return (
    <div className="w-full h-fit rounded-2xl p-4 sm:p-8 md:p-10 lg:p-14 flex flex-col gap-1">
      {/* Email Input */}
      <Custominputfields
        from="email"
        name="Email"
        type="email"
        getter={email}
        setter={setEmail}
      />

      {/* Password Input */}
      <Passwordcustomfiled
        password={password}
        setPassword={setPassword}
        name="Password"
      />

      <button
        onClick={() => {
          if (!email || !password) {
            Swal.fire({
              title: `Please fill ${
                !email && !password
                  ? "Email & Password"
                  : !email
                  ? "Email"
                  : "Password"
              } field`,
              icon: "warning",
            });
            return;
          }
          loginUser(email, password);
        }}
        className="brand-button my-2 sm:my-4 duration-200 hover:bg-yellow-300 w-full text-sm sm:text-base"
      >
        {authtype !== "login" ? "Next" : "Login"}
      </button>
    </div>
  );
};

export default Login;

Login.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  authtype: PropTypes.string,
  setauthtype: PropTypes.func,
  showPassword: PropTypes.bool,
  setShowPassword: PropTypes.func,
  passwordFocused: PropTypes.bool,
  setPasswordFocused: PropTypes.func,
};
