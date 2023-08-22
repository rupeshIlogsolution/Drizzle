import Sidebar from '../../../Sidebar/Sidebar';
import React, { useState, useEffect, useContext } from 'react';
import { AddLocationapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
import { TotalCountry, TotalState, TotalCity } from '../../../../api/index'
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddLocation() {
    const [loading, setLoading] = useState(true)
    const [numcount, setNumcount] = useState();
    const [pincount, setPincount] = useState();
    const [countrylist, setCountrylist] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    // const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })
    // ##################################### Context Api For ModelAlert #########################
    const { tooglevalue, callfun } = useContext(GlobalAlertInfo);
    // ##################################### Context Api For ModelAlert #########################

    useEffect(() => {
        const fetchdata = async () => {
            const country = await TotalCountry()
            setCountrylist(country)
        }
        fetchdata();
    }, [])

    const handleStateMaster = async (e) => {
        e.preventDefault()
        const State = await TotalState(e.target.value)
        setStates(State)
    }
    const handleCityMaster = async (e) => {
        e.preventDefault()
        const city = await TotalCity(e.target.value)
        setCities(city)
    }

    const handleaddinsert = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const company = document.getElementById('company').value;
        const locationcode = document.getElementById('locationcode').value;
        const locationname = document.getElementById('locationname').value;
        const location_id = locationname.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        const address1 = document.getElementById('address1').value;
        const address2 = document.getElementById('address2').value;
        let state = document.getElementById('state');
        state = state.options[state.selectedIndex].text;
        const city = document.getElementById('city').value;
        const pincode = document.getElementById('pincode').value;
        const gstno = document.getElementById('gstno').value;

        const contactpersonname = document.getElementById('contactpersonname').value;
        const email = document.getElementById('email').value;
        const contNum = document.getElementById('contNum').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        const country = document.getElementById('country').value;

        const username = localStorage.getItem('UserId');

        if (!company || !locationcode || !locationname || !address1 || !city || !state || !pincode || !contactpersonname || !email || !contNum) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            // setDatas({ ...datas, message: "Please enter All mandatory fields", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
            callfun('Please enter all mandatory fields!', 'warning', 'self')
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await AddLocationapi(org, location_id, company, locationcode, locationname, address1, address2, city, state,
                pincode, gstno, contactpersonname, email, contNum, latitude, longitude, username, country);

            if (result === 'Added') {
                setLoading(true)
                callfun('Location Updated', 'success', '/TotalLocations')
                // setDatas({ ...datas, message: "Location Added", title: "success", type: "success", route: "/TotalLocations", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Location Already Exist', 'warning', 'self')
                // setDatas({ ...datas, message: "Location Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                setLoading(true)
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddLocation", toggle: "true" })
                // // document.getElementById('snackbar').style.display = "block"
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
                                <h4><span className='page-type-head1'>Locations <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2' >Add Location</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/TotalLocations' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card py-3">
                                <article className="card-body">
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor='company'> Company <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='company' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='locationcode'>Location Code <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='locationcode' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='locationname'>Location Name <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='locationname' />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='address1'>Address Line 1 <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='address1' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='address2'>Address Line 2</label>
                                                <input type="text" className="form-control" id='address2' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='country'>Country <span className='text-danger'>*</span></label>
                                                <select id='country' className="form-select"
                                                    onChange={handleStateMaster}>
                                                    <option value='' hidden>Select...</option>
                                                    {
                                                        countrylist.map((item, index) => (
                                                            <option key={index} value={item.country_id}>{item.country_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='state'>State <span className='text-danger'>*</span></label>
                                                <select id='state' className="form-select"
                                                    onChange={handleCityMaster}>

                                                    <option value='' hidden>Select...</option>
                                                    {
                                                        states.map((item, index) => (
                                                            <option key={index} value={item.state_id}>{item.state_name}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='city'>City <span className='text-danger'>*</span></label>
                                                <select id='city' className="form-select">
                                                    <option value='' hidden>Select...</option>
                                                    {
                                                        cities.map((item, index) => (
                                                            <option key={index} value={item.city_name}>{item.city_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='pincode'>Pincode <span className='text-danger'>*</span></label>
                                                <input type="number" className="form-control" id='pincode'
                                                    value={pincount}
                                                    onChange={(e) => { if (e.target.value.length === 7) return false; else { setPincount(e.target.value) } }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='contactpersonname'>Contact Person Name <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='contactpersonname' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='email'>Contact Email <span className='text-danger'>*</span></label>
                                                <input type="email" className="form-control" id='email' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='contNum'>Contact Number <span className='text-danger'>*</span></label>
                                                <input type="number" className="form-control" id='contNum'
                                                    value={numcount}
                                                    onChange={(e) => { if (e.target.value.length === 11) return false; else { setNumcount(e.target.value) } }}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='gstno'>GST No</label>
                                                <input type="text" className="form-control" id='gstno' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='latitude'>Latitude</label>
                                                <input type="text" className="form-control" id='latitude' />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='longitude'>Longitude</label>
                                                <input type="text" className="form-control" id='longitude' />
                                            </div>

                                        </div>
                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}> Add Location</button>
                                            <button type="reset" className="btn btn-secondary mx-3" >Reset</button>
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

export default AddLocation;