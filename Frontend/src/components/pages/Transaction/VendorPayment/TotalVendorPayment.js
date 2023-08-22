import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { TotalVendorPaymentapi, FileUpload, UploadInvoice, Outstanding_Invoice_filter } from '../../../../api'
import Sidebar from '../../../Sidebar/Sidebar';
import { GrDocumentUpload } from 'react-icons/gr';
import { AiOutlineEye } from 'react-icons/ai'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import customStyles from '../../../TableCustomtyle'


const TotalVendorPayment = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [sno, setSno] = useState()
    const [file, setFile] = useState('');
    const [particularInvoiceData, setParticularInvoiceData] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const tabledata = await TotalVendorPaymentapi(org);
            setData(tabledata)
            console.log(tabledata)
            setLoading(true)
        }
        fetchdata();
    }, [])


    const columns = [
        {
            name: 'Vendor',
            selector: 'vendor',
            sortable: true,
            cell: (row) => [
                <span title='View Vendor Details'
                    className="cursor-pointer text-primary" data-toggle="modal" data-target="#vendorModal"
                    onClick={(e) => { e.preventDefault(); handleParticularData('Vendor', row.vendor) }}>
                    {row.vendor}
                </span>
            ]
        },
        {
            name: 'Invoice No',
            selector: 'invoice_no',
            sortable: true,
            cell: (row) => [
                <span title='View Invoice Details'
                    className="cursor-pointer text-primary" data-toggle="modal" data-target="#invoiceModal"
                    onClick={(e) => { e.preventDefault(); handleParticularData('Invoice', row.invoice_no) }}>
                    {row.invoice_no}
                </span>
            ]
        },
        {
            name: 'Invoice Amount',
            selector: 'invoice_amt',
            sortable: true,
        },
        {
            name: 'Approved Amt',
            selector: 'approved_payment_amt',
            sortable: true,
            cell: (row) => [
                <p>{`₹ ${row.approved_payment_amt}`}</p>
            ]
        },
        {
            name: 'Payment Amt',
            selector: 'payment_amt',
            sortable: true,
            cell: (row) => [
                <p>{`₹ ${row.payment_amt}`}</p>
            ]
        },
        {
            name: 'Payment Detail',
            selector: 'payment_detail',
            sortable: true,
            cell: (row) => [
                <a title='Edit VendorPayments' href="/EditVendorPayments"
                    onClick={() => localStorage.setItem('vendorpaymentssno', `${row.sno}`)}>
                    {row.payment_detail}
                </a>
            ]
        },
        {
            name: 'Payment Date',
            selector: 'date',
            sortable: true,
        },
        {
            name: 'Actions',
            sortable: true,
            cell: (row) => [
                // <button className='btn' data-toggle="modal" data-target="#exampleModalCenter"
                //     onClick={(e) => { e.preventDefault(); setSno(row.sno) }}> <GrDocumentUpload /> </button>,
                <button className='bg-transparent border-0'
                 onClick={() => { window.open(`${row.uploadpayment}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=400,left=10000,width=400,height=400"); }} >
                    <AiOutlineEye style={{ fontSize: "20px",color:row.uploadpayment===''?'red':'green' }} /></button>
            ],
        }


    ];
    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     const org = localStorage.getItem('Database')

    //     const result = await UploadInvoice(org, 'uploadpayment', file, sno)
    //     if (result) {
    //         alert('Invoice successfully uploaded')
    //         window.location.reload()
    //     }
    // }

    const handleParticularData = async (type, value) => {
        const result = await Outstanding_Invoice_filter(localStorage.getItem('Database'), type, value)
        setParticularInvoiceData(result)
    }
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
                            <div className='main-inner-container  d-flex justify-content-between pt-3 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Payment <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Total Vendor Payment</span> </h4>
                                <button className='btn btn-sm btn-voilet ' onClick={e => { e.preventDefault(); window.location.href = './AddVendorPayment' }} >Add Vendor Payment +</button>
                            </div>
                            <div className=' bg-white pb-1 pt-2 px-2 shadow1-silver rounded15'>
                                <DataTableExtensions {...tableData}  >
                                    <DataTable
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        dense
                                        customStyles={customStyles}
                                    />
                                </DataTableExtensions>
                            </div>
                        </div>

                        {/* Upload Model Start */}
                        {/* <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Upload Invoice</h5>
                                    </div>
                                    <div className="modal-body">
                                        <input type="file" onChange={async (event) => {
                                            console.log(event.target.files[0])
                                            setTimeout(async () => {
                                                const data = new FormData();
                                                data.append("images", event.target.files[0])
                                                const UploadLink = await FileUpload(data)
                                                setLoading(false)
                                                if (UploadLink.length > 1) {
                                                    setFile(UploadLink)
                                                    document.getElementById("uploadbutton").style.display = "flex"
                                                    setLoading(true)
                                                }
                                            }, 2000)
                                        }} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" id="uploadbutton" data-dismiss="modal" onClick={handleClick} style={{ display: "none" }} >Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* Upload Model End */}

                    </Sidebar>
                    : <LoadingPage />
            }
            {/* Vendor Modal */}

            <div className="modal fade" id="vendorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Vendor Details</h5>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Vendor Name</th>
                                        <th>Company Email</th>
                                        <th>Ticket Phone</th>
                                        <th>Contact Person</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        particularInvoiceData.length ?
                                            particularInvoiceData.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value.vendor_name}</td>
                                                    <td>{value.company_email}</td>
                                                    <td>{value.company_phone}</td>
                                                    <td>{value.contact_person_name}</td>
                                                </tr>
                                            )
                                            ) : ""
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Modal */}

            <div className="modal fade" id="invoiceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Invoice Details</h5>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Invoice Name</th>
                                        <th>Account Number</th>
                                        <th>Vendor</th>
                                        <th>Referance Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        particularInvoiceData.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.invoice_no}</td>
                                                <td>{value.account_no}</td>
                                                <td>{value.vendor}</td>
                                                <td>{value.reference_no}</td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TotalVendorPayment;