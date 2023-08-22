import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { AddAssetStatusapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddAssetStatus() {
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
        document.getElementById('subnitbtn').disabled = 'true'
        setLoading(false)
        const asset_status = document.getElementById('asset_status').value;
        const assetstatus_id = asset_status.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const asset_status_desc = document.getElementById('asset_status_desc').value;

        const username = localStorage.getItem('UserId');

        if (!asset_status) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Asset Status', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter the Asset Status", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"

        }
        else {
            
            const org = localStorage.getItem('Database')
            const result = await AddAssetStatusapi(org, assetstatus_id, asset_status, asset_status_desc, username);
            setLoading(true)

            if (result === 'Added') {
                localStorage.removeItem('employeesno');
                callfun('Asset Status Added', 'success', '/TotalAssetStatus')
                // setDatas({ ...datas, message: "Asset Status Added", title: "success", type: "success", route: "/TotalAssetStatus", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Asset Status Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                
                // setDatas({ ...datas, message: " Asset Status Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddAssetStatus", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }
    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ############################ Snackbar ############################## */}
                        {/* <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ############################ Snackbar ############################## */}

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Asset Status <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Asset Status</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalAssetStatus' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                                <div className='card-header'>Add Asset Status:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5" >
                                            <label htmlFor='asset_status'>Asset Status  <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='asset_status' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='asset_status_desc'>Remarks</label>
                                            <textarea className="form-control" id='asset_status_desc' rows='3' />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Status</button>
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

export default AddAssetStatus;