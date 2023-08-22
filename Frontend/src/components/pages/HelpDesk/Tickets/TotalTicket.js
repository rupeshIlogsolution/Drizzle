import React, { useState, useEffect } from 'react'
import 'react-data-table-component-extensions/dist/index.css';
import Sidebar from '../../../Sidebar/Sidebar';
import { AiFillEdit } from 'react-icons/ai';
import { MdAdd, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { TotalTicket, DeleteTickets } from '../../../../api'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../TableCustomtyle'


const columns = [
    {
        name: 'Employee Name',
        selector: 'emp_name',
        sortable: true,
    },
    {
        name: 'Asset Type',
        selector: 'asset_type',
        sortable: true,
    },
    {
        name: 'Ticket',
        selector: 'assign_ticket',
        sortable: true,
        cell: (row) => [
            <a title="Click to Edit" href="/EditTicket" style={{ textDecoration: "none" }} onClick={() => localStorage.setItem('TicketSno', `${row.sno}`)} >{row.assign_ticket}</a>
        ]
    },
    {
        name: 'Location',
        selector: 'location',
        sortable: true,
    },
    {
        name: 'Ticket Subject',
        selector: 'ticket_subject',
        sortable: true,
    },
    {
        name: 'Assign To',
        selector: 'add_user_name',
        sortable: true,
    },
    {
        name: 'Ticket Date',
        selector: 'date',
        sortable: true,
    },
    // {
    //     name: 'Status',
    //     sortable: true,
    //     cell: (row) => [
    //         <select style={{ background: "rgb(222, 222, 222)", border: 'none', borderRadius: "2px" }} 
    //         onChange={async (e) => {
    //             const status = e.target.value;
    //             const org = localStorage.getItem('Database')

    //             await DeleteTickets(org,status, row.sno)
    //             window.location.reload()
    //         }}
    //         >
    //             <option hidden value={row.status}>{row.status}</option>
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
    //         <a title='Edit Ticket' href="/EditTicket">
    //             <p onClick={() => localStorage.setItem('TicketSno', `${row.sno}`)} >
    //                 <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
    //             </p></a>
    //     ]
    // }

];


const TotalTickets = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const tabledata = await TotalTicket(org);
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
                            <div className='main-inner-container  d-flex justify-content-between pt-4 pb-3' >
                                <h3><span className='page-type-head1'> Ticket <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Close Ticket</span> </h3>
                                <button className='btn btn-sm btn-voilet ' onClick={e => { e.preventDefault(); window.location.href = './AddTickets' }} >Add Ticket +</button>
                            </div>
                            <div className=' bg-white pb-1 pt-2 px-2 shadow1-silver rounded15'>
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


export default TotalTickets;
