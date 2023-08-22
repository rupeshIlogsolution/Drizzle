import Sidebar from '../../Sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Totaldeviceapi, Updatedevicestatus } from '../../../api'
import { AiFillEdit } from 'react-icons/ai';
import { MdAdd, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../LoadingPage/LoadingPage';


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
            background: 'rgb(242,242,242)',
            borderBottom: "1px solid silver"
        },
    },
};
function TotalDevice() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            name: 'Device Name',
            selector: 'device_name',
            sortable: true,
        },
        {
            name: 'Device Type',
            selector: 'device_type',
            sortable: true,
        },
        {
            name: 'Device Group',
            selector: 'device_group',
            sortable: true,
        },
        {
            name: 'Device Ip address',
            selector: 'device_ip_address',
            sortable: true,
        },
        {
            name: 'Device Host Master',
            selector: 'device_host_master',
            sortable: true,
        },
        {
            name: 'Device OS',
            selector: 'device_os',
            sortable: true,
        },
        {
            name: 'Services',
            selector: 'services',
            sortable: true,
        },
        {
            name: 'Device Creation Date',
            selector: 'device_creation_date',
            sortable: true,
        },
        {
            name: 'Device REG Date',
            selector: 'device_reg_date',
            sortable: true,
        },
        {
            name: 'Agent',
            selector: 'agent',
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
                    await Updatedevicestatus(e.target.value, row.sno);
                    window.location.reload();
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
            selector: "null",
            cell: (row) => [
                <a title='Edit Device' href="/EditDevice">
                    <p onClick={() => localStorage.setItem('deviceSno', `${row.sno}`)} >
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p>
                </a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await Totaldeviceapi();
            setData(tabledata)
            setLoading(true)

        }

        fetchdata();
    }, [])



    const tableData = {
        columns,
        data
    };

    return (
        <>
            {
                loading ?
                    <Sidebar>
                        <div className='main_container' >
                            <div className='innermain_container m-auto ' >
                                <div className='d-flex justify-content-between pt-4'>
                                    <h2><span style={{ color: "rgb(123,108,200)" }}>Device</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Device</span> </h2>
                                    <button className='btn btn-voilet  ' onClick={e => { e.preventDefault(); window.location.href = './AddDevice' }}>Add Device <b><MdAdd /></b></button>
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
                    : <LoadingPage />
            }
        </>
    )
}
export default TotalDevice;