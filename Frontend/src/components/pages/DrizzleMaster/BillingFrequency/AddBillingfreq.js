import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { AddBillingFreqapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddBillingFreq() {
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


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const billing_freq = document.getElementById('billing_freq').value;
        const billing_freq_id = billing_freq.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const billing_freq_desc = document.getElementById('billing_freq_desc').value;
        const org = localStorage.getItem('Database')

        const username = localStorage.getItem('UserId');

        if (!billing_freq) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter  Billing frequency', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Billing frequency", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await AddBillingFreqapi(org, billing_freq_id, billing_freq, billing_freq_desc, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Billing frequency Added', 'success', '/TotalBillingFreq')

                // setDatas({ ...datas, message: "Billing frequency Added", title: "success", type: "success", route: "/TotalBillingFreq", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Billing frequency Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Billing frequency Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddBillingFreq", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Billing Frequency <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Billing Frequency</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalBillingFreq' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Billing Frequency :</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5" >
                                            <label htmlFor='billing_freq'>Billing Frequency  <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='billing_freq' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='billing_freq_desc'>Remarks</label>
                                            <textarea className="form-control" id='billing_freq_desc' rows='3' placeholder='Comments' />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Frequency</button>
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

export default AddBillingFreq;