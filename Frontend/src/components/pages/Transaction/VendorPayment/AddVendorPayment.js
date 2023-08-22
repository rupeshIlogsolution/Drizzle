import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../../Sidebar/Sidebar'
import { MdOutlineKeyboardArrowRight, MdFileUpload } from 'react-icons/md'
import { PendingVendorInvoice, UpdateVendorInvoice, FileUpload, PendingVendorInvoiceOnChnage, VendorPaymentEmail, GetVendorDetails } from '../../../../api'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddVendorPayment() {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(true)

    const [todatdate, setTodaydate] = useState('')
    const [count, setCount] = useState(0);
    const [arry, setArry] = useState([0]);
    const [arryval, setArryval] = useState([{}]);
    const [pendinginvoicelist, setPendinginvoicelist] = useState([])
    // const [vendordetail, setVendordetail] = useState([])

    const [indexno, setIndexno] = useState()
    const [invoceindexno, setInvoiceindexno] = useState('');
    const [file, setFile] = useState([])
    const [invoiceno, setInvoiceno] = useState([])
    const [sno, setSno] = useState([]);

    const [maildata, setMaildata] = useState([]);

    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const invoice = await PendingVendorInvoice(org);
            console.log(invoice)
            setPendinginvoicelist(invoice)
            todaydate()
            setLoading(true)
        }
        fetchdata();
    }, [])

    const todaydate = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        setTodaydate(today)
    }

    const addRow = () => {
        let val = count + 1;
        setCount(val);
        setArry([...arry, val]);
    };

    const RemoveRow = () => {
        if (!(count === 1)) {
            let val = [...arry];
            val.pop();
            setCount(val.length);
            setArry(val);
        }else{
            let objval = [...arryval];
            objval.pop();
            setArryval(objval)
        }
    };

    const savatoarry = (index) => {

        // let val2 = document.getElementById(`invno-${index}`);
        // let text = val2.options[val2.selectedIndex].text;
        // let toindex2 = text.indexOf(",")

        // const middletext = text.slice(toindex2 + 2)
        // const middle = middletext.slice(
        //     middletext.indexOf('(') + 1,
        //     middletext.lastIndexOf(')'),
        // );
        // const invno = middle;
        // let snotext = document.getElementById(`invno-${index}`).value;
        // let snoindex = snotext.indexOf(",")
        // let sno = snotext.slice(0, snoindex)

        const ptydtl = document.getElementById(`ptydtl-${index}`).value;
        const ptyamt = document.getElementById(`ptyamt-${index}`).value;
        const appramt = document.getElementById(`appramt-${index}`).value;
        const ptydate = document.getElementById(`ptydate-${index}`).value;
        const remark = document.getElementById(`remark-${index}`).value;
        let obj = {
            sno: sno[index], InvoiceNo: invoiceno[index], paymentDetail: ptydtl, PaymentAmt: ptyamt, ApprovedAmt: appramt,
            Paymentdate: ptydate, Remark: remark, filedata: file[index]
        };
        arryval[index] = obj;

    };

    const handleAddVendorIvoice = async (e) => {
        e.preventDefault();
        for(let i=0;i<arryval.length;i++){
            var message = {
                invoice_number:maildata[i].invoce_no,
                invoice_date : maildata[i].invoice_date,
                invoice_receive_date : maildata[i].invoice_date,
                invoice_amount:maildata[i].invoice_amount,
                invoice_upload:maildata[i].filedata || "",
                payment_date:arryval[i].Paymentdate,
                payment_details:arryval[i].paymentDetail,
                payment_amount:arryval[i].PaymentAmt,
                payment_link:arryval[i].filedata || "",
                mailid:maildata[i].company_mailId,
                vendor_name:maildata[i].vendor_name,
                referance_no:maildata[i].referance_no
            }
        }
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const org = localStorage.getItem('Database')
        let errorcount = 0;
        for (let i = 0; i < arryval.length; i++) {
            if (!arryval[i].InvoiceNo) {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Please Select the Invoice no', 'warning', 'self')

                errorcount = errorcount + 1;
                return false;
            }
            else if (arryval[i].InvoiceNo === 'elect Invoice n') {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Please Select the Invoice no', 'warning', 'self')

                errorcount = errorcount + 1;
                return false;
            }
            else if (!arryval[i].paymentDetail || !arryval[i].PaymentAmt) {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Please enter the Mandatory field', 'warning', 'self')

                errorcount = errorcount + 1;
                return false;
            }
        }
        if (errorcount === 0) {
            const result = await UpdateVendorInvoice(org, arryval, localStorage.getItem('UserId'))
            let mail = await VendorPaymentEmail(message)

            setLoading(true)
            if (result === 'Data Updated') {
                callfun('Vendor Payment Added', 'success', '/TotalVendorPayment')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }
    }

    const handleChangeInvoiceDetail = async (e) => {
        sno[e.Index] = e.sno
        invoiceno[e.Index] = e.invoice_no;
        document.getElementById(`invamt-${e.Index}`).value = e.InvoiceAmt
        document.getElementById(`appramt-${e.Index}`).value = e.InvoiceAmt
        document.getElementById(`refno-${e.Index}`).value = e.refno;
        document.getElementById(`button${e.Index}`).innerHTML = e.invoice_no;

        const vendordetails = await GetVendorDetails(localStorage.getItem('Database'), e.vendor_name);
        maildata[e.Index] = { invoce_no: e.invoice_no, invoice_date: e.invoice_date, receiving_date: e.invoice_date, invoice_url: e.invoice_url, vendor_name: vendordetails[0].vendor_name,company_mailId:vendordetails[0].company_email,invoice_amount:e.InvoiceAmt,referance_no:e.refno }

    }

    const handleGetInvoiceno = async (e) => {
        console.log(e.target.value)
        const getInvoiceno = await PendingVendorInvoiceOnChnage(localStorage.getItem('Database'), e.target.value)
        setPendinginvoicelist(getInvoiceno)
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

                        <div className='main_container px-2'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Payment <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Vendor Payment</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalVendorPayment' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <header className="card-header d-flex justify-content-between" >
                                    <h5 >Add Vendor Payment</h5>
                                    <div>
                                        <button className='btn btn-voilet' onClick={addRow}>Add row</button>
                                        <button className='btn btn-danger mx-2 ' onClick={RemoveRow}>Remove row</button>
                                    </div>
                                </header>
                                <article className="card-body" >
                                    <form className='invoice-form overflow-auto' autoComplete='off'>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr >
                                                    <th scope="col">Invoice no  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Invoice Amount  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Payment Detail  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Payment Amount  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Approved Amount  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Payment Date  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Remark</th>
                                                    <th scope="col">Ref no.  <span className='text-danger'>*</span></th>
                                                    <th scope="col">Upload  <span className='text-danger'>*</span></th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {arry.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='p-0'>

                                                            {/* <select type='text' id={`invno-${index}`} className='form-select m-0 ' onChange={(e) => handleChnageVendorDetail(index, e.target.value)} onBlur={() => savatoarry(index)}>
                                                                <option value='' hidden>Select Invoice no</option>
                                                                {
                                                                    pendinginvoicelist.map((item, index) =>
                                                                        <option key={index} value={[`${item.sno},${item.invoice_amt}`]}>{`${item.reference_no}, (${item.invoice_no})`}</option>)
                                                                }
                                                            </select> */}
                                                            <button className='form-control m-0 btn btn-success' data-toggle="modal" id={`button${index}`} data-target="#invoiceModalCenter"
                                                                onClick={(e) => {
                                                                    e.preventDefault(); setInvoiceindexno(index);
                                                                    setTimeout(() => {
                                                                        document.getElementById('searchInvoice').focus();
                                                                    }, 550)
                                                                }}>Select</button>
                                                        </td>
                                                        <td className='p-0'><input type='number' id={`invamt-${index}`} className='form-control m-0 ' disabled onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='text' id={`ptydtl-${index}`} className='form-control m-0 ' onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='number' id={`ptyamt-${index}`} className='form-control m-0 ' onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='number' id={`appramt-${index}`} className='form-control m-0 ' onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='date' id={`ptydate-${index}`} className='form-control m-0 ' defaultValue={todatdate} onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='text' id={`remark-${index}`} className='form-control m-0 ' onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><input type='text' id={`refno-${index}`} className='form-control m-0 ' disabled onBlur={() => savatoarry(index)} /></td>
                                                        <td className='p-0'><button className='form-control m-0 ' data-toggle="modal" data-target="#exampleModalCenter"
                                                            onClick={(e) => {
                                                                e.preventDefault(); setIndexno(index);
                                                                document.getElementById("uploadbutton").style.display = "none";
                                                                document.getElementById("inputfile").value = '';
                                                            }}><MdFileUpload style={{ fontSize: '25px', color: file[index] ? 'green' : '' }} /></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className='btn_div'>
                                            <button className='btn btn-voilet' id='subnitbtn' onClick={handleAddVendorIvoice}>Add Vendor Payment</button>
                                            <button type='reset' className='btn btn-secondary mx-2'>Reset</button>
                                        </div>
                                    </form>
                                </article>
                            </div>


                            {/* Upload Model Start */}
                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Upload Invoice</h5>
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
                                                        file[indexno] = UploadLink;
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
                                                onClick={(e) => { e.preventDefault(); savatoarry(indexno) }}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Upload Model End */}



                            {/* ####################### Inoivce  Modal  Start ################################## */}
                            <div className="modal fade" id="invoiceModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document" style={{ minWidth: '48vw' }}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Select Invoice no</h5>
                                            <div className="form-group col-md-5">
                                                <input type="text" className='form-control col' placeholder='search Invoice' id="searchInvoice" onChange={handleGetInvoiceno} />
                                            </div>
                                        </div>
                                        <div className="modal-body overflow-auto" style={{ maxHeight: '60vh' }}>
                                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Account Number</th>
                                    <th>Invoice Number</th> 
                                    <th>Referance Number</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                pendinginvoicelist.map((item, index) => (
                                        <tr key={index}className="vendor-Invoice-list cursor-pointer" data-dismiss="modal" value={`${item.sno},${item.invoice_no}`}  onClick={(e) => {
                                                                handleChangeInvoiceDetail({ sno: item.sno, invoice_no: item.invoice_no, InvoiceAmt: item.invoice_amt, Index: invoceindexno, refno: item.reference_no, invoice_date: item.date, invoice_url: item.uploadInvoice, vendor_name: item.vendor });
                                                                savatoarry(invoceindexno)
                                            }}>
                                            <td>{item.account_no}</td>
                                    <td>{item.invoice_no}</td>
                                    <td>{item.reference_no}</td>
                                    
                                </tr>

                                    ))
                                    }
                              
                            </tbody>
                        </table>
                                            {/* <ul>
                                                {
                                                    pendinginvoicelist.map((item, index) => (
                                                        <li key={index} className="vendor-Invoice-list cursor-pointer" data-dismiss="modal"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleChangeInvoiceDetail({ sno: item.sno, invoice_no: item.invoice_no, InvoiceAmt: item.invoice_amt, Index: invoceindexno, refno: item.reference_no, invoice_date: item.date, invoice_url: item.uploadInvoice, vendor_name: item.vendor });
                                                                savatoarry(invoceindexno)
                                                            }}
                                                        >{item.reference_no}, ({item.invoice_no})</li>
                                                    ))
                                                }
                                            </ul> */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ####################### Vendor  Modal  End ################################## */}

                        </div>
                    </Sidebar>
                    : <LoadingPage />


            }
        </>
    )
}

export default AddVendorPayment;