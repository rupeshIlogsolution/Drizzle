import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetPriorityapi, UpdatePriorityapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditPriority() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)


    // ########################### Modal Alert #############################################
    //   const [datas, setDatas] = useState({
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
            const result = await GetPriorityapi(org, localStorage.getItem('prioritysno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const priority = document.getElementById('priority').value;
        const priority_desc = document.getElementById('priority_desc').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('prioritysno')
        const org = localStorage.getItem('Database')


        if (!priority) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Priority Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Priority Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await UpdatePriorityapi(org, sno, priority, priority_desc, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('prioritysno');
                callfun('Priority Type Updated', 'success', '/TotalPriority')

                // setDatas({ ...datas, message: "Priority Type Updated", title: "success", type: "success", route: "/TotalPriority", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Priority Type Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Priority Type Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditPriority", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Priority <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Priority Type</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('prioritysno'); window.location.href = '/TotalPriority' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Edit Priority:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5" >
                                            <label htmlFor='priority'>Priority Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='priority' defaultValue={data.priority_type} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3" >
                                            <label htmlFor='priority_desc'>Remarks</label>
                                            <textarea type="text" className="form-control" id='priority_desc' defaultValue={data.priority_description} />
                                        </div>
                                        <button type="submit" className="btn btn-voilet mt-3" id="subnitbtn" onClick={handleadddevice}>Update</button>
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

export default EditPriority;