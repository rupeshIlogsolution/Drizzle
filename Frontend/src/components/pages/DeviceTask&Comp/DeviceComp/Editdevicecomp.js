import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import { getdevicetaskcomp } from '../../../../api'
import { ActiveServiceCompliance, Updatedevicetaskcomp } from '../../../../api/index'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';

function EditDeviceComp() {
    // const [device,setDevice]=useState([]);
    // const [services,setServices]= useState([]);
    // const [compliances,setCompliances]= useState([]);
    // const [task,setTask]= useState([]);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)

    const [activecompliance, setActiveCompliance] = useState([]);


    useEffect(() => {
        const fetch = async () => {
            const getdata = await getdevicetaskcomp(localStorage.getItem('devicecompSno'))
            setData(getdata);

            // const devicename = await Activedevice()
            // setActiveDeviceName(devicename)
            // console.log(devicename)
            // const result = await ActiveDeviceService()
            // setActiveService(result)
            const compliance = await ActiveServiceCompliance()
            setActiveCompliance(compliance)
            setLoading(true)
        }
        fetch()
    }, [])


    const handlechangeremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)

        const devicename = document.getElementById('devicename').value;
        const services = document.getElementById('services').value;
        const compliances = document.getElementById('compliances').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');
        const sno = localStorage.getItem('devicecompSno')

        if (!devicename || !services || !compliances.length) {
            alert("All field are mandatory...")
            setLoading(true)

        }
        else {
            const result = await Updatedevicetaskcomp(sno, devicename, services, compliances, remark, username);
            if (result === 'Updated') {
                alert("Data Updated");
                localStorage.removeItem('devicecompSno');
                window.location.href = './TotalDeviceComp'
            }
            else {
                alert("Server Error");
                setLoading(true)
            }
        }

    }


    return (
        <>
         {
                loading ?
            <Sidebar>
                <div className='main_container pb-3' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Compliances</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Device Compliances</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => {localStorage.removeItem('devicecompSno'); window.location.href = '/TotalDeviceComp' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >
                        <header className="card-header" >
                            <h4 className=" mt-2 text-center" >Edit Device Compliance</h4>
                        </header>
                        <article className="card-body" >
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label htmlFor='devicename'>Device Name <span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" disabled value={data.device_name} id="devicename" />
                                </div>

                                <div className="form-group mt-3" >
                                    <label htmlFor='services'>Select Services <span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" disabled value={data.services} id="services" />

                                </div>
                                <div className="form-group mt-3" >
                                    <label htmlFor='compliances'> Compliance <span className='text-danger'>*</span></label>
                                    <select
                                        id="compliances"
                                        className="form-select col-md-12"
                                    >
                                        <option value={data.add_compliance} hidden >{data.add_compliance}</option>
                                        {
                                            activecompliance.map((data, index) => (
                                                <option key={index} value={data.services_compliance}>{data.services_compliance}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor='remark'>Remarks</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" value={data.remark} onChange={handlechangeremark} />
                                </div>
                                <div className="form-group mt-3" >
                                    <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleadddevice}>Update</button>
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

export default EditDeviceComp;