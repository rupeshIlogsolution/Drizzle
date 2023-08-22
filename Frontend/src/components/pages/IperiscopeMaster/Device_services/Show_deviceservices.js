import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Totaldeviceservices, Updatestatusdeviceservices } from '../../../../api';
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
            background: 'rgb(242,242,242)	',
            borderBottom: "1px solid silver",
            paddingLeft: "5%"
        },
    },
};

function Show_deviceservices() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const getdeviceservices = await Totaldeviceservices();
            setData(getdeviceservices);

        }
        fetchdata()
    }, [])

    const columns = [
        {
            name: ' Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Device Services',
            selector: 'device_services',
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
                    await Updatestatusdeviceservices(e.target.value, row.sno);
                    window.location.reload();
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
            selector: "null",
            cell: (row) => [
                <a title='Edit Device Services' href="/EditDeviceServices">
                    <p onClick={() => localStorage.setItem('deviceservicesSno', `${row.sno}`)} >
                        {/* Edit */}
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];


    const tableData = {
        columns,
        data
    };


    return (
        <>
            <Sidebar>
                <div className='main_container' >
                    <div className='innermain_container m-auto' >
                        <div className=' d-flex justify-content-between pt-4'>
                            <h2><span style={{ color: "rgb(123,108,200)" }}> Device Services </span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total  Device Services </span> </h2>
                            <button className='btn btn-voilet ' onClick={(e) => { e.preventDefault(); window.location.href = '/AddDeviceservices' }} >Add  Device Services  <MdAdd /></button>
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
export default Show_deviceservices;