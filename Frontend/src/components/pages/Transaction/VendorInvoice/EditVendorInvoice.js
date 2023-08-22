import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../../Sidebar/Sidebar'
import { ActiveVendorContract, VendorContractDetail, UpdatePendingVendorInvoice, GetVendorInvoice,FileUpload } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditVendorInvoice() {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(true)

    const [data, setData] = useState([])
    const [vendorcontractlist, setVendorcontractlist] = useState([])
    const [filedata, setFiledata] = useState('')

    // ########################### Modal Alert #############################################


    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const datas = await GetVendorInvoice(org, localStorage.getItem('vendorinvoicesno'))
            setData(datas[0])
            setFiledata(datas[0]["uploadInvoice"])
            const vendorcontract = await ActiveVendorContract(org);
            setVendorcontractlist(vendorcontract)
            setLoading(true)
        }
        fetchdata();
    }, [])

    const handleAddVendorIvoice = async (e) => {
        e.preventDefault();

        document.getElementById('subnitbtn').disabled = 'true'
        setLoading(false)
        let vendor = document.getElementById('vendor').value;
        const val = vendor;
        const toindex = val.indexOf(",")
        vendor = val.slice(toindex + 1)
        const accountno = document.getElementById('accountno').value;
        const invno = document.getElementById('invno').value;
        const invamt = document.getElementById('invamt').value;
        const invdate = document.getElementById('invdate').value;
        const invduedate = document.getElementById('invduedate').value;
        const invsubdate = document.getElementById('invsubdate').value;
        const remark = document.getElementById('remark').value;
        const refno = document.getElementById('refno').value;
        const printercount = document.getElementById('printercount').value;
        const sno = localStorage.getItem('vendorinvoicesno')
        const org = localStorage.getItem('Database')

        if (!vendor || !invamt || !invno) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Mandatory Field', 'warning', 'self')
            return false;
        }
        else {
            const result = await UpdatePendingVendorInvoice(org, vendor, accountno, invno, invamt, invdate, invduedate, invsubdate, remark, refno, printercount, sno,filedata)
            setLoading(true)

            if (result === 'Data Updated') {
                localStorage.removeItem('vendorinvoicesno')
                callfun('Invoice Updated', 'success', '/TotalVendorInvoice')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }
    }

    const handleChnageVendorDetail = async (e) => {
        const val = e.target.value;
        const org = localStorage.getItem('Database')

        const toindex = val.indexOf(",")
        const vebndconid = val.slice(0, toindex)
        const detail = await VendorContractDetail(org, vebndconid);
        document.getElementById('accountno').value = detail.customer_account_no;
        document.getElementById('refno').value = detail.reference_no;
    }


    return (
        <>
            {
                loading ?
                    <Sidebar>
                        {/* ######################### Sanckbar Start ##################################### */}

                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ######################### Sanckbar End ##################################### */}
                        <div className='main_container'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Invoice <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Vendor Invoice</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('vendorinvoicesno'); window.location.href = '/TotalVendorInvoice' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3 py-1">
                                {/* <header className="card-header d-flex justify-content-between" >
                                    <h5 > Vendor Invoice</h5>
                                </header> */}
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="form-group col-md-4" >
                                                <label htmlFor='vendor'>Vendor <span className='text-danger'>*</span></label>
                                                <select type='text' id='vendor' className='form-select m-0 invoice-inp' onChange={handleChnageVendorDetail}>
                                                    <option value={[`${data.sno},${data.vendor}`]} hidden>{data.vendor}</option>
                                                    {
                                                        vendorcontractlist.map((item, index) =>
                                                            <option key={index} value={[`${item.sno},${item.vendor}`]}>{`${item.vendor}, (${item.reference_no})`}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='accountno'>Account no <span className='text-danger'>*</span></label>
                                                <input type="text" id='accountno' className="form-control" disabled defaultValue={data.account_no} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invno'>Invoice no <span className='text-danger'>*</span> </label>
                                                <input type="text" className="form-control" id='invno' defaultValue={data.invoice_no} />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invamt'>Invoice Amount <span className='text-danger'>*</span></label>
                                                <input type="text" id='invamt' className="form-control" defaultValue={data.invoice_amt} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invdate'>Invoice date</label>
                                                <input type="date" id='invdate' className="form-control" defaultValue={data.Invoicedat} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invduedate'>Invoice Due date</label>
                                                <input type="date" id='invduedate' className="form-control" defaultValue={data.InvoiceDuedate} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invsubdate'>Invoice Sub Date</label>
                                                <input type="date" id='invsubdate' className="form-control" defaultValue={data.InvoiceSubdate} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='refno'>Reference No <span className='text-danger'>*</span></label>
                                                <input type="text" id='refno' className="form-control" defaultValue={data.reference_no} disabled />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='printercount'>Printer Counter</label>
                                                <input type="text" id='printercount' className="form-control" defaultValue={data.printer_counter} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group col-md-4 mt-3">
                                                <label htmlFor='remark'>Remarks</label>
                                                <textarea className="form-control" id='remark' rows='3' defaultValue={data.remark} ></textarea>
                                            </div>
                                            {
                                                data.uploadInvoice ?
                                                    <div className="form-group col-md-4 mt-3">
                                                        <label htmlFor='remark'>Preview</label>
                                                        <div className='row'>
                                                            <iframe src={data.uploadInvoice} style={{ height: '280px' }} title='invoice preview'/>
                                                        </div>
                                                    </div> : null
                                            }
                                            <div className="form-group col-md-4 mt-3">
                                                <label htmlFor='upload'>Upload</label>
                                                <div className='row'>
                                                    <button type="button" id='upload' className='btn btn-success col-md-4' data-toggle="modal" data-target="#documentModalCenter" >Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='btn_div mt-3'>
                                            <button className='btn btn-voilet' id='subnitbtn' onClick={handleAddVendorIvoice}>Update Vendor Invoice</button>
                                        </div>
                                    </form>
                                </article>
                            </div>
                        </div>
                        {/* Upload Model Start */}
                        <div className="modal fade" id="documentModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Upload Document</h5>
                                    </div>
                                    <div className="modal-body">

                                        <input type="file" id='inputfile' onChange={async (event) => {
                                            setLoading2(false)
                                            setTimeout(async () => {
                                                const data = new FormData();
                                                data.append("images", event.target.files[0])
                                                const UploadLink = await FileUpload(data)
                                                setLoading2(true)
                                                if (UploadLink.length > 1) {
                                                    setFiledata(UploadLink);
                                                    document.getElementById("uploadbutton").style.display = "flex";
                                                }
                                            }, 2000)
                                        }} />
                                    </div>
                                    <div className="modal-footer">
                                        {
                                            loading2 ? null : 'Wait a Second'
                                        }
                                        <button type="button" className="btn btn-primary" id="uploadbutton" data-dismiss="modal" style={{ display: "none" }}
                                            onClick={(e) => { e.preventDefault(); }}>Upload</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Upload Model End */}
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}

export default EditVendorInvoice;