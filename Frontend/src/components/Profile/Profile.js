import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import '../LandingPage/Register/organisation.css'
import Qrcode from '../../image/qrcode.png';
import { getUserdetails, updateUserdetails } from '../../api/index'
import LoadingPage from '../LoadingPage/LoadingPage';
import { RiUserFill, RiBuilding4Fill } from 'react-icons/ri';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail, MdSecurity, MdModeEditOutline } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';
import { IoMdHome } from 'react-icons/io';
import './Profile.css'
// import img from '../../image/modelimg.png'
import { GlobalAlertInfo } from '../../App';
import Modal from '../pages/AlertModal/Modal';
import img from '../../image/update_profile.png'

const Profile = () => {
   const [details, setDetails] = useState({})
   const [loading, setLoading] = useState(false)

   // ########################### Modal Alert #############################################
   const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
   // ########################### Modal Alert #############################################


   useEffect(() => {
      const fetchdata = async () => {
         const org = localStorage.getItem('Database')
         const Userdetails = localStorage.getItem('UserId')

         const Userdata = await getUserdetails(org, Userdetails)
         setDetails(Userdata)
         setLoading(true)
      }
      fetchdata();

   }, [])

   const handleadddevice = async (e) => {
      e.preventDefault();
      setLoading(false)

      document.getElementById('subnitbtn').disabled = true

      const org = localStorage.getItem('Database')
      const employee_name = document.getElementById('employee_name').value
      const employee_number = document.getElementById('employee_number').value
      const employee_email = document.getElementById('employee_email').value
      const location = document.getElementById('location').value
      const company = document.getElementById('company').value
      const user_id = localStorage.getItem('UserId')

      if (!employee_name) {
         setLoading(true)

         document.getElementById('subnitbtn').disabled = false
         callfun('Please enter Name', 'warning', 'self')
      }
      else {
         const result = await updateUserdetails(org, employee_name, location, employee_email, employee_number, company, user_id)
         setLoading(true)

         if (result === 'Updated') {
            callfun('Profile Updated', 'success', '/Dashboard')
         }
         else {
            callfun('Server Error', 'danger', 'self')
            document.getElementById('subnitbtn').disabled = false
         }
      }
   }

   const handleToggleQr = () => {
      const checkboxval = document.getElementById('authdivbox').checked === true ? true : false;
      if (checkboxval) {
         document.getElementById('auth-qr').style.display = 'flex'
      }
      else {
         document.getElementById('auth-qr').style.display = 'none'
      }
   }


   const handlechangeempno = (e) => {
      if (e.target.value.length === 11) return false;
      setDetails({ ...details, employee_number: e.target.value })
   }


   return (
      <>
         {
            loading ?
               <Sidebar>
                  {/* ######################### Sanckbar start ##################################### */}
                  <Modal
                     theme={tooglevalue.theme}
                     text={tooglevalue.message}
                     show={tooglevalue.modalshowval}
                     url={tooglevalue.url}
                  />
                  {/* ######################### Sanckbar End ##################################### */}

                  <div className='profile_container'>
                     <h1>Profile Details</h1>
                     <div className='profile_div'>
                        <div className='profile_photo position-relative'>
                           <RiUserFill className='user_icon' />
                           <h4 className='mt-4'>{details.employee_name}</h4>
                           {/* {
                           (details.company.value)==="ILOG"
                           ? <img style={{height:"55px",width:"90px",position:"absolute",top:"83%",left:"10%"}} src={ilog}/>
                           :<img style={{height:"90px",width:"95px",position:"absolute",top:"78%",left:"10%"}} src={awl}/>
                         } */}
                           {/* <img style={{height:"55px",width:"90px",position:"absolute",top:"83%",left:"10%"}} src={ilog}/> */}
                           {/* <img style={{height:"90px",width:"95px",position:"absolute",top:"78%",left:"10%"}} src={awl}/> */}

                        </div>
                        <div className='profile_content'>
                           <div className='profile_details'>
                              <label><BsFillTelephoneFill style={{ margin: "0 5px", color: '#7c7c7c' }} />Mobile</label>
                              <p>{details.employee_number}</p>
                              <label><MdEmail style={{ margin: "-3px 5px 0", fontSize: "20px", color: '#7c7c7c' }} />Email</label>
                              <p>{details.employee_email}</p>
                              <label><IoMdHome style={{ margin: "-5px 5px 0", fontSize: "20px", color: '#7c7c7c' }} />Address</label>
                              <p>{details.location}</p>
                              <label><ImLocation style={{ margin: "-5px 5px 0", fontSize: "20px", color: '#7c7c7c' }} />Location</label>
                              <p>{details.location}</p>
                              <label><RiBuilding4Fill style={{ margin: "-5px 5px 0", fontSize: "18px", color: '#7c7c7c' }} />Organization Name</label>
                              <p>{details.company}</p>
                           </div>
                           <div className='profile_scan'>
                              <label htmlFor='authdivbox'><MdSecurity style={{ margin: "-5px 5px 0", fontSize: "18px", color: '#7c7c7c' }} /> TOTP Authentication </label>&nbsp;
                              <input type='checkbox' id='authdivbox' style={{ height: '16px', width: '16px' }} onChange={handleToggleQr} />
                              <div className='row mt-0 auth-div' id='auth-qr' style={{ display: 'none', transition: '0.5s all linear' }}>
                                 <div style={{ width: "280px", margin: "10px -3px 0 10px" }} className='auth-inner-div col-md-4 d-flex flex-column'>
                                    <img src={Qrcode} alt='Qr code for totp' height='100' width='100' />&nbsp;
                                    <div className='d-flex align-items-center' >

                                       <input type='text' className="form-control " placeholder='Enter Token' />&nbsp;
                                       <button className='btn btn-voilet' style={{ height: '35px' }}>Verify</button>
                                    </div>
                                 </div>
                              </div><br />
                              <label className='Edit_profile' data-toggle="modal" data-target="#exampleModal2">Edit Profile<MdModeEditOutline className='text-white rounded ft-20 mx-1' style={{ background: "#2e77bf", padding: "2px" }} /></label>
                           </div>
                        </div>
                     </div>

                     {/* ============================== UPDATE MODAL Start============================================================= */}


                     <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document" style={{ width: "45%" }}>
                           <div className="modal-content" >
                              <div className="modal-header" style={{ padding: "0", overflow: "hidden", height: "200px" }}>
                                 {/* <RiUserFill className='border border-dark rounded-circle p-3 text-white bg-dark' style={{ width: "110px", height: '110px' }} /> */}
                                 {/* <h5 className="modal-title mx-3" id="exampleModalLabel">Update Profile</h5> */}
                                 <img src={img} style={{ width: "100%", height: "100%" }} />
                              </div>
                              <div className="modal-body">
                                 <form style={{ padding: "0 10px" }}>
                                    <div className="form-row">
                                       <div className="col form-group">
                                          <label htmlFor='employee_name'>Name</label>
                                          <input className="form-control" id='employee_name' defaultValue={details.employee_name} ></input>
                                       </div>
                                       <div className="col form-group">
                                          <label htmlFor='employee_number'>Mobile</label>
                                          <input className="form-control" id='employee_number' value={details.employee_number} onChange={handlechangeempno}></input>
                                       </div>
                                    </div>

                                    <div>
                                       <label htmlFor='employee_email'>Email</label>
                                       <input className="form-control" id='employee_email' defaultValue={details.employee_email}></input>
                                    </div>
                                    <div>
                                       <label htmlFor='Address'>Address</label>
                                       <input className="form-control" id="Address" value={details.location} disabled></input>
                                    </div>

                                    <div>
                                       <label htmlFor='location'>Location</label>
                                       <input className="form-control" id="location" value={details.location} disabled></input>
                                    </div>
                                    <div>
                                       <label htmlFor='company'>Organization Name</label>
                                       <input className="form-control" id="company" value={details.company} disabled></input>
                                    </div>

                                    <div className="form-group mt-3 ">
                                       <button style={{ borderRadius: "50px" }} type="submit" className="btn btn-voilet w-100" id="subnitbtn"
                                          onClick={handleadddevice}>Update</button>
                                    </div>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* ============================== UPDATE MODAL END============================================================= */}
                  </div>
               </Sidebar>
               : <LoadingPage />
         }
      </>
   )
}

export default Profile;
