import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState,useContext } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { totalRoles, ActiveAgent, getrole } from '../../../../api/index'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddAssignRole() {
    const [loading, setLoading] = useState(false)
    const [rolelist, setRolelist] = useState([])
    const [aggentlist, setAggentlist] = useState([])
    const [rolelistdata, setRolelistData] = useState({})

  // ########################### Modal Alert #############################################
    //    const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetch = async () => {
            const rolemaster = await totalRoles(localStorage.getItem('Database'))
            setRolelist(rolemaster)
            const activeAgent = await ActiveAgent()
            setAggentlist(activeAgent)
            setLoading(true)
        }
        fetch()

    }, [])

    const handleChange = async (e) => {
        const [id, sno] = e.target.value.split(",")
        localStorage.setItem('RoleSno', `${sno}`)
        const getRoles = await getrole(localStorage.getItem('Database'), sno)
        setRolelistData(getRoles[0])
        document.getElementById('tableToggle').style.display = "flex"
        document.getElementById('subnitbtntable').style.display = "flex"
    }

    return (
        <>
            {
                loading ?
                    <Sidebar >

                        {/* ######################### Sanckbar start ##################################### */}

                        {/* <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ######################### Sanckbar End ##################################### */}

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Assign Role<MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Add Assign Role</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalAssignRole' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Add Assign Role:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className='row'>
                                            <div className="col mt-2" >
                                                <label htmlFor='agent'>Agent <span className='text-danger'>*</span></label>
                                                <select type="text" className="form-select" id='agent' >
                                                    <option value='' hidden>Select Agent</option>
                                                    {
                                                        aggentlist.map((item, index) => (
                                                            <option key={index} value={item.agent_name}>{item.agent_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-5 mt-4" >
                                                <button className='btn btn-voilet' onClick={(e) => { e.preventDefault(); window.location.href = './AddEmployee' }}> + Add Agent</button>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col-md-7 mt-2" >
                                                <label htmlFor='role'>Role <span className='text-danger'>*</span></label>
                                                <select type="text" className="form-select" id='role' onChange={handleChange}>
                                                    <option value='' hidden>Select Role</option>
                                                    {
                                                        rolelist.map((item, index) => (
                                                            <option key={index} value={`${item.role_id},${item.sno}`}>{item.role}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-5 mt-4" >
                                                <button className='btn btn-voilet' onClick={(e) => { e.preventDefault(); window.location.href = './NewRoles' }}> + Add Role</button>
                                            </div>
                                        </div>
                                        <div className="col-md mt-3" >
                                            <label htmlFor='remarks'>Remarks</label>
                                            <textarea className="form-control" id='remarks' rows='3' />
                                        </div>
                                        <div className='overflow-auto mt-2' style={{ display: "none" }} id="tableToggle">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">View</th>
                                                        <th scope="col">Create</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Deactive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' checked={rolelistdata.asset == "true" ? "true" : ""} id='assets-full' style={{ height: '20px', width: '20px' }} disabled /> Assets</th>
                                                        <td><input type='checkbox' checked={rolelistdata.asset_view == "true" ? "true" : ""} id='assets-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.asset_create == "true" ? "true" : ""} id='assets-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.asset_edit == "true" ? "true" : ""} id='assets-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.asset_delete == "true" ? "true" : ""} id='assets-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendCont-full' checked={rolelistdata.vendor_contract == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Vendor Contract</th>
                                                        <td><input type='checkbox' checked={rolelistdata.vendor_contract_view == "true" ? "true" : ""} id='vendCont-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.vendor_contract_create == "true" ? "true" : ""} id='vendCont-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.vendor_contract_edit == "true" ? "true" : ""} id='vendCont-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.vendor_contract_delete == "true" ? "true" : ""} id='vendCont-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='ticket-full' checked={rolelistdata.ticket == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Ticket</th>
                                                        <td><input type='checkbox' checked={rolelistdata.ticket_view == "true" ? "true" : ""} id='ticket-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.ticket_create == "true" ? "true" : ""} id='ticket-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.ticket_edit == "true" ? "true" : ""} id='ticket-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.ticket_delete == "true" ? "true" : ""} id='ticket-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='master-full' checked={rolelistdata.master == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Masters</th>
                                                        <td><input type='checkbox' checked={rolelistdata.master_view == "true" ? "true" : ""} id='master-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.master_create == "true" ? "true" : ""} id='master-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.master_edit == "true" ? "true" : ""} id='master-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.master_delete == "true" ? "true" : ""} id='master-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='transaction-full' checked={rolelistdata.transaction_details == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Transaction</th>
                                                        <td><input type='checkbox' checked={rolelistdata.transaction_view == "true" ? "true" : ""} id='transaction-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.transaction_create == "true" ? "true" : ""} id='transaction-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.transaction_edit == "true" ? "true" : ""} id='transaction-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.transaction_delete == "true" ? "true" : ""} id='transaction-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='setting-full' checked={rolelistdata.setting == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Setting</th>
                                                        <td><input type='checkbox' checked={rolelistdata.setting_view == "true" ? "true" : ""} id='setting-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.setting_create == "true" ? "true" : ""} id='setting-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.setting_edit == "true" ? "true" : ""} id='setting-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.setting_delete == "true" ? "true" : ""} id='setting-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='reports-full' checked={rolelistdata.reports == "true" ? "true" : ""} style={{ height: '20px', width: '20px' }} disabled /> Reports</th>
                                                        <td><input type='checkbox' checked={rolelistdata.reports_view == "true" ? "true" : ""} id='reports-view' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.reports_create == "true" ? "true" : ""} id='reports-create' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.reports_edit == "true" ? "true" : ""} id='reports-edit' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                        <td><input type='checkbox' checked={rolelistdata.reports_delete == "true" ? "true" : ""} id='reports-deactive' style={{ height: '20px', width: '20px' }} disabled /></td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: "none" }} id="subnitbtntable">
                                            <button type="submit" className="btn btn-voilet" onClick={(e) => { e.preventDefault(); window.location.href = '/EditRole' }} id="subnitbtntable"> Edit Role</button>
                                        </div>

                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn">Add Assign Role</button>
                                            <button type="reset" className="btn btn-secondary mx-3">Reset</button>
                                        </div>
                                    </form>
                                </article>
                            </div>
                        </div>
                    </Sidebar>
                    : <LoadingPage />
            }
        </>
    )
}

export default AddAssignRole;