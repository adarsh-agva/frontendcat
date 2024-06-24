import React, { useState } from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link, useHref } from "react-router-dom";
import { getAboutSectionById } from '../../../src/store/action/DeviceAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDHRUploadFile, getdispatchDetailsByDeviceIdAction, getproductionDetailsByIdAction } from '../../store/action/DispatchDetailsAction';
// import Style from "../../css/AboutSectionModule.css"
import { Button, Modal } from 'flowbite-react';
import NavBarForAll from '../../utils/NavBarForAll';
import { Card } from 'flowbite-react';

function About() {
  const productionAllDetailsByUserIdReducer = useSelector((state) => state.productionAllDetailsByUserIdReducer);
  const { data: dataa } = productionAllDetailsByUserIdReducer;
  const getDispatchData = dataa && dataa.data
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("projectName");
  const code = urlParams.get('code');
  const deviceId = urlParams.get('DeviceId')
  const dispatchAllDetailsByIdReducer = useSelector((state) => state.dispatchAllDetailsByIdReducer)
  const { data: dispatchData } = dispatchAllDetailsByIdReducer
  const deviceAssignData = dispatchData && dispatchData.data
  const dispatch = useDispatch();
  useEffect(() => {
    return (() => {
      dispatch(
        getproductionDetailsByIdAction(deviceId)
      )
    })
  }, ([]))
  useEffect(() => {
    return (() => {
      dispatch(getdispatchDetailsByDeviceIdAction(deviceId))
    })
  }, [])
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const getdhrqualityFileReducer = useSelector((state) => state.getdhrqualityFileReducer);
  const { data } = getdhrqualityFileReducer;
  const did = urlParams.get('DeviceId')
  useEffect(() => {
    return (() => {
      dispatch(
        getAboutSectionById(did)
      )
    })
  }, ([dispatch]))
  const handleDhrFile = () => {
    const key = 'DHR-FILE'
    dispatch(getDHRUploadFile(deviceId, key))
    props.setOpenModal('pop-up')
  }
  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "1rem", width: "93%" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#707070" }}
          >
            <Link to={`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${did}`}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>About</h4>
          </div>
          {/* Details */}
          <div>
            <div
              style={{ width: '100%' }}
            >
              <Card
              >
                <form className='flex  flex-wrap' style={{ gap: '2rem' }}>
                  <div className="flex flex-col gap-4">
                    <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Product:</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{deviceAssignData && deviceAssignData.product_type && deviceAssignData.product_type.length > 0 ? deviceAssignData.product_type : '- - -'}</h5>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Delivery Date:</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{deviceAssignData && deviceAssignData.date_of_dispatch && deviceAssignData.date_of_dispatch.length > 0 ? deviceAssignData.date_of_dispatch : '- - -'}</h5>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Batch No:</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.batchNumber && getDispatchData.batchNumber.length > 0 ? getDispatchData.batchNumber : '- - -'}</h5>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Date of Warranty:</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.dispatchDate && getDispatchData.dispatchDate.length > 0 ? getDispatchData.dispatchDate : '- - -'}</h5>
                    </section>
                  </div>
                  <div className="flex flex-col gap-4">
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Last Service :</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.batchNumber && getDispatchData.batchNumber.length > 0 ? getDispatchData.batchNumber : '- - -'}</h5>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Hardware Version :</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.hw_version && getDispatchData.hw_version.length > 0 ? getDispatchData.hw_version : '- - -'}</h5>
                    </section>
                    <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11rem' }}>Software Version :</span>
                      <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{getDispatchData && getDispatchData.hw_version && getDispatchData.hw_version.length > 0 ? getDispatchData.hw_version : '- - -'}</h5>
                    </section>
                  </div>
                </form>
              </Card >
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: 'start', gap: '1rem', border: "0.1px solid #828282", borderRadius: "15px", padding: "2rem", marginLeft: "0px" }}>
            <h6>DHR File Download</h6>
            <Button onClick={handleDhrFile}>See DHR Files</Button>
          </div>
          <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                {data && data.location.length > 0 ?
                  <>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to Download?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <a href={data && data.location}>
                        <Button color="failure" onClick={() => props.setOpenModal(undefined)}>
                          Yes Download
                        </Button>
                      </a>
                      <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        No, cancel
                      </Button>
                    </div>
                  </>
                  :
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    No File here
                  </h3>
                }
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default About