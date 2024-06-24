import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../store/action/AdminAction";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";
import { MdKeyboardArrowRight } from "react-icons/md";
import loginImg from "../../assets/images/loginImg.jpg";
import Style from "../../css/Login.module.css";
import TypewriterComponent from "./TypewriterComponent";

const cookies = new Cookies();

const Login = () => {
  // State variables for login form, errors, password visibility, and remember me checkbox
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("rememberemail") || "",
    passwordHash: localStorage.getItem("rememberpassword") || "",
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, adminInfo } = useSelector((state) => state.adminLoginReducer);
  const navigate = useNavigate();

  // Handle 'Enter' key press for form submission
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, []);

  // Redirect based on user type after successful login
  useEffect(() => {
    if (cookies.get("ddAdminToken")) {
      const userType = adminInfo.data?.userType;
      const userRoutes = {
        "Super-Admin": "/adminDashboard",
        Production: "/productionModel",
        Support: "/Support_eng_data_module",
        Nurse: "/nurse_module",
        Assistant: "/nurse_module",
        "Marketing-Admin":"/adminDashboard",
        //  "/marketing_head_screen",
        User: "/service_eng",
        Accounts: "/accountDasboard",
        Dispatch: "/dispatchDashboardModule",
      };
      navigate(userRoutes[userType] || "/hospitalAdminScreen");
    }
  }, [navigate, adminInfo]);

  // Set password error if any during login
  useEffect(() => {
    if (error) setPasswordError(error);
  }, [error]);

  // Validate email function
  const validateEmail = (email) => {
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      setLoginForm((prev) => ({ ...prev, email }));
      setEmailError(null);
    } else {
      setEmailError(isEmailValid.message);
    }
    return isEmailValid.isSuccess;
  };

  // Validate password function
  const validatePassword = (passwordHash) => {
    if (!passwordHash) {
      setPasswordError("Please enter your password.");
      return false;
    }
    setLoginForm((prev) => ({ ...prev, passwordHash }));
    setPasswordError(null);
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    const emailValid = validateEmail(loginForm.email);
    const passwordValid = validatePassword(loginForm.passwordHash);

    if (emailValid && passwordValid) {
      dispatch(loginWithEmail(loginForm.email, loginForm.passwordHash));
    }
    if (isRememberMe) {
      localStorage.setItem("rememberemail", loginForm.email.toLowerCase());
      localStorage.setItem("rememberpassword", loginForm.passwordHash);
      localStorage.setItem("rememberMe", isRememberMe);
    } else {
      localStorage.removeItem("rememberemail");
      localStorage.removeItem("rememberpassword");
      localStorage.removeItem("rememberMe");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side: image container */}
      <div className="w-full md:w-1/2">
        <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
      </div>

      {/* Right side: form container */}
      <div className="flex flex-col justify-center items-left w-full md:w-1/2 p-8 md:p-16">
      <TypewriterComponent/>
        {/* <h1 className="text-4xl text-center md:text-5xl font-light text-gray-600">LOGIN</h1> */}
        <div className="flex flex-col gap-6 mt-8 w-full">
          {/* Email input field */}
          <input
            type="text"
            placeholder="Email"
            // className={Style.inputField}
            className="p-4 border border-gray-300 rounded-md"
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            value={loginForm.email}
          />
          {emailError && <small className="text-red-600">{emailError}</small>}
          
          {/* Password input field */}
          <div className="relative flex p-2 items-center border border-gray-300 rounded-md w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onPaste={(e) => {
                setLoginForm({ ...loginForm, passwordHash: "aL8h%$498h5&29h" });
              }}
              onChange={(e) => setLoginForm({ ...loginForm, passwordHash: e.target.value })}
              value={loginForm.passwordHash}
              style={{ border: "0px", width: "100%", padding: "15px" }}
            />
            <img
              src={showPassword ? HidePassword : ShowPassword}
              style={{ opacity: "59%", width: "1.5rem", height: "1.5rem" }}
              alt="Toggle Password"
              className="left-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {passwordError && <small className="text-red-600">{passwordError}</small>}
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-left mt-4">
          <input
            type="checkbox"
            checked={isRememberMe}
            onChange={(e) => setIsRememberMe(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="ml-2">Remember me?</label>
        </div>

        {/* Links to register and forgot password */}
        <div className="flex flex-col mt-4" style={{gap:'1rem'}}>
          <Link to="/register" className="flex items-center text-blue-600 text-decoration-none">
            <MdKeyboardArrowRight />
            <p>I want to create an AgVa account</p>
          </Link>
          <Link to="/forgetPassword" className="flex items-center text-blue-600 text-decoration-none">
            <MdKeyboardArrowRight />
            <p>Forgot your password?</p>
          </Link>
        </div>

        {/* Login button */}
        <div className="mt-6">
          {loading ? (
            <button className="w-full p-4 text-white rounded-md" style={{backgroundColor:'rgb(152, 0, 76)'}}>
              <SpinnerCustom height="40px" color='rgb(152, 0, 76)'/>
            </button>
          ) : (
            <button onClick={handleSubmit} className="w-full p-4 text-white rounded-md" style={{backgroundColor:'rgb(152, 0, 76)'}}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
