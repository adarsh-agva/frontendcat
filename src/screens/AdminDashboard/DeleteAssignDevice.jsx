import React, { useEffect, useState } from "react";
import Style from "../../css/DeviceDelete.module.css";
import { Toaster, toast } from "react-hot-toast";
import closeImg from "../../assets/icons/cancel.png";
import { useDispatch, useSelector } from "react-redux";
import { deviceDataDeleteAction, deviceDeleteAction } from "../../store/action/AdminDashboard";

function DeleteAssignDevice() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get("userId");
  localStorage.setItem("userId", userId)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(deviceDeleteAction())
  }, [dispatch])
  const [selectId, setSelectId] = useState([]);
  const deviceDeleteReducer = useSelector((state) => state.deviceDeleteReducer);
  const { data } = deviceDeleteReducer;
  const deleteData = data && data.data && data.data.Assigned_Devices
  const goBack = () => {
    window.history.go(-1)
  }
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the value to the array if the checkbox is checked
      setSelectId([...selectId, value]);
    } else {
      // Remove the value from the array if the checkbox is unchecked
      setSelectId(selectId.filter((item) => item !== value));
    }
  };
  const deleteAssignBtn = () => {
    if (!selectId.length) {
      toast.error("No Device Selected")
    }
    else {
      dispatch(deviceDataDeleteAction({ userId, DeviceId: selectId }))
      toast.success("success")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }
  return (
    <div id={Style.popup}>
      <Toaster />
      <div className={Style.closebtn}>
        <img src={closeImg} className={Style.closeBtn} onClick={goBack} />
      </div>
      {deleteData ?
        <div className={Style.popupData}>
          {deleteData && deleteData.map((item) => {
            return (
              <div className={Style.deviceIds}>
                <div className={Style.input_deviceID}>
                  <input
                    type="checkbox"
                    value={item.DeviceId}
                    onChange={(e) => handleChange(e)}
                    checked={selectId.includes(item.DeviceId)}
                  />
                  <span>{item.DeviceId}</span>
                </div>
              </div>
            );
          })}
        </div>
        : <div className={Style.noPopupData} style={{ height: "50%", textAlign: "center" }}>
          <span style={{ fontSize: "1.5rem" }}>No Device Assigned</span>
        </div>}
      <div className={Style.assignBtnClass}>
        {deleteData ?
          <button className={Style.assignBtn} onClick={deleteAssignBtn}>Delete</button>
          : ""}
      </div>
    </div>
  );
}

export default DeleteAssignDevice;
