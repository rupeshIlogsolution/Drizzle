import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import './Dashboard.css'
import AssetsDash from './AssetsDash'
import VendorDash from './VendorDash/VendorDash'
import Outstanding from './Outstanding/Outstanding'
import Outstatndingdetails from './Outstanding/Outstandingdetails'
import TickteDash from './TicketDash/TicketDash'

import { DashboarDetails } from '../../../api/index'
import LoadingPage from '../../LoadingPage/LoadingPage';
import Recurring from './VendorDash/Recurring';
import PendingRecurringInvoice from './Outstanding/PendingRecurringInvoice/PendingRecurringInvoice';

const Dashboard = () => {
  const [currentStep, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [dashboarddetails, setDashboarddetails] = useState({
    "Assetdata": 0,
    "Vendordata": 0,
    "Invoice": 0,
    "Ticket": 0,
  })
  useEffect(() => {
    const fetch = async () => {
      const org = localStorage.getItem('Database')
      const result = await DashboarDetails(org)
      setLoading(true)
      setDashboarddetails({ ...dashboarddetails, Assetdata: result.Assets.asset, Vendordata: result.Vendor.Vendor_code, Invoice: result.Invoice.vendor, Ticket: result.Ticket.ticket })
    }
    fetch();
  }, [])

  // const colordynamic = (step) => {
  //   for (let i = 1; i <= 4; i++) {
  //     if (i === step) {
  //       console.log("true")
  //       document.getElementById(`css${i}`).style.background = "white"
  //       document.getElementById(`css${i}`).style.borderBottom = "4px solid #30305f"
  //       document.getElementById(`css${i}`).style.color = "#595859"

  //     } else {
  //       document.getElementById(`css${i}`).style.background = "linear-gradient(45deg, #3d59e6, #603ae9)"
  //       document.getElementById(`css${i}`).style.color = "white"
  //       document.getElementById(`css${i}`).style.borderBottom = "none"
  //     }
  //   }
  // }

  const showStep = (step) => {
    switch (step) {
      case 1:
        return <AssetsDash />
      case 2:
        return <VendorDash setStep={setStep} />
      case 3:
        return <Outstanding setStep={setStep} />
      case 4:
        return <TickteDash />
      case 5:
        return <Outstatndingdetails />
      case 6:
        return <Recurring />
      case 7:
        return <PendingRecurringInvoice
        />
      default:
        return false
    }
  }

  return (
    <>
      {
        loading ?
          <Sidebar>
            <div className='dashboard_container ' >
              {/* ================================================================ */}
              <div className="container d-flex justify-content-end mb-3">
                <input type="radio" name="s" id="asset" />
                <input type="radio" name="s" id="vendor" />
                <input type="radio" name="s" id="invoice" />
                <input type="radio" name="s" id="ticket" />
                <input type="radio" name="s" id="about" />
                <nav className='mini-nav d-flex text-center position-relative'>
                  <div className="slider"></div>
                  <label htmlFor="asset" className='text-white position-relative cursor-pointer' onClick={() => { setStep(1) }}>
                    Assets
                  </label>
                  <label htmlFor="vendor" className='text-white position-relative cursor-pointer' onClick={() => { setStep(2) }}>
                    Vendors
                  </label>
                  <label htmlFor="invoice" className='text-white position-relative cursor-pointer' onClick={() => { setStep(3) }}>
                    Invoices
                  </label>
                  <label htmlFor="ticket" className='text-white position-relative cursor-pointer' onClick={() => { setStep(4) }}>
                    Tickets
                  </label>
                </nav>
              </div>
              {/* ================================================================ */}

              {/* <div className='dashboard_cards d-flex justify-content-end' >
                <div className='d-flex justify-content-center  dash_toggle_btns rounded'>
                  <div className='dash_toggle_btn cursor-pointer ' style={{ background: "white", borderBottom: "4px solid #30305f", color: "#595859" }} id="css1" onClick={() => { colordynamic(1); setStep(1) }}>Assets</div>
                  <div className='dash_toggle_btn cursor-pointer' id="css2" onClick={() => { colordynamic(2); setStep(2) }}>Vendors</div>
                  <div className='dash_toggle_btn cursor-pointer' id="css3" onClick={() => { colordynamic(3); setStep(3) }}>Invoice</div>
                  <div className='dash_toggle_btn cursor-pointer' id="css4" onClick={() => { colordynamic(4); setStep(4) }}>Tickets</div>
                </div>
              </div> */}
              {showStep(currentStep)}
            </div>

          </Sidebar>
          : <LoadingPage />
      }
    </>

  );
};

export default Dashboard; 