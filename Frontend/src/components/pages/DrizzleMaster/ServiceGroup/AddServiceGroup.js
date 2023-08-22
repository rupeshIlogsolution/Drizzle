import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { InsertServiceGroup } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddServiceGroup() {
    const [loading, setLoading] = useState(true)

    // ########################### Modal Alert #############################################
    // const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    const handleinsertdata = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const service_group_type = document.getElementById('service_group_type').value;
        const service_action_id = service_group_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserId');
        const org = localStorage.getItem('Database')


        if (!service_group_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter Service Group Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Service Group Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await InsertServiceGroup(org, service_action_id, service_group_type, remark, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Service Group Type Added', 'success', '/TotalServiceGroup')

                // setDatas({ ...datas, message: "Service Group Type Added", title: "success", type: "success", route: "/TotalServiceGroup", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Service Group Type Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Service Group Type Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddServiceGroup", toggle: "true" })
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

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Service Group <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Service Group</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalServiceGroup' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Service Group:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5">
                                            <label htmlFor='service_group_type'>Service Group Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='service_group_type' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='remark'>Remarks</label>
                                            <textarea className="form-control" id='remark' rows='3' />
                                        </div>

                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleinsertdata}>Add Group Type</button>
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

export default AddServiceGroup;