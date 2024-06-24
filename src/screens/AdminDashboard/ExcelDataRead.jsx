import React, { useState } from 'react'
import * as XLSX from 'xlsx'

import { Button, Table } from "flowbite-react";
function ExcelDataRead() {
    // onchange data
    const [excelFile, setExcelFile] = useState(null);
    const [errorEcelFile, setErrorExcelFile] = useState(null);

    // submit data
    const [excelData, setExcelData] = useState(null);

    const handelUploadFile = (e) => {
        // const fileType=['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheet'];
        let selectFile = e.target.files[0];
        if (selectFile) {
            if (selectFile) {
                setErrorExcelFile(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result)
                }
            }
            else {
                setExcelFile(null);
                setErrorExcelFile('Please select only excel file')
            }
        }
        else {
            console.log('Please select file')
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const workSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[workSheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0.10))
        }
    }
    return (
        <div className='wrapper'>
            <h3>Upload & view Excel Sheet</h3>
            <div className="d-flex form-group custom-form p-4">
                <input type='file' className='form-control' onChange={handelUploadFile} />
                <Button.Group>
                    <Button color="gray" onClick={handleSubmitFile}>Upload</Button>
                </Button.Group>
            </div>
            {/* view data */}
            <div className="viewer">
                {excelData ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                {Object.keys(excelData[0]).map((key) => (
                                    <Table.HeadCell key={key}>{key}</Table.HeadCell>
                                ))}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {excelData?.map((item, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                        {Object.keys(item).map((key) => (
                                            <Table.Cell key={key}>{item[key]}</Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                ) : (
                    <div>No File is uploaded yet !</div>
                )}
            </div>
        </div>
    )
}

export default ExcelDataRead