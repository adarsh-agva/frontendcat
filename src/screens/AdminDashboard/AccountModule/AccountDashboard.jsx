import React, { useState } from 'react'
import NavBarForAll from '../../../utils/NavBarForAll';
import ReadyToDispatch from '../DispatchDetails/ReadyToDispatch';
import AwaitingRequests from './AwaitingRequests';
import AccountAllDataModule from './AccountAllDataModule';
import ReturnRequests from './ReturnRequests';
function AccountDashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    return (
        <>
            <div>
                <NavBarForAll />
                <div
                    style={{
                        position: "relative",
                        top: "6rem",
                        marginLeft: "1%",
                        width: "98%",
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '52rem' }}>
                            <div style={{ display: 'flex', gap: '2vw' }}>
                                <button onClick={() => handleTabClick(0)}>
                                    <div style={activeTab === 0 ?
                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :
                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }}
                                    >
                                        <h5 style={{ fontSize: '15px' }}>Awaiting Request</h5>
                                    </div>
                                </button>
                                <button onClick={() => handleTabClick(1)}>

                                    <div style={activeTab === 1 ?
                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :

                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }
                                    }>
                                        <h5 style={{ fontSize: '15px' }}>All Data</h5>
                                    </div>
                                </button>
                                {/* <button onClick={() => handleTabClick(2)}>

                                    <div style={activeTab === 2 ?
                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(152, 0, 76)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :

                                        { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }
                                    }>
                                        <h5 style={{ fontSize: '15px' }}>All Data</h5>
                                    </div>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '3vw' }}>
                        {activeTab === 0 && <AwaitingRequests />}
                        {activeTab === 1 && <AccountAllDataModule />}
                        {/* {activeTab === 2 && <AccountAllDataModule />} */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDashboard