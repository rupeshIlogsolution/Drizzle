import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Snackbar from '../../../Snackbar/Snackbar';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { HiUserCircle } from 'react-icons/hi';


const OrganisationDetails = () => {
    const [loading, setLoading] = useState(true)

    return (
        <>
           {
              loading ?
                 <Sidebar>
 
                    {/* <div id="snackbar" style={{ display: "none" }}>
                       <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                    </div> */}
  
                    <div className='Profile_container bg-light d-flex align-items-center'>
  
                       <div className='profile d-flex'>
                          <div className='photo_sec d-flex  py-3 text-light position-relative'>
                             <h2 >Organisation Details</h2>
                             <HiUserCircle className='profile_log'/>
                          </div>
                          <div className='details px-5 py-3'>
                             <form>
                                <div className='row my-2'>
                                   <div className='col-md-6'>
                                      <label>Organisation Name</label>
                                      <br />
                                      <input className="form-control" id='employee_name' value="Awl"  ></input>
                                   </div>
                                   <div className='col-md-6'>
                                      <label>Country</label>
                                      <br />
                                      <input className="form-control" id='employee_number' value="India" ></input>
                                   </div>
                                </div>
                                <div className='row my-2'>
                                   <div className='col-md-6'>
                                      <label>State</label>
                                      <br />
                                      <input className="form-control" id='employee_email' value="Haryana" ></input>
                                   </div>
                                   <div className='col-md-6'>
                                      <label>City</label>
                                      <br />
                                      <input className="form-control" id="Address" value="Gurgaon" disabled></input>
                                   </div>
                                </div>
                                <div className='row my-2'>
                                   <div className='col-md-6'>
                                      <label>Currency</label>
                                      <br />
                                      <input className="form-control" id="location" value="Rupee" disabled></input>
                                   </div>
                                   <div className='col-md-6'>
                                      <label>GST</label>
                                      <br />
                                      <input className="form-control" id="company" value="" disabled></input>
                                   </div>
                                </div>
                               
  
                                <hr />
                               
  
                                <div className="form-group mt-3 d-flex justify-content-end " >
                                   <button type="submit" className="btn btn-voilet " id="subnitbtn"
                                   >Update</button>
                                </div>
  
                             </form>
                          </div>
                       </div>
                    </div>
                 </Sidebar >
                 : <LoadingPage />
           }
        </>
     )
}
export default OrganisationDetails