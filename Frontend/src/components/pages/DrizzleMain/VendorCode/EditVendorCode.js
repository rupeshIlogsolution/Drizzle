import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { GetVendorCode, UpdateVendorCode, TotalCountry, TotalState, TotalCity } from '../../../../api'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { MdOutlineKeyboardArrowRight, MdAddCircle } from 'react-icons/md'
import { FaMinusCircle } from 'react-icons/fa'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditVendorCode() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const [vendordetail, setVendordetail] = useState(true)
    const [persondetail, setPersondetail] = useState(false)

    const [countrylist, setCountrylist] = useState([]);
    const [statelist, setStatelist] = useState([]);
    const [citylist, setCitylist] = useState([]);

    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')

            const tabledata = await GetVendorCode(org, localStorage.getItem('VendorCodeSno'))
            setData(tabledata[0])
            const totalCountry = await TotalCountry();
            setCountrylist(totalCountry)

            const result = await TotalState(tabledata[0].company_country_id)
            setStatelist(result)

            const citys = await TotalCity(tabledata[0].company_state_id)
            setCitylist(citys)

            setLoading(true)
            if (tabledata[0].venodr_portal === 'true') {
                document.getElementById('vendor_portal').checked = true
            }

        }
        fetchdata()

    }, [])


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const vendor_code = document.getElementById('vendor_code').value;
        const vendor_name = document.getElementById('vendor_name').value;
        const comp_gst = document.getElementById('comp_gst').value;
        const comp_website = document.getElementById('comp_website').value;
        const comp_email = document.getElementById('comp_email').value;
        const comp_phone = document.getElementById('comp_phone').value;

        let comp_country = document.getElementById('comp_country');
        const comp_country_id = comp_country.value;
        comp_country = comp_country.options[comp_country.selectedIndex].text;

        let comp_state = document.getElementById('comp_state');
        const comp_state_id = comp_state.value;
        comp_state = comp_state.options[comp_state.selectedIndex].text;

        const comp_city = document.getElementById('comp_city').value;

        const comp_addr1 = document.getElementById('comp_addr1').value;
        const comp_addr2 = document.getElementById('comp_addr2').value;
        const comp_pincode = document.getElementById('comp_pincode').value;
        const vendor_portal = document.getElementById('vendor_portal').checked ? true : false;
        const contact_person = document.getElementById('contact_person').value;
        const contact_no = document.getElementById('contact_no').value;
        const contact_email = document.getElementById('contact_email').value;
        const user_id = localStorage.getItem('UserId');
        const sno = localStorage.getItem('VendorCodeSno')
        const org = localStorage.getItem('Database')


        if (!vendor_code || !vendor_name || !comp_country_id || !comp_city || !comp_state_id
            || !comp_email || !contact_person || !contact_no || !contact_email) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter all mandatory fields', 'warning', 'self')
        }
        else {
            const result = await UpdateVendorCode(org, sno, vendor_code, vendor_name, comp_gst, comp_website, comp_email, comp_phone, comp_country_id, comp_country,
                comp_state_id, comp_state, comp_city, comp_addr1, comp_addr2, comp_pincode, vendor_portal, contact_person, contact_no, contact_email, user_id);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('VendorCodeSno');
                callfun('Vendor Code Updated', 'success', '/TotalVendorCode')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }

    }

    const handleChangephoneno = (e) => {
        if (e.target.value.length === 11) { return false }
        else { setData({ ...data, company_phone: e.target.value }) }
    }


    const handleChangepinCode = (e) => {
        if (e.target.value.length === 7) { return false }
        else { setData({ ...data, company_pin_code: e.target.value }) }
    }

    const handleChangeno = (e) => {
        if (e.target.value.length === 11) { return false }
        else { setData({ ...data, contact_person_phone: e.target.value }) }
    }

    const handleToggleVendorDetail = (e) => {
        e.preventDefault();
        if (vendordetail) {
            document.getElementById('vendordetaildiv').style.display = 'none'
            document.getElementById('persondetaildiv').style.display = 'block'
            setPersondetail(!persondetail)
        }
        else {
            document.getElementById('vendordetaildiv').style.display = 'block'
            document.getElementById('persondetaildiv').style.display = 'none'
            setPersondetail(!persondetail)
        }
        setVendordetail(!vendordetail)
    }

    const handleTogglePersonDetail = (e) => {
        e.preventDefault();
        if (persondetail) {
            document.getElementById('persondetaildiv').style.display = 'none'
            document.getElementById('vendordetaildiv').style.display = 'block'
            setVendordetail(!vendordetail)
        }
        else {
            document.getElementById('persondetaildiv').style.display = 'block'
            document.getElementById('vendordetaildiv').style.display = 'none'
            setVendordetail(!vendordetail)
        }
        setPersondetail(!persondetail)
    }

    const handleGetState = async (e) => {
        setData({ ...data, company_state: '' })
        setData({ ...data, company_state_id: '' })

        setData({ ...data, company_city: '' })
        setData({ ...data, company_city: '' })
        const result = await TotalState(e.target.value)
        setStatelist(result)
        setCitylist([])
    }
    const handleGetCity = async (e) => {
        const result = await TotalCity(e.target.value)
        setCitylist(result)
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
                                <h4><span className='page-type-head1'>Vendor Master <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Vendor Master</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('VendorCodeSno'); window.location.href = '/TotalVendorCode' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-0 card inner-card py-3">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <ul className='px-1'>

                                            {/* #################### Device Detail  Box Start #####################*/}
                                            <li style={{ listStyle: "none" }}>
                                                <div className='cursor-pointer' onClick={handleToggleVendorDetail}>
                                                    <div className="link_text " >
                                                        {vendordetail ? <FaMinusCircle /> : <MdAddCircle />}
                                                        &nbsp;Vendor / Company Details &nbsp;
                                                        {vendordetail ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                                    </div>
                                                </div>

                                                <div className='mx-3' id='vendordetaildiv'>
                                                    <div className="row mt-1">
                                                        <div className="col-md-4">
                                                            <label htmlFor='vendor_code'>Vendor Code <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id='vendor_code' defaultValue={data.vendor_code} required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='vendor_name'>Vendor Name <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id='vendor_name' defaultValue={data.vendor_name} required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_email'>Company Email Id <span className='text-danger'>*</span></label>
                                                            <input type="email" className="form-control" id='comp_email' defaultValue={data.company_email} required />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_website'>Company website</label>
                                                            <input type="url" className="form-control" id='comp_website' defaultValue={data.company_website} required />
                                                        </div>

                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_gst'>Company GST no.</label>
                                                            <input type="text" className="form-control" id='comp_gst' defaultValue={data.company_gst} />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_phone'>Phone no.</label>
                                                            <input type="number" className="form-control" id='comp_phone' value={data.company_phone} onChange={handleChangephoneno} />
                                                        </div>

                                                    </div>
                                                    <div className='row mt-2'>
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_country'>Country<span className='text-danger'>*</span></label>
                                                            <select type="text" className="form-select" id='comp_country' required onChange={handleGetState}>
                                                                <option value={data.company_country_id} hidden>{data.company_country}</option>
                                                                {
                                                                    countrylist.map((item, index) => (
                                                                        <option key={index} value={item.country_id}>{item.country_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_state'> State <span className='text-danger'>*</span></label>
                                                            <select className="form-select" id='comp_state' required
                                                                onChange={handleGetCity}
                                                            >
                                                                <option value={data.company_state_id} hidden>{data.company_state}</option>
                                                                {
                                                                    statelist.length ?
                                                                        statelist.map((item, index) => (
                                                                            <option key={index} value={item.state_id}>{item.state_name}</option>
                                                                        ))
                                                                        : <option value=''> Please Select Country</option>
                                                                }
                                                            </select>

                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_city'> City <span className='text-danger'>*</span></label>
                                                            <select type="text" className="form-select" id='comp_city' required >
                                                                <option value={data.company_city} hidden>{data.company_city}</option>
                                                                {
                                                                    citylist.length ?
                                                                        citylist.map((item, index) => (
                                                                            <option key={index} value={item.city_name}>{item.city_name}</option>
                                                                        ))
                                                                        : <option value=''> Please Select State</option>
                                                                }
                                                            </select>

                                                        </div>
                                                    </div>

                                                    <div className="row mt-2">
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_pincode'> Pincode </label>
                                                            <input type="number" className="form-control" id='comp_pincode' value={data.company_pin_code} onChange={handleChangepinCode} />
                                                        </div>
                                                        <div className=" col-md-2 d-flex align-items-center" >
                                                            <label htmlFor='vendor_portal' className='col' >Vendor Portal</label>
                                                            <input type="checkbox" className="" id='vendor_portal' style={{ height: "20px", width: "20px" }} />
                                                        </div>
                                                    </div>

                                                    <div className='row mt-2'>
                                                        <div className="col ">
                                                            <label htmlFor='comp_addr1'>Company Address Line 1 </label>
                                                            <input type="text" className="form-control" id='comp_addr1' defaultValue={data.company_address_line1} required />
                                                        </div>

                                                        <div className="col">
                                                            <label htmlFor='comp_addr2'>Company Address Line 2</label>
                                                            <input type="text" className="form-control" defaultValue={data.company_address_line2} id='comp_addr2' />
                                                        </div>
                                                    </div>


                                                </div>
                                            </li>

                                            <li style={{ listStyle: "none" }}>
                                                <div className='cursor-pointer' onClick={handleTogglePersonDetail}>
                                                    <span>
                                                        <div className="link_text mt-2" >
                                                            {persondetail ? <FaMinusCircle /> : <MdAddCircle />}
                                                            &nbsp;Contact Person Details &nbsp;
                                                            {persondetail ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                                        </div>
                                                    </span>
                                                </div>

                                                <div className='mx-3' id='persondetaildiv' style={{ display: 'none' }}>
                                                    <div className="row mt-1">
                                                        <div className="col-md-4">
                                                            <label htmlFor='contact_person'>Name <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id='contact_person' defaultValue={data.contact_person_name} required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='contact_no'>Contact no <span className='text-danger'>*</span></label>
                                                            <input type="number" className="form-control" id='contact_no' value={data.contact_person_phone} onChange={handleChangeno} />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='contact_email'> Email Id <span className='text-danger'>*</span></label>
                                                            <input type="email" className="form-control" id='contact_email' defaultValue={data.contact_person_email} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="form-group mt-3 mx-1" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Edit Vendor Master </button>
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