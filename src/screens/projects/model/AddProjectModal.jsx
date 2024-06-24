import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewProject } from "../../../store/action/ProjectAction";
import Style from "../../../css/AddProjectModal.module.css";
import { toast } from "react-hot-toast";

const AddProjectModal = (props) => {
  const [createProject, setCreateProject] = useState({
    name: "",
    description: "",
    modeType:""
  });
  // const [chips, setChips] = useState("");
  // const [modelType, setModelType] = useState("");
  // const [modeType,setModeType]=useState("")
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [descErrorMsg, setDescErrorMsg]=useState()

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { data, error } = createNewProjectReducer;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorMsg("");
    setDescErrorMsg("");
    const project_name=createProject.name
    const project_description=createProject.description
    const provide_device_type=createProject.modeType
    // setModeType(createProject.modeType)
    console.log("hello",project_name,project_description,provide_device_type)
    if (!createProject.name.length) {
      setErrorName("Name is required Field.");
    }
    if(!createProject.description.length){
      setErrorMsg("Description is required Field.")
    }
    if(!createProject.modeType.length){
      setDescErrorMsg("type is required Field.")
    }
    if (createProject.name && createProject.modeType) {
      setErrorName("");
      setErrorMsg("");
      dispatch(
        uploadNewProject({
          project_name,
          project_description,
          provide_device_type,
        })
      );
    }
  };
  console.log("data", createProject.name, createProject.description,createProject.modeType);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={Style.form_cntainer}
        style={{ borderRadius: "25px" }}
      >
        <Modal.Header
          className={Style.darkModeColor}
          style={{ border: "0px", justifyContent: "center" }}
        >
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "rgb(152, 0, 76)" }}
          >
            Add New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card darkModeColor" style={{ border: "0px" }}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Project Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Project Name"
              onChange={(e) =>
                setCreateProject({ ...createProject, name: e.target.value })
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
            <Form.Label className="darkModeColor">Description</Form.Label>
            <Form.Control
              className={Style.inputFields}
              as="textarea"
              rows={3}
              type="textarea"
              placeholder="Please Provide Project description"
              onChange={(e) =>
                setCreateProject({
                  ...createProject,
                  description: e.target.value,
                })
              }
            />
            {errorMsg ? (
              <small style={{ fontSize: 12, color: "red" }}>{errorMsg}</small>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3  " controlId="formBasicPassword">
            <Form.Label className="darkModeColor">
              Provide Device type
            </Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Provide Project Type"
              onChange={(e) =>
                setCreateProject({
                  ...createProject,
                  modeType: e.target.value,
                })
              }
            />
            <div>
            </div>
            {descErrorMsg ? (
              <small style={{ fontSize: 12, color: "red" }}>{descErrorMsg}</small>
            ) : (
              ""
            )}
          </Form.Group>

          <section className={Style.tagItemsOuter}>
            {/* {modelType.map((type) => (
              <div className={Style.tag_item} key={type}>
                {type}
                <button
                  type="button"
                  // onClick={() => {
                  //   deleteChips(type);
                  // }}
                >
                  &times;
                </button>
              </div>
            ))} */}
          </section>
        </Modal.Body>
        <Modal.Footer className="card darkModeColor">
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <button
              onClick={props.onHide}
              style={{
                border: "0px",
                borderRadius: "10px",
                background: "linear-gradient(180deg, #FFF 0%, #EDEDED 100%)",
                boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.25)",
                padding: "8px 20px",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                border: "0px",
                borderRadius: "10px",
                color: "white",
                boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.25)",
                padding: "8px 20px",
                background: "linear-gradient(180deg, rgb(152, 0, 76) 0%, #B00059 100%)",
              }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save
            </button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProjectModal;
