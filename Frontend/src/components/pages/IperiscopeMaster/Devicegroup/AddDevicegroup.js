import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Adddevicegroup, ActiveSeries, TotalCount } from '../../../../api'

function AddDevicegroup() {
    const [agentgroupid, setAgentGroupID] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const series = await ActiveSeries()
            if (!series) {
                alert('Please add/active  the Series')
            }
            const ser = series.group_id
            const count = await TotalCount('tbl_device_group')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement;
            setAgentGroupID(ser + countnum)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const devicegroup = document.getElementById('devicegroup').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!devicegroup) {
            alert('Please enter the mandatory field')
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const result = await Adddevicegroup(agentgroupid, devicegroup, remark, username);
            if (result === 'Added') {
                alert('Data Added')
                window.location.href = 'Showdevicegroup'
            }
            else if (result === 'Already') {
                alert('Device Group already Exist');
            }
            else {
                document.getElementById('subnitbtn').disabled = false;

                alert("Server Error");
            }
        }
    }
    return (
        <>
            <Sidebar>
                <div className='main_container pb-2' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Group</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Device Group</span> </h2>
                        <button className='btn btn-secondary btn btn-sm' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/Showdevicegroup' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">

                        <article className="card-body" >
                            <form  className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='devicegroupid'>Device ID </label>
                                    <input type="text" className="form-control" id='devicegroupid' disabled value={agentgroupid} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='devicegroup'>Device Group</label>
                                    <input type="text" className="form-control" id='devicegroup' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" />
                                </div>
                                <div className="form-group" >
                                    <button type="submit" className="btn btn-voilet float-right mb-4 mt-3 " id="subnitbtn" onClick={handleadddevice}>Submit</button>
                                    <button type="reset" className="btn btn-secondary mr-4 float-right mb-4 mx-2 mt-3">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default AddDevicegroup;