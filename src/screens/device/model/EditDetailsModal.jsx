import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewDevice } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";
import { Toaster, toast } from 'react-hot-toast';
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem';

const EditDetailsModal = (props) => {
  const { item } = props;
  const [EditDetails, setEditDetails] = useState({
    DeviceId: item,
    Department_Name: '',
    Hospital_Name: '',
    Doctor_Name: '',
    Ward_No: '',
    IMEI_No: '',
    Bio_Med: '',
    Alias_Name: ''
  });
  const [errorName, setErrorName] = useState();
  const dispatch = useDispatch();


  // Hpospital Data
  const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
  const { data: dataHospital } = getHospitalFromAdding;

  useEffect(() => {
    dispatch(getHospitalDataFromAdding())
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorName("");
    if (!EditDetails && EditDetails.Department_Name) {
      toast.error('Please Fill Department Name')
    }
    else if (!EditDetails && EditDetails.Alias_Name) {
      toast.error("Enter Alias Name")
    }
    else if (!EditDetails && EditDetails.Hospital_Name) {
      toast.error('Please Fill Hospital Name')
    }
    else if (!EditDetails && EditDetails.Doctor_Name) {
      toast.error('Please Fill Doctor Name')
    }
    else if (!EditDetails && EditDetails.Ward_No) {
      toast.error('Please Fill Ward Number')
    }
    else if (!EditDetails && EditDetails.IMEI_No) {
      toast.error('Please Fill IMEI Number')
    }
    else if (!EditDetails && EditDetails.Bio_Med) {
      toast.error('Please Fill Bio Med Number')
    }
    else if (item && EditDetails.Department_Name && EditDetails.Alias_Name && EditDetails.Ward_No && EditDetails.Hospital_Name && EditDetails.Doctor_Name && EditDetails.IMEI_No && EditDetails.Bio_Med) {
      setErrorName("");
      dispatch(
        registerNewDevice(
          {
            DeviceId: item,
            DepartmentName: EditDetails.Department_Name,
            HospitalName: EditDetails.Hospital_Name,
            DoctorName: EditDetails.Doctor_Name,
            Wardno: EditDetails.Ward_No,
            IMEINumber: EditDetails.IMEI_No,
            VentiOperator: EditDetails.Bio_Med,
            AliasName: EditDetails.Alias_Name,
            deviceType:props?.projectName
          }
        ),
      );
      setTimeout(() => {
        window.location.reload()
        props.onHide();
      }, 500);
    }
  }
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Toaster />
        <Modal.Header className={'card darkModeColor'}>
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#707070" }}
          >
            Register Device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='card darkModeColor'>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="DeviceId"
              value={item}
              placeholder="Enter Your Device ID"
              readOnly
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Alias Name</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="Alias_Name"
              value={EditDetails.Alias_Name}
              placeholder="Enter Alias Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Alias_Name: e.target.value })
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
            <Form.Label className="darkModeColor">Department</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="Department_Name"
              value={EditDetails.Department_Name}
              placeholder="Enter Department Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Department_Name: e.target.value })
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
            <input
              className={Style.inputFields}
              type="text"
              list='data'
              name="HospitalName"
              value={EditDetails.Hospital_Name}
              placeholder="Enter the Hospital Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Hospital_Name: e.target.value })
              }
              required
            />
            {/* <input list='data' type="text"  id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required /> */}
            <datalist id='data'>
              {dataHospital && dataHospital.map((item) => {
                return (
                  <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                )
              })}
            </datalist>

            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Doctor Name</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="DoctorName"
              value={EditDetails.Doctor_Name}
              placeholder="Enter Doctor's Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Doctor_Name: e.target.value })
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
            <Form.Label className="darkModeColor">Ward Number</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="WardNo"
              value={EditDetails.Ward_No}
              placeholder="Enter Ward Number"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Ward_No: e.target.value })
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
            <Form.Label className="darkModeColor">IMEI Number</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="IMEINumber"
              value={EditDetails.IMEI_No}
              placeholder="Enter Device IMEI Number"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, IMEI_No: e.target.value })
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
            <Form.Label className="darkModeColor">Bio-Med</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="ventiOperator"
              value={EditDetails.Bio_Med}
              placeholder="Enter Bio-Med Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails, Bio_Med: e.target.value })
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
              style={{
                color: "rgb(152, 0, 76)", marginLeft: "10px", background: "#0000 0% 0% no-repeat padding-box", boxShadow: "0px 0px 30px #00000029",
                borderRadius: "10px"
              }}
            >
              Cancel
            </Button>
            <button
              style={{ backgroundColor: "rgb(152, 0, 76)", color: "#fff", padding: "revert", border: "0px", borderRadius: "10px" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Register
            </button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default EditDetailsModal