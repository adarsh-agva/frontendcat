import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ManageAdminModule from './ManageAdminModule'
import ManageUsers from '../ManageUsers';
import back from "../../../assets/images/back.png";
import AddRegisterUser from '../AddRegisterUser';
import AddEmploye from './AddEmploye';
import NavBarForAll from '../../../utils/NavBarForAll';

function ManageAdminUserModel() {

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            {/* <Navbar /> */}
            <NavBarForAll />
            {/* <SideBar /> */}
            <div
                className=""
                style={{
                    position: "relative",
                    top: "6rem",
                    marginLeft: "1%",
                    width: "98%",
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/adminDashboard">
                        <img src={back} style={{ width: "4rem" }} />
                    </Link>
                    <div style={{ display: 'flex', gap: '52rem' }}>
                        <div style={{ display: 'flex', gap: '2vw' }}>
                            <button onClick={() => handleTabClick(0)}>
                                <div style={activeTab === 0 ?
                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' } :
                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' }}
                                >
                                    <h5 style={{ fontSize: '15px' }}>Active Admin</h5>
                                </div>
                            </button>
                            <button onClick={() => handleTabClick(1)}>

                                <div style={activeTab === 1 ?
                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' } :

                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' }
                                }>
                                    <h5 style={{ fontSize: '15px' }}>User</h5>
                                </div>
                            </button>
                            <button onClick={() => handleTabClick(3)}>

                                <div style={activeTab === 3 ?
                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' } :

                                    { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' }
                                }>
                                    <h5 style={{ fontSize: '15px' }}>Employees</h5>
                                </div>
                            </button>
                        </div>
                        <button onClick={() => handleTabClick(2)}>
                            <div style={activeTab === 2 ?
                                { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' } :

                                { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', height: '5rem', textAlign: 'center', borderRadius: '15px' }
                            }>
                                <h5 style={{ fontSize: '15px' }}>Add User</h5>
                            </div>
                        </button>
                    </div>
                </div>
                <div style={{ marginTop: '3vw' }}>
                    {activeTab === 0 && <ManageAdminModule />}
                    {activeTab === 1 && <ManageUsers />}
                    {activeTab === 2 && <AddRegisterUser />}
                    {activeTab === 3 && <AddEmploye />}
                </div>
            </div>
        </>
    )
}

export default ManageAdminUserModel