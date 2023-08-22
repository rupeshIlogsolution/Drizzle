import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState,useContext } from 'react';
import { InsertContractType } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddContractType() {
    const [loading, setLoading] = useState(true)


    // ########################### Modal Alert #############################################
    //    const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "true"
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################



    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const contract_type = document.getElementById('contract_type').value;
        const contract_type_id = contract_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserId');
        const org = localStorage.getItem('Database')


        if (!contract_type) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Purchase Type', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter Contract Type", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const result = await InsertContractType(org, contract_type_id, contract_type, remark, username);
            setLoading(true)

            if (result === 'Added') {
                callfun('Contract Type Added', 'success', '/TotalContractType')

                // setDatas({ ...datas, message: "Contract Type Added", title: "success", type: "success", route: "/TotalContractType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Contract Type Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false

                // setDatas({ ...datas, message: "Contract Type Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false

                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddContractType", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }
    }

    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ######################### Sanckbar start ##################################### */}

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
                                <h4><span className='page-type-head1'>Contract Type <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Contract Type</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalContractType' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'> Add Contract Type:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5">
                                            <label htmlFor='contract_type'>Contract Type  <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='contract_type' />
                                        </div>
                                        <div className="form-group mt-3 col-md-7">
                                            <label htmlFor='remark'>Remarks </label>
                                            <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" />
                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add ContractType</button>
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

export default AddContractType;