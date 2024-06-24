import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Style from "../../../css/EditDetailsModal.module.css";
const UpdateDetailsModal = ({ open, onClose,props }) => {
const handleSubmit=({ open, onClose })=>{

}
if(!open) return null
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className={'card darkModeColor'}>
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#IF99A4" }}
          >
            Update Device Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='card darkModeColor'>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="DeviceId"
              placeholder="Enter Your Device ID"
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Department</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="AliasName"
              placeholder="Enter Your Device Alias Name"
            //   onChange={(e) =>
            //     setUpdateDetails({ ...updateDetails, AliasName: e.target.value })
            //   }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Hospital Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="HospitalName"
              placeholder="Enter the Hospital Name"
            //   onChange={(e) =>
            //     setUpdateDetails({ ...updateDetails, HospitalName: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Doctor Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="DoctorName"
              placeholder="Enter Doctor's Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Ward Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="WardNo"
              placeholder="Enter Your Ward Number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">IMEI Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="IMEINumber"
              placeholder="Enter Your Device IMEI Number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Bio-Med</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="ventiOperator"
              placeholder="Enter Ventilator Operator's Name"
              required
            />
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
                backgroundColor: "rgb(152, 0, 76)", color: "rgb(152, 0, 76)", marginLeft: "10px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 30px #00000029",
                borderRadius: "10px"
              }}>
              Cancel
            </Button>
            <button
              style={{ backgroundColor: "rgb(152, 0, 76)", color: "#ffff", padding: "revert", border: "0px", borderRadius: "10px" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Update
            </button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateDetailsModal;