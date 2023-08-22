import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalDevicegroup, DeviceGroupStatus } from '../../../../api'
import { AiFillEdit } from 'react-icons/ai';
import { MdAdd, MdOutlineKeyboardArrowRight } from 'react-icons/md'


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
            // fontWeight:'600',
            background: 'rgb(242,242,242)	',
            borderBottom: "1px solid silver",
            paddingLeft: "5%"
        },
    },
};

function Showdevicegroup() {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Device Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Device Group',
            selector: 'device_group',
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
                <select style={{ background: "rgb(222, 222, 222)", border: 'none', borderRadius: "2px" }} onChange={async (e) => {
                    const status = e.target.value;
                    await DeviceGroupStatus(status, row.sno)
                    window.location.reload()
                }}>
                    <option hidden value={row.status}>{row.status}</option>
                    <option value='Active'>Active</option>
                    <option value='Deavtive'>Deactive</option>
                </select>
            ],
        },
        {
            name: "Actions",
            sortable: false,
            selector: 'null',
            cell: (row) => [
                <a title='Edit Device Type' href="/EditDevicegroup">
                    <p onClick={() => localStorage.setItem('devicegroupSno', `${row.sno}`)} >
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await TotalDevicegroup();
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
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Group</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Device Group</span> </h2>
                        <button className='btn btn-voilet btn ' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/AddDevicegroup' }} >Add Devicegroup <MdAdd /></button>
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

            </Sidebar>
        </>
    )
}
export default Showdevicegroup;