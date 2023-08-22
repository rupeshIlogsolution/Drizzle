import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import { ActiveDeviceService, Activedevicetask, Activedevice, Adddevicetaskby, GetDevicestask, GetDevicetaskfrequency, UpdateDevicetaskes } from '../../../../api/index'
import Select from 'react-select';
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';

function EditDeviceServiceTask() {
    const [loading, setLoading] = useState(false)

    // const [activeservice, setActiveService] = useState([])
    const [activedevicetask, setActiveDeviceTask] = useState([]);
    const [activedevicename, setActiveDeviceName] = useState([]);
    const [data, setData] = useState({});
    const [freq, setFreq] = useState();

    const [task, setTaskask] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const devicename = await Activedevice()
            setActiveDeviceName(devicename)
            // const result = await ActiveDeviceService()
            // setActiveService(result)
            const task = await Activedevicetask()
            setActiveDeviceTask(task)

            const gettask = await GetDevicestask(localStorage.getItem('devicetaskmSno'))
            console.log(gettask)
            setData(gettask)
            setFreq(gettask.task_frequency)
            setLoading(true)

        }
        fetch()

    }, [])



    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)

        const devicename = document.getElementById('devicename').value;
        const services = document.getElementById('services').value;
        const task = document.getElementById('devicetask').value;
        const Frequency = document.getElementById('devicetaskfreq').value;
        const completion_date = document.getElementById('completion_date').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');
        const sno = localStorage.getItem('devicetaskmSno');

        if (!devicename || !services || !task.length || !completion_date) {
            alert("Please enter Mandatory field")
            setLoading(true)

        }
        else {
            const updatedata = await UpdateDevicetaskes(sno, devicename, services, task, Frequency, completion_date, remark, username)
            if (updatedata === 'Updated') {
                alert("Data Updated ");
                localStorage.removeItem('devicetaskmSno');
                window.location.href = '/TotalDeviceServiceTask'
            }
            else {
                alert("Server not Response...")
                setLoading(true)

            }
        }

    }

    // let options = activedevicetask.map((ele) => {
    //     return { value: ele.device_tasks, label: ele.device_tasks };
    // })



    // const handleChange = (selectedOption) => {
    //     console.log(selectedOption)
    //     setTaskask(selectedOption)
    // }

    const hangelgetfreq = async (e) => {
        const frequency = await GetDevicetaskfrequency(e.target.value)
        setFreq(frequency);
    }
    const handlechangeremark = (e) => {
        setData({ remark: e.target.value })
    }

    const handelchangedate = (e) => {
        setData({ completion_date: e.target.value })
    }
    return (
        <>
            {
                loading ?
                    <Sidebar>
                        <div className='main_container pb-2' >
                            <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h2><span style={{ color: "rgb(123,108,200)" }}>Device Task</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Device Task</span> </h2>
                                <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('devicetaskmSno'); window.location.href = '/TotalDeviceServiceTask' }} >Back <MdOutlineArrowForward /></button>
                            </div>
                            <div className="contract-div" style={{ width: "90%" }} >
                            <div className="card inner-card">
                                    <header className="card-header" >
                                        <h5 >Edit Device Task</h5>
                                    </header>
                                <article className="card-body " >
                                    <form style={{ margin: "0px 20px 0px 15px" }}>
                                    <div className="row">
                                                <div className="form-group col-md-6">
                                            <label htmlFor='devicename'>Device Name </label>
                                            <input className="form-control" type="text" id='devicename' disabled value={data.device_name} />
                                            {/* <select
                                            id="devicename"
                                            className="form-control col-md-12"
                                            disabled
                                        >
                                            <option selected hidden >{data.device_name}</option>
                                            {
                                                activedevicename.map((data, index) => (
                                                    <option key={index} value={data.device_name}>{data.device_name}</option>
                                                ))
                                            }
                                        </select> */}
                                        </div>
                                       
                                        <div className="form-group col-md-6" >
                                            <label htmlFor='services'>Select Services </label>
                                            <input className="form-control" type="text" id='services' disabled value={data.services} />
                                            {/* <select
                                            id="services"
                                            className="form-control col-md-12"
                                            disabled
                                        >
                                            <option selected hidden >{data.services}</option>
                                            {
                                                activeservice.map((data, index) => (
                                                    <option key={index} value={data.device_services}>{data.device_services}</option>
                                                ))
                                            }
                                        </select> */}
                                        </div> 
                                        </div>
                                        <div className="row mt-3">
                                                <div className="form-group col-md-6" >
                                            <label htmlFor='devicetask'> Task</label>

                                            <select
                                                id="devicetask"
                                                className="form-select"
                                                onChange={hangelgetfreq}
                                            >
                                                <option value={data.task} hidden >{data.task}</option>
                                                {
                                                    activedevicetask.map((data, index) => (
                                                        <option key={index} value={data.device_tasks}>{data.device_tasks}</option>
                                                    ))
                                                }
                                            </select>
                                            {/* <Select
                                            options={options}
                                            isMulti={false}
                                            placeholder={data.task}
                                            onChange={handleChange}
                                        /> */}

                                        </div>
                                        <div className="form-group col-md-6" >
                                            <label htmlFor='devicetaskfreq'> Task Frequency</label>
                                            <input className="form-control" type="text" id='devicetaskfreq' disabled value={freq} />
                                        </div>
                                        </div>
                                        <div className="form-group mt-2 col-md-6">
                                            <label htmlFor='completion_date'>Completion Date</label>
                                            <input className="form-control" type="date" id='completion_date' value={data.completion_date} onChange={handelchangedate} />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor='remark'>Remarks</label>
                                            <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" value={data.remark} onChange={handlechangeremark} />
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

export default EditDeviceServiceTask;