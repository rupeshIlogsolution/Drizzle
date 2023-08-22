import LandingFooter from './LandingFooter'
import LandingHeader from './LandingHeader';
import './landing.css'
import { MdOutlinePrivacyTip, MdOutlineManageAccounts, MdOutlineDevicesOther, MdOutlinePlaylistAddCheck, MdArrowUpward } from 'react-icons/md'
import { ImHappy } from 'react-icons/im'
import { BiRupee } from 'react-icons/bi'

import Landingimg from '../../../image/landingimg.svg'
import Services from '../../../image/services.svg'

const LandingPage = () => {
    window.onscroll = function () { scrollfunction() }

    const scrollfunction = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById('toptopbtn').style.display = 'block'
        }
        else {
            document.getElementById('toptopbtn').style.display = 'none'

        }
    }

    return (
        <>
            <div className='landingContainer'>
                <LandingHeader />
                <div className='landingContent' >
                    <section className='topbottomdiv' id='topdiv'>
                        <header className="masthead py-5" >
                            <div className="container px-5">
                                <div className="row gx-5 align-items-center">
                                    <div className="col-lg-5" data-aos="fade-right"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="mb-5 mb-lg-5 text-center text-lg-start">
                                            <h3 className="display-3 lh-1 mb-3" style={{ fontWeight: "500" }}>Uncomplicate IT Asset Management</h3>
                                            <p className="lead fw-normal text-muted mb-5">Automate and manage accounting, deployement, and maintenance of IT Assets for you and your clients on one plateform</p>
                                            <div className="d-flex flex-column flex-lg-row align-items-center">
                                                <button className='btn btn-voilet' onClick={() => { window.location.href = './signup' }}>Get Started</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6" data-aos="fade-left"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="masthead-device-mockup">
                                            <div classNapropsme="device-wrapper">
                                                <div className="device" >
                                                    <div className="screen ">

                                                        <img src={Landingimg} className='landingimg' alt='Landing img' loading="lazy"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </section>
                    <section className='portfoliodiv'>
                        <div className="comp_name text-white" >
                            <div className="comp1 text-center "><h3 style={{ fontSize: "20px" }}>Modernize & Automate</h3></div>
                            <div className="comp2 text-center "><h3 style={{ fontSize: "20px" }}>Intelligent ITAM</h3></div>
                            <div className="comp3 text-center "><h3 style={{ fontSize: "20px" }} >IT Expense Management</h3></div>
                            <div className="comp4 text-center "><h3 style={{ fontSize: "20px" }}>Insights & Analysis</h3></div>
                        </div>

                    </section>

                    <section className='about pt-5' id='about' >
                        <header className="abouthead pt-2">
                            <div className="container px-0" >
                                <div className="row align-items-center pb-5" >
                                    <div className="col-lg-5" data-aos="fade-left"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="aboutimgdiv"  >
                                            <img className='aboutimg' src={Services} alt='' loading="lazy"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-5" data-aos="fade-right" data-aos-offset="200"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                                            <h3 className="display-5 lh-2 mb-3" style={{ fontWeight: "500" }}>Centralize your IT Management</h3>
                                            <p className="lead fw-normal text-muted mb-5">Increase company-wide understanding of IT’s business value, improve communications and understanding by capturing asset data in Drizzle to maximize returns and minimize risks.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </header>
                    </section>
                    {/* ================================================= Content with photos ===================================================== */}
                    <section className='photos_content'>
                        <div className='photos_content1'>

                            <div className='content_' data-aos="fade-right" data-aos-offset="200"
                                data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                <h1>Record and stay updated anywhere</h1>
                                <p>Behind every great experience is a great process. Teams are using Drizzle to update and get data on the run, making data available to stakeholders in real-time.</p>
                                <button className='btn btn-voilet'>Get Details</button>
                            </div>
                            <div className='img_div' data-aos="fade-left" data-aos-offset="200"
                                data-aos-delay="50" data-aos-duration="1000" data-aos-once="true"></div>
                        </div>
                    </section>

                    <section className='photos_content'>
                        <div className='photos_content1'>
                            <div className='img_div3' data-aos="fade-right" data-aos-offset="200"
                                data-aos-delay="50" data-aos-duration="1000" data-aos-once="true"></div>
                            <div className='content_' data-aos="fade-left" data-aos-offset="200"
                                data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                <h1>Improve utilization, eliminate waste</h1>
                                <p>Drizzle saves money by helping avoid unnecessary purchases and cutting licensing and support costs. Increased control enforces compliance to reduce risks.</p>
                                <button className='btn btn-voilet'>Get Details</button>
                            </div>

                        </div>
                    </section>

                    {/* ========================================================================================================================== */}

                    <section className='chooseus' data-aos="fade-up" data-aos-offset="200"
                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                        <header className="chooseus pt-5">
                            <div className="container px-2 pb-5">
                                <h2 className='text-center'>Why Choose Drizzle</h2>
                                <div className='parent_choose_div m-auto pt-3'>
                                    <div className="chid_choose_div chid_choose_div1  pt-1">
                                        <div className='choose_icon'>
                                            <div className="choose_inner_icon mt-1"><MdOutlineDevicesOther className='icons' /></div>
                                        </div>
                                        <div className='choose_content'>
                                            <p>Managing 500,000+ devices</p>
                                        </div>
                                    </div>
                                    <div className="chid_choose_div chid_choose_div2  pt-1">
                                        <div className='choose_icon '>
                                            <div className="choose_inner_icon mt-1"><ImHappy className='icons' /></div>
                                        </div>
                                        <div className='choose_content'>
                                            <p>3000+ happy customers</p>
                                        </div>
                                    </div>
                                    <div className="chid_choose_div chid_choose_div3   pt-1">
                                        <div className='choose_icon '>
                                            <div className="choose_inner_icon mt-1"><MdOutlinePlaylistAddCheck className='icons' /></div>
                                        </div>
                                        <div className='choose_content'>
                                            <p>Manage and Track IT Asset</p>
                                        </div>
                                    </div>
                                    <div className="chid_choose_div chid_choose_div4 ">
                                        <div className='choose_icon '>
                                            <div className="choose_inner_icon mt-1"><MdOutlineManageAccounts className='icons' /></div>
                                        </div>
                                        <div className='choose_content'>
                                            <p>Manage vendor contracts</p>
                                        </div>
                                    </div>
                                    <div className="chid_choose_div chid_choose_div5  ">
                                        <div className='choose_icon '>
                                            <div className="choose_inner_icon mt-1"><MdOutlineManageAccounts className='icons' /></div>
                                        </div>
                                        <div className='choose_content'>
                                            <p>Software License Management</p>
                                        </div>
                                    </div>
                                    <div className="chid_choose_div chid_choose_div6">
                                        <div className='choose_icon '>
                                            <div className="choose_inner_icon mt-1  "><MdOutlinePrivacyTip className='icons' /></div>
                                        </div>
                                        <div className='choose_content ml-2'>
                                            <p>Reports & Dashboard</p>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </header>
                    </section>

                    <section className='pricing'>
                        <header className="pricinghead pt-3" >
                            <div className="container px-4 pb-5">
                                <h2 className='text-center'>Pricing</h2>
                                <p className="lead fw-normal text-muted text-center mb-2">One software to manage your IT. Choose from the mode that suits you best. Looking for something else? <br /> Contact our enterprise sales team.</p>
                                <div className="pricing_cards px-2 m-auto text-center"  >
                                    <div className="card pricing_card pricing_card1 "
                                        data-aos="fade-right" data-aos-offset="200"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">

                                        <div className="card-header">
                                            <h5>Free</h5>
                                        </div>
                                        <div className='card-body'>
                                            <h3><BiRupee style={{ marginTop: "-4px" }} />0</h3>
                                            <ul>
                                                <li>1 Organisation</li>
                                                <li>1 Location</li>
                                                <li>1 Agent</li>
                                                <li>10 Employee</li>
                                                <li>25 Assets</li>
                                                <li>Help Desk/100 Tickets/Months</li>
                                                <li>8 x 5 Email Support</li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn btn-voilet btn-sm'>Start Now</button>
                                        </div>
                                    </div>

                                    <div className="pricing_card card pricing_card2"
                                        data-aos="fade-up" data-aos-offset="200"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="card-header">
                                            <h5>Standard</h5>
                                        </div>
                                        <div className='card-body'>
                                            <h3><BiRupee style={{ marginTop: "-4px" }} />2999<p style={{ fontSize: "14px", margin: "-20px 0 0 145px" }}>/month</p></h3>
                                            <ul className=''>
                                                <li>1 Organisation</li>
                                                <li>3 Locations</li>
                                                <li>2 Agents</li>
                                                <li>50 Employee</li>
                                                <li>300 Assets</li>
                                                <li>Help Desk Unlimited Tickets</li>
                                                <li>24 x 5 Email/Phone Support</li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn btn-voilet btn-sm'>Upgrad Now</button>
                                        </div>
                                    </div>

                                    <div className="pricing_card card pricing_card3"
                                        data-aos="fade-up" data-aos-offset="200"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="card-header">
                                            <h5>Professional</h5>
                                        </div>
                                        <div className='card-body'>
                                            <h3><BiRupee style={{ marginTop: "-4px" }} />4999<p style={{ fontSize: "14px", margin: "-20px 0 0 145px" }}>/month</p></h3>
                                            <ul>
                                                <li>2 Organisations</li>
                                                <li>10 Locations</li>
                                                <li>5 Agents</li>
                                                <li>200 Employee</li>
                                                <li>1000 Assets</li>
                                                <li>Help Desk Unlimited Tickets</li>
                                                <li>24 x 5 Email/Phone Support</li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn btn-voilet btn-sm'>Upgrad Now</button>
                                        </div>
                                    </div>

                                    <div className="pricing_card card pricing_card3"
                                        data-aos="fade-left" data-aos-offset="200"
                                        data-aos-delay="50" data-aos-duration="1000" data-aos-once="true">
                                        <div className="card-header">
                                            <h5>Enterprise</h5>
                                        </div>
                                        <div className='card-body'>
                                            <h4>Contact Sales</h4>
                                            <ul>
                                                <li>Unlimited Organisations</li>
                                                <li>Unlimited Locations</li>
                                                <li>20 Agents</li>
                                                <li>Unlimited Employee</li>
                                                <li>Unlimited Assets</li>
                                                <li>Help Desk Unlimited Tickets</li>
                                                <li>Customized SLA</li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn btn-voilet btn-sm'>Upgrad Now</button>
                                        </div>
                                    </div>



                                </div>

                            </div>
                        </header>
                    </section>

                    <button id='toptopbtn' className='btn text-white btn-voilet position-fixed' onClick={() => { document.body.scrollTop = 0; document.documentElement.scrollTop = 0 }} style={{
                        fontSize: '25px', bottom: '40px', right: '40px',
                    }}><MdArrowUpward /></button>

                </div>
                <LandingFooter />
            </div>

        </>
    )
}

export default LandingPage;