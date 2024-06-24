import React, { useContext, useEffect, useState } from "react";
import {
  forgetPassword,
  resetForgetPassword,
  resetForgetPasswordState,
} from "../../store/action/AdminAction";
import email from "../../assets/images/email.png";
import Style from "../../css/Forgetpassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";

function ForgetPassword() {
  const [forgetEmail, setForgetEmail] = useState();
  const [forgetEmailErr, setForgetEmailErr] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const forgetPasswordReducer = useSelector(
    (state) => state.forgetPasswordReducer
  );
  const { loading, data, error } = forgetPasswordReducer;
  const email = forgetEmail
  var regEx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
  const handleForgetPassword = (e) => {
    e.preventDefault()
    if (!forgetEmail) {
      return toast.error('Enter Registered Email')
    }
    else if (!regEx.test(forgetEmail)) {
      toast.error('Enter Valid Email Id')
    }
    else {
      dispatch(forgetPassword(email))
      if (data && data.statusCode === 200) {
        localStorage.setItem('forgetEmail', email)
        navigate("/resetpassword")
        setForgetEmailErr(null)
      }
    }
  }
useEffect(()=>{dispatch(forgetPassword())},[])
  return (
    <>
      <Toaster />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: "10rem",
        }}
      >
        <div className={Style.main}>
          <section className={Style.forget}>
            <div className={Style.LoginTitle}>
              <p className={Style.headerText}>Forgot Password</p>
            </div>
            <div className={Style.heroSection}>
              <div className="paragraph-title">
                <p
                  className={Style.innerText}
                >
                  Enter your email for the verification process, we will send 4
                  digits code to your email.
                </p>
              </div>
              <div className="Form-card">
                <form>
                  <div className={Style.inputusername}>Email Id</div>
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      className={
                        forgetEmailErr
                          ? `${Style.imputFieldsError}  darkModebgColor`
                          : `${Style.imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={email} style={{ width: "1.2rem", opacity: "0.59" }} />
                      </span>
                      <span style={{ color: "black", opacity: "0.59" }}>|</span>
                      <input
                        style={{ border: "0px" }}
                        type="email"
                        className="form-control registerForminput "
                        autoComplete="Enter your Email"
                        onChange={(e) => { setForgetEmail(e.target.value); }}
                        value={forgetEmail}
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>
                  {forgetEmailErr != null ? (
                    <small style={{ color: "red" }}>{forgetEmailErr}</small>
                  ) : forgetEmailErr ? (
                    <small style={{ color: "red" }}>{forgetEmailErr}</small>
                  ) : (
                    ""
                  )}
                  <span>{error}</span>
                  <section className={Style.bottomSection}>
                    {loading ? (
                      <SpinnerCustom height="5%" />
                    ) : (
                      <button
                        className={Style.emailbtn}
                        onClick={handleForgetPassword}
                      >
                        Continue
                      </button>
                    )}
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <span className={Style.backLogin}>Back to Login</span>
                    </Link>
                  </section>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default ForgetPassword
