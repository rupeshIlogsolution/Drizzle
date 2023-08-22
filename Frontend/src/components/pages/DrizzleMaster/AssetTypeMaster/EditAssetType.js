import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetAssetTypeapi, UpdateAssettypeapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditAssetType() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)

    // ########################### Modal Alert #############################################
    // const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: '#',
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await GetAssetTypeapi(org, localStorage.getItem('assettypesno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const asset_type = document.getElementById('asset_type').value;
        const asset_type_desc = document.getElementById('asset_type_desc').value;
        const username = localStorage.getItem('UserName');
        const sno = localStorage.getItem('assettypesno')
        const org = localStorage.getItem('Database')

        if (!asset_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Asset Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter the Asset Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            setLoading(true)
            const result = await UpdateAssettypeapi(org, sno, asset_type, asset_type_desc, username);

            if (result === 'Updated') {
                localStorage.removeItem('assettypesno');
                callfun('Asset Type Updated', 'success', '/TotalAssetType')

                // setDatas({ ...datas, message: "Asset Type Updated", title: "success", type: "success", route: "/TotalAssetType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                document.getElementById('subnitbtn').disabled = false
                callfun('Server Error', 'danger', 'self')

                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditAssetType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }

    return (
        <>
            {
                loading ?
                    <Sidebar >

                        {/* ################# Snackbar ##################### */}
                        {/* 
                        <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />

                        {/* ################# Snackbar ##################### */}

                        <div className='main_container'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Asset Type <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Asset Type</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('assettypesno'); window.location.href = '/TotalAssetType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Edit Asset Type:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5" >
                                            <label htmlFor='asset_type'> Asset Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='asset_type' defaultValue={data.asset_type} />
                                        </div>
                                        <div className="form-group col-md-6 mt-3">
                                            <label htmlFor='asset_type_desc'>Remarks</label>
                                            <textarea className="form-control" id='asset_type_desc' rows='3' defaultValue={data.asset_description} />
                                        </div>
                                        <div className="form-group" >
                                            <button type="submit" className="btn btn-voilet mb-4 mt-3" id="subnitbtn" onClick={handleadddevice}>Update Asset Type</button>
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

export default EditAssetType;