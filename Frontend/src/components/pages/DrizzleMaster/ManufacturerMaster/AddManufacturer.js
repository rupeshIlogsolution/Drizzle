import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { InsertManufacturer } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddManufacturer() {
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
        const manufacturername = document.getElementById('manufacturername').value;
        const manufacturer_id = manufacturername.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');
        const org = localStorage.getItem('Database')

        if (!manufacturername) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter Manufacturer', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Manufacturer", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await InsertManufacturer(org, manufacturer_id, manufacturername, remark, username);
            setLoading(true)

            if (result === 'Added') {
                // setDatas({ ...datas, message: "Manufacturer Added", title: "success", type: "success", route: "/TotalManufacturer", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
                localStorage.removeItem('seriessno');
                callfun('Manufacturer Added', 'success', '/TotalManufacturer')
            }
            else if (result === 'Already') {
                callfun('Manufacturer Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false;

                // setDatas({ ...datas, message: "Manufacturer Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false;

                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddManufacturer", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }
    }

    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ################### Snackbar ########################## */}
                        {/* <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ################### Snackbar ########################## */}

                        <div className='main_container'>
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Manufacturer <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Manufacturer</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalManufacturer' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                                <div className='card-header'>Add Manufacturer:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5">
                                            <label htmlFor='manufacturername'>Manufacturer Name   <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='manufacturername' />
                                        </div>
                                        <div className="form-group mt-3 col-md-7">
                                            <label htmlFor='remark'>Remarks </label>
                                            <textarea className="form-control" placeholder="Comments" id='remark' rows="3" />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Manufacturer</button>
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

export default AddManufacturer;