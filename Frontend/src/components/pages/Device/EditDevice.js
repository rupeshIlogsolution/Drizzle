import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import { ActiveDeviceService, ActiveDevicetype, ActiveDevicegroup, ActiveOperatingSystem, ActiveAgent, Adddevice, ActiveSeries, TotalCount, Getdevice, Updatedevice } from '../../../api/index'
import Select from 'react-select';
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../LoadingPage/LoadingPage';


function EditDevice() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)

    const [activeservice, setActiveService] = useState([])
    const [activedevicetype, setActiveDeviceType] = useState([])
    const [activedevicegroup, setActiveDevicegroup] = useState([]);
    const [activeOperatingsystem, setActiveOperatingSystem] = useState([])
    const [activeagent, setActiveAgent] = useState([])

    // const [selectService, setSelectedService] = useState([]);

    // const [deviceid, setDeviceID] = useState()


    useEffect(() => {
        const fetchdata = async () => {
            const result = await ActiveDeviceService()
            setActiveService(result)
            const DeviceType = await ActiveDevicetype()
            setActiveDeviceType(DeviceType)
            const Activedevicegroup = await ActiveDevicegroup()
            setActiveDevicegroup(Activedevicegroup)
            const Operatingsystem = await ActiveOperatingSystem()
            setActiveOperatingSystem(Operatingsystem)
            const Agent = await ActiveAgent()
            setActiveAgent(Agent)

            const getdata = await Getdevice(localStorage.getItem('deviceSno'))
            setData(getdata);
            setLoading(true)

            // const series = await ActiveSeries()
            // if(!series){
            //     alert('Active Series')
            // }
            // const ser = series.device_id
            // const count = await TotalCount('tbl_devices')
            // let countincrement = count.count+1;
            // let countnum = ''+countincrement;
            // setDeviceID(ser+countnum)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)

        const sno = localStorage.getItem('deviceSno');
        const deviceid = document.getElementById('deviceid').value;
        const devicename = document.getElementById('devicename').value
        const devicetype = document.getElementById('devicetype').value;
        const devicegroup = document.getElementById('devicegroup').value;
        const deviceipaddr = document.getElementById('deviceipaddr').value;
        const devicehost = document.getElementById('devicehost').value;
        const operatingsystem = document.getElementById('operatingsystem').value;
        const services = document.getElementById('deviceservice').value;
        const createdate = document.getElementById('createdate').value
        const registerdate = document.getElementById('registerdate').value
        const agent = document.getElementById('agent').value
        const remark = document.getElementById('remark').value
        const username = localStorage.getItem('UserName')

        if (!devicename || !devicetype || !devicegroup || !createdate || !registerdate || !agent) {
            alert("Please enter Mandatory field")
            setLoading(true)
        }
        else {
            const result = await Updatedevice(sno, deviceid, devicename, devicetype, devicegroup, deviceipaddr, devicehost, operatingsystem, services, createdate, registerdate, agent, remark, username)
            if (result === 'Updated') {
                alert('Device Updated')
                localStorage.removeItem('deviceSno');
                window.location.href = '/TotalDevice'
            }
            else {
                alert("Server not response...")
                setLoading(true)

            }
        }


    }


    const handlechangedevicename = (e) => {
        e.preventDefault();
        setData({ device_name: e.target.value })
    }
    const handlechangeipadd = (e) => {
        e.preventDefault();
        setData({ device_ip_address: e.target.value })
    }
    const handlechangehost = (e) => {
        e.preventDefault();
        setData({ device_host_master: e.target.value })
    }
    const handlechangeremark = (e) => {
        e.preventDefault();
        setData({ remark: e.target.value })
    }
    // let options = activeservice.map((ele) => {
    //     return { value: ele.device_services, label: ele.device_services };
    // })

    // const handleChange = (selectedOption) => {
    //     setSelectedService(selectedOption)
    // }

    return (
        <>
            {
                loading ?
                    <Sidebar>
                        <div className='main_container' >
                            <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h2><span style={{ color: "rgb(123,108,200)" }}>Device</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Device</span> </h2>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('deviceSno'); window.location.href = '/TotalDevice' }} >Back <MdOutlineArrowForward /></button>
                            </div>

                            <div className="contract-div" style={{ width: "90%" }}>
                                <div className="card inner-card">
                                    <header className="card-header" >
                                        <h4 >Edit Device</h4>
                                    </header>
                                    <article className="card-body" >
                                        <form className='px-3' autoComplete='off'>
                                            <div className='row '>
                                                <div className="form-group col-md-4">
                                                    <label>Device ID </label>
                                                    <input type="text" id="deviceid" className="form-control" disabled value={data.device_id} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Device Name </label>
                                                    <input type="text" className="form-control" id='devicename' value={data.device_name} onChange={handlechangedevicename} />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label htmlFor='devicetype'>Device Type</label>
                                                    <select id="devicetype" className="form-control col-md-12" >
                                                        <option value={data.device_type} hidden>{data.device_type}</option>

                                                        {
                                                            activedevicetype.map((data, index) => (
                                                                <option key={index} value={data.device_type}>{data.device_type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-4" >
                                                    <label htmlFor='devicegroup'>Device Group</label>
                                                    <select
                                                        id="devicegroup"
                                                        className="form-control col-md-12" >
                                                        <option value={data.device_group} hidden >{data.device_group}</option>
                                                        {
                                                            activedevicegroup.map((data, index) => (
                                                                <option key={index} value={data.device_group}>{data.device_group}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>

                                                <div className="form-group col-md-4" >
                                                    <label>Device IP Address</label>
                                                    <input type="text" className="form-control" id='deviceipaddr' value={data.device_ip_address} onChange={handlechangeipadd} />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Host Master</label>
                                                    <input type="text" className="form-control" id='devicehost' value={data.device_host_master} onChange={handlechangehost} />
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-4" >
                                                    <label htmlFor='operatingsystem'>Operating System</label>
                                                    <select id="operatingsystem" className="form-control col-md-12" >
                                                        <option value={data.device_os} hidden >{data.device_os}</option>
                                                        {
                                                            activeOperatingsystem.map((data, index) => (
                                                                <option key={index} value={data.operating_system}>{data.operating_system}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Creation Date</label>
                                                    <input type="date" className="form-control" id='createdate' defaultValue={data.device_creation_date} />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Registration Date</label>
                                                    <input type="date" className="form-control" id='registerdate' defaultValue={data.device_reg_date} />
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-5" >
                                                    <label>Select Services</label>
                                                    <select id="deviceservice" className="form-select col-md-12" >
                                                        <option value={data.services} hidden >{data.services}</option>
                                                        {
                                                            activeservice.map((data, index) => (
                                                                <option key={index} value={data.device_services}>{data.device_services}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-5" >
                                                    <label htmlFor='agent'>Agent</label>
                                                    <select id="agent" className="form-control col-md-12" >
                                                        <option value={data.agent} hidden >{data.agent}</option>
                                                        {
                                                            activeagent.map((data, index) => (
                                                                <option key={index} value={data.agent_name}>{data.agent_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group mt-3 col-md-6">
                                                <label htmlFor='remark'>Remarks</label>
                                                <textarea className="form-control" placeholder="Comments" id='remark' rows="3" value={data.remark} onChange={handlechangeremark} />
                                            </div>

                                            <div className="form-group mt-3" >
                                                <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleadddevice}>Update</button>
                                            </div>
                                        </form>
                                    </article>
                                </div>
                            </div>



                        </div>
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}

export default EditDevice;