import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { ActiveEmployees, EmployeesDetail, ActiveIssue, ActiveTicketStatus, ActiveLocation, ActivePriority, GetNewAssetAssign, UpdateTicket, getTickets, Mail } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiArrowGoBackFill } from 'react-icons/ri'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

export default function EditTicket() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)

    const [togglefields, setTogglefields] = useState(false)

    const [employeelist, setEmployeelist] = useState([])
    const [employeedetail, setEmployeedetail] = useState([])
    const [issuelist, setIssuelist] = useState([])
    const [ticketstatuslist, setTicketstatuslist] = useState([])
    const [locationlist, setLocationlist] = useState([])
    const [prioritylist, setPrioritylist] = useState([])
    const [assettypelist, setAssettypelist] = useState([])
    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await getTickets(org, localStorage.getItem('TicketSno'))
            setData(result[0]);
            const assetall = await GetNewAssetAssign(result[0].emp_id)
            setAssettypelist(assetall)
            const employee = await ActiveEmployees(org)
            setEmployeelist(employee)

            const location = await ActiveLocation(org);
            setLocationlist(location)

            const allissue = await ActiveIssue(org);
            setIssuelist(allissue)

            const ticketstatus = await ActiveTicketStatus(org);
            setTicketstatuslist(ticketstatus)

            const priority = await ActivePriority(org);
            setPrioritylist(priority)

            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleGetEmpDetail = async (e) => {
        let employee_id = e.target.value;
        const org = localStorage.getItem('Database')

        setTogglefields(true)
        const detail = await EmployeesDetail(org, employee_id);
        setEmployeedetail(detail)

        const assetall = await GetNewAssetAssign(employee_id)
        setAssettypelist(assetall)
    }


    const handleAssetTypeChange = (e) => {
        document.getElementById('assetserial').value = e.target.value
    }

    const handleUpdateTicket = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        let employee_id = document.getElementById('employee');
        const employee_name = employee_id.options[employee_id.selectedIndex].text;
        employee_id = employee_id.value;

        let assettype = document.getElementById('assettype');
        const assetval = assettype.value;

        assettype = assettype.options[assettype.selectedIndex].text;
        let toindex2 = assettype.indexOf(",")
        assettype = assettype.slice(0, toindex2)

        const assetserial = document.getElementById('assetserial').value;
        const location = document.getElementById('location').value;
        const assignticket = document.getElementById('assignticket').value;
        const typeofissue = document.getElementById('typeofissue').value;

        const email = document.getElementById('email').value;
        const ticketdate = document.getElementById('ticketdate').value;
        const ticketstatus = document.getElementById('ticketstatus').value;
        const ticketsubject = document.getElementById('ticketsubject').value;
        const priority = document.getElementById('priority').value;
        const issuedesc = document.getElementById('issuedesc').value;
        const remark = document.getElementById('remark').value;
        const org = localStorage.getItem('Database')

        const user_id = localStorage.getItem('UserId')
        const sno = localStorage.getItem('TicketSno')

        if (!employee_id || !assetval || !location || !ticketstatus || !ticketsubject) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Mandatory Field', 'warning', 'self')
        }
        else {
            const message = {
                org: org,
                subject: ticketsubject,
                username: employee_name,
                TicketNumber: assignticket,
                Ticketdate: ticketdate,
                TicketType: typeofissue,
                TicketDiscription: issuedesc,
                TicketStatus: ticketstatus,
                mail: email
            }

            const result = await UpdateTicket(org, employee_id, employee_name, assettype, assetserial, location, assignticket, typeofissue, email, ticketdate, ticketstatus, ticketsubject,
                priority, issuedesc, remark, user_id, sno)

            if (result === 'Data Updated') {
                localStorage.removeItem('TicketSno')
                const mail = await Mail(message)
                setLoading(true)
                callfun('Ticket Updated', 'success', '/TotalTicket')
            }
            else {
                setLoading(true)
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }
    }

    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ######################### Sanckbar Start ##################################### */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ######################### Sanckbar End ##################################### */}

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h3><span className='page-type-head1'>Tickets <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Tickets</span> </h3>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('TicketSno'); window.location.href = '/TotalTicket' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-0 card inner-card py-3">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor='vendor'>Employee Name <span className='text-danger'>*</span></label>
                                                <select id='employee' className="form-select" onChange={handleGetEmpDetail}>
                                                    <option value={data.emp_id} hidden >{data.emp_name}</option>
                                                    {
                                                        employeelist.map((item, index) => (
                                                            <option key={index} value={item.employee_id}>{item.employee_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='assettype'>Asset Type <span className='text-danger'>*</span></label>
                                                <select className="form-select" id='assettype' onChange={handleAssetTypeChange}>
                                                    <option value={data.asset_serial} hidden>{`${data.asset_type}, (${data.asset_serial})`}</option>

                                                    {
                                                        assettypelist.length ?
                                                            assettypelist.map((item, index) => (
                                                                <option key={index} value={item.serial_no}>{`${item.asset_type}, (${item.serial_no})`}</option>
                                                            ))
                                                            : <option value=''>Please Assign the asset to this Employee</option>
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='assetserial'>Asset Serial</label>
                                                <input type="text" id='assetserial' className="form-control" defaultValue={data.asset_serial} disabled />
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-4">
                                                <label htmlFor='location'>Location <span className='text-danger'>*</span></label>
                                                <select id='location' className="form-select">
                                                    {
                                                        togglefields ?
                                                            <option value={employeedetail.location} hidden>{employeedetail.location}</option>
                                                            :
                                                            <option value={data.location} hidden>{data.location}</option>
                                                    }


                                                    {
                                                        locationlist.map((item, index) =>
                                                            <option key={index} value={item.location_code}>{item.location_name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-4" >
                                                <label htmlFor='assignticket'>Assign Ticket </label>
                                                <input type="text" id='assignticket' className="form-control" defaultValue={data.assign_ticket} disabled />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='typeofissue'>Type of Issue</label>
                                                <select id='typeofissue' className="form-select">
                                                    <option value={data.type_of_issue} hidden>{data.type_of_issue}</option>
                                                    {
                                                        issuelist.map((item, index) => (
                                                            <option key={index} value={item.issue_type}>{item.issue_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='email'>Email ID</label>
                                                <input type="email" id='email' className="form-control" disabled
                                                    value={togglefields ? employeedetail.employee_email : data.email_id} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='ticketdate'>Date </label>
                                                <input type="date" id='ticketdate' className="form-control" required defaultValue={data.Joindate} />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='ticketstatus'>Ticket Status <span className='text-danger'>*</span></label>
                                                <select id='ticketstatus' className="form-select">
                                                    <option value={data.ticket_status} hidden>{data.ticket_status}</option>
                                                    {
                                                        ticketstatuslist.map((item, index) => (
                                                            <option key={index} value={item.ticket_status}>{item.ticket_status}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label htmlFor='ticketsubject'>Ticket Subject <span className='text-danger'>*</span></label>
                                                <input type="text" id='ticketsubject' className="form-control" defaultValue={data.ticket_subject} required />
                                            </div>
                                            <div className="col">
                                                <label htmlFor='priority'>Priority</label>
                                                <select id='priority' className="form-select">
                                                    <option value={data.priority} hidden>{data.priority}</option>
                                                    {
                                                        prioritylist.map((item, index) => (
                                                            <option key={index} value={item.priority_type}>{item.priority_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="issuedesc">Issue Discription</label>
                                                <textarea className="form-control" id="issuedesc" rows="3" defaultValue={data.issue_discription}></textarea>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="remark">Resolution/Pending Remarks</label>
                                                <textarea className="form-control" id="remark" rows="3" defaultValue={data.remarks}></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group mt-3 mx-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleUpdateTicket}>Update Tickets</button>
                                        </div>
                                    </form>
                                </article>
                            </div>
                        </div>
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}
