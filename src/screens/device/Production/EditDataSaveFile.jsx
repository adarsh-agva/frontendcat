import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEditListDataOfProduction } from '../../../store/action/DispatchDetailsAction';
import { Card } from 'flowbite-react';

function EditDataSaveFile({serialNo}) {

    const getEditListDataReducer = useSelector((state) => state.getEditListDataReducer);
    const { loading, data } = getEditListDataReducer;
    const getDispatchData = data && data.data2
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEditListDataOfProduction(serialNo))
    }, [])
    
    return (
        <div className="flex flex-column" style={{gap:'1rem'}}>
            {getDispatchData && getDispatchData.map((item) => {
                return (
                    <Card
                    >
                        <form className='flex justify-between flex-wrap'>
                            <div className="flex flex-col gap-1">
                                <section style={{ width: 'full', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Device Id :</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                        {item.deviceId}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Product Type:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.productType}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Batch Number :</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.batchNumber}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>QA Done By :</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.qaDoneBy}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Data Entered By:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.dataEnteredBy}
                                    </h5>
                                </section>
                            </div>
                            <div className="flex flex-col gap-4">
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Testing Done By :</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.testingDoneBy}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Parts Issued By:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.partsIssuedBy}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Manufacturing Date:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.manufacturingDate}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Turbine Number :</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.turbineNumber}
                                    </h5>
                                </section>

                            </div>
                            <div className="flex flex-col gap-4">
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Sim Number:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.simNumber}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Display Number:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.displayNumber}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Hardware Version:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.hw_version}
                                    </h5>
                                </section>
                                <section style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '10rem' }}>Software Version:</span>
                                    <h5 style={{ width: '9rem', fontSize: '0.9rem' }} >
                                     {item.sw_version}
                                    </h5>
                                </section>
                            </div>
                        </form>
                    </Card >
                )
            })}

        </div >
    )
}

export default EditDataSaveFile