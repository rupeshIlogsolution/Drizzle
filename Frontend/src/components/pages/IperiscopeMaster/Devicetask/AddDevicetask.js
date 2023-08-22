import Sidebar from '../../../Sidebar/Sidebar';
import { AddDevicetaskapi, ActiveSeries, TotalCount } from '../../../../api';
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function AddDevicetask() {
    const [devicetaskid, setDeviceTaskId] = useState()

    useEffect(() => {

        const fetchdata = async () => {
            const series = await ActiveSeries()
            if (!series) {
                alert('Please enter the mandatory field')
            }
            const ser = series.task_id
            const count = await TotalCount('tbl_device_tasks')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement
            setDeviceTaskId(ser + countnum)
        }
        fetchdata()

    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;

        const devicetask = document.getElementById('devicetask').value;
        const devicetaskfreq = document.getElementById('devicetaskfreq').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!devicetask || !devicetaskfreq) {
            alert("Please enter the data")
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const result = await AddDevicetaskapi(devicetaskid, devicetask, devicetaskfreq, remark, username);
            if (result === 'Added') {
                alert("Data Added")
                window.location.href = './TotalDeviceTask'
            }
            else if (result === 'Already') {
                alert('Data already Exist');
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
                        <h2><span style={{ color: "rgb(123,108,200)" }}> Device Task</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add  Device Task</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalDeviceTask' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">

                        <article className="card-body" >
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label htmlFor='devicetaskid'>Device ID </label>
                                    <input type="text" className="form-control" id='devicetaskid' disabled value={devicetaskid} />
                                </div>
                                <div className="form-group mt-2" >
                                    <label htmlFor='devicetask'>Device Task</label>
                                    <input type="text" className="form-control" id='devicetask' />
                                </div>
                                <div className="form-group mt-2" >
                                    <label htmlFor='devicetaskfreq'>Device Task Frequency </label>
                                    <select className="form-select" id='devicetaskfreq'>
                                        <option value='Daily'>Daily</option>
                                        <option value='Weekly'>Weekly</option>
                                        <option value='Monthly'>Monthly</option>
                                        <option value='Quaterly'>Quaterly</option>
                                        <option value='Yearly'>Yearly</option>
                                    </select>
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" />
                                </div>
                                <div className="form-group mt-3" >
                                    <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleadddevice}>Submit</button>&nbsp;
                                    <button type="reset" className="btn btn-secondary">Reset</button>

                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default AddDevicetask;