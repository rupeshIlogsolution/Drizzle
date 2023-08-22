import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Sidebar/Sidebar';
import { Getagent, updateagent } from '../../../../api'

function EditAgent() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            const snodata = localStorage.getItem('agentSno');
            const getdata = await Getagent(snodata);
            setData(getdata)
        }
        fetchdata();
    }, [])


    const handlechangedeviceid = (e) => {
        setData({ ...data, id: e.target.value })
    }

    const handlechangeagentname = (e) => {
        setData({ ...data, agent_name: e.target.value })
    }
    const handlechangeagentemail = (e) => {
        setData({ ...data, agent_email: e.target.value })
    }
    const handlechangeagentphone = (e) => {
        if (e.target.value.length === 11) return false; 
        setData({ ...data, agent_phone: e.target.value })
    }
    const handlechangedeviceremark = (e) => {
        setData({ ...data, remark: e.target.value })
    }


    const handlesubmitdata = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const sno = localStorage.getItem('agentSno');
        const id = document.getElementById('id').value;
        const agentname = document.getElementById('agentname').value;
        const agentemail = document.getElementById('agentemail').value;
        const agentphone = document.getElementById('agentphone').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!agentname || !agentemail || !agentphone) {
            alert("Please enter Mandatory field")
        }
        else {
            const updataresult = await updateagent(sno, id, agentname, agentemail, agentphone, remark, username);
            if (updataresult === 'Updated') {
                alert("Data updated")
                localStorage.removeItem('agentSno');
                window.location.href = './TotalAgent';
            }
            else {
                alert('Server error ...')
            }
        }
    }
    return (
        <>
            <Sidebar>
                <div className='main_container' >
                    <div className="card card-div" >
                        <header className="card-header" >
                            <h4 className=" mt-2 text-center" >Edit Agent Master</h4>
                        </header>
                        <article className="card-body">
                            <form style={{ margin: "0px 20px 0px 15px" }}>
                                <div className="form-group">
                                    <label htmlFor='id'> ID </label>
                                    <input type="text" className="form-control" id='id' value={data.id} onChange={handlechangedeviceid} disabled />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentname'>Agent Name</label>
                                    <input type="text" className="form-control" id='agentname' value={data.agent_name} onChange={handlechangeagentname} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentemail'>Agent Email </label>
                                    <input type="text" className="form-control" id='agentemail' value={data.agent_email} onChange={handlechangeagentemail} />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentphone'>Agent Phone </label>
                                    <input type="number" className="form-control" id='agentphone' value={data.agent_phone} onChange={handlechangeagentphone} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" id='remark' rows="3" value={data.remark} onChange={handlechangedeviceremark} />
                                </div>
                                <div className="form-group" >
                                    <button type="submit" className="btn btn-primary float-right mb-4 mt-3" id="subnitbtn" onClick={handlesubmitdata}>Update</button>
                                    <button type="button" onClick={() => { localStorage.removeItem('agentSno'); window.location.href = '/TotalAgent' }} className="btn btn-secondary mr-4 float-right mb-4 mt-3">Cancel</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default EditAgent;