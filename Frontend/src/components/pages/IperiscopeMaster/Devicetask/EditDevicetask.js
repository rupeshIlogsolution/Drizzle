import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { Getdevicetask, Updatedevicetask } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function EditDevicetask() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const snodata = localStorage.getItem('devicetaskSno');
            const getdata = await Getdevicetask(snodata);
            setData(getdata)
        }
        fetchdata();
    }, [])


    const handlechangedeviceid = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handlechangedevicetask = (e) => {
        setData({ ...data, device_tasks: e.target.value })
    }
    const handlechangedevicetaskfreq = (e) => {
        setData({ ...data, device_tasks_frequency: e.target.value })
    }

    const handlechangedeviceremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }

    const handlesubmitdata = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const sno = localStorage.getItem('devicetaskSno');
        const devicetypeid = document.getElementById('deviceid').value;
        const device_task = document.getElementById('devicetask').value;
        const devicetaskfreq = document.getElementById('devicetaskfreq').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!device_task || !devicetaskfreq) {
            alert("Please enter the data")
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const updataresult = await Updatedevicetask(sno, devicetypeid, device_task, devicetaskfreq, remark, username);
            if (updataresult === 'Updated') {
                alert("Data updated")
                localStorage.removeItem('devicetaskSno');
                window.location.href = './TotalDeviceTask';
            }
            else {
                alert("Server not response ...")
                document.getElementById('subnitbtn').disabled = false;
            }
        }
    }
    return (
        <>
            <Sidebar>
                <div className='main_container' >
                <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}> Device Task</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit  Device Task</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('devicetaskSno');window.location.href = '/TotalDeviceTask' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >
                      
                        <article className="card-body" >
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label htmlFor='deviceid'>Device ID </label>
                                    <input type="text" className="form-control" id='deviceid' disabled value={data.id} onChange={handlechangedeviceid} />
                                </div>
                                <div className="form-group mt-2" >
                                    <label htmlFor='devicetask'>Device Task </label>
                                    <input type="text" className="form-control" id='devicetask' value={data.device_tasks} onChange={handlechangedevicetask} />
                                </div>
                                <div className="form-group mt-2" >
                                    <label htmlFor='devicetaskfreq'>Device Task Frequency</label>
                                    <input type="text" className="form-control" id='devicetaskfreq' value={data.device_tasks_frequency} onChange={handlechangedevicetaskfreq} />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" value={data.remark} onChange={handlechangedeviceremark} />
                                </div>
                                <div className="form-group mt-3" >
                                    <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handlesubmitdata}>Update</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default EditDevicetask;