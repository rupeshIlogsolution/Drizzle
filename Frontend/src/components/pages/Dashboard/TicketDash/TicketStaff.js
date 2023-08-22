import React, { useEffect, useState } from 'react'
import './TicketDash.css'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Ticket_Summary } from '../../../../api/index'


const TicketStaff = () => {
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
      "value": ticketSummary.MyTicket
    },
    {
      "name": "Open",
      "value": ticketSummary.MyTicketOpen
    },

    {
      "name": "Closed",
      "value": ticketSummary.MyTicketClose
    }
  ];
  const COLORS = ['#7675C4', '#DB49F2', '#F4397A', '#039B28', '#A5A704', '#014FB5'];

  return (
    <div className='m-auto my-tickets-container shadow1-silver mt-4 pt-2 rounded bg-white border' >
      <h5 className=' text-black text-center mb-0'>{localStorage.getItem('UserName')}</h5>
      {
        (data02[0].value === 0 && data02[1].value === 0 && data02[2].value === 0) ?
          <div className='d-flex align-items-center justify-content-center text-danger' style={{height:'90%'}}>
            <h5>You have not assign any Tickets</h5>
          </div>
          :
          <ResponsiveContainer width="100%" aspect={1.8}>
            <PieChart width={700} height={200}>
              <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
              <Tooltip />

              <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" label >
                {data02.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Legend layout="vertical" verticalAlign="center" align="right" />
            </PieChart>
          </ResponsiveContainer>
      }
    </div>
  )
}

export default TicketStaff; 