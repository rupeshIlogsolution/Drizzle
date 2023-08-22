import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Totaldevicetask, Updatedevicetaskstatus } from '../../../../api'
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
function TotalDevicetask() {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Device id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Device Task',
            selector: 'device_tasks',
            sortable: true,
        },
        {
            name: 'Device Task Frequency',
            selector: 'device_tasks_frequency',
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
                    e.preventDefault();
                    await Updatedevicetaskstatus(e.target.value, row.sno);
                    window.location.reload();
                }}>
                    <option hidden value={row.status} >{row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive'>Deactive</option>
                </select>
            ],
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [
                <a title='Edit Device Task' href="/EditDevicetask">
                    <p onClick={() => localStorage.setItem('devicetaskSno', `${row.sno}`)} >
                        {/* Edit */}
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />

                    </p></a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await Totaldevicetask();
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
                    <div className='innermain_container m-auto' >
                        <div className='d-flex justify-content-between pt-4'>
                            <h2><span style={{ color: "rgb(123,108,200)" }}>Device Task</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Device Task</span> </h2>
                            <button className='btn btn-voilet mr-5 add-btn ' onClick={e => { e.preventDefault(); window.location.href = './AddDevicetask' }}>Add Device Task<MdAdd /> </button>
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
export default TotalDevicetask;