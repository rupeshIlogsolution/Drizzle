import React, { useState, useEffect } from 'react'
import './TicketDash.css'
import TicketSummary from './SummaryDash/TicketSummary';
import TicketTopics from './TicketIssue/TicketIssue'
import TicketPriority from './TicketPriority'
import TicketStaff from './TicketStaff'

const TicketDash = () => {
  const [currentStep, setStep] = useState(0);

  useEffect(() => {
    setStep(1)
  }, [])
  const showStep = (step) => {
    switch (step) {
      case 1: {
        document.getElementById('ticket_details1').style.background = '#fff'
        document.getElementById('ticket_details1').style.borderBottom = '4px solid #603ae9'
        document.getElementById('ticket_details2').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details2').style.borderBottom = 'none'
        document.getElementById('ticket_details3').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details3').style.borderBottom = 'none'
        document.getElementById('ticket_details4').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details4').style.borderBottom = 'none'
        return <TicketSummary />
      }
      case 2: {
        document.getElementById('ticket_details1').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details1').style.borderBottom = 'none'
        document.getElementById('ticket_details2').style.background = '#fff'
        document.getElementById('ticket_details2').style.borderBottom = '4px solid #603ae9'
        document.getElementById('ticket_details3').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details3').style.borderBottom = 'none'
        document.getElementById('ticket_details4').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details4').style.borderBottom = 'none'
        return <TicketTopics />
      }
      case 3: {
        document.getElementById('ticket_details1').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details1').style.borderBottom = 'none'
        document.getElementById('ticket_details2').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details2').style.borderBottom = 'none'
        document.getElementById('ticket_details3').style.background = '#fff'
        document.getElementById('ticket_details3').style.borderBottom = '4px solid #603ae9'
        document.getElementById('ticket_details4').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details4').style.borderBottom = 'none'
        return <TicketStaff />
      }

      case 4: {
        document.getElementById('ticket_details1').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details1').style.borderBottom = 'none'
        document.getElementById('ticket_details2').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details2').style.borderBottom = 'none'
        document.getElementById('ticket_details3').style.background = 'rgba(96, 58, 233, 0.4)'
        document.getElementById('ticket_details3').style.borderBottom = 'none'
        document.getElementById('ticket_details4').style.background = '#fff'
        document.getElementById('ticket_details4').style.borderBottom = '4px solid #603ae9'
        return <TicketPriority />
      }
    }
  }

  return (
    <div className='ticket_dash '>
      <div className="d-flex ticket_dash_inner" >
        <div id='ticket_details1' className='ticket_details cursor-pointer d-flex justify-content-center align-items-center' onClick={() => setStep(1)} >Summary</div>
        <div id='ticket_details2' className='ticket_details cursor-pointer d-flex justify-content-center align-items-center' onClick={() => setStep(2)} >Issue Type</div>
        <div id='ticket_details4' className='ticket_details cursor-pointer d-flex justify-content-center align-items-center' onClick={() => setStep(4)} >Priority</div>
        <div id='ticket_details3' className='ticket_details cursor-pointer d-flex justify-content-center align-items-center' onClick={() => setStep(3)} >My Ticket</div>
      </div>
      <div className='half-a-border-on-top' >{showStep(currentStep)}</div>

    </div>
  )
}

export default TicketDash;
