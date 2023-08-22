import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { Getseries, Updateseries } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function Editseries() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const result = await Getseries(localStorage.getItem('seriessno'))
            console.log(result)
            setData(result);
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        const type_id = document.getElementById('typeid').value;
        const services_id = document.getElementById('seriesid').value;
        const task_id = document.getElementById('taskid').value;
        const agent_id = document.getElementById('agentid').value;
        const group_id = document.getElementById('groupid').value;
        const os_id = document.getElementById('osid').value;
        const comp_id = document.getElementById('compid').value;
        const device_id = document.getElementById('deviceid').value;
        const taskandcomp_id = document.getElementById('taskcompid').value;
        const username = localStorage.getItem('UserName');
        const sno = localStorage.getItem('seriessno')

        const result = await Updateseries(sno, type_id, services_id, task_id, agent_id, group_id, os_id, comp_id, device_id, taskandcomp_id, username);

        if (result === 'Updated') {
            alert('Data Updated')
            localStorage.removeItem('seriessno');
            window.location.href = './Totalseries'
        }
        else {
            alert("Server Error");
        }

    }


    const handlechangetypeid = (e) => {
        setData({ ...data, type_id: e.target.value })
    }
    const handlechangeseriesid = (e) => {
        setData({ ...data, services_id: e.target.value })
    }
    const handlechangetaskid = (e) => {
        setData({ ...data, task_id: e.target.value })
    }
    const handlechangeagentid = (e) => {
        setData({ ...data, agent_id: e.target.value })
    }
    const handlechangegroupid = (e) => {
        setData({ ...data, group_id: e.target.value })
    }

    const handlechangeosid = (e) => {
        setData({ ...data, os_id: e.target.value })
    }
    const handlechangecompid = (e) => {
        setData({ ...data, comp_id: e.target.value })
    }
    const handlechangedeviceid = (e) => {
        setData({ ...data, device_id: e.target.value })
    }
    const handlechangetaskandcompid = (e) => {
        setData({ ...data, taskandcomp_id: e.target.value })
    }


    return (
        <>
            <Sidebar >
                <div className='main_container pb-2'>
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Series</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Series</span> </h2>
                        <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/Totalseries' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >

                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor='typeid'> Type ID </label>
                                        <input type="text" className="form-control" id='typeid' value={data.type_id} onChange={handlechangetypeid} />
                                    </div>
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='seriesid'> Service ID </label>
                                        <input type="text" className="form-control" id='seriesid' value={data.services_id} onChange={handlechangeseriesid} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='taskid'>Task ID</label>
                                        <input type="text" className="form-control" id='taskid' value={data.task_id} onChange={handlechangetaskid} />
                                    </div>
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='agentid'>Agent ID</label>
                                        <input type="text" className="form-control" id='agentid' max={10} value={data.agent_id} onChange={handlechangeagentid} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='groupid'>Group ID</label>
                                        <input type="text" className="form-control" id='groupid' value={data.group_id} onChange={handlechangegroupid} />
                                    </div>
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='osid'>OS ID</label>
                                        <input type="text" className="form-control" id='osid' max={10} value={data.os_id} onChange={handlechangeosid} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='compid'>Compliance ID</label>
                                        <input type="text" className="form-control" id='compid' value={data.comp_id} onChange={handlechangecompid} />
                                    </div>
                                    <div className="form-group col-md-6" >
                                        <label htmlFor='deviceid'>Device ID</label>
                                        <input type="text" className="form-control" id='deviceid' max={10} value={data.device_id} onChange={handlechangedeviceid} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label htmlFor='taskcompid'>Task & Compliance ID</label>
                                    <input type="text" className="form-control" id='taskcompid' value={data.taskandcomp_id} onChange={handlechangetaskandcompid} />
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

export default Editseries;