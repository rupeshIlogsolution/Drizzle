import React, { useState } from 'react'
import './Navbar.css'
import { FaTicketAlt, FaElementor } from 'react-icons/fa'
import { MdOutlineExitToApp, MdOutlineArrowDropDown, MdOutlineHelp, MdGroups, MdEmail, MdPermContactCalendar } from 'react-icons/md'
import { BsFillClockFill, BsYoutube, BsFillLaptopFill } from 'react-icons/bs'
import { BsBellFill } from 'react-icons/bs'
import { RiMoneyEuroCircleFill, RiSettings3Fill, RiUserFill } from 'react-icons/ri'
import { IoMdHelp } from 'react-icons/io'
import DrizzleLogo from '../../image/drizzle_logo.png'
import { Link } from 'react-router-dom'
import { VscListFilter } from 'react-icons/vsc'
import { HiDocumentText } from 'react-icons/hi'
import UpdateModel from '../pages/AlertModal/UpdateModel'
// import { TiVendorMicrosoft } from 'react-icons/ti'
// import { CgOrganisation } from 'react-icons/cg'
// import { GrUserExpert } from 'react-icons/gr'
// import { FiUserPlus } from 'react-icons/fi'



const Navbar = (props) => {


    return (
        <>
            <div className='nav_with_alert'>
                {/* <UpdateModel /> */}
                <div className="innernavbarcontainer bg-white mb-3 d-flex align-items-center">

                    {props.isOpen ?
                        null : <img className='navbar-brand logo-img' src={DrizzleLogo} alt='Drizzle Logo' />}

                    {/* <div className='reports mx-4'>
                        <Link className=' d-flex align-items-center  cursor-pointer' to="/reports" style={{ textDecoration: "none", color: "#212529" }}>
                            <HiDocumentText style={{ fontSize: "28px", color: "gray" }} />
                            <p className='mb-0' style={{ fontSize: "17px" }}>Reports</p>
                        </Link>
                        <span className="tooltiptext ">Reports</span>
                    </div> */}
                    <div className='help d-flex mx-4 '>
                                <span className="tooltiptext">Reports</span>
                                <div role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   
                                    Report
                                    <MdOutlineArrowDropDown style={{ fontSize: "23px", margin: "0 -3px", color: "#404040" }} />
                                </div>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" style={{ border: '1px solid silver', margin: "0 -2px" }}>
                                    <Link className="dropdown-item" to="/assetreports"> Asset Reports</Link>
                                </div>
                            </div>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid silver', margin: "0 -2px" }}>
                                    <a className="dropdown-item" href="/AddNewAssets"> Enroll New Asset</a>
                                    <Link className="dropdown-item" to="/AddTickets">Create a New Ticket</Link>
                                    <Link className="dropdown-item" to="/AddVendorCode"> Create a New Vendor</Link>
                                    <Link className="dropdown-item" to="/AddVendorInvoice"> New Vendor Invoice</Link>
                                    <Link className="dropdown-item" to="/AddVendorPayment"> Add Vendor Payment</Link>
                                </div>


                    <div className='navcontainer-second position-absolute d-flex align-items-center justify-content-end '>
                        <div className='navcontainer-innersecond mx-4'>
                            <div className='d-flex mx-1 clock'>

                                <div role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    <VscListFilter style={{ fontSize: "18px", color: "#404040" }} />
                                    <BsFillClockFill style={{ fontSize: "18px", color: "#404040" }} />
                                    <MdOutlineArrowDropDown style={{ fontSize: "21px", color: "#404040" }} />
                                </div>
                                <span className="tooltiptext">Shortcut</span>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid silver', margin: "0 -2px" }}>
                                    <a className="dropdown-item" href="/AddNewAssets"> Enroll New Asset</a>
                                    <Link className="dropdown-item" to="/AddTickets">Create a New Ticket</Link>
                                    <Link className="dropdown-item" to="/AddVendorCode"> Create a New Vendor</Link>
                                    <Link className="dropdown-item" to="/AddVendorInvoice"> New Vendor Invoice</Link>
                                    <Link className="dropdown-item" to="/AddVendorPayment"> Add Vendor Payment</Link>
                                </div>
                            </div>
                            <div className='help d-flex mx-1 '>
                                <span className="tooltiptext">Help</span>
                                <div role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <MdOutlineHelp style={{ fontSize: "21px", color: "#404040" }} />
                                    <MdOutlineArrowDropDown style={{ fontSize: "23px", margin: "0 -3px", color: "#404040" }} />
                                </div>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton" style={{ border: '1px solid silver', margin: "0 -2px" }}>
                                    <Link className="dropdown-item" to="#"> Quick Start Video</Link>
                                    <Link className="dropdown-item" to="#">  Getting Started Guide</Link>
                                    <Link className="dropdown-item" to="#"> Free Onbording Session</Link>
                                    <Link className="dropdown-item" target="_blank" to="/HelpDescription"> Help Guides</Link>
                                    <a className="dropdown-item" href="mailto:drizzle.ilog@gmail.com"> Send Email to Support</a>
                                    <Link className="dropdown-item" to="/Contactus">Contact us</Link>
                                </div>
                            </div>
                            <div className='notifications d-flex cursor-pointer mx-1'>
                                <BsBellFill className='mt-1' style={{ fontSize: "18px", color: "#404040" }} />
                                <span className="tooltiptext">Notifications</span>
                            </div>

                        </div>
                        <div className='settings d-flex  cursor-pointer mx-3' onClick={props.togglesidebar2}>
                            <RiSettings3Fill style={{ fontSize: "30px", margin: "0 8px 0 0", color: "gray" }} />
                            <span className="tooltiptext">Settings</span>
                        </div>

                        <div className='d-flex profileicon'>
                            <span className="tooltiptext">Profile</span>
                            <div className='d-flex align-items-center' role="button" id="dropdownMenuLink"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <RiUserFill style={{ fontSize: "30px", marginRight: '6px', background: "#f7771b", color: "white", padding: "6px", borderRadius: "5px" }} />
                                <p className=' mb-0 name-text' style={{ fontSize: '18px' }}>{localStorage.getItem('UserName')}</p>
                                <MdOutlineArrowDropDown style={{ fontSize: "30px" }} />
                            </div>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid silver', margin: "0 -2px" }}>
                                <Link className="dropdown-item" to="/Profile">Profile</Link>
                                <Link className="dropdown-item" to="/ChangePassword">Change Password</Link>
                                <a className="dropdown-item border-top text-danger" data-toggle="modal" data-target="#exampleModal" >Logout <MdOutlineExitToApp className='ft-20' /></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;