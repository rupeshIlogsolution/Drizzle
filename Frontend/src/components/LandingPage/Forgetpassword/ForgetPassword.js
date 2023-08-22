import LandingFooter from '../LandingPageHome/LandingFooter'
import LandingHeader from '../LandingPageHome/LandingHeader';
import ForgePassword from '../../../image/forgetpassword.svg'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { UserLogin } from '../../../api'
import LoadingPage from '../../LoadingPage/LoadingPage';


const ForgetPassword = () => {
    const [passwordshow, setPasswordshow] = useState(false);
    const [repasswordshow, setRepasswordshow] = useState(false);
    const [loading, setLoading] = useState(true)

    const handleClickToogle = (e) => {
        e.preventDefault()
        setPasswordshow(!passwordshow)
    }
    const handleClickToogleRepassword = (e) => {
        e.preventDefault()
        setRepasswordshow(!repasswordshow)
    }

    const handleChangeInputval = (e) => {
        document.getElementById('emptyVal').style.display = 'none'
        document.getElementById('validVal').style.display = 'none'
        document.getElementById('cnfpass').style.display = 'none'
        
    }

    const handlelogin = async (e) => {
        e.preventDefault();
        setLoading(false)
        const user_id = document.getElementById('user-id').value;
        const password = document.getElementById('password').value;
        const repassword = document.getElementById('repassword').value;
        if (!user_id || !password) {
            setLoading(true)
            document.getElementById('emptyVal').style.display = 'flex'
        }
        else if(!(password === repassword)){
            setLoading(true)
            document.getElementById('cnfpass').style.display = 'flex'
        }
        else {

            // const result = await UserLogin(user_id, password);
            // if (result.status === 'Success') {
            //     localStorage.setItem('UserName', result.name);
            //     localStorage.setItem('UserId', result.user_id);
            //     localStorage.setItem('Token', result.token);
            //     localStorage.setItem('Permission', result.permission)
            //     window.location.href = './Dashboard'
            // }
            // else {
            //     setLoading(true)
            //     setTimeout(() => {
            //         document.getElementById('validVal').style.display = 'flex'
            //     }, 1000)


            // }

        }
    }

    const styleheight = {
        minHeight: "72vh"
      }
    return (
        <>
            {
                loading ?
                    <section className="vh-100">
                        <LandingHeader />
                        <div className="container-fluid " style={styleheight}>
                            <div className="row d-flex justify-content-center align-items-center h-100 pb-3 pt-0 mb-0" >
                                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-0" >
                                    <form autoComplete='off'>
                                        <div className="divider d-flex align-items-center my-3">
                                            <h3 className="text-danger fw-bold mx-3 mb-0">Forget Password ?</h3>
                                        </div>
                                        <div className="form-outline mb-3">
                                            <label className="form-label" htmlFor="user-id">User Id</label>
                                            <input type="text" id="user-id" className="form-control form-control-lg" onChange={handleChangeInputval} placeholder="Enter user id" required />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="password">New Password</label>
                                            <div className="input-group mb-3">
                                                <input type={passwordshow ? "text" : "password"} className="form-control  form-control-lg" placeholder="New password" id="password" onChange={handleChangeInputval} required />
                                                <div className="input-group-append" >
                                                    <span className="input-group-text h-100 w-100" onClick={handleClickToogle}>{passwordshow ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-1">
                                            <label className="form-label" htmlFor="repassword">Confirm-Password</label>
                                            <div className="input-group mb-2">
                                                <input type={repasswordshow ? "text" : "password"} className="form-control  form-control-lg" placeholder="Confirm password" id="repassword" onChange={handleChangeInputval} required />
                                                <div className="input-group-append" >
                                                    <span className="input-group-text h-100 w-100" onClick={handleClickToogleRepassword}>{repasswordshow ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="d-flex justify-content-between align-items-center">
                                            <div className="form-check mb-0">
                                                <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Remember me
                                                </label>
                                            </div>
                                            <a href="#!" className="text-body">Forgot password?</a>
                                        </div> */}
                                        <div className="text-center text-lg-start pt-2">
                                            <button type="submit" id='subBtn' className="btn btn-voilet" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }} onClick={handlelogin}>Change</button>
                                            <small id='emptyVal' className='mt-3 text-danger' style={{ display: "none" }}> &nbsp;Please Enter the userId or Password</small>
                                            <small id='validVal' className='mt-3 text-danger' style={{ display: "none" }}> &nbsp;Please Enter the Valid userId or Password</small>
                                            <small id='cnfpass' className='mt-3 text-danger' style={{ display: "none" }}> &nbsp;Password or Confirm Password are not same</small>
                                            <p className=" mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup" className="link-danger">Sign up</Link></p>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-5 col-lg-6 col-xl-4 offset-xl-1">
                                    <img src={ForgePassword} className="img-fluid" alt="Login " style={{ height: "100%", width: "100%" }} />
                                </div>

                            </div>
                        </div>
                        <LandingFooter />
                    </section>
                    : <LoadingPage />
            }
        </>
    )
}

export default ForgetPassword;