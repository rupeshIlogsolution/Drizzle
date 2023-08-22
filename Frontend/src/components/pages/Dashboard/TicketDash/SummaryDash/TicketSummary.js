import React, { useEffect, useState } from 'react'
import './ticketsummary.css'
import { FaEnvelopeOpen, FaCalendarTimes, FaUser, FaCheck, FaTelegramPlane } from 'react-icons/fa';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Ticket_Summary, ActiveLocation, ActiveEmployees, OpenTotalTicket, TotalTicket, TotalHoldTicket, Filter_Ticket_Summary_Count, Filter_Ticket_Summary } from '../../../../../api/index'


const TicketSummary = () => {
  const [locationlist, setLocationlist] = useState([])
  const [employeelist, setEmployeelist] = useState([])
  const [data, setData] = useState([])
  const [ticket, setTicket] = useState()
  const [filter, setFilter] = useState()
  const [ticketIssue, setTicketIssue] = useState({})



  const [ticketSummary, setTicketSummary] = useState({
    "TotalTicket": 0,
    "TotalOpenTicket": 0,
    "TotalCloseTicket": 0,
    "TotalHoldTicket": 0,
    "MyTicket": 0,
    "MyTicketOpen": 0,
    "MyTicketClose": 0
  })

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem('Database')
      const result = await Ticket_Summary(org, localStorage.getItem('UserId'))
      console.log(result)
      const tablelocation = await ActiveLocation(org);
      setLocationlist(tablelocation)
      const employee = await ActiveEmployees(org)
      setEmployeelist(employee)
      setTicketSummary({
        ...ticketSummary, TotalTicket: result.TotalTicket.totalticket, TotalOpenTicket: result.TotalTicketOpen.totalticketopen, TotalCloseTicket: result.TotalTicketClose.totalticketclose,
        TotalHoldTicket: result.TotalTicketHold.totaltickethold, MyTicket: result.MyTicket.myticket, MyTicketOpen: result.MyTicketOpen.myticketopen, MyTicketClose: result.MyTicketClose.myticketclose
      })
    }
    fetchdata()
  }, [])

  const handleChange = async (value) => {
    const org = localStorage.getItem('Database')

    if (!filter) {
      if (value == 'Open') {
        setTicket('Open')
        const tabledata = await OpenTotalTicket(org);
        setData(tabledata)
      } else if (value == 'Closed') {
        setTicket('Closed')
        const tabledata = await TotalTicket(org);
        setData(tabledata)
      }
      else if (value == 'Hold') {
        setTicket('Hold')
        const tabledata = await TotalHoldTicket(org);
        setData(tabledata)
      }
    } else {
      if (filter == "emp_name") {
        const data = document.getElementById('employee').value
        setTicket(value)
        const tabledata = await Filter_Ticket_Summary(org, value, filter, data);
        setData(tabledata)
      } else {
        const data = document.getElementById('locations').value
        setTicket(value)
        const tabledata = await Filter_Ticket_Summary(org, value, filter, data);
        setData(tabledata)
      }
    }

  }

  const handleChangefilter = async (type, value) => {
    document.getElementById('issuetypetoogle').style.display = 'grid';
    const org = localStorage.getItem('Database')
    setFilter(type)
    const result = await Filter_Ticket_Summary_Count(org, type, value)
    setTicketIssue(result)

    setTicketSummary({
      ...ticketSummary, TotalTicket: result.TotalTicket.totalticket, TotalOpenTicket: result.TotalTicketOpen.totalticketopen, TotalCloseTicket: result.TotalTicketClose.totalticketclose,
      TotalHoldTicket: result.TotalTicketHold.totaltickethold
    })
  }

  const Hardwaredata = [
    {
      "name": "Open",
      "value": ticketIssue.HardwareTicketopen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.HardwareTicketClose,
    }
  ];

  const Softwaredata = [
    {
      "name": "Open",
      "value": ticketIssue.SoftwareTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.SoftwareTicketClose,
    }
  ];


  const Otherdata = [
    {
      "name": "Open",
      "value": ticketIssue.OtherTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.OtherTicketClose,
    }
  ];

  const Serverdata = [
    {
      "name": "Open",
      "value": ticketIssue.ServerTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.ServerTicketClose,
    }
  ];

  const Allocationdata = [
    {
      "name": "Open",
      "value": ticketIssue.AllocationTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.AllocationTicketClose,
    }
  ];
  const Connectivitydata = [
    {
      "name": "Open",
      "value": ticketIssue.ConnectivityTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.ConnectivityTicketClose,
    }
  ];

  const newreqdata = [
    {
      "name": "Open",
      "value": ticketIssue.NewReqTicketOpen,
    },
    {
      "name": "Closed",
      "value": ticketIssue.NewReqTicketClose,
    }
  ];


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
    },
    {
      "name": "Hold",
      "value": ticketSummary.TotalHoldTicket
    }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);


    return (
      <text x={x} y={y} fontSize='13' fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const COLORS = ['#eb5e3b', '#d1ac06', '#5e0ec9', '#039B28', '#A5A704', '#014FB5'];
  return (
    <>
      <div className='summary-dash d-flex'>
        <div className='pie_chart_div bg-white mt-3 shadow1-silver rounded m-auto position-relative'>
          <div className='pie_chart position-absolute rounded'>
            <ResponsiveContainer aspect={1.5}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={42} outerRadius={85} fill="rgb(94, 4, 69)" >
                  {data02.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <small className='position-absolute text-muted' style={{ bottom: '7.5%', left: '4%' }}>Manufacturer</small>
        </div>

        <div className='Summary_cards_div '>
          <div className='d-flex justify-content-end'>
            <div className='text-center rounded '>
              <select className="form-select" id="employee" onChange={(e) => { handleChangefilter("emp_name", e.target.value) }}>
                <option value='' hidden >Select Employee</option>
                {
                  employeelist.map((item, index) => (
                    <option key={index} value={item.employee_name}>{item.employee_name}</option>
                  ))
                }
              </select>
            </div>
            <div className='mx-3 text-center rounded '>
              <select className="form-select" id="locations" onChange={(e) => { handleChangefilter("location", e.target.value) }}>
                <option hidden value=''>Select Location</option>
                {
                  locationlist.map((item, index) =>
                    <option key={index} value={item.location_code}>{item.location_name}</option>
                  )
                }
              </select>
            </div>
            <div>
              <select className="form-select">
                <option>Date</option>
              </select>
            </div>
          </div>
          <h6>My Tickets Summary</h6>
          <hr />
          <div className='Summary_cards'>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around'>
              <div className='summary_icon text-light mx-2 '>
                <FaUser className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className=' mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicket}</h2>
                <p style={{ color: '#6a6a6a' }}>My Tickets</p>
              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around' >
              <div className='summary_icon mx-2 text-light ' >
                <FaEnvelopeOpen style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicketOpen}</h2>
                <p style={{ color: '#6a6a6a' }}>Open</p>

              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around'>
              <div className='summary_icon text-light mx-2 ' style={{ padding: "12px 12px" }}>
                <FaCheck className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.MyTicketClose}</h2>
                <p style={{ color: '#6a6a6a' }}>Closed</p>
              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around'>
              <div className='summary_icon text-light mx-2 ' >
                <FaCalendarTimes className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>0</h2>
                <p style={{ color: '#6a6a6a' }}>Over 24 hour</p>
              </div>
            </div>
          </div>

          <h6 className='mt-2'>Total Tickets Summary</h6>
          <hr />
          <div className='Summary_cards'>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around cursor-pointer' data-toggle="modal" data-target="#exampleModalCenter" 
            onClick={(e) => { e.preventDefault(); handleChange('') }} >
              <div className='summary_icon text-light mx-2 ' >
                <FaUser className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalTicket}</h2>
                <p style={{ color: '#6a6a6a' }}>Total Tickets</p>
              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter"
              style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); handleChange('Open') }}>
              <div className='summary_icon mx-2 text-light ' >
                <FaEnvelopeOpen style={{ fontSize: "23px" }} />
              </div>
              <div>

                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalOpenTicket}</h2>
                <p style={{ color: '#6a6a6a' }}>Open</p>
              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter"
              style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); handleChange('Closed') }}>
              <div className='summary_icon text-light mx-2 ' style={{ padding: "12px 12px" }}>
                <FaCheck className='m-1' style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ fontWeight: "600", color: "#30305f" }}>{ticketSummary.TotalCloseTicket}</h2>
                <p style={{ color: '#6a6a6a' }}>Closed</p>
              </div>
            </div>

            <div className='Summary_card rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter"
              style={{ cursor: "pointer" }} onClick={(e) => { e.preventDefault(); handleChange('Hold') }}>
              <div className='summary_icon text-light mx-2 ' style={{ padding: "12px 14px" }}>
                <FaTelegramPlane style={{ fontSize: "23px" }} />
              </div>
              <div>
                <h2 className='mb-0' style={{ color: "#30305f" }}>{ticketSummary.TotalHoldTicket}</h2>
                <p style={{ color: '#6a6a6a' }}>Hold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className='Summary_cards_issuetype' id="issuetypetoogle" style={{ display: "none" }}>
        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex  justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Hardware Problem</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Hardwaredata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Hardwaredata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Network Problem</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Softwaredata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Softwaredata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Other IT Issue</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Otherdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Otherdata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Server Problem</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Serverdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Serverdata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Allocation</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Allocationdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Allocationdata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>Connection Problem</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={Connectivitydata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {Connectivitydata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='Summary_card_issuetype rounded shadow1-silver bg-white d-flex justify-content-around' data-toggle="modal" data-target="#exampleModalCenter" onClick={(e) => { e.preventDefault(); handleChange('') }} >
          <p className='mx-2'>New Requirement</p>
          <div className='' style={{ width: "88%", height: "200px" }}>
            <ResponsiveContainer aspect={1.0}>
              <PieChart width={700} height={200}>
                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.7)", borderRadius: "3px", border: "1px solid white" }} />
                <Pie labelLine={false} label={renderCustomizedLabel} stroke='none' data={newreqdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={56} fill="rgb(94, 4, 69)" >
                  {newreqdata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                  ))}
                </Pie>
                <Legend iconSize='10' iconType="rounded" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>


      {/* Modal */}

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '50vw' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{ticket} Ticket</h5>
            </div>
            <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }}>
              <table className="table ">
                <thead>
                  <tr>
                    <th>Emplyee Name</th>
                    <th>Ticket Date</th>
                    <th>Ticket Subject</th>
                    <th>Assign To</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((value) => (
                      <tr>
                        <td>{value.emp_name}</td>
                        <td>{value.date}</td>
                        <td>{value.ticket_subject}</td>
                        <td>{value.add_user_name}</td>
                      </tr>
                    )
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default TicketSummary; 