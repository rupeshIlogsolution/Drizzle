import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalIssueTypeapi, UpdateIssueTypeStatus } from '../../../../api'
import Sidebar from '../../../Sidebar/Sidebar';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineFileUpload, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import customStyles from '../../../TableCustomtyle'
// import ExcelToJson from '../../ExcelToJson/ExcelToJson';

const columns = [
    {
        name: 'Issue Type',
        selector: 'issue_type',
        sortable: true,
    },
    {
        name: 'Issue Description',
        selector: 'issue_description',
        sortable: true,
    },
    {
        name: 'Status',
        sortable: true,
        cell: (row) => [
            <select className='border-0' style={{ background: "rgb(222, 222, 222)" }} onChange={async (e) => {
                const status = e.target.value;
                const org = localStorage.getItem('Database')

                await UpdateIssueTypeStatus(org, status, row.sno)
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
            <a title='Edit IssueType' href="/EditIssueType">
                <p onClick={() => localStorage.setItem('IssueTypesno', `${row.sno}`)} >
                    <AiFillEdit className='ft-20' style={{ marginBottom: "-13px" }} />
                </p></a>
        ]
    }

];

function TotalIssueType() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [jsondatas, setJsondatas] = useState([]);
    const [exceldatas, setExceldatas] = useState([]);

    useEffect(() => {
        setExceldatas([]);
    }, [jsondatas.length > 0]);

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')

            const result = await TotalIssueTypeapi(org);
            setData(result)
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
                        {/* <ExcelToJson /> */}

                        <div className='main_container' >
                            <div className='main-inner-container  d-flex justify-content-between pt-4 pb-3' >
                                <h4><span className='page-type-head1'>IssueType <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Total IssueType</span> </h4>
                                <div className=''>
                                    <button className='btn btn-sm btn-voilet ' onClick={e => { e.preventDefault(); window.location.href = './AddIssueType' }} >Add IssueType <b>+</b></button>
                                    <button type="button"
                                        className="btn btn-sm  btn-success"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" >Upload Excel <MdOutlineFileUpload className='ft-20' /></button>
                                </div>
                            </div>
                            <div className='bg-white pb-1 pt-2 px-2 shadow1-silver rounded15'>
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
export default TotalIssueType;