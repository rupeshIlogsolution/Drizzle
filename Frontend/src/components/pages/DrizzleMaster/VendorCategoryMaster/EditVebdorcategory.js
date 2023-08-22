import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState,useContext } from 'react';
import { GetVendorCategoryapi, UpdateVendorCategoryapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditVendorcategory() {
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
            const result = await GetVendorCategoryapi(org, localStorage.getItem('vendorcatsno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const vendor_category = document.getElementById('vendor_category').value;
        const vendor_category_description = document.getElementById('vendor_category_description').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('vendorcatsno');
        const org = localStorage.getItem('Database')

        if (!vendor_category) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter  Vendor Category', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Vendor Category", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await UpdateVendorCategoryapi(org, sno, vendor_category, vendor_category_description, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('vendorcatsno');
                callfun('Vendor Category Added', 'success', '/TotalVendorCategory')

                // setDatas({ ...datas, message: "Vendor Category Updated", title: "success", type: "success", route: "/TotalVendorCategory", toggle: "true" })
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
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditVendorCategory", toggle: "true" })
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
                                <h4><span className='page-type-head1'>Vendor Category <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Vendor Category</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('vendorcatsno'); window.location.href = '/TotalVendorCategory' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card mt-3 pb-3">
                                <div className='card-header'>Edit Vendor Category :</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5" >
                                            <label htmlFor='vendor_category'>Vendor Category  <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='vendor_category' defaultValue={data.vendor_category} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3" >
                                            <label htmlFor='vendor_category_description'>Remarks</label>
                                            <textarea type="text" className="form-control" id='vendor_category_description' defaultValue={data.vendor_category_description} />
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

export default EditVendorcategory;