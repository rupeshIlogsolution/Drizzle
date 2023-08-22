import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalServiceCompliance, ServiceComplianceStatus } from '../../../../api'
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight,MdAdd } from 'react-icons/md';


const customStyles = {
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    rows: {
        style: {
            minHeight: '35px'
        }
    },
    headCells: {
        style: {
            fontSize: '14px',
            background: 'rgb(105,59,233)',
            color: 'white',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            // fontWeight:'600',
            background: 'rgb(242,242,242)',
            borderBottom: "1px solid silver"
        },
    },
};

function TotalServicecompliance() {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Device Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Device Service',
            selector: 'device_services',
            sortable: true,
        },
        {
            name: 'Service Compliance',
            selector: 'services_compliance',
            sortable: true,
        },
        {
            name: 'Remark',
            selector: 'remark',
            sortable: true,
        },
        {
            name: 'Status',
            sortable: true,
            cell: (row) => [
                <select onChange={async (e) => {
                    const status = e.target.value;
                    await ServiceComplianceStatus(status, row.sno)
                    window.location.reload()
                }}>
                    <option hidden >{row.status}</option>
                    <option>Active</option>
                    <option>Deactive</option>
                </select>
            ],
        },
        {
            name: "Actions",
            sortable: false,
            selector: 'null',
            cell: (row) => [
                <a title='Edit Device Type' href="/EditServiceCompliance">

                    <p  onClick={() => localStorage.setItem('ServiceComplianceSno', `${row.sno}`)} >
                        {/* Edit */}
                    <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await TotalServiceCompliance();
            setData(tabledata)
        }
        fetchdata();
    }, [])

    const tableData = {
        columns,
        data
    };


    return (
        <>
            <Sidebar>
                <div className='main_container' >
                    <div className='innermain_container m-auto'>
                        <div className='d-flex justify-content-between pt-4'>
                            <h2><span style={{ color: "rgb(123,108,200)" }}>Service Compliance</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Service Compliance</span> </h2>
                            <button className='btn btn-voilet mr-5 add-btn ' onClick={e => { e.preventDefault(); window.location.href = './AddServicecompliance' }}>Add Service Compliance<MdAdd/></button>
                        </div>
                        <DataTableExtensions {...tableData}>
                            <DataTable
                                noHeader
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        </DataTableExtensions>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
export default TotalServicecompliance;