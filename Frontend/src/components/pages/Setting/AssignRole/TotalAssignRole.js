import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Sidebar from '../../../Sidebar/Sidebar';
import LoadingPage from '../../../LoadingPage/LoadingPage';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import customStyles from '../../../TableCustomtyle'


const columns = [
    {
        name: 'Location Code',
        selector: 'location_code',
        sortable: true,
    },
    {
        name: 'Location Name',
        selector: 'location_name',
        sortable: true,
    },
    {
        name: 'location_state',
        selector: 'location_state',
        sortable: true,
    },
    {
        name: 'Location PinCode',
        selector: 'location_pin_code',
        sortable: true,
    },
    {
        name: 'location_gst',
        selector: 'location_gst',
        sortable: true,
    },
    {
        name: 'contact_person',
        selector: 'contact_person',
        sortable: true,
    },
    // {
    //     name: 'Status',
    //     sortable: true,
    //     cell: (row) => [
    //         <select className='border-0' style={{ background: "rgb(222, 222, 222)" }} onChange={async (e) => {
    //             const status = e.target.value;
    //             const org = localStorage.getItem('Database')
    //             await UpdateLocationStatus(org,status, row.sno)
    //             window.location.reload()
    //         }}>
    //             <option hidden value={row.Status}>{row.Status}</option>
    //             <option value='Active'>Active</option>
    //             <option value='Deactive'>Deactive</option>
    //         </select>
    //     ],
    // },
    // {
    //     name: "Actions",
    //     sortable: false,
    //     selector: 'null',
    //     cell: (row) => [
    //         <a title='Edit Location' href="/EditAssignRole">
    //             <p onClick={() => localStorage.setItem('locationsno', `${row.sno}`)} >
    //                 <AiFillEdit className='ft-20' style={{  marginBottom: "-13px" }} />
    //             </p></a>
    //     ]
    // }

];

function TotalAssignRole() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            // const org = localStorage.getItem('Database')
            // const tabledata = await TotalLocation(org);
            // setData(tabledata)
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
                            <div className='main-inner-container  d-flex justify-content-between pt-4 pb-3' >
                                <h4><span className='page-type-head1'>Assign Role <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Total Assign Role</span> </h4>
                                <button className='btn btn-sm btn-voilet ' onClick={e => { e.preventDefault(); window.location.href = './AddAssignRole' }} >Assign Role <b>+</b></button>
                            </div>
                            <div className='bg-white pb-1 pt-2 px-2 mt-3 shadow1-silver rounded15'>
                                <DataTableExtensions {...tableData}  >
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
export default TotalAssignRole;