import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { Totalagent, Updateagentstatus } from '../../../../api'
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
function TotalAgentmaster() {
    const [data, setData] = useState([])
    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Agent Name',
            selector: 'agent_name',
            sortable: true,
        },
        {
            name: 'Agent Email',
            selector: 'agent_email',
            sortable: true,
        },
        {
            name: 'Agent Phone',
            selector: 'agent_phone',
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
                    await Updateagentstatus(e.target.value, row.sno);
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
                <a title='Edit Agent master' href="/EditAgent">
                    <p onClick={() => localStorage.setItem('agentSno', `${row.sno}`)} >
                        {/* Edit */}
                        <AiFillEdit style={{ fontSize: "20px", marginBottom: "-13px" }} />
                    </p></a>
            ]
        }

    ];

    useEffect(() => {
        const fetchdata = async () => {
            const tabledata = await Totalagent();
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
                            <h2><span style={{ color: "rgb(123,108,200)" }}> Agent </span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Total Agent </span> </h2>
                            <button className='btn btn-voilet' onClick={e => { e.preventDefault(); window.location.href = './AddAgent' }}>Add Agent <MdAdd /> </button>
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
export default TotalAgentmaster;