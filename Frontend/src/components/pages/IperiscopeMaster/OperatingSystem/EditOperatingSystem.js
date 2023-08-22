import Sidebar from '../../../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { GetOperatingSystem, EditOperatingsystem } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'


function EditOperatingSystem() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const getdata = await GetOperatingSystem(localStorage.getItem('OperatingSystemSno'));
            setData(getdata)
        }
        fetchdata();
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const operatingsystemid = document.getElementById('operatingsystemid').value;
        const operatingsystem = document.getElementById('operatingsystem').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!operatingsystem) {
            alert("Please enter the mandatory Field")
        }
        else {
            const result = await EditOperatingsystem(localStorage.getItem('OperatingSystemSno'), operatingsystemid, operatingsystem, remark, username);
            if (result) {
                alert('Updated')
                localStorage.removeItem('OperatingSystemSno')
                window.location.href = '/TotalOperatingSystem'
            }
            else {
                alert('server not response')
            }
        }
    }

    const handleChangeID = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handleChangeOperatingSystem = (e) => {
        setData({ ...data, operating_system: e.target.value })
    }

    const handleChangeRemark = (e) => {
        setData({ ...data, remark: e.target.value })

    }
    return (
        <>
            <Sidebar>
                <div className='main_container pb-2' >
                    <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Operating System</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Operating System</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { localStorage.removeItem('OperatingSystemSno'); window.location.href = '/TotalOperatingSystem' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div" >

                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='operatingsystemid'>Operating System ID </label>
                                    <input type="text" className="form-control" disabled value={data.id} id='operatingsystemid' onChange={(e) => handleChangeID(e)} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='operatingsystem'>Operating System  </label>
                                    <input type="text" className="form-control" value={data.operating_system} id='operatingsystem' onChange={(e) => handleChangeOperatingSystem(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" value={data.remark} id='remark' rows="3" onChange={(e) => handleChangeRemark(e)} />
                                </div>
                                    <button type="button" className="btn btn-voilet mt-2 " id="subnitbtn" onClick={handleadddevice}>Update</button>
                                    <button type="button" className="btn btn-secondary mt-2 ml-3" onClick={() => { localStorage.removeItem('OperatingSystemSno'); window.location.href = '/TotalOperatingSystem' }} >Cancel</button>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default EditOperatingSystem;