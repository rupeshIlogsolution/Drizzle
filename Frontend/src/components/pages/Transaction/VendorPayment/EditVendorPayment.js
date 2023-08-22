import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../../Sidebar/Sidebar'
import { UpdateVendorPayment, GetVendorPayment, PendingVendorInvoice, FileUpload } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditVendorPayments() {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(true)

    const [data, setData] = useState([])
    const [pendinginvoicelist, setPendinginvoicelist] = useState([])
    const [filedata, setFiledata] = useState('')


    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const datas = await GetVendorPayment(org, localStorage.getItem('vendorpaymentssno'))
            setFiledata(datas[0].uploadpayment)
            setData(datas[0])
            const invoice = await PendingVendorInvoice(org);
            setPendinginvoicelist(invoice)
            setLoading(true)
        }
        fetchdata();
    }, [])

    const handleAddVendorIvoice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const paymentdetail = document.getElementById('paymentdetail').value;
        const approved_payment_amt = document.getElementById('approvedamt').value;
        const paymentamt = document.getElementById('paymentamt').value;
        const paymentdate = document.getElementById('paymentdate').value;
        const remark = document.getElementById('remark').value;
        const sno = localStorage.getItem('vendorpaymentssno')
        const org = localStorage.getItem('Database')

 

        if (!paymentdetail || !paymentamt || !paymentdate) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Mandatory Field', 'warning', 'self')
            return false;
        }
        else {
            const result = await UpdateVendorPayment(org, paymentdetail, paymentamt, paymentdate, remark, sno, filedata,approved_payment_amt)
            setLoading(true)

            if (result === 'Data Updated') {
                localStorage.removeItem('vendorpaymentssno')
                callfun('Vendor Payment Updated', 'success', '/TotalVendorPayment')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }
    }

    // const handleChnageVendorDetail = async (e) => {
    //     const val = e.target.value;
    //     const toindex = val.indexOf(",")
    //     const vebndconid = val.slice(0, toindex)
    //     const detail = await VendorContractDetail(vebndconid);
    //     document.getElementById('accountno').value = detail.customer_account_no;
    //     document.getElementById('refno').value = detail.reference_no;
    // }

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
                            <div className=' main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Payment <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Vendor Payment</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('vendorpaymentssno'); window.location.href = '/TotalVendorPayment' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pt-2">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor='invno'>Invoice no <span className='text-danger'>*</span></label>
                                                <select type='text' id='invno' className='form-select m-0 invoice-inp'
                                                    // onChange={handleChnageVendorDetail} 
                                                    disabled>
                                                    <option value={[`${data.sno},${data.invoice_amt}`]} hidden>{`${data.reference_no}, (${data.invoice_no})`}</option>
                                                    {
                                                        pendinginvoicelist.map((item, index) =>
                                                            <option key={index} value={[`${item.sno},${item.invoice_amt}`]}>{`${item.reference_no}, (${item.invoice_no})`}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='accountno'>Account no <span className='text-danger'>*</span></label>
                                                <input type="text" id='accountno' className="form-control" disabled defaultValue={data.account_no} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='paymentdetail'>Payment Details <span className='text-danger'>*</span> </label>
                                                <input type="text" className="form-control" id='paymentdetail' defaultValue={data.payment_detail} />
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="form-group col-md-4">
                                                <label htmlFor='approvedamt'>Approved Amount </label>
                                                <input type="number" id='approvedamt' className="form-control" defaultValue={data.approved_payment_amt}  />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='paymentamt'>Payment Amount <span className='text-danger'>*</span></label>
                                                <input type="number" id='paymentamt' className="form-control" defaultValue={data.payment_amt} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='paymentdate'>Payment date <span className='text-danger'>*</span></label>
                                                <input type="date" id='paymentdate' className="form-control" defaultValue={data.PaymentDate} />
                                            </div>

                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group col-md-4">
                                                <label htmlFor='refno'>Reference No <span className='text-danger'>*</span></label>
                                                <input type="text" id='refno' className="form-control" defaultValue={data.reference_no} disabled />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='remark'>Remarks</label>
                                                <textarea className="form-control" id='remark' rows='3' defaultValue={data.payment_remark}></textarea>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor='upload'>Uploaded Document</label>
                                                <div className='row'>
                                                    {
                                                        data.uploadpayment ? <>
                                                            <iframe src={data.uploadpayment} style={{ height: '280px' }} title='Payment Preview' />
                                                            <button type="button" className='btn btn-success ' data-toggle="modal" data-target="#documentModalCenter" >Upload</button></>
                                                            : 
                                                            <button type="button" className='btn btn-success col-md-4' data-toggle="modal" data-target="#documentModalCenter" >Upload</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </article>
                                <div className='btn_div mt-3 card-footer'>
                                    <button className='btn btn-voilet' id='subnitbtn' onClick={handleAddVendorIvoice}>Update Vendor Payment</button>
                                </div>
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

export default EditVendorPayments;