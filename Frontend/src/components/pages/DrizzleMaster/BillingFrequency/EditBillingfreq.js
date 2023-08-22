import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetBillingFreqapi, UpdateBillingFreqapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditBillingFreq() {
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
            const result = await GetBillingFreqapi(org, localStorage.getItem('billingfreqsno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const billing_freq = document.getElementById('billing_freq').value;
        const billing_freq_desc = document.getElementById('billing_freq_desc').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('billingfreqsno')
        const org = localStorage.getItem('Database')


        if (!billing_freq) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter  Billing frequency', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Billing frequency", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"

        }
        else {
            const result = await UpdateBillingFreqapi(org, sno, billing_freq, billing_freq_desc, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('billingfreqsno');
                callfun('Billing frequency Updated', 'success', '/TotalBillingFreq')

                // setDatas({ ...datas, message: "Billing Frequency Updated", title: "success", type: "success", route: "/TotalBillingFreq", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Billing frequency Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false

                // setDatas({ ...datas, message: "Billing Frequency Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false

                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditBillingFreq", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Billing Frequency <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Billing Frequency</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('billingfreqsno'); window.location.href = '/TotalBillingFreq' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Edit Billing Frequency:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5" >
                                            <label htmlFor='billing_freq'>Billing Frequency  <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='billing_freq' defaultValue={data.billing_freq} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3" >
                                            <label htmlFor='billing_freq_desc'>Remarks</label>
                                            <textarea className="form-control" id='billing_freq_desc' rows='3' defaultValue={data.billing_freq_description} />
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

export default EditBillingFreq;