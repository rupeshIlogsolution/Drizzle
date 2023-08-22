import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Ticket_issue_type } from '../../../../../api/index'
import { MdHardware, MdOutlineSignalWifiStatusbarConnectedNoInternet4, MdEditNote } from 'react-icons/md';
import { GoIssueOpened } from 'react-icons/go';
import { HiServer } from 'react-icons/hi';
import { AiTwotoneEdit } from 'react-icons/ai';
import { ImLink } from 'react-icons/im';
import './ticketIssue.css'


const TicketTopics = () => {
    const [ticketIssue, setTicketIssue] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            const result = await Ticket_issue_type(localStorage.getItem('Database'))
            setTicketIssue(result)
        }
        fetchdata()
    }, [])


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
    const COLORS = ['#e9c219', '#5f2149', '#3691b2', '#04719f', '#c4d33c'];
    const COLORS2 = ['#f35d5d', '#43b1a6', '#e9c219', '#3691b2', '#3691b2'];
    const COLORS3 = ['#43b1a6', '#04719f', '#c4d33c', '#e9c219', '#5f2149'];
    const COLORS4 = ['#8bcbdf', '#97b8dd', '#e19f4c', '#c4d33c', '#5f2149'];


    return (
        <div className='ticketissue-container pt-4 m-auto justify-content-center'>
            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <MdHardware className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Hardware Problem</strong>
                </div>

                <ResponsiveContainer width="100%" aspect={2}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Hardwaredata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} fill="rgb(94, 4, 69)" label labelLine={false} >
                            {Hardwaredata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>

            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <MdOutlineSignalWifiStatusbarConnectedNoInternet4 className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Network Problem</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Softwaredata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} fill="rgb(94, 4, 69)" label labelLine={false} >
                            {Softwaredata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <GoIssueOpened className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Other IT Issue</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Otherdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} label labelLine={false}
                            fill="rgb(61,174,167)" >
                            {Otherdata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <HiServer className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Server Problem</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Serverdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} fill="rgb(94, 4, 69)" label labelLine={false}>
                            {Serverdata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS4[index % COLORS4.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <AiTwotoneEdit className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Allocation</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Allocationdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} fill="rgb(94, 4, 69)" label labelLine={false} >
                            {Allocationdata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <ImLink className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-2' style={{ color: "#6a6a6a" }}>Connectivity Problem</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={Connectivitydata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} label labelLine={false}
                            fill="rgb(61,174,167)" >
                            {Connectivitydata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='ticket-issue-card rounded bg-white'>
                <div className='d-flex'>
                    <MdEditNote className='text-white rounded ticket-issue-card-icon' />
                    <strong className='mt-3' style={{ color: "#6a6a6a" }}>New Requirement</strong>
                </div>
                <ResponsiveContainer width="100%" aspect={2.1}>
                    <PieChart width={700} height={200}>
                        <Tooltip contentStyle={{ backgroundColor: "rgb(179, 210, 242)" }} />
                        <Tooltip />
                        <Pie stroke="none" data={newreqdata} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} label labelLine={false}
                            fill="rgb(61,174,167)" >
                            {newreqdata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend layout="vertical" verticalAlign="top" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default TicketTopics; 