import Sidebar from '../../Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { changePassword } from '../../../api/index'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../App';
import Modal from '../../pages/AlertModal/Modal';

function ChangePassword() {
    const [currentpass, setCurrentpass] = useState(false)
    const [newpass, setNewpass] = useState(false)
    const [cnfpass, setCnfpass] = useState(false)

    // ########################### Modal Alert #############################################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################

    const handleToggleCurrentpass = (e) => {
        e.preventDefault();
        setCurrentpass(!currentpass)
    }
    const handleToggleNewpass = (e) => {
        e.preventDefault();
        setNewpass(!newpass)
    }
    const handleToggleCnfpass = (e) => {
        e.preventDefault();
        setCnfpass(!cnfpass)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        document.getElementById('subnitbtn').disabled = 'true'

        const userid = localStorage.getItem('UserId')
        const CurrentPassword = document.getElementById('current_password').value
        const UpdatePassword = document.getElementById('new-password').value
        const ConfirmPassword = document.getElementById('confirm-password').value

        if (UpdatePassword === ConfirmPassword) {
            const result = await changePassword(userid, UpdatePassword, CurrentPassword)
            if (result === 'Password Changed') {
                callfun('Password Updated', 'success', '/Dashboard')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
            }
        }
        else {
            callfun('Current Password and Confirm Password Not Match', 'warning', 'self')
            document.getElementById('subnitbtn').disabled = false
        }
    }

    return (
        <>
            <Sidebar>
                {/* ######################### Sanckbar Start ##################################### */}
                <Modal
                    theme={tooglevalue.theme}
                    text={tooglevalue.message}
                    show={tooglevalue.modalshowval}
                    url={tooglevalue.url}
                />
                {/* ######################### Sanckbar End ##################################### */}

                <div className='main_container'>
                    <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                        <h4><span className='page-type-head1'>Profile<MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Change Password</span> </h4>
                        <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/Dashboard' }} >Back <RiArrowGoBackFill /></button>
                    </div>
                    <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                        <header className="card-header" >Change Password</header>
                        <article className="card-body">
                            <form className='px-3 d-flex flex-column align-items-center' autoComplete='off' >
                                <div className="form-outline mb-2 col-md-5" >
                                    <label className="form-label" htmlFor="current_password">Current Password</label>
                                    <div className="input-group mb-0">
                                        <input type={currentpass ? "text" : "password"} className="form-control  form-control-lg" placeholder="Current password" id="current_password" required />
                                        <div className="input-group-append" >
                                            <span className="input-group-text h-100 w-100" onClick={handleToggleCurrentpass}>{currentpass ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-2 col-md-5" >
                                    <label className="form-label" htmlFor="new-password">New Password</label>
                                    <div className="input-group mb-0">
                                        <input type={newpass ? "text" : "password"} id="new-password" className="form-control form-control-lg" placeholder="New Password" required />
                                        <div className="input-group-append" >
                                            <span className="input-group-text h-100 w-100" onClick={handleToggleNewpass}>{newpass ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-0 col-md-5" >
                                    <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                                    <div className="input-group mb-0">
                                        <input type={cnfpass ? "text" : "password"} id="confirm-password" className="form-control form-control-lg" placeholder="Confirm Password" required />
                                        <div className="input-group-append" >
                                            <span className="input-group-text h-100 w-100" onClick={handleToggleCnfpass}>{cnfpass ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-3 w-100 d-flex justify-content-end " >
                                    <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleClick} >Change Password </button>
                                    <button type="reset" className="btn btn-secondary mx-3">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>

        </>
    )
}

export default ChangePassword;