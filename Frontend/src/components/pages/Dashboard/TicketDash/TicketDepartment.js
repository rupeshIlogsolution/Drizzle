import React, { useEffect, useState } from 'react'
import './TicketDash.css'
import { FaEnvelopeOpen, FaUserTimes, FaCalendarTimes, FaUser, FaCheck, FaTelegramPlane } from 'react-icons/fa';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line, } from "recharts";
import { Ticket_Summary } from '../../../../api/index'

const TicketDepartment = () => {
  const [ticketSummary, setTicketSummary] = useState({
    "TotalTicket": 0,
    "TotalOpenTicket": 0,
    "TotalCloseTicket": 0,
    "MyTicket": 0,
    "MyTicketOpen": 0,
    "MyTicketClose": 0

  })

  useEffect(() => {
    const fetchdata = async () => {
      const result = await Ticket_Summary(localStorage.getItem('Database'), localStorage.getItem('UserId'))
      console.log(result)
      setTicketSummary({
        ...ticketSummary, TotalTicket: result.TotalTicket.totalticket, TotalOpenTicket: result.TotalTicketOpen.totalticketopen, TotalCloseTicket: result.TotalTicketClose.totalticketclose,
        MyTicket: result.MyTicket.myticket, MyTicketOpen: result.MyTicketOpen.myticketopen, MyTicketClose: result.MyTicketClose.myticketclose
      })
    }
    fetchdata()
  }, [])

  const data02 = [
    {
      "name": "Total",
      "value": ticketSummary.TotalTicket
    },
    {
      "name": "Open",
      "value": ticketSummary.TotalOpenTicket
    },

    {
      "name": "Closed",
      "value": ticketSummary.TotalCloseTicket
    }
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);


    return (
      <text x={x} y={y} fontSize='13' fill="silver" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const COLORS = ['#c53241', '#14610c', '#4d00ab', '#039B28', '#A5A704', '#014FB5'];
  return (
    <div className='d-flex justify-content-between' style={{ marginTop: "50px" }}>
      <div className='position-relative rounded bg-white mt-3 shadow1-silver' style={{ width: '30%' }}>
        <div className='position-absolute rounded shadow1-silver' style={{ width: '93%',  top: "-10%", left: "3.5%",  background: 'linear-gradient(45deg, rgb(55, 55, 55), rgb(121, 118, 113))' }}>
          <ResponsiveContainer width="100%" aspect={1.5}>
            <PieChart width={700} height={200}>
              <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
              <Tooltip />
              <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={42} outerRadius={85} fill="rgb(94, 4, 69)" >
                {data02.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                ))}
              </Pie>
              <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <small className='position-absolute text-secondary' style={{ bottom:'10%',left:'4%'}}>Manufacturer</small>
      </div>

      <div style={{ width: "69%" }}>
        <div className='ticket_card_div justify-content-center mt-2'>

          <div className='ticket_card rounded shadow1-silver bg-white'>
            <div className='ticket_card_content d-flex justify-content-around'>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "10px 11px" }}>
                <FaUser className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicket}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>My Tickets</p>
              </div>
            </div>
          </div>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around' style={{ marginRight: "43px" }}>
              <div className='tickets_icon mx-2 text-light ' style={{ padding: "10px 15px" }}>
                <FaEnvelopeOpen style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicketOpen}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Open</p>

              </div>
            </div>
          </div>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around' style={{ marginRight: "30px" }}>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "12px 12px" }}>
                <FaCheck className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicketClose}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Closed</p>

              </div>
            </div>
          </div>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around' style={{ marginRight: "20px" }}>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "10px 11px" }}>
                <FaCalendarTimes className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>0</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Over 24 hour</p>

              </div>
            </div>
          </div>

        </div>

        <div className='ticket_card_div justify-content-around mt-3'>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around'>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "10px 11px" }}>
                <FaUser className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalTicket}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Total Tickets</p>

              </div>
            </div>
          </div>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around' style={{ marginRight: "43px" }}>
              <div className='tickets_icon mx-2 text-light ' style={{ padding: "10px 15px" }}>
                <FaEnvelopeOpen style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalOpenTicket}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Open</p>
              </div>
            </div>
          </div>

          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around' style={{ marginRight: "30px" }}>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "12px 12px" }}>
                <FaCheck className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalCloseTicket}</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Closed</p>
              </div>
            </div>
          </div>



          <div className='ticket_card rounded bg-white shadow1-silver'>
            <div className='ticket_card_content d-flex justify-content-around'>
              <div className='tickets_icon text-light mx-2 ' style={{ padding: "12px 14px" }}>
                <FaTelegramPlane style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 style={{ fontWeight: "600", color: "#30305f" }}>0</h2>
                <p style={{ marginTop: "-10px", color: '#6a6a6a' }}>Answered</p>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default TicketDepartment; 