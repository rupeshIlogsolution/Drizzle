import React, { useState, useEffect } from 'react';
import 'react-data-table-component-extensions/dist/index.css';
import Sidebar from '../../../Sidebar/Sidebar';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { TotalNewAssets, DeleteNewAssets } from '../../../../api'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import customStyles from '../../../TableCustomtyle'


const columns = [
  
    {
        name: 'Vendor',
        selector: 'vendor',
        sortable: true,
    },
    {
        name: 'Asset Tag',
        selector: 'asset_tag',
        sortable: false,
        cell: (row) => [
            <a title='Click to Edit Asset' href="/EditAsset" onClick={() => localStorage.setItem('newassetsno', `${row.sno}`)}>
                {row.asset_tag}
            </a>
        ]
    },
    {
        name: 'Asset Name',
        selector: 'asset_name',
        sortable: true,
    },
    {
        name: 'Serial Number',
        selector: 'serial_no',
        sortable: true,
    },
    {
        name: 'Purchase Type',
        selector: 'purchase_type',
        sortable: true,
    },
    {
        name: 'Purchase Date',
        selector: 'Assetdate',
        sortable: true,
    },
    {
        name: 'Asset Type',
        selector: 'asset_type',
        sortable: true,
    },
    {
        name: 'Asset Assign',
        selector: 'asset_assign',
        sortable: true,
    },
    {
        name: 'Location',
        selector: 'location',
        sortable: true,
    }, 
    {
        name: 'Asset Status',
        selector: 'asset_status',
        sortable: true,
    },
    // {
    //     name: "Actions",
    //     sortable: false,
    //     selector: 'null',
    //     cell: (row) => [
    //         <a title='Edit Asset' href="/EditAsset">
    //             <p onClick={() => localStorage.setItem('newassetsno', `${row.sno}`)} >
    //                 <AiFillEdit className='ft-20' style={{ marginBottom: "-13px" }} />
    //             </p></a>
    //     ]
    // }

];



function TotalNewAssetes() {
    const [loading, setLoading] = useState(false)
    const [data, setdata] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')

            if(localStorage.getItem('Location') ){
                const datas = await TotalNewAssets(org,localStorage.getItem('Location'))
                console.log(datas)
                setdata(datas)
                setLoading(true)
                localStorage.removeItem('Location')
            }else{
            const datas = await TotalNewAssets(org,"")
            console.log(datas)
            setdata(datas)
            setLoading(true)
            }
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
                                <div className='main-inner-container  d-flex justify-content-between pt-4 pb-2' >
                                    <h3><span className='page-type-head1'> Asset
                                        <MdOutlineKeyboardArrowRight /></span> 
                                        <span className='page-type-head2'>Total  Asset
                                        </span>
                                    </h3>
                                    <button className='btn btn-sm btn-voilet ' onClick={e => { e.preventDefault(); window.location.href = './AddNewAssets' }} >Add Asset +</button>
                                </div>
                                <div className=' bg-white pb-2 pt-4 px-2 shadow1-silver rounded15'>
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
export default TotalNewAssetes;