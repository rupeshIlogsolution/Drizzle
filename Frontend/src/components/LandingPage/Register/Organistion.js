import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
// import Snackbar from '../../../Snackbar/Snackbar';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { HiUserCircle } from 'react-icons/hi';
import { TotalCountry, TotalState, TotalCity, getOrganisation, CurrencyMaster, UpdateOrganisationDetails } from '../../../api/index'
import './organisation.css'
import { GlobalAlertInfo } from '../../../App';
import Modal from '../../pages/AlertModal/Modal';

const OrganisationDetails = () => {
   const [loading, setLoading] = useState(false)
   const [OrgData, setOrgdata] = useState({})
   const [countrylist, setCountrylist] = useState([]);
   const [statelist, setStatelist] = useState(false);
   const [citylist, setCitylist] = useState(false);
   const [currencylist, setCurrencylist] = useState([]);

   // ########################### Modal Alert #############################################
   const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
   // ########################### Modal Alert #############################################


   useEffect(() => {
      const fetchData = async () => {

         const Orgdetails = await getOrganisation(localStorage.getItem('Database'))
         setOrgdata(Orgdetails)
         const totalCountry = await TotalCountry();
         setCountrylist(totalCountry)

         const org_state = await TotalState(Orgdetails.org_country)
         setStatelist(org_state)

         const result = await TotalCity(Orgdetails.org_state)
         setCitylist(result)

         // const currency = await CurrencyMaster()
         // setCurrencylist(currency)
         setLoading(true)
      }
      fetchData()

   }, [])

   const handleGetCity = async (e) => {
      e.preventDefault();
      const result = await TotalCity(e.target.value)
      setCitylist(result)
   }

   const handleGetState = async (e) => {
      e.preventDefault();
      const value = e.target.value
      const result = await TotalState(value)
      setStatelist(result)
   }

   const handleClick = async (e) => {
      e.preventDefault();
      setLoading(false)
      document.getElementById('subnitbtn').disabled = 'true'

      const org_name = document.getElementById('org_name').value;
      const country = document.getElementById('country').value;
      const state = document.getElementById('state').value;
      const city = document.getElementById('city').value;
      const currency = document.getElementById('currency').value;

      if (!org_name) {
         setLoading(true)
         document.getElementById('subnitbtn').disabled = false
         callfun('Please enter the Mandatory Field', 'warning', 'self')
         return false;
      }
      else {
         const result = await UpdateOrganisationDetails(localStorage.getItem('Database'), org_name, country, state, city, currency)
         setLoading(true)

         if (result == "Updated") {
            callfun('Organisation Updated', 'success', '/Dashboard')
         }
         else {
            callfun('Server Error', 'danger', 'self')
            document.getElementById('subnitbtn').disabled = false
        }
      }

   }

   return (
      <>
         {
            loading ?
               <Sidebar>
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


                  <div className='main_container d-flex align-items-center '>
                     <div className='profile d-flex rounded15'>
                        <div className='photo_sec d-flex  py-3 text-light position-relative'>
                           <h2 className='photo_sec-title'>Organisation Details</h2>
                           <HiUserCircle className='profile_log position-absolute' />
                        </div>
                        <div className='details bg-white px-5 py-3'>
                           <form>
                              <div className='row my-2'>
                                 <div className='col-md-6'>
                                    <label htmlFor='org_name'>Organisation Name</label>
                                    <input className="form-control" id='org_name' defaultValue={OrgData.org_name} disabled />
                                 </div>
                                 <div className='col-md-6'>
                                    <label htmlFor='country'>Country</label>
                                    <select id="country" className="form-select" onChange={handleGetState}>
                                       <option value={OrgData.org_country} hidden>{OrgData.country_name}</option>
                                       {
                                          countrylist.map((item, index) => (
                                             <option key={index} value={item.country_id}>{item.country_name}</option>
                                          ))
                                       }
                                    </select>
                                 </div>
                              </div>
                              <div className='row my-3'>
                                 <div className='col-md-6'>
                                    <label htmlFor='state'>State</label>
                                    <select id="state" className="form-select"
                                       onChange={handleGetCity}
                                    >
                                       <option value={OrgData.org_state} hidden>{OrgData.state_name}</option>
                                       {
                                          statelist.length ?
                                             statelist.map((item, index) => (
                                                <option key={index} value={item.state_id}>{item.state_name}</option>
                                             ))
                                             : <option value=''> Please Select Country</option>
                                       }
                                    </select>
                                 </div>
                                 <div className='col-md-6'>
                                    <label htmlFor='city'>City</label>
                                    <br />
                                    <select id="city" className="form-select">
                                       <option value='' hidden>{OrgData.org_city}</option>
                                       {
                                          citylist.length ?
                                             citylist.map((item, index) => (
                                                <option key={index} value={item.city_name}>{item.city_name}</option>
                                             ))
                                             : <option value=''> Please Select Country</option>
                                       }
                                    </select>
                                 </div>
                              </div>
                              <div className='row my-3'>
                                 <div className='col-md-6'>
                                    <label htmlFor='currency'>Currency</label>
                                    <select id="currency" className="form-select">
                                       <option value={OrgData.org_currency} hidden>{OrgData.org_currency}</option>

                                       {currencylist.length ?
                                          currencylist.map((item, index) => (
                                             <option key={index} value={item.currencyCode}>{item.name} , {item.currencyCode}</option>

                                          ))
                                          : <option value=''> Please Select Currency</option>
                                       }
                                    </select>
                                 </div>
                                 <div className='col-md-6'>
                                    <label htmlFor='company'>GST</label>
                                    <input className="form-control" id="company" value={OrgData.org_gst} disabled />
                                 </div>
                              </div>

                              <div className="form-group mt-3 d-flex justify-content-end " >
                                 <button type="submit" onClick={handleClick} className="btn btn-voilet " id="subnitbtn">Update</button>
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