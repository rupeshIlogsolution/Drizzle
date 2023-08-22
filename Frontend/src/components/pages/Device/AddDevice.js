import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar';
import { ActiveDeviceService, ActiveDevicetype, ActiveDevicegroup, ActiveOperatingSystem, ActiveAgent, Adddevice, ActiveSeries, TotalCount } from '../../../api/index'
import Select from 'react-select';
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../LoadingPage/LoadingPage';


function AddDevice() {
    const [loading, setLoading] = useState(false)
    const [activeservice, setActiveService] = useState([])
    const [activedevicetype, setActiveDeviceType] = useState([])
    const [activedevicegroup, setActiveDevicegroup] = useState([]);
    const [activeOperatingsystem, setActiveOperatingSystem] = useState([])
    const [activeagent, setActiveAgent] = useState([])
    const [selectService, setSelectedService] = useState([]);
    const [deviceid, setDeviceID] = useState()
    const [createdate, setCreatedate] = useState()
    const [resisterdate, setResisterdate] = useState()


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
            const series = await ActiveSeries()
            if (!series) {
                alert('Please add/active  the Series')
            }
            setLoading(true)
            const ser = series.device_id
            const count = await TotalCount('tbl_devices')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement;
            setDeviceID(ser + countnum)
        }
        fetchdata()
        Todaydate()

    }, [])

    const Todaydate = () => {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        setCreatedate(today)
        setResisterdate(today)
    }

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        const devicename = document.getElementById('devicename').value
        const devicetype = document.getElementById('devicetype').value;
        const devicegroup = document.getElementById('devicegroup').value;
        const deviceipaddr = document.getElementById('deviceipaddr').value;
        const devicehost = document.getElementById('devicehost').value;
        const operatingsystem = document.getElementById('operatingsystem').value;
        const createdate = document.getElementById('createdate').value
        const registerdate = document.getElementById('registerdate').value
        const agent = document.getElementById('agent').value
        const remark = document.getElementById('remark').value

        if (!devicename || !devicetype || !devicegroup || !createdate || !registerdate || !agent) {
            alert("Please enter Mandatory field")
            setLoading(true)
        }
        else {
            const arryresult = [];
            selectService.forEach(async (datas) => {
                const deviceservice = datas.value
                const result = await Adddevice(deviceid, devicename, devicetype, devicegroup, deviceipaddr, devicehost, operatingsystem, deviceservice, createdate, registerdate, agent, remark, localStorage.getItem('UserId'))
                arryresult.push(result)
            })
            setTimeout(() => {
                if (arryresult.length > 0) {
                    alert('Device Added')
                    window.location.href = '/TotalDevice'
                }
                else {
                    alert("Server Error");
                    setLoading(true)
                }
            }, 1300)
        }
    }

    let options = activeservice.map((ele) => {
        return { value: ele.device_services, label: ele.device_services };
    })

    const handleChange = (selectedOption) => {
        setSelectedService(selectedOption)
    }

    return (
        <>
            {
                loading ?
                    <Sidebar>
                        <div className='main_container pb-2' >
                            <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h2><span style={{ color: "rgb(123,108,200)" }}>Device</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Device</span> </h2>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalDevice' }} >Back <MdOutlineArrowForward /></button>
                            </div>

                            <div className="contract-div" style={{ width: "90%" }}>
                                <div className="card inner-card">
                                    <header className="card-header" >
                                        <h4 >Add Device</h4>
                                    </header>
                                    <article className="card-body" >
                                        <form className='px-3' autoComplete='off'>
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label>Device ID </label>
                                                    <input type="text" className="form-control" disabled
                                                        defaultValue={deviceid}
                                                    />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>Device Name <span className='text-danger'>*</span> </label>
                                                    <input type="text" className="form-control" id='devicename' />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Type <span className='text-danger'>*</span></label>
                                                    <select id="devicetype" className="form-select col-md-12" >
                                                        <option hidden value="">Choose Type</option>
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
                                                    <label htmlFor='devicegroup'>Device Group <span className='text-danger'>*</span></label>
                                                    <select
                                                        id="devicegroup"
                                                        className="form-select col-md-12">
                                                        <option hidden value="">Choose Group</option>
                                                        {
                                                            activedevicegroup.map((data, index) => (
                                                                <option key={index} value={data.device_group}>{data.device_group}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device IP Address</label>
                                                    <input type="text" className="form-control" id='deviceipaddr' />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Host Master</label>
                                                    <input type="text" className="form-control" id='devicehost' />
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-4" >
                                                    <label htmlFor='operatingsystem'>Operating System</label>
                                                    <select id="operatingsystem" className="form-select col-md-12" >
                                                        <option hidden value="">Choose Operating System</option>
                                                        {
                                                            activeOperatingsystem.map((data, index) => (
                                                                <option key={index} value={data.operating_system}>{data.operating_system}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>

                                                <div className="form-group col-md-4" >
                                                    <label htmlFor='createdate'>Device Creation Date <span className='text-danger'>*</span></label>
                                                    <input type="date" className="form-control" id='createdate' defaultValue={createdate} />
                                                </div>
                                                <div className="form-group col-md-4" >
                                                    <label>Device Registration Date <span className='text-danger'>*</span></label>
                                                    <input type="date" className="form-control" id='registerdate' defaultValue={resisterdate} />
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-6" >
                                                    <label htmlFor='services'>Select Services <span className='text-danger'>*</span></label>
                                                    <Select
                                                        options={options}
                                                        isMulti={true}
                                                        onChange={handleChange}
                                                        id='services'
                                                    />
                                                </div>
                                                <div className="form-group  col-md-6" >
                                                    <label>Agent <span className='text-danger'>*</span></label>
                                                    <select id="agent" className="form-select col-md-12" >
                                                        <option hidden value="">Select Agent</option>
                                                        {
                                                            activeagent.map((data, index) => (
                                                                <option key={index} value={data.agent_name}>{data.agent_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='row mt-3'>
                                                <div className="form-group col-md-6">
                                                    <label>Remarks</label>
                                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" />
                                                </div>
                                            </div>
                                            <div className="form-group mt-3" >
                                                <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleadddevice}>Add Device</button>&nbsp;
                                                <button type="reset" className="btn btn-secondary ">Reset</button>
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

export default AddDevice;