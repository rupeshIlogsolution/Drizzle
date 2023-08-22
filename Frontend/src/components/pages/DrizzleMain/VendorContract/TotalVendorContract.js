import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalVendorContractapi, DeleteVendorContract } from '../../../../api'
import Sidebar from '../../../Sidebar/Sidebar';
import { AiFillEdit } from 'react-icons/ai';
import { MdAdd, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import customStyles from '../../../TableCustomtyle';

function TotalVendorContract() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            name: 'Vendor ',
            selector: 'vendor',
            sortable: true,
        },

        {
            name: 'Location',
            selector: 'location',
            sortable: true,
        },

        {
            name: 'Major Category',
            selector: 'major_category',
            sortable: true,
        },
        {
            name: 'Sub Category',
            selector: 'sub_category',
            sortable: true,
        },
        {
            name: 'Account no',
            selector: 'customer_account_no',
            sortable: true,
        },
        {
            name: 'Reference no',
            selector: 'reference_no',
            sortable: true,
        },
        {
            name: 'Help Desk no',
            selector: 'help_desk_no',
            sortable: true,
        },
        {
            name: 'Billing Frequency',
            selector: 'billling_freq',
            sortable: true,
        },
        {
            name: 'Status',
            sortable: true,
            cell: (row) => [
                <select className='border-0 ' style={{ background: "rgb(222, 222, 222)" }} onChange={async (e) => {
                    const status = e.target.value;
                    const org = localStorage.getItem('Database')
                    await DeleteVendorContract(org, status, row.sno)
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
            selector: row => row.null,
            cell: (row) => [
                <a title='Edit Vendor Contract' href="/EditVendorContract">
                    <p onClick={() => localStorage.setItem('VendorContractSno', `${row.sno}`)} >
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const tabledata = await TotalVendorContractapi(org);
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
                        <div className='main_container'>
                            <div className='main-inner-container  d-flex justify-content-between pt-4 pb-3' >
                                <h4><span className='page-type-head1'>Vendor Contract</span> <MdOutlineKeyboardArrowRight /><span className='page-type-head2'>Total Vendor Contract</span> </h4>
                                <button className='btn btn-sm btn-voilet pt-1' onClick={e => { e.preventDefault(); window.location.href = './AddVendorContract' }} >Add Vendor Contract <MdAdd /></button>
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
export default TotalVendorContract;