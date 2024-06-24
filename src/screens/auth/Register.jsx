import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitalData } from "../../store/action/StoreSystem";
import {
  VerifySMSOtpNumber,
  adminRegister,
  getOtpOnPhoneNumber,
} from "../../store/action/AdminAction";
import { Country } from "country-state-city";
import shield from "../../assets/icons/shield.png";
import Otpinput from "../auth/OtpInput";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { Toaster, toast } from "react-hot-toast";
import { Button, Modal } from "flowbite-react";
import Style from "../../css/Register.module.css";

import banner from "../../assets/images/banner.png";
function AddRegisterUser() {
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    hospitalName: "",
    email: "",
    confEmail: "",
    designation: "",
    department: "",
    phoneNum: "",
    passwordHash: "",
    confirmPassword: "",
    specality: "",
    registerAs: "",
    verifyKey: "",
  });
  const [checkbox, setCheckBox] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    otp: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setshowConfirmPwd] = useState(false);

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const getOtpOnNumberReducer = useSelector(
    (state) => state.getOtpOnNumberReducer
  );
  const { data: otpData, error, message } = getOtpOnNumberReducer;
  const VerifySMSOtpNumberReducer = useSelector(
    (state) => state.VerifySMSOtpNumberReducer
  );
  const {
    data: verifyData,
    error: err,
    message: msg,
  } = VerifySMSOtpNumberReducer;

  // hospital reducer
  const allHospitalDataReducer = useSelector(
    (state) => state.allHospitalDataReducer
  );
  const { data } = allHospitalDataReducer;
  const getHospitalData = data?.data;
  let getAllCountryData = Country.getAllCountries();
  useEffect(() => {
    dispatch(getAllHospitalData());
  }, [dispatch]);
  // state reducer
  const allStateReducer = useSelector((state) => state.allStateReducer);
  const { data: allStatesData } = allStateReducer;
  const stateData = allStatesData?.data;

  const [verifyBtn, setVerifyBtn] = useState("Verify number");
  const hoh = localStorage.getItem("verifyOtp");

  const handleDhrFile = useCallback((e) => {
    e.preventDefault();
    var regEx = /^\d{10}$/;
    if (!newUserData.phoneNum) {
      toast.error("Please Enter Number First");
    } else if (!regEx.test(newUserData.phoneNum)) {
      toast.error("Enter Correct 10 digit Number");
    } else if (regEx.test(newUserData.phoneNum)) {
      const number = newUserData.phoneNum;
      dispatch(getOtpOnPhoneNumber(number));
      if (!!hoh == false) {
        setVerifyBtn("Verified");
        props.setOpenModal(undefined);
      } else if (!!hoh === true) {
        setVerifyBtn("Verified");
        props.setOpenModal("pop-up");
      }
    }
  });

  useEffect(() => {
    dispatch(VerifySMSOtpNumber());
  }, []);

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const otp = state.otp;
    const {
      data: verifyData,
      error: err,
      message: msg,
    } = VerifySMSOtpNumberReducer;
    if (!otp) {
      toast.error("Enter OTP");
    } else {
      dispatch(VerifySMSOtpNumber(otp));
      // if (verifyOTP === "true") {
      //   setTimeout(() => {
      //     props.setOpenModal(undefined);
      //   }, 500);
      //   setVerifyBtn("Verified");
      // }
    }
  };

  const checkBoxCheck = () => {
    setCheckBox(true);
  };

  var regExKey = /^\d{6}$/;
  const exailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validSpaciality = "Select speciality";
  const valid = "Select roles";
  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (!newUserData.email) {
      toast.error("Enter email id");
    } else if (!exailValidation.test(newUserData.email)) {
      toast.error("Email id is not correct");
    } else if (!newUserData.confEmail) {
      toast.error("Enter confirm email");
    } else if (newUserData.email !== newUserData.confEmail) {
      toast.error("Email would be same");
    } else if (!newUserData.passwordHash) {
      toast.error("Enter Password");
    } else if (!newUserData.confirmPassword) {
      toast.error("Enter Confirmed Password");
    } else if (newUserData.passwordHash !== newUserData.confirmPassword) {
      toast.error("Password would be same");
    } else if (!newUserData.firstName) {
      toast.error("Enter First Name");
    } else if (!newUserData.lastName) {
      toast.error("Enter Last Name");
    } else if (!newUserData.specality) {
      toast.error("Enter speciality");
    } else if (newUserData.specality === validSpaciality) {
      toast.error("Select speciality");
    } else if (!newUserData.designation) {
      toast.error("Enter designation");
    } else if (newUserData.registerAs === valid) {
      toast.error("Enter register as an");
    } else if (!newUserData.hospitalName) {
      toast.error("Enter hospital name");
    } else if (!newUserData.department) {
      toast.error("Enter Department");
    } else if (!newUserData.phoneNum) {
      toast.error("Enter Phone Number");
    } else if (verifyBtn === "Verify number") {
      toast.error("Verify Number");
    } else if (checkbox === false) {
      toast.error("Click on checkbox");
    } else if (
      newUserData.firstName &&
      checkbox &&
      verifyBtn &&
      newUserData.lastName &&
      newUserData.hospitalName &&
      newUserData.designation &&
      newUserData.department &&
      newUserData.specality &&
      newUserData.email &&
      newUserData.passwordHash &&
      newUserData.phoneNum
    ) {
      dispatch(
        adminRegister({
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          hospitalName: newUserData.hospitalName,
          designation: newUserData.designation,
          department: newUserData.department,
          contactNumber: newUserData.phoneNum,
          email: newUserData.email,
          speciality: newUserData.specality,
          passwordHash: newUserData.passwordHash,
          securityCode: newUserData?.verifyKey,
          userType: newUserData?.registerAs,
        })
      );
    }
  };

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div className={Style.container} style={{ marginBottom: "5%" }}>
      <Toaster />
      <div>
        <img
          // src="https://logcat-bucket23.s3.ap-south-1.amazonaws.com/unnamed-11.png"
          src={banner}
          alt=""
          loading="lazy"
          className={Style.bannerImg}
        />
      </div>
      <div>
        <div style={{ padding: "3% 10% 3% 10%" }}>
          <p style={{ fontSize: "16px", color: "rgb(152, 0, 76)" }}>
            User information
          </p>
          <div className={Style.userInfoContainer}>
            <input
              onChange={(e) =>
                setNewUserData({ ...newUserData, email: e.target.value })
              }
              autoComplete="false"
              className={Style.userInputFiled}
              value={newUserData.email}
              type="email"
              placeholder="Enter email"
            />
            <div className={Style.userInputFiledPwrd}>
              <input
                onPaste={(e) => {
                  setNewUserData({
                    ...newUserData,
                    passwordHash: "aL8h%$498h5&29h",
                  });
                }}
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    passwordHash: e.target.value,
                  })
                }
                autoComplete="false"
                value={newUserData.passwordHash}
                type={showPassword ? "text" : "password"}
                style={{ border: "0px", width: "100%", padding: "15px" }}
                placeholder="Enter password"
              />
              <img
                style={{ opacity: "59%", width: "1.5rem", height: "1.5rem" }}
                loading="lazy"
                src={showPassword ? HidePassword : ShowPassword}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
            <input
              onChange={(e) =>
                setNewUserData({ ...newUserData, confEmail: e.target.value })
              }
              autoComplete="false"
              value={newUserData.confEmail}
              type="email"
              className={Style.userInputFiled}
              placeholder="Confirm email"
            />
            <div className={Style.userInputFiledPwrd}>
              <input
                style={{ border: "0px", width: "100%", padding: "15px" }}
                onPaste={(e) => {
                  setNewUserData({
                    ...newUserData,
                    confirmPassword: "aL8h%$498h5&29h",
                  });
                }}
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    confirmPassword: e.target.value,
                  })
                }
                autoComplete="false"
                value={newUserData.confirmPassword}
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm password"
              />
              <img
                style={{ opacity: "59%", width: "1.5rem", height: "1.5rem" }}
                loading="lazy"
                src={showConfirmPwd ? HidePassword : ShowPassword}
                onClick={() => {
                  setshowConfirmPwd(!showConfirmPwd);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ padding: "0% 10% 0% 10%" }}>
          <p style={{ fontSize: "16px", color: "rgb(152, 0, 76)" }}>
            Personal information
          </p>
          <div className={Style.userInfoContainer}>
            <input
              onChange={(e) =>
                setNewUserData({ ...newUserData, firstName: e.target.value })
              }
              value={newUserData.firstName}
              type="text"
              className={Style.userInputFiled}
              placeholder="First name"
            />
            <input
              onChange={(e) =>
                setNewUserData({ ...newUserData, lastName: e.target.value })
              }
              value={newUserData.lastName}
              type="text"
              className={Style.userInputFiled}
              placeholder="Last name"
            />

            <select
              onChange={(e) =>
                setNewUserData({ ...newUserData, specality: e.target.value })
              }
              value={newUserData.specality}
              id=""
              className={Style.selectInputFiled}
            >
              <option>Select speciality</option>
              <option>Neuro Surgen</option>
              <option>Neurology</option>
              <option>Anesthesia</option>
              <option>Nurse</option>
              <option>Cardiologist</option>
              <option>General Surgery</option>
              <option>Opthalomologist</option>
              <option>Orthopedic</option>
              <option>Pathologist</option>
              <option>Obstetrics</option>
              <option>Internal Medicines</option>
              <option>Radiology</option>
              <option>Plastic Surgery</option>
              <option>Pediatrics</option>
              <option>Gynaecology</option>
              <option>Psychiatry</option>
              <option>Energency Medicines</option>
              <option>Urology</option>
              <option>Gastroenterologist</option>
              <option>Hematologist</option>
              <option>Pulmonologist</option>
              <option>Nephrologist</option>
            </select>
            <select
              onChange={(e) =>
                setNewUserData({ ...newUserData, designation: e.target.value })
              }
              value={newUserData.designation}
              className={Style.selectInputFiled}
            >
              <option selected>Select designation</option>
              <option>Dr.</option>
              <option>Dr.Prof</option>
              <option>Prof.</option>
              <option>Nurse</option>
              <option>Support Staff</option>
              <option>Engineer</option>
              <option>Admin</option>
              <option>Owner</option>
            </select>
            <select
              onChange={(e) =>
                setNewUserData({ ...newUserData, registerAs: e.target.value })
              }
              value={newUserData.registerAs}
              className={Style.selectInputFiled}
            >
              <option selected>{valid}</option>
              <option>Doctor</option>
              <option>Assistant</option>
            </select>
            <input
              list="data"
              onChange={(e) =>
                setNewUserData({ ...newUserData, hospitalName: e.target.value })
              }
              value={newUserData.hospitalName}
              type="text"
              className={Style.userInputFiled}
              placeholder="Enter hospital name"
            />
            {newUserData?.hospitalName?.length > 0 ? (
              <datalist
                id="data"
                onChange={(e) =>
                  setNewUserData({
                    ...newUserData,
                    hospitalName: e.target.value,
                  })
                }
                value={newUserData.hospitalName}
              >
                {getHospitalData?.map((item, index) => {
                  return <option key={index}>{item.Hospital_Name}</option>;
                })}
              </datalist>
            ) : (
              ""
            )}
            <input
              onChange={(e) =>
                setNewUserData({ ...newUserData, department: e.target.value })
              }
              value={newUserData.department}
              type="text"
              className={Style.userInputFiled}
              placeholder="Enter department"
            />
            <div className={Style.userInputFiledPwrd}>
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <span>+91</span>
                <input
                  onChange={(e) => {
                    setNewUserData({
                      ...newUserData,
                      phoneNum: e.target.value,
                    });
                    newUserData?.phoneNum === ""
                      ? setVerifyBtn("Verify")
                      : setVerifyBtn("Verify");
                  }}
                  value={newUserData.phoneNum}
                  type="number"
                  className="w-4 h-4"
                  style={{ padding: "15px", border: "0px", width: "100%" }}
                  placeholder="Enter number"
                />
              </div>
              {newUserData?.phoneNum?.length > 9 ? (
                verifyBtn === "Verified" ? (
                  <button
                    onClick={handleDhrFile}
                    style={{
                      width: "20%",
                      height: "45px",
                      padding: "10px",
                      borderRadius: "99px",
                      border: "1px solid rgb(152, 0, 76)",
                      backgroundColor: "white",
                      color: "rgb(152, 0, 76)",
                      fontSize: "16px",
                    }}
                    disabled
                  >
                    {verifyBtn}
                  </button>
                ) : (
                  <button
                    onClick={handleDhrFile}
                    style={{
                      width: "20%",
                      height: "45px",
                      padding: "10px",
                      borderRadius: "99px",
                      border: "0px",
                      backgroundColor: "rgb(152, 0, 76)",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    {verifyBtn}
                  </button>
                )
              ) : (
                ""
              )}
            </div>
            {newUserData?.registerAs === "Doctor" ? (
              ""
            ) : (
              <input
                onChange={(e) =>
                  setNewUserData({ ...newUserData, verifyKey: e.target.value })
                }
                value={newUserData.verifyKey}
                autoComplete="false"
                className={Style.userInputFiled}
                placeholder="Enter 6 digit Key"
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              padding: "0% 5%",
            }}
          >
            {otpData?.statusCode === 201 && (
              <Modal
                show={props.openModal === "pop-up"}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <div class="mb-6">
                      <img
                        src={shield}
                        loading="lazy"
                        style={{
                          height: "3rem",
                          display: "block",
                          margin: "10px auto",
                        }}
                      />
                      <label
                        for="large-input"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter OTP Code
                      </label>
                      <div class="flex items-center" style={{ gap: "20px" }}>
                        <Otpinput setState={setState} state={state} />
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button onClick={handleSubmitOtp} color="failure">
                        Verify OTP
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
        <div style={{ padding: "0% 10% 0% 10%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              padding: "2% 5%",
              alignItems: "center",
            }}
          >
            <input
              onChange={checkBoxCheck}
              type="checkbox"
              style={{ width: "1.5rem", height: "1rem" }}
            />
            <p className={Style.paragraph}>
              For technical reasons, we ask you to check this box. Your consent
              only applies if you have provided this data.
            </p>
          </div>
        </div>
        <div style={{ padding: "0% 10% 0% 10%" }}>
          <div className={Style.btnContainer}>
            <button onClick={handleSubmitUser} className={Style.submitBtn}>
              Register
            </button>
            <button onClick={goBack} className={Style.backBtn}>
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRegisterUser;
