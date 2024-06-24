import React,{useState} from 'react';
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsById, updateDetailsById } from '../../../store/action/DeviceAction';

import Style from "../../../css/EditDetailsModal.module.css";

const EditDetailsModal = (props) =>{
    const [EditDetails, setEditDetails] = useState({
        DeviceId:props.data.did,
        // AliasName:props.data.AliasName,
        // Hospital_Name:props.data.Hospital_Name,
        // Doctor_Name:props.data.Doctor_Name,
        // Ward_No:props.data.Ward_No,
        // IMEI_NO:props.data.IMEI_NO,
        // Ventilator_Operator:props.data.Ventilator_Operator
    });
    // console.log(props.data.did)
    // console.log(EditDetails.did)
      function handleChange (event){
        setEditDetails(event.target.value);
      }
    //   function handleData(props){
    //     EditDetails(props.data)
    //   }
    //   console.log(EditDetails.DeviceId)
      const [errorName, setErrorName] = useState();
      const [errorMsg, setErrorMsg] = useState();
      const [modalShow,setModalShow] = useState(false);
    //   const getAllLogByDeviceIdReducer = useSelector(
    //     (state)=>state.getAllLogByDeviceIdReducer
    //   );
    //   const {data,error} = getAllLogByDeviceIdReducer;
    //   console.log('data',getAllLogByDeviceIdReducer)
    console.log(getDetailsById)

      const dispatch = useDispatch();
      console.log(getDetailsById)
      const handleSubmit=(e)=>{
        e.preventDefault();
        setErrorName("");
        setErrorMsg("");
        if(EditDetails.DeviceId){
            setErrorName("");
            setErrorMsg("");
            setModalShow(false);
            alert("Device Updated Successfully");
            dispatch(
                getDetailsById(
                    // EditDetails.DeviceId,
                    // EditDetails.AliasName,
                    // EditDetails.Hospital_Name,
                    // EditDetails.Doctor_Name,
                    // EditDetails.Ward_No,
                    // EditDetails.IMEI_NO,
                    // EditDetails.Ventilator_Operator
                ),
            )
        }
      }
   return(
    <>
    <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header className="card darkModeColor">
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#1F99A4" }}
          >
            Device Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='card darkModeColor'>
           <div>
            <table className={Style.table}>
                <tr className={Style.tr}>
                    <th className={Style.th}>Device ID</th>
                    {/* <td>{props.data.DeviceId}</td> */}
                    <input type="text" name="DeviceId" value={EditDetails.DeviceId} onChange={(e)=>setEditDetails({...EditDetails,DeviceId:e.target.value})}></input>
                </tr>
                <tr>
                    <th>Alias Name</th>
                    {/* <td>{props.data.AliasName}</td> */}
                    <input type="text" name="AliasName" value={EditDetails.AliasName} onChange={handleChange}></input>
                </tr>
                <tr>
                    <th>Hospital Name</th>
                    {/* <td>{props.data.Hospital_Name}</td> */}
                    <input type="text" name="Hospital_Name" value={EditDetails.Hospital_Name} onChange={handleChange}></input>

                </tr>
                <tr>
                    <th>Doctor Name</th>
                    {/* <td>{props.data.Doctor_Name}</td> */}
                    <input type="text" name="Doctor_Name" value={EditDetails.Doctor_Name} onChange={handleChange}></input>

                </tr>
                <tr>
                    <th>Ward Number</th>
                    {/* <td>{props.data.Ward_No}</td> */}
                    <input type="text" name="Ward_No" value={EditDetails.Ward_No} onChange={handleChange}></input>

                </tr>
                <tr>
                    <th>IMEI Number</th>
                    {/* <td>{props.data.IMEI_NO}</td> */}
                    <input type="text" name="IMEI_NO" value={EditDetails.IMEI_NO} onChange={handleChange}></input>

                </tr>
                <tr>
                    <th>Ventilator Operator</th>
                    {/* <td>{props.data.Ventilator}</td> */}
                    <input type="text" name="Ventilator_Operator" value={EditDetails.Ventilator_Operator} onChange={handleChange}></input>

                </tr>
                <br/>
                <br/>
                <tr>
                    <button className={Style.Savebtn} onClick={(e)=>handleSubmit(e)}>Save</button>
                </tr>
            </table>
           </div>
            
            {/* <h1>{props.data.DeviceId}</h1> */}
        </Modal.Body>
    </Modal>
    </>
   )
// return(
//     <>
//     <Modal
//     {...props}
//     size="lg"
//     aria-labelledby="contained-modal-title-vcenter"
//     centered
//     >
//         <Modal.Header className='card darkModeColor'>
//             <Modal.title
//              id="contained-modal-title-vcenterv"
//              style={{ color: "#1F99A4" }}
//             >
//                 Device Details
//             </Modal.title>
//         </Modal.Header>
//         <Modal.Body className='card darkModeColor'>
//             {/* {error ? (
//                 <div style={{fontsize:12,color:"red"}}>{error}</div>
//             ):(
//                 ""
//             )}
//             {data ? (
//                 <h6 style={{fontsize:12,color:"green"}}>
//                     Device Updated Successfully
//                 </h6>
//             ):(
//                 ""
//             )} */}
//             <Form.Group className='mb-3' controlId="formBasicPassword">
//                 <Form.Label className="darkModeColor">Device ID</Form.Label>
//                 <Form.Control
//                     className={Style.inputFields}
//                     type="text"
//                     placeholder="Enter your Device ID"
//                    onChange={(e)=>setEditDetails({...EditDetails,DeviceId:e.target.value})}
//                    value={EditDetails.DeviceId}
//                    />

//             </Form.Group>
//         </Modal.Body>
//     </Modal>
//     </>
// )
}
export default EditDetailsModal;