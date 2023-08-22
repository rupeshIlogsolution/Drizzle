import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState,useContext } from 'react';
import { AddSoftwareapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddSoftware() {
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

        const software = document.getElementById('software').value;
        const software_id = software.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const software_desc = document.getElementById('software_desc').value;
        const username = localStorage.getItem('UserId');

        if (!software) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Software', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter all mandatory fields", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await AddSoftwareapi(org, software_id, software, software_desc, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Software Added', 'success', '/TotalSoftware')
                // setDatas({ ...datas, message: "Software Added", title: "success", type: "success", route: "/TotalSoftware", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Software Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false;

                // setDatas({ ...datas, message: "Software Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddSoftware", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Software</span> <MdOutlineKeyboardArrowRight /><span className='page-type-head2'>Add Software</span> </h4>
                                <button className='btn btn-secondary btn' onClick={() => { window.location.href = '/TotalSoftware' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Software:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5" >
                                            <label htmlFor='software'>Software <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='software' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='software_desc'>Remarks </label>
                                            <textarea className="form-control" id='software_desc' rows='3' />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleaddinsert}>Add Software</button>
                                            <button type="reset" className="btn btn-secondary mx-3" >Reset</button>
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

export default AddSoftware;