import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { ActiveEmployees, EmployeesDetail, ActiveIssue, ActiveTicketStatus, ActiveLocation, ActivePriority, GetNewAssetAssign, InsertTicket, CountTickets, Mail } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';
import Select from 'react-select';


export default function AddTicket() {
    const [loading, setLoading] = useState(false)

    const [employeelist, setEmployeelist] = useState([])
    const [employeedetail, setEmployeedetail] = useState([])
    const [issuelist, setIssuelist] = useState([])
    const [ticketstatuslist, setTicketstatuslist] = useState([])
    const [locationlist, setLocationlist] = useState([])
    const [prioritylist, setPrioritylist] = useState([])
    const [assettypelist, setAssettypelist] = useState([])
    const [assettype, setAssettype] = useState('')

    const [todatdate, setTodaydate] = useState('')

    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################

    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')

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

            const countTickets = await CountTickets(org)
            let count = Number(countTickets[0].count);
            count = count + 1 + ''
            const val = 'Ticket' + '-' + count.padStart(5, '0');
            document.getElementById('assignticket').value = val
        }
        fetchdata();
        todaydate()
    }, [])
    const todaydate = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;
        setTodaydate(today)
    }

    const handleGetEmpDetail = async (e) => {
        let employee_id = e.target.value;
        console.log(employee_id)
        const org = localStorage.getItem('Database')

        const detail = await EmployeesDetail(org, employee_id);
        setEmployeedetail(detail)
        const assetall = await GetNewAssetAssign(org, employee_id)
        setAssettypelist(assetall)
    }


    let options = assettypelist.map((ele) => {
        return { value: ele.serial_no, label: [ele.asset_type, ' , ', ele.serial_no, '  (', ele.manufacture, ') '] };
    })
    // options.push({ value: 'other', label: ['other'] })

    const handleAssetTypeChange = (selectedOption) => {
        console.log(selectedOption.target.value)
        // document.getElementById('assetserial').value = selectedOption.value;
        // setAssettype(selectedOption.value)

        document.getElementById('assetserial').value = selectedOption.target.value
        setAssettype(selectedOption.target.value)
    }

    const handleIssueType = (e) => {
        if (e.target.value == 'Handover') {
            document.getElementById('Handoverdetails').style.display = "flex"
            document.getElementById('AssetCondition').value = ""
        }
        else if (e.target.value == 'Allocation') {
            document.getElementById('Handoverdetails').style.display = "flex"
            document.getElementById('AssetCondition').value = "Good and Working"
        }
        else {
            document.getElementById('Handoverdetails').style.display = "none"
        }
    }


    const handleSaveTicket = async (e) => {
        e.preventDefault();

        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        let employee_id = document.getElementById('employee');
        const employee_name = employee_id.options[employee_id.selectedIndex].text;
        employee_id = employee_id.value;
        const assettype = document.getElementById('assettype').value
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
        const AssetTag = document.getElementById('AssetTag').value
        const AssetCondition = document.getElementById('AssetCondition').value
        const org = localStorage.getItem('Database')

        const user_id = localStorage.getItem('UserId')

        // if (!employee_id || !assetserial || !location || !ticketstatus || !ticketsubject) {
        //     setLoading(true)
        //     document.getElementById('subnitbtn').disabled = false
        //     callfun('Please enter the Mandatory Field', 'warning', 'self')
        //     return false;
        // }
        // else {
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
            const result = await InsertTicket(org, employee_id, employee_name, assettype, assetserial, location, assignticket, typeofissue, email, ticketdate, ticketstatus, ticketsubject,
                priority, issuedesc, remark, user_id, AssetTag, AssetCondition)

            if (result === 'Data Added') {
                const resnk = await Mail(message)
                setLoading(true)
                callfun('Ticket Added', 'success', '/TotalTicket')
            }
            else {
                setLoading(true)
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false

            }
        // }

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
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h3><span className='page-type-head1'>Tickets <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Tickets</span> </h3>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = './TotalTicket' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card py-3">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor='vendor'>Employee Name <span className='text-danger'>*</span></label>
                                                <select id='employee' className="form-select" onChange={handleGetEmpDetail}>
                                                    <option value='' hidden >Select Employee</option>
                                                    {
                                                        employeelist.map((item, index) => (
                                                            <option key={index} value={item.employee_id}>{item.employee_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='assettype'>Asset <span className='text-danger'>*</span></label>
                                                {/* <Select
                                                    id='assettype'
                                                    options={options.length > 1 ? options : [{ value: 'Other', label: 'Other' }]}
                                                    isMulti={false}
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isClearable='true'
                                                    isSearchable='true'
                                                    onChange={handleAssetTypeChange}
                                                /> */}
                                                <select className="form-select" id='assettype' onChange={handleAssetTypeChange}>
                                                    <option value='' hidden>Select...</option>

                                                    {
                                                        assettypelist.map((item, index) => (
                                                            <option key={index} value={item.serial_no}>{`${item.asset_type}, (${item.serial_no})`}</option>

                                                        )
                                                        )

                                                    }
                                                    <option value='Other' >Other</option>

                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='assetserial'>Asset Serial</label>
                                                <input type="text" id='assetserial' className="form-control" disabled />
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-4">
                                                <label htmlFor='location'>Location <span className='text-danger'>*</span></label>
                                                <select id='location' className="form-select">
                                                    <option value={employeedetail.location} hidden>{employeedetail.location}</option>
                                                    {
                                                        locationlist.map((item, index) =>
                                                            <option key={index} value={item.location_code}>{item.location_name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-4" >
                                                <label htmlFor='assignticket'>Assign Ticket </label>
                                                <input type="text" id='assignticket' className="form-control" disabled />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='typeofissue'>Type of Issue</label>
                                                <select id='typeofissue' className="form-select" onChange={handleIssueType}>
                                                    <option value='' hidden>Select...</option>
                                                    {
                                                        issuelist.map((item, index) => (
                                                            <option key={index} value={item.issue_type}>{item.issue_type}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div id="Handoverdetails" className="row mt-3" style={{ display: "none" }}>
                                            <div className="col">
                                                <label htmlFor='AssetTag'>Asset Tag <span className='text-danger'>*</span></label>
                                                <input type="text" id='AssetTag' className="form-control" required />
                                            </div>
                                            <div className="col">
                                                <label htmlFor='priority'>Asset Condition</label>
                                                <select id='AssetCondition' className="form-select">
                                                    <option value='' hidden>Select...</option>
                                                    <option value='Good and Working' >Good and Working</option>
                                                    <option value='Damaged but Working' >Damaged but Working</option>
                                                    <option value='Damaged but Not Working' >Damaged but Not Working</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='email'>Email ID</label>
                                                <input type="email" id='email' className="form-control" disabled defaultValue={employeedetail.employee_email} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='ticketdate'>Date </label>
                                                <input type="date" id='ticketdate' className="form-control" defaultValue={todatdate} required />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor='ticketstatus'>Ticket Status <span className='text-danger'>*</span></label>
                                                <select id='ticketstatus' className="form-select">
                                                    <option value='' hidden>Select...</option>
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
                                                <input type="text" id='ticketsubject' className="form-control" required />
                                            </div>
                                            <div className="col">
                                                <label htmlFor='priority'>Priority</label>
                                                <select id='priority' className="form-select">
                                                    <option value='' hidden>Select...</option>
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
                                                <textarea className="form-control" id="issuedesc" rows="3"></textarea>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="remark">Resolution/Pending Remarks</label>
                                                <textarea className="form-control" id="remark" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group mt-3 mx-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleSaveTicket}>Add Tickets</button>
                                            <button type="reset" className="btn btn-secondary mx-3">Reset</button>
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
