import Sidebar from '../../../Sidebar/Sidebar';
import React from 'react';
import { Addseriesapi } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'


function Addseries() {

    const handleaddinsert = async (e) => {
        e.preventDefault();
        const typeid = document.getElementById('typeid').value;
        const seriesid = document.getElementById('seriesid').value;
        const taskid = document.getElementById('taskid').value;
        const agentid = document.getElementById('agentid').value;
        const groupid = document.getElementById('groupid').value;
        const osid = document.getElementById('osid').value;
        const compid = document.getElementById('compid').value;
        const deviceid = document.getElementById('deviceid').value;
        const taskcompid = document.getElementById('taskcompid').value;
        const username = localStorage.getItem('UserName');

        if (!typeid || !seriesid || !taskid || !agentid || !groupid || !osid || !compid || !deviceid || !taskcompid) {
            alert("All field are mandatory...")
        }
        else {
            const result = await Addseriesapi(typeid, seriesid, taskid, agentid, groupid, osid, compid, deviceid, taskcompid, username);
            if (result === 'Added') {
                alert('Data Added ')
                window.location.href = './Totalseries'
            }
            else {
                alert("Server Error");
            }
        }

    }
    return (
        <>
            <Sidebar >
                <div className='main_container pb-2' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Series</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Series</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/Totalseries' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">
                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor='typeid'>Device Type ID </label>
                                        <input type="text" className="form-control" id='typeid' />
                                    </div>
                                    <div className="col-md-6" >
                                        <label htmlFor='seriesid'>Device Services ID </label>
                                        <input type="text" className="form-control" id='seriesid' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" >
                                        <label htmlFor='taskid'>Device Task ID</label>
                                        <input type="text" className="form-control" id='taskid' />
                                    </div>
                                    <div className="col-md-6" >
                                        <label htmlFor='agentid'>Agent ID</label>
                                        <input type="text" className="form-control" id='agentid' max={10} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6" >
                                        <label htmlFor='groupid'>Group ID</label>
                                        <input type="text" className="form-control" id='groupid' />
                                    </div>
                                    <div className="col-md-6" >
                                        <label htmlFor='osid'>OS ID</label>
                                        <input type="text" className="form-control" id='osid' max={10} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4" >
                                        <label htmlFor='compid'>Compliance ID</label>
                                        <input type="text" className="form-control" id='compid' />
                                    </div>
                                    <div className="col-md-4" >
                                        <label htmlFor='deviceid'>Device ID</label>
                                        <input type="text" className="form-control" id='deviceid' max={10} />
                                    </div>
                                    <div className="col-md-4" >
                                        <label htmlFor='taskcompid'>Task & Compliance ID</label>
                                        <input type="text" className="form-control" id='taskcompid' />
                                    </div>
                                </div>


                                <div className="form-group" >
                                    <button type="submit" className="btn btn-voilet float-right mb-4 mt-3" id="subnitbtn" onClick={handleaddinsert}>Submit</button>
                                    <button type="reset" className="btn btn-secondary ml-2 mb-4 mt-3" style={{ margin: "0px 10px 0px 10px" }}>Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default Addseries;