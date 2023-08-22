import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetTicketstatus, UpdateTicketstatus } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditTicketStatus() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)


    // ########################### Modal Alert #############################################
    //    const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await GetTicketstatus(org, localStorage.getItem('ticketstatussno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleUpdateContractType = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const ticket_status = document.getElementById('ticket_status').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('ticketstatussno')
        const org = localStorage.getItem('Database')

        if (!ticket_status) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter Ticket Status', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Ticket Status", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await UpdateTicketstatus(org, sno, ticket_status, remark, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('ticketstatussno');
                callfun('Ticket Status Updated', 'success', '/TotalTicketStatus')

                // setDatas({ ...datas, message: "Ticket Status Updated", title: "success", type: "success", route: "/TotalTicketStatus", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Ticket Status Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Ticket Status Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditTicketStatus", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }


    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ######################### Sanckbar Start ##################################### */}

                        {/* <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ######################### Sanckbar End ##################################### */}

                        <div className='main_container'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Ticket Status <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Ticket Status</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('ticketstatussno'); window.location.href = '/TotalTicketStatus' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-3 card inner-card pb-3">
                                <div className='card-header'>Edit Ticket Status:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5">
                                            <label htmlFor='ticket_status'>Ticket Status <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='ticket_status' defaultValue={data.ticket_status} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3">
                                            <label htmlFor='remark'>Remarks </label>
                                            <textarea className="form-control" placeholder="Comments" id='remark' rows="3" defaultValue={data.ticket_description} />
                                        </div>
                                        <button type="submit" className="mt-3 btn btn-voilet " id="subnitbtn" onClick={handleUpdateContractType}>Update</button>
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

export default EditTicketStatus;