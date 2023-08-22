import { useEffect, useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import { Getdevicegroup, Updatedevicegroup } from '../../../../api'
import {MdOutlineArrowForward,MdOutlineKeyboardArrowRight} from 'react-icons/md'

function EditDevicegroup() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const getdata = await Getdevicegroup(localStorage.getItem('devicegroupSno'));
            setData(getdata)
        }
        fetchdata();
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const deviceid = document.getElementById('deviceid').value;
        const devicegroup = document.getElementById('devicegroup').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');
        
        if (!devicegroup) {
            alert("Please enter the mandatory field")
        }
        else {
            const result = await Updatedevicegroup(localStorage.getItem('devicegroupSno'), deviceid, devicegroup, remark, username);
            if (result) {
                alert('Updated')
                localStorage.removeItem('devicegroupSno');
                window.location.href = 'Showdevicegroup'
            }
            else {
                alert("Server Error");
            }
        }

    }

    const handleChangeID = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handleChangeDeviceGroup = (e) => {
        setData({ ...data, device_group: e.target.value })
    }

    const handleChangeRemark = (e) => {
        setData({ ...data, remark: e.target.value })

    }
    return (
        <>
            <Sidebar>
            <div className='main_container pb-2' >
            <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{color:"rgb(123,108,200)"}}>Device Group</span> <MdOutlineKeyboardArrowRight/><span style={{fontSize:"25px"}}>Edit Device Group</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('devicegroupSno'); window.location.href = '/Showdevicegroup'}} >Back <MdOutlineArrowForward/></button>
                    </div>
                        <div className="card card-div">
                            <article className="card-body" >
                                <form className='px-3' autoComplete='off'>
                                    <div className="form-group">
                                        <label htmlFor='deviceid'>Device ID </label>
                                        <input type="text" className="form-control" disabled value={data.id} id='deviceid' onChange={(e) => handleChangeID(e)} />
                                    </div>
                                    <div className="form-group " >
                                        <label htmlFor='devicegroup'>Device Group </label>
                                        <input type="text" className="form-control" value={data.device_group} id='devicegroup' onChange={(e) => handleChangeDeviceGroup(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor='remark'>Remarks (Optional)</label>
                                        <textarea className="form-control" placeholder="Comments" value={data.remark} type="text" id='remark' rows="3" onChange={(e) => handleChangeRemark(e)} />
                                    </div>
                                    <div className="form-group" >
                                        <button type="button" className="btn btn-primary float-right mb-4 mt-3" id="subnitbtn" onClick={handleadddevice}>Update</button>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
            </Sidebar>
        </>
    )
}

export default EditDevicegroup;