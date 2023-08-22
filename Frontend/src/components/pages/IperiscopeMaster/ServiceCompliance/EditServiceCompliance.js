import Sidebar from '../../../Sidebar/Sidebar';
import { GetServiceCompliance, ActiveDeviceService, Updateservicecompliance } from '../../../../api'
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function EditServiceCompliance() {
    const [deviceservice, setDeviceService] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveDeviceService()
            setDeviceService(result)
            const result1 = await GetServiceCompliance(localStorage.getItem('ServiceComplianceSno'))
            setData(result1)
        }
        fetchdata();
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const servicecomplianceid = document.getElementById('servicecomplianceid').value;
        const DeviceService = document.getElementById('DeviceService').value
        const ServiceCompliance = document.getElementById('servicecompliance').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!DeviceService || !ServiceCompliance) {
            alert('Please enter mandatory field')
            document.getElementById('subnitbtn').disabled = false;

        }
        else {

            const result = await Updateservicecompliance(localStorage.getItem('ServiceComplianceSno'), servicecomplianceid, DeviceService, ServiceCompliance, remark, username);
            if (result==='Updated') {
                alert("Data Update")
                localStorage.removeItem('ServiceComplianceSno');
                window.location.href = '/TotalServicecompliance'
            }
            else {
                alert('Server not response')
                document.getElementById('subnitbtn').disabled = false;

            }
        }
    }
    const handleChangeid = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handleServiceCompliance = (e) => {
        setData({ ...data, services_compliance: e.target.value })

    }
    const handleChangeremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }
    return (
        <>
            <Sidebar>
                <div className='main_container' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Service Compliance</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Service Compliance</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('ServiceComplianceSno'); window.location.href = '/TotalServicecompliance' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >

                        <article className="card-body" >
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label>Service Compliance ID </label>
                                    <input type="text" className="form-control" disabled value={data.id} id='servicecomplianceid' onChange={handleChangeid} />
                                </div>
                                <div className="form-group " >
                                    <label>Device Service</label>

                                    <select
                                        id="DeviceService"
                                        className="form-select col-md-12">
                                        <option hidden value={data.device_services}>{data.device_services}</option>
                                        {
                                            deviceservice.map((data, index) => (
                                                <option key={index} value={data.device_services}>{data.device_services}</option>
                                            ))

                                        }
                                    </select>
                                </div>
                                <div className="form-group " >
                                    <label> Service Compliance</label>
                                    <input type="text" className="form-control" id='servicecompliance' value={data.services_compliance} onChange={handleServiceCompliance} />
                                </div>
                                <div className="form-group">
                                    <label>Remarks</label>
                                    <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" onChange={handleChangeremark} value={data.remark} />
                                </div>
                                <div className="form-group" >
                                    <button type="submit" className="btn btn-voilet float-right mb-4 mt-3" id="subnitbtn" onClick={handleadddevice}>Update</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default EditServiceCompliance;