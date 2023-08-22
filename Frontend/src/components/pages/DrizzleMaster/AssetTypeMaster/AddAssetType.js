import Sidebar from '../../../Sidebar/Sidebar';
import React, { useContext, useState } from 'react';
import { AddAssetTypeapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddAssetType() {
    const [loading, setLoading] = useState(true)

    // ######################### Modal Alert ###################################
    // const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })
    const { callfun, tooglevalue } = useContext(GlobalAlertInfo);
    // ######################### Modal Alert ###################################


    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const asset_type = document.getElementById('asset_type').value;
        const assettype_id = asset_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const asset_type_desc = document.getElementById('asset_type_desc').value;

        const username = localStorage.getItem('UserId');

        if (!asset_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Asset Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter the Asset Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await AddAssetTypeapi(org, assettype_id, asset_type, asset_type_desc, username);

            setLoading(true)
            if (result === 'Added') {
                callfun('Asset Type Added', 'success', '/TotalAssetType')
                // setDatas({ ...datas, message: "Asset Type Added", title: "success", type: "success", route: "/TotalAssetType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                document.getElementById('subnitbtn').disabled = false
                callfun('This Asset Already Exist', 'warning', 'self')
                // setDatas({ ...datas, message: "This Asset Already Exist", title: "warning", type: "Error" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddAssetType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }
    return (
        <>
            {
                loading ?
                    <Sidebar >

                        {/* ######################### Sanckbar End ##################################### */}

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

                        <div className='main_container ' >
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Asset Type <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Asset Type</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalAssetType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3 border ">
                                <div className='card-header'>Add Asset Type:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5 mt-2" >
                                            <label htmlFor='asset_type'>Asset Type <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='asset_type' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='asset_type_desc'>Remarks</label>
                                            <textarea className="form-control" id='asset_type_desc' rows='3' />
                                        </div>

                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Asset Type</button>
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

export default AddAssetType;