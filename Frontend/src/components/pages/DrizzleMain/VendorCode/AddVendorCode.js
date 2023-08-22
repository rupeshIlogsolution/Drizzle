import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { InsertVendorCode, TotalCountry, TotalState, TotalCity, VendorCreateEmail } from '../../../../api'
import { MdOutlineKeyboardArrowRight, MdAddCircle } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { FaMinusCircle } from 'react-icons/fa'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddVendorCode() {
    const [loading, setLoading] = useState(true)
    const [pincodecount, setPincodecount] = useState()
    const [phonenocount, setPhonenocount] = useState()
    const [numbercount, setNumbercount] = useState()

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
            const totalCountry = await TotalCountry();
            setCountrylist(totalCountry)
        }
        fetchdata()
    }, [])

    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const vendor_code = document.getElementById('vendor_code').value;
        const vendor_name = document.getElementById('vendor_name').value;
        const vendor_code_id = vendor_name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const comp_gst = document.getElementById('comp_gst').value;
        const comp_website = document.getElementById('comp_website').value;
        const comp_email = document.getElementById('comp_email').value;
        const comp_phone = document.getElementById('comp_phone').value;

        let comp_country = document.getElementById('comp_country');
        const company_country_id = comp_country.value;
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
        const org = localStorage.getItem('Database')

        const user_id = localStorage.getItem('UserId');

        const message = {
            vendor_name: vendor_name,
            vendor_code: vendor_code,
            vendor_city: comp_city,
            contact_person: contact_person,
            contact_person_name: contact_no
        }

        if (!vendor_code || !vendor_name || !company_country_id || !comp_city || !comp_state_id
            || !comp_email || !contact_person || !contact_no || !contact_email) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter all mandatory fields', 'warning', 'self')
        }
        else {
            const result = await InsertVendorCode(org, vendor_code_id, vendor_code, vendor_name, comp_email, comp_website, comp_gst,
                comp_phone, company_country_id, comp_country, comp_state_id, comp_state, comp_city, comp_pincode, comp_addr1, comp_addr2,
                vendor_portal, contact_person, contact_no, contact_email, user_id);

            const result1 = await VendorCreateEmail(message)

            setLoading(true)

            if (result === 'Added') {
                callfun('Vendor Code Added', 'success', '/TotalVendorCode')
            }
            else if (result === 'Already') {
                callfun('Vendor Code Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }

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
        const result = await TotalState(e.target.value)
        setStatelist(result)
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
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Vendor Code <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Vendor Master</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalVendorCode' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card py-3">
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
                                                            <input type="text" className="form-control" id='vendor_code' required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='vendor_name'>Vendor Name <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id='vendor_name' required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_email'>Company Email Id <span className='text-danger'>*</span></label>
                                                            <input type="email" className="form-control" id='comp_email' required />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_website'>Company website</label>
                                                            <input type="url" className="form-control" id='comp_website' required />
                                                        </div>

                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_gst'>Company GST no.</label>
                                                            <input type="text" className="form-control" id='comp_gst' />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='comp_phone'>Phone no.</label>
                                                            <input type="number" className="form-control" id='comp_phone'
                                                                value={phonenocount}
                                                                onChange={(e) => { if (e.target.value.length === 11) return false; else { setPhonenocount(e.target.value) } }}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className='row mt-2'>
                                                        <div className="col-md-4">
                                                            <label htmlFor='comp_country'>Country<span className='text-danger'>*</span></label>
                                                            <select type="text" className="form-select" id='comp_country' required onChange={handleGetState}>
                                                                <option value='' hidden>Select Country</option>
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
                                                                <option value='' hidden>Select State</option>
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
                                                                <option value='' hidden>Select City</option>
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
                                                            <input type="number" className="form-control" id='comp_pincode' required value={pincodecount}
                                                                onChange={(e) => { if (e.target.value.length === 7) return false; else { setPincodecount(e.target.value) } }} />
                                                        </div>
                                                        <div className=" col-md-2 d-flex align-items-center" >
                                                            <label htmlFor='vendor_portal' className='col' >Vendor Portal</label>
                                                            <input type="checkbox" className="" id='vendor_portal' style={{ height: "20px", width: "20px" }} />
                                                        </div>
                                                    </div>

                                                    <div className='row mt-2'>
                                                        <div className="col ">
                                                            <label htmlFor='comp_addr1'>Company Address Line 1 </label>
                                                            <input type="text" className="form-control" id='comp_addr1' required />
                                                        </div>

                                                        <div className="col">
                                                            <label htmlFor='comp_addr2'>Company Address Line 2</label>
                                                            <input type="text" className="form-control" id='comp_addr2' />
                                                        </div>
                                                    </div>


                                                </div>
                                            </li>

                                            <li style={{ listStyle: "none" }}>
                                                <div className='cursor-pointer' onClick={handleTogglePersonDetail}>
                                                    <div className="link_text mt-2" >
                                                        {persondetail ? <FaMinusCircle /> : <MdAddCircle />}
                                                        &nbsp;Contact Person Details &nbsp;
                                                        {persondetail ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                                    </div>
                                                </div>

                                                <div className='mx-3' id='persondetaildiv' style={{ display: 'none' }}>
                                                    <div className="row mt-1">
                                                        <div className="col-md-4">
                                                            <label htmlFor='contact_person'>Name <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id='contact_person' required />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='contact_no'>Contact no <span className='text-danger'>*</span></label>
                                                            <input type="number" className="form-control" id='contact_no' required value={numbercount}
                                                                onChange={(e) => { if (e.target.value.length === 11) return false; else { setNumbercount(e.target.value) } }}
                                                            />
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <label htmlFor='contact_email'> Email Id <span className='text-danger'>*</span></label>
                                                            <input type="email" className="form-control" id='contact_email' required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="form-group mt-3 mx-2" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Vendor Master </button>
                                            <button type="reset" className="btn btn-secondary mx-3">Reset</button>
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

export default AddVendorCode;