import { Addservicecompliance, ActiveDeviceService, ActiveSeries, TotalCount } from '../../../../api'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'


function AddServiceCompliance() {
    const [deviceservice, setDeviceService] = useState([])
    const [complianceid, setComplianceID] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveDeviceService()
            setDeviceService(result)

            const series = await ActiveSeries()
            if (!series) {
                alert('Please add/active  the Series')
            }
            const ser = series.agent_id
            const count = await TotalCount('tbl_agent_master')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement;
            setComplianceID(ser + countnum)
        }
        fetchdata();
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const DeviceService = document.getElementById('DeviceService').value
        const ServiceCompliance = document.getElementById('servicecompliance').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!DeviceService || !ServiceCompliance) {
            alert("Please enter Mandatory field")
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const result = await Addservicecompliance(complianceid, DeviceService, ServiceCompliance, remark, username);
            if (result === 'Added') {
                alert("Added")
                window.location.href = '/TotalServicecompliance'
            }
            else if (result === 'Already') {
                alert('This Device Type already Exist');
                document.getElementById('subnitbtn').disabled = false;

            }
            else {
                alert("Server Error");
                document.getElementById('subnitbtn').disabled = false;

            }
        }
    }
    return (
        <>
            <Sidebar>
                <div className='main_container' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Service Compliance</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Service Compliance</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalServicecompliance' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >

                        <article className="card-body" >
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label>Service Compliance ID </label>
                                    <input type="text" className="form-control" disabled value={complianceid} />
                                </div>
                                <div className="form-group " >
                                    <label>Device Service <span style={{ color: "red" }}>*</span></label>
                                    <select
                                        id="DeviceService"
                                        className="form-select ">
                                        <option hidden value="">Choose Service</option>
                                        {
                                            deviceservice.map((data, index) => (
                                                <option key={index} value={data.device_services}>{data.device_services}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group " >
                                    <label> Service Compliance<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" id='servicecompliance' />
                                </div>
                                <div className="form-group">
                                    <label>Remarks</label>
                                    <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" />
                                </div>
                                <div className="form-group" >
                                    <button type="submit" className="btn btn-voilet float-right mb-4 mt-3" id="subnitbtn" onClick={handleadddevice}>Submit</button> &nbsp;
                                    <button type="reset" className="btn btn-secondary mr-4 float-right mb-4 mt-3">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default AddServiceCompliance;