import React from "react";
import PropTypes from "prop-types";
import Custominputfields, { Passwordcustomfiled } from "../Custominputfields";
import { useSwal } from "@utils/Customswal.jsx";
import { USER } from "@Consts/apikeys";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/Usercontext";

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
  const { setUser } = useUser();

  // Configure axios to include cookies
  axios.defaults.withCredentials = true;

  function loginUser(email, password) {
    axios
      .post(`${USER.Login}`, {
        email: email,
        password: password, // Remove encryption, handle on backend
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Welcome",
            text: "Login Successful",
          }).then(() => {
            // Update user context with response data
            setUser(response.data.data.user);
            navigate("/");
          });
        }
      })
      .catch((error) => {
        console.log(error, "this is error");
        Swal.fire({
          title: error?.response?.data?.message || "Login failed",
          icon: "error",
        });
      });
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
