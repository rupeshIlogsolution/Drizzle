import React, { useState } from 'react';
import { FaLocationArrow,FaFileContract,FaFileInvoiceDollar } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { MdOutlineDoubleArrow,MdPayment } from 'react-icons/md';
import { BsWindows,BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import Footer from '../Sidebar/Footer/Footer';
import Helpnavbar from './HelpNevbar';
import '../Sidebar/Sidebar'
import logo from '../../image/drizzle_logo.png'
import './HelpDeskSideBar.css'
import HelpEmployee from './HelpEmployee';
import HelpLocation from './HelpLocation';
import './HelpDeskSideBar.css'
import HelpInvoice from './HelpInvoice';
import HelpVendorCode from './HelpVendorCode';
import HelpVendorContract from './HelpVendorContract';
import HelpVendorPayment from './HelpVendorPayment';
import HelpSoftware from './HelpSoftware';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const [currentStep, setStep] = useState(1);

      const showStep = (step) => {
        switch (step) {
          case 1:
            return  <HelpLocation/>
          case 2:
            return <HelpEmployee/>
          case 3:
            return <HelpSoftware/>
          case 4:
            return <HelpVendorCode/>
          case 5:
              return <HelpVendorContract/>
          case 6:
            return <HelpInvoice/>
          case 7:
            return <HelpVendorPayment/>
        }
      }

    const icononstyle = {
        transform: "rotate(-180deg)",
        marginLeft: "40%"
    }
    const iconoffstyle = {
        marginLeft: "0%"
    }

    return (
        <div className="HelpDeskSideBar">
            <div className={isOpen ? 'sidebaropen' : 'sidebar'} >
                <div className="top_section">
                    <img style={{ width: "110px", display: isOpen ? "block" : "none" }} src={logo} />
                    <div style={isOpen ? icononstyle : iconoffstyle} className="bars">
                        <MdOutlineDoubleArrow onClick={toggle} />
                    </div>
                </div>
                <div className='internalsidebar'>
                    <ul>
                        <li onClick={() => setStep(1)}>
                                <div className="icon"><FaLocationArrow /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px" }} className="link_text">Location</div>       
                        </li>

                        <li onClick={() => setStep(2)}>
                                <div className="icon"><RiUserFill  style={{fontSize:"22px"}}/></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"6px" }} className="link_text">Employee</div>
                        </li>

                        <li onClick={() => setStep(3)}>
                                <div className="icon"><BsWindows /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px"  }} className="link_text">Software</div>
                        </li>
                        <li onClick={() => setStep(4)}>
                            
                                <div className="icon"><BsFillFileEarmarkCodeFill /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px"  }} className="link_text">Vendor Code</div>
                        </li>

                        <li  onClick={() => setStep(5)}>
                                <div className="icon"><FaFileContract /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px"  }} className="link_text">Vendor Contract</div>
                        </li>

                        <li onClick={() => setStep(6)}>
                                <div className="icon"><FaFileInvoiceDollar /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px"  }} className="link_text">Invoice</div>
                        </li>

                        <li onClick={() => setStep(7)}>
                                <div className="icon"><MdPayment /></div>
                                <div style={{ display: isOpen ? "block" : "none",marginLeft:"10px"  }} className="link_text">Vendor Payment</div>
                        </li>

                    </ul>

                </div>
            </div>

            <div className={isOpen ? "mainopen" : "main"}>
                <Helpnavbar isOpen={isOpen} />
                {showStep(currentStep)}
                <Footer />
            </div>
        </div>
    );
};

export default Sidebar;