import LandingFooter from '../LandingPageHome/LandingFooter'
import LandingHeader from '../LandingPageHome/LandingHeader';
import Loginimg from '../../../image/draw2.webp'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { UserLogin } from '../../../api'
import LoadingPage from '../../LoadingPage/LoadingPage';


const Login = (props) => {
  const [passwordshow, setPasswordshow] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleClickToogle = (e) => {
    e.preventDefault()
    setPasswordshow(!passwordshow)
  }

  const handleChangeInputval = (e) => {
    document.getElementById('emptyVal').style.display = 'none'
    document.getElementById('validVal').style.display = 'none'
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(false)
    const user_id = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    if (!user_id || !password) {
      setLoading(true)
      document.getElementById('emptyVal').style.display = 'flex'
    }
    else {
      const result = await UserLogin(user_id, password);
      if (result.status === 'Success') {
        localStorage.setItem('UserName', result.name);
        localStorage.setItem('UserId', result.user_id);
        localStorage.setItem('Token', result.token);
        localStorage.setItem('Permission', result.permission)
        localStorage.setItem('Database', result.database)
        localStorage.setItem('EmployId', result.employee_id)
        window.location.href = './Dashboard'
      }
      else {
        setLoading(true)
        setTimeout(() => {
          document.getElementById('validVal').style.display = 'flex'
        }, 1000)
      }

    }
  }


  const styleheight = {
    minHeight: "71vh"
  }

  return (
    <>
      {
        loading ?
          <section className="vh-100">
            <LandingHeader />
            <div className="container-fluid " style={styleheight}>
              <div className="row d-flex justify-content-center align-items-center h-100 pb-5 pt-5">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src={Loginimg} className="img-fluid" alt="Login " loading="lazy" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form autoComplete='off'>
                    <div className="divider d-flex align-items-center my-4">
                      <h2 className="text-center fw-bold mx-3 mb-0">Sign In</h2>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="user-id">User Id</label>
                      <input type="text" id="user-id" className="form-control form-control-lg" onChange={handleChangeInputval} placeholder="Enter a valid user id" required />
                    </div>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="password">Password</label>
                      <div className="input-group mb-3">
                        <input type={passwordshow ? "text" : "password"} className="form-control  form-control-lg" placeholder="Enter password" id="password" onChange={handleChangeInputval} required />
                        <div className="input-group-append" >
                          <span className="input-group-text h-100 w-100" onClick={handleClickToogle}>{passwordshow ? <AiFillEye style={{ fontSize: "22px" }} /> : <AiFillEyeInvisible style={{ fontSize: "22px" }} />}</span>
                        </div>
                      </div>
                    </div>



                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check mb-0">
                        {/* <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label> */}
                      </div>
                      <Link to="/ForgetPassword" className="text-body">Forgot password?</Link>
                    </div>
                    <div className="text-center text-lg-start pt-2">
                      <button type="submit" id='subBtn' className="btn btn-voilet" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={handlelogin}>Login</button>
                      <small id='emptyVal' className='mt-3 text-danger' style={{ display: "none" }}> &nbsp;Please Enter the userId or Password</small>
                      <small id='validVal' className='mt-3 text-danger' style={{ display: "none" }}> &nbsp;Please Enter the Valid userId or Password</small>
                      <p className=" mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup" className="link-danger">Sign up</Link></p>
                    </div>
                  </form>
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

export default Login;