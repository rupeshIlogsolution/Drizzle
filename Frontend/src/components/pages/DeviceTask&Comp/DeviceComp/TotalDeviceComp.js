import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Activedevice, Getdevicetaskcompliancebyname, Updatedevicecompstatus } from '../../../../api'
import { AiFillEdit } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import LoadingPage from '../../../LoadingPage/LoadingPage';


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
function UpdateDevicetaskcomp() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [devicename, setDevicename] = useState([]);

    const columns = [
        {
            name: 'Services',
            selector: 'services',
            sortable: true,
        },
        {
            name: 'Compliance ',
            selector: 'add_compliance',
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
                    await Updatedevicecompstatus(e.target.value, row.sno);
                    window.location.reload();
                }}>
                    <option hidden value={row.status}>{row.status}</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>
            ],
        },
        {
            name: "Actions",
            sortable: false,
            selector: "null",
            cell: (row) => [
                <a title='Edit Device Compliances' href="/EditDeviceComp">
                    <p onClick={() => localStorage.setItem('devicecompSno', `${row.sno}`)} >
                        {/* Edit */}
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />

                    </p></a>
            ]
        }

    ];


    useEffect(() => {
        const fetchdata = async () => {
            const result = await Activedevice();
            setDevicename(result)
            setLoading(true)

        }
        fetchdata();
    }, [])

    const tableData = {
        columns,
        data
    };


    const handelselect = async (e) => {
        setLoading(false)
        const tabledata = await Getdevicetaskcompliancebyname(e.target.value);
        setData(tabledata)
        setLoading(true)
    }

    return (
        <>
            {
                loading ?
                    <Sidebar>
                        <div className='main_container' >
                            <div className='innermain_container m-auto' >
                                <div className='d-flex justify-content-between pt-4'>
                                    <h3> Device Compliances</h3>
                                    <button className='btn btn-voilet m-0 add-btn' onClick={e => { e.preventDefault(); window.location.href = './AddDeviceComp' }}>Add Compliances <MdAdd /></button>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4" >
                                        <select className="form-select" id='devicename' onChange={handelselect}>
                                            <option value='' hidden>Select Device</option>
                                            {
                                                devicename.map((item, index) =>
                                                    <option key={index}>{item.device_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                {
                                    data.length > 0 ? <DataTableExtensions {...tableData}>
                                        <DataTable
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            customStyles={customStyles}
                                        />
                                    </DataTableExtensions>
                                        : <div>
                                            <h2 className='text-center'>Select Device</h2>
                                        </div>
                                }
                            </div>
                        </div>
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}
export default UpdateDevicetaskcomp;