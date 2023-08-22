import LandingFooter from '../LandingPageHome/LandingFooter'
import LandingHeader from '../LandingPageHome/LandingHeader';
import './Resister.css'
import React, { useState, useEffect } from 'react'
import { CgOrganisation } from 'react-icons/cg';
import { BsPersonCircle } from 'react-icons/bs';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import {
    TotalCountry, TotalState,
    TotalCity,
    AddOrganisation, CurrencyMaster, AddEmployees
} from '../../../api/index'


export default function Register() {
    const [verified, setVerified] = useState(false)
    const [countrylist, setCountrylist] = useState([]);
    const [passwordshow, setPasswordshow] = useState(false);
    const [cnfpasswordshow, setCnfpasswordshow] = useState(false);
    const [currencylist, setCurrencylist] = useState([]);


    const [statelist, setStatelist] = useState(false);
    const [citylist, setCitylist] = useState(false);
    const [mobileno, setMobileno] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            const totalCountry = await TotalCountry();
            setCountrylist(totalCountry)
            // const currency = await CurrencyMaster()
            // setCurrencylist(currency)
        }
        fetchdata()
    }, [])

    //recaptcha function
    const captchaChange = (value) => {
        if (value.length > 10) {
            setVerified(true)
        }
        else {
            alert("CAPTCHA Invalid")
        }
    }

    const handletoggleGSt = () => {
        const check_val = document.getElementById('gst-checkbox').checked === true ? false : true;
        if (check_val) {
            document.getElementById('gstno-div').style.display = 'none'
        }
        else {
            document.getElementById('gstno-div').style.display = 'block'
        }
    }
    const handleGetState = async (e) => {
        e.preventDefault();
        const value = e.target.value
        const result = await TotalState(value)
        setStatelist(result)
    }
    const handleGetCity = async (e) => {
        e.preventDefault();
        const result = await TotalCity(e.target.value)
        setCitylist(result)
    }
    const changeDiv = (currentStep) => {
        if (currentStep) {
            document.getElementById('orgdetails').style.display = 'none'
            document.getElementById('profile_detail').style.display = 'flex'
        }
        else {
            document.getElementById('profile_detail').style.display = 'none'
            document.getElementById('orgdetails').style.display = 'flex'
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const Orgname = document.getElementById('org_name').value;
        const OrgID = Orgname.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000)
        const Country = document.getElementById('country').value;
        const State = document.getElementById('state').value;
        const City = document.getElementById('city').value;
        const currency = document.getElementById('currency').value;
        const gst = document.getElementById('gstno').value;
        const full_name = document.getElementById('full_name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const user_id = document.getElementById('user_id').value;
        const password = document.getElementById('password').value;
        const cnf_pass = document.getElementById('cnf_pass').value;

        const employee_id = full_name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);

        const logo = ''
        if (password !== cnf_pass) {
            alert("Password Not MAtch")
        }
        else if (!Orgname || !Country || !State || !City || !full_name || !mobile) {
            alert("Blank Field")
        }
        else {
            const result = await AddOrganisation(OrgID, Orgname, Country, State, City, currency, gst, logo)
            const Employee = await AddEmployees(Orgname, employee_id, full_name, "", email, mobile, Orgname, "")
            alert("Organisation Added")
        }
    }

    return (
        <>
            <div className='comp_reg_div'>
                <LandingHeader />
                <div className='Resister-wrapper mt-3 mb-5  d-flex align-items-center'>

                    {/* // ==================================================== Step 1 Start =============================================================== */}
                    <div className="container" id='orgdetails'>
                        <div className='reg_main_div d-flex justify-content-center rounded'>
                            <div className="for_reg">
                                <header className="card-header">
                                    <div style={{ display: "flex" }}>
                                        <h5 className='mb-4'>Set up your Organiztaion Profile
                                        </h5><CgOrganisation id='icon_for_sm' />
                                    </div>
                                </header>
                                <article className="card-body">
                                    <form autoComplete='off'>
                                        <div className="row mt-2">
                                            <div className="form-group">
                                                <label htmlFor='org_name'>Organiztaion Name <span className='text-danger'>*</span></label>
                                                <input type="text" id='org_name' className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group col">
                                                <label htmlFor='country'>Country <span className='text-danger'>*</span></label>
                                                <select id="country" className="form-select"
                                                    onChange={handleGetState}>
                                                    <option value='' hidden>Select Country</option>
                                                    {
                                                        countrylist.map((item, index) => (
                                                            <option key={index} value={item.country_id}>{item.country_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col">
                                                <label htmlFor='state'>State <span className='text-danger'>*</span></label>
                                                <select id="state" className="form-select"
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
                                        </div>
                                        <div className="row mt-3">
                                            <div className="form-group col">
                                                <label htmlFor='city'>City <span className='text-danger'>*</span></label>
                                                <select id="city" className="form-select">
                                                    <option value='' hidden>Choose...</option>
                                                    {
                                                        citylist.length ?
                                                            citylist.map((item, index) => (
                                                                <option key={index} value={item.city_name}>{item.city_name}</option>
                                                            ))
                                                            : <option value=''> Please Select Country</option>
                                                    }
                                                </select>
                                            </div>
                                            {/* <div className="form-group col">
                                                <label htmlFor="currency">Currency <span className='text-danger'>*</span></label>
                                                <select id="currency" className="form-control">
                                                    <option value='' hidden>Choose...</option>

                                                    {currencylist.length ?
                                                        currencylist.map((item, index) => (
                                                            <option key={index} value={item.currencyCode}>{item.name} , {item.currencyCode}</option>

                                                        ))
                                                        : <option value=''> Please Select Currency</option>
                                                    }
                                                </select>
                                            </div> */}
                                        </div>
                                        <div className="form-group mt-3 d-flex" >
                                            <p>Is this Business registered for GST &nbsp;&nbsp;
                                                <input className='pt-3' id='gst-checkbox' style={{ height: "18px", width: "18px" }} type="checkbox" onChange={handletoggleGSt}></input>
                                            </p>
                                        </div>
                                        <div className="row mb-3" id='gstno-div' style={{ display: "none" }}>
                                            <div className="form-group col-md-5">
                                                <label htmlFor='gstno'>Gst no :-</label>
                                                <input type='text' id="gstno" className="form-control col" placeholder='XXXXXXXXXXXXXXX' />
                                            </div>
                                        </div>
                                        <button type="submit" onClick={(e) => { e.preventDefault(); changeDiv(true) }} className="btn btn-voilet">Next</button>
                                        <p className=" mt-2 pt-1 mb-0">Already! have an account? <Link to="/Signin" className="link-danger">Sign In</Link></p>
                                    </form>
                                </article>
                            </div>
                            <div className='for_icon'>
                                <CgOrganisation id="organisation" /><br />
                                <h5 style={{ textAlign: "center", fontSize: "25px" }}>Organiztaion Profile</h5>
                                <p className='mx-3 my-5 text-center'>Fill out the form here for your complete details about organisation. You can always edit these details</p>
                                <h6 className='pagechange text-center text-white rounded-circle'>1</h6>
                            </div>
                        </div>
                    </div>
                    {/* // ==================================================== Step 1 End =============================================================== */}

                    {/* //  ============================================ STEP 2  Start======================================================== */}

                    <div className="container" id='profile_detail' style={{ display: 'none' }}>
                        <div className='reg_main_div d-flex rounded' >
                            <div className="for_reg">
                                <header className="card-header" >
                                    <div className='d-flex'>
                                        <h5 className='mb-4'>Set up your Personal Details</h5><BsPersonCircle id='icon_for_sm' />
                                    </div>
                                </header>
                                <article className="card-body">
                                    <form autoComplete='off'>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor='name'>Full Name <span className='text-danger'>*</span></label>
                                                <input type="text" id='full_name' className="form-control col" />
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className="form-group col-md-6">
                                                <label htmlFor='mobile'>Mobile <span className='text-danger'>*</span></label>
                                                <input type="number" id='mobile' className="form-control" value={mobileno}
                                                    onChange={(e) => { if (e.target.value === 11) { return false } setMobileno(e.target.value) }}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="email">Email <span className='text-danger'>*</span></label>
                                                <input type="email" id='email' className="form-control" />
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className="form-group col">
                                                <label htmlFor="user_id">User Id <span className='text-danger'>*</span></label>
                                                <input type="text" id='user_id' className="form-control" />
                                            </div>
                                        </div>

                                        <div className="row mt-1">
                                            <div className=" form-group col-md-6">
                                                <label htmlFor="password">Password <span className='text-danger'>*</span></label>
                                                <div className="input-group ">
                                                    <input type={passwordshow ? "text" : "password"} className="form-control" placeholder="Enter password" id="password" />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text h-100 w-100" onClick={(e) => {
                                                            e.preventDefault(); setPasswordshow(!passwordshow)
                                                        }}>
                                                            {passwordshow ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" form-group col-md-6">
                                                <label htmlFor="cnf_pass"> Confirm Password <span className='text-danger'>*</span></label>
                                                <div className="input-group ">
                                                    <input type={cnfpasswordshow ? "text" : "password"} className="form-control" placeholder="Confirm password" id="cnf_pass" />
                                                    <div className="input-group-append" >
                                                        <span className="input-group-text h-100 w-100" onClick={(e) => {
                                                            e.preventDefault(); setCnfpasswordshow(!cnfpasswordshow)
                                                        }}>
                                                            {cnfpasswordshow ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <ReCAPTCHA
                                            className='mt-3'
                                            sitekey="6LfhsLgiAAAAAAGeb1jYsf0mBw6rzfJJaZ-iVYNJ"
                                            onChange={captchaChange}
                                        />
                                        <button type="submit" onClick={(e) => { e.preventDefault(); changeDiv(false) }} className="btn btn-secondary my-3">Back</button>
                                        <button type="submit" className="btn btn-voilet mx-2" onClick={handleClick} disabled={!verified}>Submit</button>
                                    </form>
                                </article>
                            </div>
                            <div className='for_icon'>
                                <BsPersonCircle id="organisation" /><br />
                                <h5 className='text-center' style={{ fontSize: "25px" }}>Personal Profile Details</h5>
                                <p className='mx-3 my-5 text-center'>Fill out the form here for your complete details about personal. You can always edit these details</p>
                                <h6 style={{ marginTop: "120px" }} className='pagechange text-center text-white rounded-circle'>2</h6>
                            </div>
                        </div>
                    </div>

                    {/* // ==================================================== Step 2 End =============================================================== */}

                </div>
                <LandingFooter />
            </div>
        </>
    )
}
