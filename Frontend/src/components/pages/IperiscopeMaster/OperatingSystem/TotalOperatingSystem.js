import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalOperatingSystemapi, OperatingSystemStatus } from '../../../../api'
import { MdAdd, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai';


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
            fontSize: '15px',
            background: 'rgb(105,59,233)',
            color: 'white',
            paddingLeft: "5%"
        },
    },
    cells: {
        style: {
            fontSize: '15px',
            background: 'rgb(242,242,242)	',
            borderBottom: "1px solid silver",
            paddingLeft: "5%"
        },
    },
};


function TotalOperatingSystem() {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Device Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Operating Syatem',
            selector: 'operating_system',
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
                    await OperatingSystemStatus(status, row.sno)
                    window.location.reload()
                }}>
                    <option hidden value={row.status}>{row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deactive'>Deactive</option>
                </select>
            ],
        },
        {
            name: "Actions",
            sortable: false,
            selector: 'null',
            cell: (row) => [
                <a title='Edit Device Type' href="/EditOperatingSystem">
                    <p onClick={() => localStorage.setItem('OperatingSystemSno', `${row.sno}`)} >
                        {/* Edit */}
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await TotalOperatingSystemapi();
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
                        <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                            <h2><span style={{ color: "rgb(123,108,200)" }}>Operating Sysytem</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Operating Sysytem</span> </h2>
                            <button className='btn btn-voilet ' onClick={(e) => { e.preventDefault(); window.location.href = '/AddOperatingSystem' }} >Add Operating Sysytem <MdAdd /></button>
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
export default TotalOperatingSystem;