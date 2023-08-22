import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { Getdeviceservicesdata, Updatedeviceservice } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function EditDeviceServices() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const snodata = localStorage.getItem('deviceservicesSno');
            const getdata = await Getdeviceservicesdata(snodata);
            setData(getdata)
        }
        fetchdata();

    }, [])


    const handlechangedeviceid = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handlechangedeviceservices = (e) => {
        setData({ ...data, device_services: e.target.value })
    }
    const handlechangedeviceremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }

    const handlesubmitdata = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const sno = localStorage.getItem('deviceservicesSno');
        const deviceserviceid = document.getElementById('id').value;
        const device_service = document.getElementById('deviceservices').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!device_service) {
            alert("Please Enter the ID and Services");
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const updataresult = await Updatedeviceservice(sno, deviceserviceid, device_service, remark, username);
            if (updataresult === 'Updated') {
                alert("Data updated")
                localStorage.removeItem('deviceservicesSno');
                window.location.href = './ShowDeviceservices';
            }
            else {
                alert("Server not Response!...");
                document.getElementById('subnitbtn').disabled = false;

            }
        }

    }

    return (
        <>
            <Sidebar>
                <div className='main_container pb-2' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Services</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Edit Device Services</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('deviceservicesSno'); window.location.href = '/ShowDeviceservices' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">
                        <article className="card-body" >
                            <form  className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='id'> ID </label>
                                    <input type="text" className="form-control" disabled id='id' value={data.id} onChange={handlechangedeviceid} />
                                </div>
                                <div className="form-group mt-2" >
                                    <label htmlFor='deviceservices'>Device Services </label>
                                    <input type="text" className="form-control" id='deviceservices' value={data.device_services} onChange={handlechangedeviceservices} />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" value={data.remark} onChange={handlechangedeviceremark} />
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

export default EditDeviceServices;