import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState,useContext } from 'react';
import { InsertIssueType } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddIssueType() {
    const [loading, setLoading] = useState(true)


    // ########################### Modal Alert #############################################
    //  const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const issue_type = document.getElementById('issue_type').value;
        const issue_type_id = issue_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserId');
        const org = localStorage.getItem('Database')

        if (!issue_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Issue Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Issue Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await InsertIssueType(org, issue_type_id, issue_type, remark, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Issue Type Added', 'success', '/TotalIssueType')
                // setDatas({ ...datas, message: "Issue Type Added", title: "success", type: "success", route: "/TotalIssueType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Issue Type Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Issue Type Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddIssueType", toggle: "true" })
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
                                <h4><span className='page-type-head1'>IssueType <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add IssueType</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalIssueType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add IssueType:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5">
                                            <label htmlFor='issue_type'>Issue Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='issue_type' />
                                        </div>
                                        <div className="form-group col-md-7 mt-3">
                                            <label htmlFor='remark'>Remarks</label>
                                            <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add IssueType</button>
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

export default AddIssueType;