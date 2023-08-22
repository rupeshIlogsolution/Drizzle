import Sidebar from '../../../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Getdevicetype, Updatedevicetype } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function EditDevicetype() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const snodata = localStorage.getItem('devicetypeSno');
            const getdata = await Getdevicetype(snodata);
            setData(getdata)
        }
        fetchdata();
    }, [])


    const handlechangedeviceid = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handlechangedevicetype = (e) => {
        setData({ ...data, device_type: e.target.value })
    }
    const handlechangedeviceremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }

    const handlesubmitdata = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const sno = localStorage.getItem('devicetypeSno');
        const devicetypeid = document.getElementById('deviceid').value;
        const device_type = document.getElementById('devicetype').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!device_type) {
            alert("Please enter Mandatory field")
        }
        else {
            const updataresult = await Updatedevicetype(sno, devicetypeid, device_type, remark, username);
            if (updataresult === 'Updated') {
                alert("Data updated")
                localStorage.removeItem('devicetypeSno');
                window.location.href = './TotalDeviceType';
            }
            else {
                alert("Server Error");
            }
        }
    }
    return (
        <>
            <Sidebar>
                <div className='main_container pb-2'  >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Type</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Device Type</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('seriessno'); window.location.href = '/TotalDeviceType' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">
                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='deviceid'>Device ID </label>
                                    <input type="text" className="form-control" disabled id='deviceid' value={data.id} onChange={handlechangedeviceid} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='devicetype'>Device Type </label>
                                    <input type="text" className="form-control" id='devicetype' value={data.device_type} onChange={handlechangedevicetype} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" value={data.remark} onChange={handlechangedeviceremark} />
                                </div>
                                <div className="form-group" >
                                    <button type="submit" className="btn btn-voilet float-right mb-4 mt-3" id="subnitbtn" onClick={handlesubmitdata}>Update</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default EditDevicetype;