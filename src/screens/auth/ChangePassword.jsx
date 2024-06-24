import React, { useState } from "react";
import Style from "../../css/ChangePassword.module.css";
import lock from "../../assets/images/lock.png";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { useDispatch } from "react-redux";
import {forgetPasswordChange} from "../../store/action/AdminAction";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
function ChangePassword() {
  const [state,setState] =useState({newPass: null,confirmPass: null });
  const [stateErr, setStateErr] = useState({ err: null, inputErr: null });
    const [showPassword, setShowPassword] =useState({
      new: false,
      confime: false,
    });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onConfirmChange = () => {
    if (state.newPass == null || !state.confirmPass == null) {
      toast.error("Please provide all the required field!");
    }
    if (state.newPass == state.confirmPass) {
        setStateErr({ err: null, inputErr: null });
        toast.success("Password Update Successfully")
        const femail=localStorage.getItem("forgetEmail")
        const email=femail.replace(/[""]/g,"")
        dispatch(forgetPasswordChange({email, resetData: state }));
        navigate("/")
      } else {
        toast.error("Passwords are not matching");
      }
  };
  return (
    <>
      <Toaster />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <div className={Style.main}>
          <section className={Style.Reset}>
            <div className={Style.LoginTitle}>
              <p className={Style.headerText}>Set New Password</p>
            </div>
            <div className={Style.heroSection}>
              <p className="darkModeColor my-3" style={{ color: "gray" }}>
                Set the new password to your account.
              </p>
              {/* Password */}
              <div className={Style.formDiv}>
                <div className={Style.inside_formDiv}>
                  <p className={Style.inputusername}>New Password</p>
                  <div className={Style.imputFields}>
                    <span className="ms-2">
                      <img src={lock} style={{ width: "1.2rem" }} />
                    </span>
                    <span style={{ color: "black" }}>|</span>
                    <input
                      type={showPassword.new ? "text" : "password"}
                      className="form-control registerForminput "
                      onChange={(e) =>
                        setState({ ...state, newPass: e.target.value })
                      }
                      placeholder="Enter Your Password"
                    />
                    <span className="px-2" style={{ cursor: "pointer" }}>
                      <img
                        style={{ width: "1.2rem", opacity: "59%" }}
                        size="lg"
                          src={showPassword.new ? HidePassword : ShowPassword}
                          onClick={() => {
                            setShowPassword({
                              ...showPassword,
                              new: !showPassword.new,
                            });
                          }}
                      />
                    </span>
                  </div>
                </div>
                {/* confirm Password */}
                <div className={Style.inside_formDiv}>
                  <p className={Style.inputusername}>Confirm New Password</p>
                  <div className={`${Style.imputFields}`}>
                    <span className="ms-2">
                      <img src={lock} style={{ width: "1.2rem" }} />
                    </span>
                    <span style={{ color: "black" }}>|</span>
                    <input
                      type={showPassword.confirmPass ? "text" : "password"}
                      className="form-control LoginForminput "
                      placeholder="Enter your new password"
                      autoComplete="Enter you new password"
                      onChange={(e) =>
                        setState({ ...state, confirmPass: e.target.value })
                      }
                    />
                    <span className="px-2" style={{ cursor: "pointer" }}>
                      <img
                        style={{ width: "1.2rem", opacity: "59%" }}
                        size="lg"
                        src={showPassword.passwordHash ? HidePassword : ShowPassword}
                        onClick={() => {
                          setShowPassword({
                            ...showPassword,
                            confirmPass: !showPassword.confirmPass,
                          });
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <button className={Style.emailbtn} onClick={onConfirmChange}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default ChangePassword;
