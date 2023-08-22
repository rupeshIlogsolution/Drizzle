import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect,useContext } from 'react';
import { InsertVendSubCate, ActiveVendorCategory } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddVendorSubCategory() {
    const [vendorcatlist, setVendorcatlist] = useState([])
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



    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const vendorCategory = await ActiveVendorCategory(org)
            setVendorcatlist(vendorCategory)

        }
        fetchdata();
    }, [])

    const handleinsertdata = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const vendor_category = document.getElementById('vendor_category').value;
        const vend_sub_cate_id = vendor_category.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const vendor_sub_category = document.getElementById('vendor_sub_category').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserId');
        const org = localStorage.getItem('Database')


        if (!vendor_category || !vendor_sub_category) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter all mandatory fields', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter all mandatory fields", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await InsertVendSubCate(org, vend_sub_cate_id, vendor_category, vendor_sub_category, remark, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Vendor Sub Category Added', 'success', '/TotalVendSubCate')

                // setDatas({ ...datas, message: "Vendor Sub Category Added", title: "success", type: "success", route: "/TotalVendSubCate", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Vendor Sub Category Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Vendor Sub Category Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddVendSubCate", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Vendor Sub Category <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Vendor Sub Category</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalVendSubCate' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                                <div className='card-header'>Add Vendor Sub Category:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor='vendor_category'> Vendor Category <span className='text-danger'>*</span></label>
                                                <select type="text" className="form-select" id='vendor_category' >
                                                    <option value='' hidden>Select Vendor Category</option>
                                                    {
                                                        vendorcatlist.map((item, index) =>
                                                            <option key={index} value={item.vendor_category}>{item.vendor_category}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6" >
                                                <label htmlFor='vendor_sub_category'>Vendor Sub Category <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='vendor_sub_category' />
                                            </div>
                                        </div>
                                        <div className="col-md mt-3" >
                                            <label htmlFor='remark'>Remarks</label>
                                            <textarea className="form-control" id='remark' rows='3' placeholder='Comments' />
                                        </div>

                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleinsertdata}>Add Sub Category </button>
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

export default AddVendorSubCategory;