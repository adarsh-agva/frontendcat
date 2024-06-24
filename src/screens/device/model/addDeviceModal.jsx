import React, { useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerNewDevice } from "../../../store/action/DeviceAction";
import Style from "../../../css/AddProjectModal.module.css";
// import CreateProject from "../../projects/CreateProject";
// import { uploadNewProject } from "../../../store/action/ProjectAction";
// import { faL } from "@fortawesome/free-solid-svg-icons";


const AddDeviceModal = (props) => {
  const [registerDevice, setRegisterDevice] = useState({
    DeviceId:"",
    Doctor_Name:"",
    Hospital_Name:"",
    AliasName:"",
    IMEI_NO:"",
    Ventilator_Operator:"",
    Ward_No:"",
    
  });
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [modalShow,setModalShow] = useState(false);
  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { data, error } = createNewProjectReducer;

  const dispatch = useDispatch();

  const  handleSubmit= (e) =>{
    e.preventDefault();
    setErrorName("");
    setErrorMsg("");
    // if(!registerDevice.DoctorName){
    //   setErrorName("Device ID is Mandatory");
    // }
    // if(!HospitalName.length){
    //   setErrorName("Hospital's Name is Required Field");
    // }
    if(registerDevice.DeviceId && registerDevice.Doctor_Name && registerDevice.Hospital_Name && registerDevice.AliasName && registerDevice.IMEI_NO && registerDevice.Ward_No && registerDevice.Ventilator_Operator){
      setErrorName("");
      setErrorMsg("");
      alert("Device Registered Successfully")
      setModalShow(false);
      dispatch(
        registerNewDevice(
          registerDevice.DeviceId,
          registerDevice.Doctor_Name,
          registerDevice.Hospital_Name,
          registerDevice.AliasName,
          registerDevice.IMEI_NO,
          registerDevice.Ward_No,
          registerDevice.Ventilator_Operator,

        ),
      )
    }

  }
  return(
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <Modal.Header className="card darkModeColor">
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#1F99A4" }}
          >
            Register New Device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card darkModeColor">
          {error ? (
            <div style={{ fontSize: 12, color: "red" }}>{error}</div>
          ) : (
            ""
          )}
          {data ? (
            <h6 style={{ fontSize: 12, color: "green" }}>
             Device Registered Successfully...
            </h6>
          ) : (
            ""
          )}
           <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Enter Your Device ID"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  DeviceId: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group>
          </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Alias Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter an Alias Name for the Ventilator"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  AliasName: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Doctor Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Doctor Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice, Doctor_Name: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Hospital Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Hospital Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  Hospital_Name: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ventilator IMEI Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter IMEI Number"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,   IMEI_NO: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ventilator Operator</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please enter Ventilator Operator's Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  Ventilator_Operator: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ward Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Ward Number"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,   Ward_No: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          </Modal.Body>
          <Modal.Footer className="card darkModeColor">
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              onClick={props.onHide}
              style={{ backgroundColor: "#1a83ff", marginLeft: "10px" }}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#1a83ff" }}
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Register
            </Button>
          </section>
        </Modal.Footer>

    </Modal>
    </>
  )
}
export default AddDeviceModal;