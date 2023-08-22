import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState,useContext } from 'react';
import { AddPurchaseTypeeapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';


function AddPurchaseType() {
    const [loading, setLoading] = useState(true)


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


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const purchase_type = document.getElementById('purchase_type').value;
        const purchase_type_id = purchase_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const purchase_type_desc = document.getElementById('purchase_type_desc').value;
        // setLoading(true)

        const username = localStorage.getItem('UserId');

        if (!purchase_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Purchase Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Purchase Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await AddPurchaseTypeeapi(org, purchase_type_id, purchase_type, purchase_type_desc, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Purchase Type Added', 'success', '/TotalPurchaseType')
                // setDatas({ ...datas, message: "Purchase Type Added", title: "success", type: "success", route: "/TotalPurchaseType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Purchase Type Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Purchase Type Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddPurchaseType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }
    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ######################### Sanckbar start ##################################### */}
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
                                <h4><span className='page-type-head1'>Purchase Type <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Purchase Type</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalPurchaseType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Purchase Type:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5" >
                                            <label htmlFor='seriesid'>Purchase Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='purchase_type' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='taskid'>Remarks</label>
                                            <textarea type="email" className="form-control" id='purchase_type_desc' rows='3' />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Purchase Type</button>
                                            <button type="reset" className="btn btn-secondary mx-3"  >Reset</button>
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

export default AddPurchaseType;