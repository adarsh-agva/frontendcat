import React, { useEffect, useState } from 'react'
import Style from "../../../css/UpdateExperienceDetails.module.css";
import { MdEdit } from "react-icons/md";
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Modal } from 'flowbite-react';
import { getHospitalDataFromAdding } from "../../../store/action/StoreSystem"

import { addExperienceAction, getSingleExperienceOfUser, getUserProfileDataAction, putEndAssociationAction, updateUserExperienceData } from '../../../store/action/UserProfileAction';
import { Toaster, toast } from 'react-hot-toast';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { getSingleHospitalDetails } from '../../../store/action/DispatchDetailsAction';
function UpdateExperienceDetails() {
    const [userExpData, setUserExpData] = useState({
        associationName: '',
        workEmail: '',
        workPhoneNo: '',
        designation: '',
        department: '',
    })
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const userId = adminInfo && adminInfo.data && adminInfo.data._id;

    const getUserProfileReducer = useSelector((state) => state.getUserProfileReducer);
    const { data } = getUserProfileReducer;
    const alreadyExpDataLength = data && data.data && data.data.profile && data.data.profile.length;
    const alreadyExpData = data && data.data && data.data.profile && data.data.profile;

    // getSingleExperienceOfUserReducer single exp.
    const getSingleExperienceOfUserReducer = useSelector((state) => state.getSingleExperienceOfUserReducer);
    const { data: dataa } = getSingleExperienceOfUserReducer;
    const newEditData = dataa && dataa.data;

    const [editUserData, setEditUserData] = useState({
        associationName: newEditData && newEditData.associationName,
        workAddress: newEditData && newEditData.workAddress,
        workEmail: newEditData && newEditData.workEmail,
        workPhoneNo: newEditData && newEditData.workPhoneNo,
        designation: newEditData && newEditData.designation,
        department: newEditData && newEditData.department,
        workType: newEditData && newEditData.workType,
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfileDataAction(userId))
        const getUser = async () => {
            setEditUserData(newEditData)
        }
        getUser();
    }, [dispatch])

    const handleSubmitData = (e) => {
        e.preventDefault();
        if (!userExpData?.associationName) {
            toast.error('Enter Hospital Name')
        } 
        else if (!userExpData?.workEmail) {
            toast.error('Enter Work Email')

        }
        else if (!userExpData?.workPhoneNo) {
            toast.error('Enter Work Phone No.')

        }
        else if (!userExpData?.designation) {
            toast.error('Enter Designation')

        }
        else if (!userExpData?.department) {
            toast.error('Enter Department')

        }
        else if (userExpData?.workEmail && userExpData?.workPhoneNo && userExpData?.designation && userExpData?.department) {
            dispatch(addExperienceAction({
                userId: userId,
                associationName: userExpData?.associationName,
                workEmail: userExpData?.workEmail,
                workPhoneNo: userExpData?.workPhoneNo,
                designation: userExpData?.designation,
                department: userExpData?.department,
                workType: userExpData?.workType
            }))
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [openModalEnd, setOpenModalEnd] = useState(false);

    // onClick add button show
    const [clickAdd, setClickAdd] = useState(false)
    const handleAddClick = () => {
        setClickAdd(true)
    }

    // hospital List
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;


        // Single Hpospital Data
        const getHospitalDetailsReducer = useSelector((state) => state.getHospitalDetailsReducer);
        const { data: singleHospitalData } = getHospitalDetailsReducer;
        const singleDataOfHospital = singleHospitalData && singleHospitalData.data
    
        // const hospitalPinCode = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Pincode;
        // const hospitalDistrict = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].District;
        // const hospitalCity = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].City;
        // const hospitalAddress = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].Hospital_Address;
        // const hospitalState = singleDataOfHospital && singleDataOfHospital[0] && singleDataOfHospital[0].State

    // Hospital Name
    useEffect(() => {
        dispatch(getHospitalDataFromAdding())
    }, [])

    const [profileId, setprofileId] = useState()
    const handleSubmitEditData = (e) => {
        e.preventDefault();
        if (!editUserData.associationName) {
            toast.error('Enter Association')
        }
        else if (!editUserData.workAddress) {
            toast.error('Enter work address')
        }
        else if (!editUserData.workEmail) {
            toast.error('Enter work email')
        }
        else if (!editUserData.designation) {
            toast.error('Enter designation')
        }
        else if (!editUserData.department) {
            toast.error('Enter department')
        }
        else if (!editUserData.workPhoneNo) {
            toast.error('Enter work number')
        }
        else if (editUserData.associationName && editUserData.workEmail && editUserData.designation && editUserData.department && editUserData.workPhoneNo) {
            dispatch(updateUserExperienceData({
                profileId: profileId,
                userId: userId,
                associationName: editUserData.associationName,
                workAddress: editUserData.workAddress,
                workEmail: editUserData.workEmail,
                designation: editUserData.designation,
                department: editUserData.department,
                workPhoneNo: editUserData.workPhoneNo
            }))
        }
    }
    return (
        <div style={{ padding: '0rem 3rem', marginTop: '3rem', marginBottom: '3rem' }}>
            <Toaster />
            <div
            >
                <div className='flex justify-between'>
                    <h4 style={{ fontSize: "1.5rem", paddingBottom: '1.5rem', color: '#cd297b' }}>Associations:</h4>
                    <div className='flex' style={{ gap: '1rem' }}>
                        {clickAdd == false ?
                            <IoAddOutline onClick={handleAddClick} size='25' style={{ backgroundColor: 'cb297b', color: 'white', borderRadius: '50px' }} />
                            : <IoIosArrowRoundBack onClick={() => { setClickAdd(false) }} size='25' style={{ backgroundColor: 'cb297b', color: 'white', borderRadius: '50px' }} />
                        }
                    </div>
                </div>
                {alreadyExpDataLength === '0' || clickAdd === true ?
                    <Card
                    >
                        <form className="flex flex-row justify-between flex-wrap">
                            <div className="flex flex-col gap-4">
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Hospital Name:</span>
                                    <TextInput list='data' onChange={(e) => {
                                        setUserExpData({ ...userExpData, associationName: e.target.value })
                                        const hospital_name = e.target.value;
                                        dispatch(getSingleHospitalDetails(hospital_name))
                                    }} className='w-full' id="email1" type="text" placeholder="Enter hospital name" required />
                                    <datalist id='data'>
                                        {dataHospital && dataHospital.map((item) => {
                                            return (
                                                <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                            )
                                        })}
                                    </datalist>
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Email:</span>
                                    <TextInput onChange={(e) => {
                                        setUserExpData({ ...userExpData, workEmail: e.target.value })
                                    }} className='w-full' id="email1" type="email" placeholder="Enter work email" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Work Phone No.:</span>
                                    <TextInput onChange={(e) => {
                                        setUserExpData({ ...userExpData, workPhoneNo: e.target.value })
                                    }} className='w-full' id="email1" type="number" placeholder="Enter work contact no" required />
                                </section>
                            </div>
                            <div className="flex flex-col gap-4">
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Designation:</span>
                                    <TextInput onChange={(e) => {
                                        setUserExpData({ ...userExpData, designation: e.target.value })
                                    }} className='w-full' id="email1" type="text" placeholder="Enter designation" required />
                                </section>
                                <section className={Style.FieldDiv}>
                                    <span className={Style.textSpan}>Department:</span>
                                    <TextInput onChange={(e) => {
                                        setUserExpData({ ...userExpData, department: e.target.value })
                                    }} className='w-full' id="email1" type="text" placeholder="Enter department" required />
                                </section>
                            </div>
                        </form>
                        <button onClick={handleSubmitData} style={{ backgroundColor: 'rgb(152, 0, 76)', color: 'white', padding: '8px', borderRadius: '10px' }} type="submit">Submit</button>
                    </Card >
                    :
                    alreadyExpData && alreadyExpData.map((item, index) => {
                        return (
                            <Card
                                className="mb-3" style={{ width: '85vw' }}
                            >
                                <div className='px-8' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    <h5>{item.associationName}</h5>
                                    <div className='flex justify-start items-center flex-wrap' style={{width:'18.5rem'}}>
                                        <span style={{ fontSize: '0.9rem' }}>{item.startDate.split(" ")[2]} {item.startDate.split(" ")[1].toUpperCase()} {item.startDate.split(" ")[3]}</span><span style={{color:'white'}}>fdc</span><span>-</span>
                                      <span style={{color:'white'}}>fdc</span><span style={{ fontSize: '0.9rem' }}>{item.endDate ?
                                                item.startDate.split(" ")[2]
                                                : 'ON GOING'} {item.endDate ?
                                                    item.startDate.split(" ")[1].toUpperCase()
                                                    : ''} {item.endDate ?
                                                        item.startDate.split(" ")[3]
                                                        : ''}</span>
                                    </div>
                                </div>
                                <form className="flex justify-between flex-wrap px-8">
                                    <div className='flex flex-col' style={{ gap: '1rem' }}>
                                        <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '9rem' }}>Department :</span>
                                            <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{item.department}</h5>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '9rem' }}>Work Email :</span>
                                            <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{item.workEmail}</h5>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '9rem' }}>Work Address :</span>
                                            <h5 style={{ width: '20rem', fontSize: '0.9rem' }} >{item.workAddress}</h5>
                                        </section>
                                    </div>
                                    <div className='flex flex-col' style={{ gap: '1rem' }}>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '9rem' }}>Work PhoneNo :</span>
                                            <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{item.workPhoneNo}</h5>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '9rem' }}>Designation :</span>
                                            <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >{item.designation}</h5>
                                        </section>
                                        <section style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between',marginTop:'1.5rem' }}>
                                            {!item.endDate ?
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpenModalEnd(true)
                                                }} style={{ backgroundColor: '#fff', border: '0.1px solid rgb(152, 0, 76)', borderRadius: '8px', color: 'rgb(152, 0, 76)', padding: '8px', fontSize: '0.9rem' }}>End Association</button>
                                                : <button disabled style={{ backgroundColor: '#fff', borderRadius: '8px', color: 'white', padding: '8px', fontSize: '0.9rem' }}>End Association</button>
                                            }
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                const userId = item._id;
                                                setprofileId(userId)
                                                dispatch(getSingleExperienceOfUser(userId))
                                                setOpenModal(true)
                                            }} style={{ backgroundColor: 'white', border: '0.1px solid rgb(152, 0, 76)', width: '7rem', borderRadius: '8px', color: 'rgb(152, 0, 76)', padding: '8px', fontSize: '0.9rem' }}>Edit</button>
                                        </section>
                                    </div>
                                </form>
                                <Modal show={openModalEnd} size="4xl" onClose={() => setOpenModalEnd(false)} popup>
                                    <Modal.Header />
                                    <Modal.Body>
                                        <div className="text-center">
                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-200" />
                                            <h3 className="mb-5 text-xl font-small text-gray-500 dark:text-gray-400">
                                                Are you sure you want to end this association?
                                            </h3>
                                            <div className='flex'>
                                                <h3 className="mb-3 text-sm font-small text-gray-500 dark:text-gray-400">Description:</h3>
                                                <span className="mb-3 text-sm font-small ">You would not be able to view any devices association with this hospital.The hospital would not have access to data anymore.</span>
                                            </div>
                                            <div className="flex justify-center gap-4">
                                                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px' }} onClick={() => {
                                                    dispatch(putEndAssociationAction({ profileId: item._id, userId: userId }))
                                                    setTimeout(() => {
                                                        setOpenModal(false)
                                                    }, 1000);
                                                }}>
                                                    Yes, I'm sure
                                                </button>
                                                <button style={{ backgroundColor: 'white', border: '0.5px solid gray', color: 'black', padding: '10px', borderRadius: '8px' }} onClick={() => setOpenModalEnd(false)}>
                                                    No, cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </Card >
                        )
                    })
                }
            </div>

            <Modal className='w-xl' show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className='p-4'>Edit Experience</Modal.Header>
                <Modal.Body>
                    <div className="flex" style={{ gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Department:</span>
                                <TextInput onChange={(e) =>
                                    setEditUserData({ ...editUserData, department: e.target.value })
                                } defaultValue={newEditData && newEditData.department} className='w-sm' id="email1" type="text" placeholder="Enter department" required />
                            </div>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Hospital Name:</span>
                                <TextInput list='data2' onChange={(e) =>
                                    setEditUserData({ ...editUserData, associationName: e.target.value })
                                } defaultValue={newEditData && newEditData.associationName} className='w-sm' id="email1" type="text" placeholder="Enter association" required />
                                <datalist id='data2'>
                                    {dataHospital && dataHospital.map((item) => {
                                        return (
                                            <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Designation:</span>
                                <TextInput onChange={(e) =>
                                    setEditUserData({ ...editUserData, designation: e.target.value })
                                } defaultValue={newEditData && newEditData.designation} className='w-sm' id="email1" type="text" placeholder="Enter work email" required />

                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Work Email:</span>
                                <TextInput onChange={(e) =>
                                    setEditUserData({ ...editUserData, workEmail: e.target.value })
                                } defaultValue={newEditData && newEditData.workEmail} className='w-sm' id="email1" type="text" placeholder="Enter work email" required />
                            </div>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Work PhoneNo:</span>
                                <TextInput onChange={(e) =>
                                    setEditUserData({ ...editUserData, workPhoneNo: e.target.value })
                                } defaultValue={newEditData && newEditData.workPhoneNo} className='w-sm' id="email1" type="text" placeholder="Enter work phone no." required />
                            </div>
                            <div className='flex' style={{ gap: '0.3rem' }}>
                                <span style={{ width: '7rem', fontSize: '0.9rem' }} className='text-base'>Work Address:</span>
                                <TextInput onChange={(e) =>
                                    setEditUserData({ ...editUserData, workAddress: e.target.value })
                                } defaultValue={newEditData && newEditData.workAddress} className='w-sm' id="email1" type="text" placeholder="Enter work address" required />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color="gray" onClick={handleSubmitEditData}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateExperienceDetails