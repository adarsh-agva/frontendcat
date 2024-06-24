import React from "react";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button } from "react-bootstrap";
import CustomeDropDown from "../../container/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "../../css/UpdateProfile.module.css";

const UpdatePassword = ({
  error,
  showPassword,
  currentpassword,
  setCurrentPassword,
  setShowPassword,
  newPassword,
  setNewPassword,
  confirmNewpassword,
  setConfirmNewPassword,
  updatePasswordFun,
}) => {
  return (
    <Col xl={6} md={12} sm={12}>
      <CustomeDropDown
        padding="30px"
        marginRight="10px"
        top="0%"
        zIndex="8"
        height="600px"
      >
        <form>
          <h3 className="mb-4 darkModeColor">Change password</h3>
          {/* password field */}
          <section className="mt-4 darkModeColor">
            <h5>Current Password</h5>

            <div
              className={
                error
                  ? `${Style.imputFieldsError} darkBgColorSec`
                  : `${Style.imputFields} mt-2 darkBgColorSec`
              }
            >
              <span className="ms-2">
                <FontAwesomeIcon icon={faLock} size="lg" />
              </span>
              <input
                type={showPassword.currentpasswordShow ? "text" : "password"}
                autoComplete={"Enter your currnet password"}
                value={currentpassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                className="form-control LoginForminput "
                placeholder="Enter your current password"
              />
              <span className="ms-2">
                <FontAwesomeIcon
                  icon={showPassword.currentpasswordShow ? faEye : faEyeSlash}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      currentpasswordShow: !showPassword.currentpasswordShow,
                    })
                  }
                />
              </span>
            </div>
            <p style={{ color: "red", fontSize: ".8rem" }}>{error}</p>
          </section>
          {/* new password field */}
          <section className="mt-4 darkModeColor">
            <h5>New Password</h5>
            <div
              className={
                error
                  ? `${Style.imputFieldsError} darkBgColorSec`
                  : `${Style.imputFields} mt-2 darkBgColorSec`
              }
            >
              <span className="ms-2">
                <FontAwesomeIcon icon={faLock} size="lg" />
              </span>
              <input
                type={showPassword.newPasswordShow ? "text" : "password"}
                autoComplete={"Enter your new password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="form-control LoginForminput "
                placeholder="Enter your new password"
              />
              <span className="ms-2">
                <FontAwesomeIcon
                  icon={showPassword.newPasswordShow ? faEye : faEyeSlash}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPasswordShow: !showPassword.newPasswordShow,
                    })
                  }
                />
              </span>
            </div>
            <p style={{ color: "red", fontSize: ".8rem" }}>{error}</p>
          </section>
          {/* confirme password field */}
          <section className="mt-4 darkModeColor">
            <h5>Confirm New Password</h5>
            <div
              className={
                error
                  ? `${Style.imputFieldsError} darkBgColorSec`
                  : `${Style.imputFields} mt-2 darkBgColorSec`
              }
            >
              <span className="ms-2">
                <FontAwesomeIcon icon={faLock} size="lg" />
              </span>
              <input
                type={showPassword.confirmNewpasswordShow ? "text" : "password"}
                autoComplete={"Confirm your new password"}
                value={confirmNewpassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                className="form-control LoginForminput "
                placeholder="Confirm your new password"
              />
              <span className="ms-2">
                <FontAwesomeIcon
                  icon={showPassword.confirmNewpasswordShow ? faEye : faEyeSlash}
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmNewpasswordShow:
                        !showPassword.confirmNewpasswordShow,
                    })
                  }
                />
              </span>
            </div>
            <p style={{ color: "red", fontSize: ".8rem" }}>{error}</p>
          </section>
          <p className="mt-4" style={{ color: "red", fontSize: ".8rem" }}>
            {error}
          </p>

          <Row className={Style.buttonbackground}>
            <Col className={Style.buttonbackground}>
              <Button className="mt-4" onClick={(e) => updatePasswordFun(e)}>
                Update
              </Button>
            </Col>
          </Row>
        </form>
      </CustomeDropDown>
    </Col>
  );
};

export default UpdatePassword;
