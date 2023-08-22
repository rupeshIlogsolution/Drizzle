import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { AddVendorCategoryapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddVendorCategory() {
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

        const vendor_category = document.getElementById('vendor_category').value;
        const vendor_category_id = vendor_category.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const vendor_category_description = document.getElementById('vendor_category_description').value;
        const org = localStorage.getItem('Database')

        const username = localStorage.getItem('UserId');

        if (!vendor_category) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter  Vendor Category', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Vendor Category", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await AddVendorCategoryapi(org, vendor_category_id, vendor_category, vendor_category_description, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Vendor Category Added', 'success', '/TotalVendorCategory')

                // setDatas({ ...datas, message: "Vendor Category Added", title: "success", type: "success", route: "/TotalVendorCategory", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Vendor Category Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Vendor Category Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddVendorCategory", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Vendor Category <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Vendor Category</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalVendorCategory' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Vendor Category :</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="col-md-5" >
                                            <label htmlFor='vendor_category'>Vendor Category  <span className='text-danger'>*</span> </label>
                                            <input type="text" className="form-control" id='vendor_category' />
                                        </div>
                                        <div className="col-md-7 mt-3" >
                                            <label htmlFor='vendor_category_description'>Remarks</label>
                                            <textarea className="form-control" rows='3' id='vendor_category_description' placeholder='Comments' />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Category</button>
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

export default AddVendorCategory;