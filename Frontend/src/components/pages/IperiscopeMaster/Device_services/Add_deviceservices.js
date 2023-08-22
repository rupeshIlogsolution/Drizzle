import Sidebar from '../../../Sidebar/Sidebar';
import { Adddeviceservice, ActiveSeries, TotalCount } from '../../../../api'
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function AddDeviceservices() {
    const [deviceserviceid, setDeviceServiceID] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const series = await ActiveSeries()
            if (!series) {
                alert('Please add/active  the Series')
            }
            const ser = series.services_id
            const count = await TotalCount('tbl_device_services')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement;
            setDeviceServiceID(ser + countnum)
        }
        fetchdata()

    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;

        const device_service = document.getElementById('deviceservices').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');


        if (!device_service) {
            alert("Please enter Mandatory field")
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const result = await Adddeviceservice(deviceserviceid, device_service, remark, username);
            if (result === 'Added') {
                alert("Data Added")
                window.location.href = './ShowDeviceservices'
            }
            else if (result === 'Already') {
                alert('This Device Type already Exist');
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
                <div className='main_container  pb-2' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Device Services</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Device Services</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/ShowDeviceservices' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >
                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='deviceid'> ID </label>
                                    <input type="text" className="form-control" id='deviceid' disabled value={deviceserviceid} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='deviceservices'>Device Services</label>
                                    <input type="text" className="form-control" id='deviceservices' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" />
                                </div>
                                <div className="form-group mt-3" >
                                    <button type="submit" className="btn btn-voilet" id="subnitbtn" onClick={handleadddevice}>Submit</button>
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

export default AddDeviceservices;