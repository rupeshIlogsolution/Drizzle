import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetAssetStatusapi, UpdateAssetStatusapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditAssetStatus() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)


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


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await GetAssetStatusapi(org, localStorage.getItem('assetstatussno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const asset_status = document.getElementById('asset_status').value;
        const asset_status_desc = document.getElementById('asset_status_desc').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('assetstatussno')

        if (!asset_status) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Asset Status', 'warning', 'self')
            // setDatas({ ...datas, message: "Please enter the Asset Status", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await UpdateAssetStatusapi(org, sno, asset_status, asset_status_desc, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('assetstatussno');
                callfun('Asset Status Updated', 'success', '/TotalAssetStatus')

                // setDatas({ ...datas, message: "Asset Status Updated", title: "success", type: "success", route: "/TotalAssetStatus", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                document.getElementById('subnitbtn').disabled = false
                callfun('Asset Status Already Exist', 'warning', 'self')

                // setDatas({ ...datas, message: " Asset Status Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                document.getElementById('subnitbtn').disabled = false
                callfun('Server Error', 'danger', 'self')

                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditAssetStatus", toggle: "true" })
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

                        <div className='main_container pb-2'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Asset Status <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Asset Status</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('assettypesno'); window.location.href = '/TotalAssetType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                                <div className='card-header'>Edit Asset Status:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5 form-group" >
                                            <label htmlFor='seriesid'> Asset Status <small className='text-danger'>*</small></label>
                                            <input type="text" className="form-control" id='asset_status' defaultValue={data.asset_status} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3">
                                            <label htmlFor='taskid'>Description</label>
                                            <textarea type="text" className="form-control" rows='3' id='asset_status_desc' defaultValue={data.asset_status_description} />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleadddevice}>Update Status</button>
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

export default EditAssetStatus;