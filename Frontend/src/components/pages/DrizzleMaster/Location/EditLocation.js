import Sidebar from '../../../Sidebar/Sidebar';
import React, { useContext, useEffect, useState } from 'react';
import { GetLocation, UpdateLocation, TotalCountry, TotalState, TotalCity } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import Modal from '../../AlertModal/Modal';
import { GlobalAlertInfo } from '../../../../App';

function EditLocation() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)

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


    // #############################  Test ##############################
     const {callfun,tooglevalue} = useContext(GlobalAlertInfo);

    // const [tooglevalue, setTogglevalue] = useState({
    //     modalshowval: false,
    //     message: "",
    //     theme: "success",
    //     url: "self"
    // });
    // const callfun = (mess, thm, hrf) => {
    //     setTogglevalue({
    //         modalshowval: true,
    //         message: mess,
    //         theme: thm,
    //         url: hrf
    //     });

    //     setInterval(() => {
    //         setTogglevalue({ modalshowval: false });
    //         hrf !== 'self' ? window.location.href = hrf : setTogglevalue({ modalshowval: false });
    //     }, 3000);
    // };

    // ########################### Test ##################################
    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await GetLocation(org, localStorage.getItem('locationsno'))
            setData(result);
            const country = await TotalCountry()
            setCountrylist(country)
            const State = await TotalState(result.location_country)
            setStates(State)
            const city = await TotalCity(result.location_state)
            setCities(city)
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleUpdateLocation = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'
        const org = localStorage.getItem('Database')
        const company = document.getElementById('company').value;
        const locationcode = document.getElementById('locationcode').value;
        const locationname = document.getElementById('locationname').value;
        const address1 = document.getElementById('address1').value;
        const address2 = document.getElementById('address2').value;
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const city = document.getElementById('city').value;
        const pincode = document.getElementById('pincode').value;
        const gstno = document.getElementById('gstno').value;

        const contactpersonname = document.getElementById('contactpersonname').value;
        const email = document.getElementById('email').value;
        const contNum = document.getElementById('contNum').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('locationsno')


        if (!company || !locationcode || !locationname || !address1 || !country || !city || !state || !pincode || !contactpersonname || !email || !contNum) {
            // document.getElementById('subnitbtn').disabled = false
            // setDatas({ ...datas, message: "Please enter all mandatory fields", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter all mandatory fields!', 'warning', 'self')
        }
        else {

            const result = await UpdateLocation(org, sno, company, locationcode, locationname, address1, address2, city, state, pincode, gstno,
                contactpersonname, email, contNum, latitude, longitude, username, country)

            if (result === 'Updated') {
                setLoading(true)
                localStorage.removeItem('locationsno');
                callfun('Data Updated', 'success', '/TotalLocations')
                // setDatas({ ...datas, message: "Location Updated", title: "success", type: "success", route: "/TotalLocations", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Location Already Exist', 'warning', 'self')
                // document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Location Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                setLoading(true)
                document.getElementById('subnitbtn').disabled = false
                callfun('Server Error', 'danger', 'self')
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditLocation", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }
    }

    const handleStateMaster = async (e) => {
        e.preventDefault()
        const State = await TotalState(e.target.value)
        setStates(State)
        setData({ ...data, location_state: '', state_name: '', location_city: '' })
    }

    const handlechangeState = async (e) => {
        const city = await TotalCity(e.target.value)
        setCities(city)
        setData({ ...data, location_city: '' })
    }
    const handlechangePincode = (e) => {
        if (e.target.value.length === 7) return false;
        setData({ ...data, location_pin_code: e.target.value })
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

                        {/* ######################### Sanckbar End ##################################### */}

                        <div className='main_container'>
                            <div className='main-inner-container d-flex justify-content-between  pt-2 pb-3'>
                                <h4><span className='page-type-head1'>Location <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Location</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('locationsno'); window.location.href = '/TotalLocations' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card py-3">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor='company'> Company <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='company' defaultValue={data.company_name} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='locationcode'>Location Code <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='locationcode' defaultValue={data.location_code} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='locationname'>Location Name <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='locationname' defaultValue={data.location_name} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='address1'>Address Line 1 <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='address1' defaultValue={data.location_address_line1} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='address2'>Address Line 2</label>
                                                <input type="text" className="form-control" id='address2' defaultValue={data.location_address_line2} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='country'>Country <span className='text-danger'>*</span></label>
                                                <select className="form-select" id='country' onChange={handleStateMaster}>
                                                    <option value={data.location_country} hidden>{data.country_name}</option>
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
                                                <select className="form-select" id='state' onChange={handlechangeState} >
                                                    <option value={data.location_state} hidden> {data.state_name}</option>
                                                    {
                                                        states.map((item, index) => (
                                                            <option key={index} value={item.state_id}>{item.state_name}</option>
                                                        ))

                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='city'>City <span className='text-danger'>*</span></label>
                                                <select className="form-select" id='city'>
                                                    <option value={data.location_city} hidden> {data.location_city}</option>
                                                    {
                                                        cities.map((item, index) => (
                                                            <option key={index} value={item.city_name}>{item.city_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='pincode'>Pincode <span className='text-danger'>*</span></label>
                                                <input type="number" className="form-control" id='pincode' value={data.location_pin_code} onChange={handlechangePincode} />
                                            </div>

                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='contactpersonname'>Contact Person Name <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='contactpersonname' defaultValue={data.contact_person} />
                                            </div>

                                            <div className="col-md-4" >
                                                <label htmlFor='email'>Contact Email <span className='text-danger'>*</span></label>
                                                <input type="email" className="form-control" id='email' defaultValue={data.contact_person_email} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='contNum'>Contact Number <span className='text-danger'>*</span></label>
                                                <input type="number" className="form-control" id='contNum' defaultValue={data.contact_person_number} />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-4" >
                                                <label htmlFor='gstno'>GST No</label>
                                                <input type="text" className="form-control" id='gstno' defaultValue={data.location_gst} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='latitude'>Latitude</label>
                                                <input type="text" className="form-control" id='latitude' defaultValue={data.location_latitude} />
                                            </div>
                                            <div className="col-md-4" >
                                                <label htmlFor='longitude'>Longitude</label>
                                                <input type="text" className="form-control" id='longitude' defaultValue={data.location_longitude} />
                                            </div>
                                        </div>


                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleUpdateLocation}>Update Location</button>
                                        </div>
                                    </form>
                                </article>
                            </div>
                            <Modal
                                theme={tooglevalue.theme}
                                text={tooglevalue.message}
                                show={tooglevalue.modalshowval}
                                url={tooglevalue.url}
                            />
                        </div>
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}

export default EditLocation;