/* eslint-disable */

import React, { useState, useEffect } from "react";
import Style from "../../css/ResetPassword.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetForgetPassword } from "../../store/action/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import Timer from "../analytics/Components/Timer";
import { forgetPassword } from "../../store/action/AdminAction";
import OtpInput from "./OtpInput";
import SpinnerCustom from "../../container/SpinnerCustom";

export default function ResetPassword() {
  const [state, setState] = useState({
    otp: null,
    newPass: null,
    confirmPass: null,
  });

  const [stateErr, setStateErr] = useState({ err: null, inputErr: null });
  const [enableResendButton, setEnableResendButton] = useState(false);

  const resetPasswordReducer = useSelector(
    (state) => state.resetPasswordReducer
  );

  const { loading, data, error } = resetPasswordReducer;
  const handleEnableButton = () => {
    if (enableResendButton) setEnableResendButton(true);
    else setEnableResendButton(true);
  };
  // const email = JSON.parse(localStorage.getItem("forgetEmail"));
const email=localStorage.getItem('forgetEmail')
  const handleResendButton = () => {
    setEnableResendButton(false);
    if (enableResendButton) {
      dispatch(forgetPassword(email));
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetData = state && state.otp

  useEffect(() => {
    dispatch(resetForgetPassword(resetData))
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state && state.otp && state.otp.length <= 3) {
      toast.error('Please Fille OTP')
    }
    else {
      dispatch(resetForgetPassword(resetData));
      if (data && data.statusCode === 200) {
        navigate("/changePassword")
      }
    }
  }

  useEffect(() => {
    if (data && data.statusCode === 200) {
      // navigate("/changePassword")
    }
  }, [navigate,handleSubmit])

  useEffect(() => { }, [enableResendButton]);
  return (
    <>
      <Toaster />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <div className={Style.main}>
          <section className={Style.Reset}>
            <div className={Style.LoginTitle}>
              <p className={Style.headerText}>Enter 4 Digits Code</p>
            </div>
            <div className={Style.heroSection}>
              <section>
                {/*OTP section*/}
                <section>
                  <p className="darkModeColor my-3" style={{ color: "gray" }}>
                    Enter 4 Digits code that you received on your {email}
                  </p>
                  <section className={Style.OPTTIMR}>
                    <OtpInput setState={setState} state={state} />
                  </section>
                </section>
              </section>
              <section className="Form-card">
                <form>
                  {!enableResendButton ? (
                    <Timer
                      resetTimer={handleEnableButton}
                      initialMinute={1}
                      initialSeconds={59}
                    />
                  ) : (
                    <section>
                      <p
                        style={{
                          cursor: enableResendButton ? "pointer" : null,
                          color: enableResendButton
                            ? "#257d7c"
                            : "rgb(56, 56, 56, 0.5)",
                        }}
                        className={enableResendButton ? "cpactiveText" : null}
                        onClick={handleResendButton}
                      >
                        Resend OTP
                      </p>
                    </section>
                  )}
                  <span>{error?error:''}</span>
                  <section className={Style.bottomSection}>
                    {loading ? (
                      <SpinnerCustom height="5%" />
                    ) : (
                      <button className={Style.emailbtn} onClick={handleSubmit}>
                        Continue
                      </button>
                    )}
                    <p style={{ fontSize: "0.8rem", padding: "0rem 6rem" }}>
                      Did not recive OTP? check your email or{" "}
                      <Link
                        to="/forgetPassword"
                        style={{ textDecoration: "none" }}
                      >
                        try another email address
                      </Link>
                    </p>
                  </section>
                </form>
              </section>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
