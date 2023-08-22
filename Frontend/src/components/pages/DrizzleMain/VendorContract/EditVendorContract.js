import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { GetVendorContract, ActiveLocation, ActiveContractType, ActiveVendorCategory, ActiveVendorCode, ActiveVendSubCate, UpdateVendorContract } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditVendorCode() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const [locationlist, setLocationlist] = useState([])
    const [contractlist, setContractlist] = useState([])
    const [vendorcatlist, setVendorcatlist] = useState([])
    const [vendorsubcatlist, setVendorsubcatlist] = useState([])
    const [vendorlist, setVendorlist] = useState([])
    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const org = localStorage.getItem('Database')

            const vendcontract = await GetVendorContract(org, localStorage.getItem('VendorContractSno'));
            setData(vendcontract[0])


            if (vendcontract[0].major_category === 'Internet' || vendcontract[0].major_category === 'Data' || vendcontract[0].major_category === 'Telecom') {
                document.getElementById('link_id_div').style.display = 'block'
            }
            else {
                document.getElementById('link_id_div').style.display = 'none'
            }

            if (vendcontract[0].type_of_contract === 'Recurring') {
                document.getElementById('recurringdiv').style.display = "block"
            }
            else {
                document.getElementById('recurringdiv').style.display = "none"
            }

            if (vendcontract[0].tds === 'true') {
                document.getElementById('tds').checked = true
            }
            const tablelocation = await ActiveLocation(org);
            setLocationlist(tablelocation)

            const contract = await ActiveContractType(org);
            setContractlist(contract)

            const vendorCategory = await ActiveVendorCategory(org)
            setVendorcatlist(vendorCategory)

            const vendorall = await ActiveVendorCode(org);
            setVendorlist(vendorall)

            const subcate = await ActiveVendSubCate(org, vendcontract[0].major_category);
            setVendorsubcatlist(subcate)
        }
        fetchdata()
    }, [])


    const togglerecurrngdiv = (e) => {
        if (e.target.value === 'Recurring') {
            document.getElementById('recurringdiv').style.display = "block"
        }
        else {
            document.getElementById('recurringdiv').style.display = "none"
        }
    }


    const handleChangeCategory = async (e) => {
        const val = e.target.value;
        const org = localStorage.getItem('Database')


        if (val === 'Internet' || val === 'Data' || val === 'Telecom') {
            document.getElementById('link_id_div').style.display = 'block'
        }
        else {
            document.getElementById('link_id_div').style.display = 'none'
        }
        const subcate = await ActiveVendSubCate(org, e.target.value);
        setVendorsubcatlist(subcate)
    }


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const vendor = document.getElementById('vendor').value;
        const type_of_contract = document.getElementById('contract_type').value;
        const major_category = document.getElementById('vendor_category').value;
        const sub_category = document.getElementById('vendor_sub_category').value;
        const location = document.getElementById('location').value;
        const company = document.getElementById('company').value;
        const customer_account_no = document.getElementById('cust_ac_no').value;
        let reference_no = document.getElementById('ref_no_input').value;
        let contact_plain_details = document.getElementById('contact_plan_detail').value;
        let rate_per_month = document.getElementById('rate_per_month').value;
        let contract_start_date = document.getElementById('contract_start_date').value;
        let invoice_generation_date = document.getElementById('invoice_generation_date').value;
        let billing_freq = document.getElementById('billing_freq').value;
        const payee_name = document.getElementById('payee_name').value;
        const tds = document.getElementById('tds').checked ? 'true' : 'false';
        let link_id_no = document.getElementById('link_id_no').value;
        const help_desk_no = document.getElementById('help_desk_no').value;
        const user_id = localStorage.getItem('UserId')
        const sno = localStorage.getItem('VendorContractSno');
        const org = localStorage.getItem('Database')


        if (!vendor ||
            !type_of_contract || !major_category || !sub_category || !customer_account_no || !payee_name || !tds || !help_desk_no) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter all mandatory fields', 'warning', 'self')
        }
        else {
            // const refno = document.getElementById('ref_no').checked ? true : false;
            let errorcount = 0;
            if (type_of_contract === 'Recurring') {
                if (!contact_plain_details || !rate_per_month || !contract_start_date || !invoice_generation_date || !billing_freq) {
                    errorcount = errorcount + 1
                    setLoading(true)
                    document.getElementById('subnitbtn').disabled = false
                    callfun('Please fill the Contract Detail', 'warning', 'self')
                }
            }
            else {
                contact_plain_details = '';
                rate_per_month = '';
                contract_start_date = '';
                invoice_generation_date = '';
                billing_freq = ''
            }
            if (major_category === 'Internet' || major_category === 'Data' || major_category === 'Telecom') {
                if (!link_id_no) {
                    errorcount = errorcount + 1
                    setLoading(true)
                    document.getElementById('subnitbtn').disabled = false
                    callfun('Please Enter the Link id noo', 'warning', 'self')
                }
            }
            else { link_id_no = '' }


            if (errorcount === 0) {
                setLoading(true)
                const callapi = await UpdateVendorContract(org, sno, vendor, type_of_contract,
                    major_category, sub_category, location, company, customer_account_no, reference_no, contact_plain_details,
                    rate_per_month, contract_start_date, invoice_generation_date, billing_freq, payee_name, tds, link_id_no,
                    help_desk_no, user_id)

                if (callapi === 'Updated') {
                    localStorage.removeItem('VendorContractSno');
                    callfun('Vendor Contract Update', 'success', '/TotalVendorContract')
                }
                else {
                    document.getElementById('subnitbtn').disabled = false
                    callfun('Server Error', 'danger', 'self')
                }
            }
        }
    }

    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ################# Snackbar ##################### */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ################# Snackbar ##################### */}

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Contract</span> <MdOutlineKeyboardArrowRight /><span className='page-type-head2'>Edit Vendor Contract</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('VendorContractSno'); window.location.href = '/TotalVendorContract' }} >Back <MdOutlineArrowForward /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-0 card inner-card py-3">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor='vendor'>Vendor <span className='text-danger'>*</span></label>
                                                <select className="form-select" id='vendor' disabled>
                                                    <option value={data.vendor} hidden>{data.vendor}</option>
                                                    {
                                                        vendorlist.map((item, index) =>
                                                            <option key={index} value={item.vendor_name}>{item.vendor_name}</option>)
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-4" >
                                                <label htmlFor='company'>Company</label>
                                                <select className="form-select" id='company' required >
                                                    <option value={data.company} hidden>{data.company}</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='location'>Location</label>
                                                <select className="form-select" id='location' required >
                                                    <option value={data.location} hidden>{data.location}</option>
                                                    {
                                                        locationlist.map((item, index) =>
                                                            <option key={index} value={item.location_code}>{item.location_name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4">
                                                <label htmlFor='contract_type'>Type of Contract <span className='text-danger'>*</span></label>
                                                <select className="form-select" id='contract_type' onChange={togglerecurrngdiv}>
                                                    <option value={data.type_of_contract} hidden>{data.type_of_contract}</option>
                                                    {
                                                        contractlist.map((item, index) =>
                                                            <option key={index} value={item.contract_type}>{item.contract_type}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='vendor_category'>Vendor Category <span className='text-danger'>*</span></label>
                                                <select type="text" className="form-select" id='vendor_category' required onChange={handleChangeCategory}>
                                                    <option value={data.major_category} hidden>{data.major_category}</option>
                                                    {
                                                        vendorcatlist.map((item, index) =>
                                                            <option key={index} value={item.vendor_category}>{item.vendor_category}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='vendor_sub_category'>Vendor Sub Category <span className='text-danger'>*</span></label>
                                                <select type="text" className="form-select" id='vendor_sub_category' required >
                                                    <option value={data.sub_category} hidden>{data.sub_category}</option>
                                                    {
                                                        vendorsubcatlist.map((item, index) =>
                                                            <option key={index} value={item.vendor_sub_category}>{item.vendor_sub_category}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-4">
                                                <label htmlFor='cust_ac_no'>Customer Account No <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='cust_ac_no' required defaultValue={data.customer_account_no} />
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center" >
                                                <label htmlFor='ref_no' className='col-md-4' >Reference Number <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='ref_no_input' required placeholder='Reference no.' defaultValue={data.reference_no} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4" >
                                                <label htmlFor='payee_name'>Payee Name <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='payee_name' required defaultValue={data.payee_name} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='help_desk_no'>HelpDesk Number <span className='text-danger'>*</span></label>
                                                <input type="number" className="form-control" id='help_desk_no' required defaultValue={data.help_desk_no} />
                                            </div>
                                            <div className="col-md-3 mt-3 d-flex align-items-center" >
                                                <label htmlFor='tds' className='col-md-3' >TDS </label>
                                                <input type="checkbox" className="" id='tds' style={{ height: "20px", width: "20px" }} />
                                            </div>
                                        </div>
                                        <div className='mt-2' id='recurringdiv' style={{ display: "none" }}>
                                            <div className="row ">
                                                <div className="col-md-4">
                                                    <label htmlFor='contact_plan_detail'>Contact Plan Detail <span className='text-danger'>*</span></label>
                                                    <input type="text" className="form-control" id='contact_plan_detail' required defaultValue={data.contatct_plain_details} />
                                                </div>
                                                <div className="col-md-4" >
                                                    <label htmlFor='rate_per_month'>Rate Per Month <span className='text-danger'>*</span></label>
                                                    <input type="number" className="form-control" id='rate_per_month' required defaultValue={data.rate_per_month} />
                                                </div>
                                                <div className="col-md-4" >
                                                    <label htmlFor='contract_start_date'>Contract Start Date <span className='text-danger'>*</span></label>
                                                    <input type="date" className="form-control" id='contract_start_date' required defaultValue={data.contract_start_date} />
                                                </div>
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-md-4" >
                                                    <label htmlFor='invoice_generation_date'>Invoice Generation Date <span className='text-danger'>*</span></label>
                                                    <input type="number" className="form-control" id='invoice_generation_date' required value={data.invoice_generation_date}
                                                        onChange={(e) => {
                                                            if (e.target.value > 31) return false;
                                                            setData({ ...data, invoice_generation_date: e.target.value })
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-4" >
                                                    <label htmlFor='billing_freq'>Billing Frequency <span className='text-danger'>*</span></label>
                                                    <input type="text" className="form-control" id='billing_freq' required defaultValue={data.billling_freq} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row " id='link_id_div' style={{ display: "none" }}>
                                            <div className="col-md-4" >
                                                <label htmlFor='link_id_no'>Link Id No <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='link_id_no' defaultValue={data.link_id_no} required />
                                            </div>
                                        </div>
                                        <div className="form-group mx-2 mt-3" >
                                            <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleaddinsert}>Update Contract</button>
                                        </div>
                                    </form>
                                </article>
                            </div>

                        </div>

                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}

export default EditVendorCode;