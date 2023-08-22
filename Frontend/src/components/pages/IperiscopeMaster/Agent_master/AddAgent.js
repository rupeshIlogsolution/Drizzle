import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar';
import { Addagent, ActiveSeries, TotalCount } from '../../../../api'
import { MdOutlineArrowForward, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function AddAgent() {
    const [agentid, setAgentID] = useState();
    const [phonecount, setPhonecount] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            const series = await ActiveSeries()
            if (!series) {
                alert('Please add/active  the Series')
            }
            const ser = series.agent_id
            const count = await TotalCount('tbl_agent_master')
            let countincrement = count.count + 1;
            let countnum = '' + countincrement;
            setAgentID(ser + countnum)
        }
        fetchdata()

    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        const agentname = document.getElementById('agentname').value;
        const agentemail = document.getElementById('agentemail').value;
        const agentphone = document.getElementById('agentphone').value;
        const remark = document.getElementById('remark').value;
        const username = localStorage.getItem('UserName');

        if (!agentname || !agentemail || !agentphone) {
            alert("Please enter Mandatory field")
            document.getElementById('subnitbtn').disabled = false;

        }
        else {
            const result = await Addagent(agentid, agentname, agentemail, agentphone, remark, username);
            if (result === 'Added') {
                alert('Data Added')
                window.location.href = './TotalAgent'
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
                <div className='main_container pb-2' >
                <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                        <h2><span style={{ color: "rgb(123,108,200)" }}>Agent</span> <MdOutlineKeyboardArrowRight /><span style={{ fontSize: "25px" }}>Add Agent</span> </h2>
                        <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalAgent' }} >Back <MdOutlineArrowForward /></button>
                    </div>
                    <div className="card card-div">
                        {/* <header className="card-header" >
                            <h4 className=" mt-2 text-center" >Add Agent</h4>
                        </header> */}
                        <article className="card-body" >
                            <form className='px-3' autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor='agentid'> ID </label>
                                    <input type="text" className="form-control" id='agentid' value={agentid} disabled />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentname'> Agent Name</label>
                                    <input type="text" className="form-control" id='agentname' />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentemail'>Agent Email</label>
                                    <input type="email" className="form-control" id='agentemail' />
                                </div>
                                <div className="form-group " >
                                    <label htmlFor='agentphone'>Agent Phone</label>
                                    <input type="number" className="form-control" id='agentphone' value={phonecount} onChange={(e) => { if (e.target.value.length === 11) return false; else { setPhonecount(e.target.value) } }} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='remark'>Remarks (Optional)</label>
                                    <textarea className="form-control" placeholder="Comments" type="text" id='remark' rows="3" />
                                </div>
                                <div className="form-group mt-3" >
                                    <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleadddevice}>Submit</button>
                                    <button type="reset" className="btn btn-secondary ml-2">Reset</button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default AddAgent;