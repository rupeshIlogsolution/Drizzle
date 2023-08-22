import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { MdOutlineKeyboardArrowRight, MdKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { insertRoles } from '../../../../api/index'
import { RiArrowGoBackFill } from 'react-icons/ri';
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function AddRoles() {
    const [loading, setLoading] = useState(false)
    // const [agentlist, setAgentlist] = useState({})

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


    const checkboxStyle = {
        width: '20px',
        height: '20px'
    }

    useEffect(() => {
        const fetchdata = async () => {
            // const agents = await ActiveAgent()
            // console.log(agents)
            // setAgentlist(agents)
            setLoading(true)
        }
        fetchdata()
    }, [])

    const allaccess = () => {
        const allval = document.getElementById('allval').checked === true ? true : false;
        const full = ['assets', 'vendCont', 'reports', 'location', 'employee', 'assettype', 'assetstatus', 'manufacturer', 'software', 'issuetype', 'purchasetype', 'contracttype', 'priority', 'ticketstatus', 'billingfrq', 'vendcate', 'vendsubcate', 'serviceactiontype', 'servicegrouptype', 'vendormaster', 'vendorinv', 'vendorpay', 'tickets', 'role', 'assignrole', 'orgdetails', 'application']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        if (allval) {
            document.getElementById('mastercheck').checked = true
            document.getElementById('transactioncheck').checked = true
            document.getElementById('helpdeskcheck').checked = true
            document.getElementById('settingcheck').checked = true
            document.getElementById('masteralldiv').style.display = 'table-row-group'
            document.getElementById('transactiondiv').style.display = 'table-row-group'
            document.getElementById('helpdeskdiv').style.display = 'table-row-group'
            document.getElementById('settingdiv').style.display = 'table-row-group'

            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    document.getElementById(`${full[i]}-${arry[j]}`).checked = true;
                    document.getElementById(`${full[i]}-${arry[j]}`).disabled = false;
                }
            }
        }
        else {
            document.getElementById('masteralldiv').style.display = 'none'
            document.getElementById('transactioncheck').checked = false
            document.getElementById('helpdeskcheck').checked = false
            document.getElementById('settingcheck').checked = false
            document.getElementById('transactiondiv').style.display = 'none'
            document.getElementById('helpdeskdiv').style.display = 'none'
            document.getElementById('settingdiv').style.display = 'none'

            document.getElementById('mastercheck').checked = false
            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    if (arry[j] === 'full' || arry[j] === 'view') {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                    }
                    else {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                        document.getElementById(`${full[i]}-${arry[j]}`).disabled = true;
                    }
                }
            }
        }

    }

    const fullaccess = (fullaccess) => {
        const fullval = document.getElementById(`${fullaccess}-full`).checked === true ? true : false;
        const arry = ['view', 'create', 'edit', 'deactive']
        const arry2 = ['create', 'edit', 'deactive']
        if (fullval === true) {
            for (let i = 0; i < arry.length; i++) {
                document.getElementById(`${fullaccess}-${arry[i]}`).disabled = false;
                document.getElementById(`${fullaccess}-${arry[i]}`).checked = true;
            }
        }
        else {
            for (let i = 0; i < arry.length; i++) {
                document.getElementById(`${fullaccess}-${arry[i]}`).checked = false;
            }
            for (let j = 0; j <= arry2.length; j++) {
                document.getElementById(`${fullaccess}-${arry2[j]}`).disabled = true;
            }
        }
    }

    const viewoff = (viewtype) => {
        const view_val = document.getElementById(`${viewtype}-view`).checked === true ? true : false
        if (view_val) {
            document.getElementById(`${viewtype}-edit`).disabled = false;
            document.getElementById(`${viewtype}-deactive`).disabled = false;
        }
        else {
            document.getElementById(`${viewtype}-full`).checked = false;
            document.getElementById(`${viewtype}-create`).checked = false;
            document.getElementById(`${viewtype}-edit`).checked = false;
            document.getElementById(`${viewtype}-deactive`).checked = false;

            document.getElementById(`${viewtype}-create`).disabled = true;
            document.getElementById(`${viewtype}-edit`).disabled = true;
            document.getElementById(`${viewtype}-deactive`).disabled = true;
        }
    }

    const handleaddinsert = async (e) => {
        e.preventDefault();
        document.getElementById('subnitbtn').disabled = true;
        setLoading(false)

        let datas = {
            org: localStorage.getItem('Database'),
            role: document.getElementById('role').value,
            remark: document.getElementById('remarks').value,
            role_id: document.getElementById('role').value.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000)
        }

        const full = ['assets', 'vendCont', 'reports']
        // const full = ['assets', 'vendCont', 'ticket', 'master', 'transaction', 'setting', 'reports']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        for (let i = 0; i < full.length; i++) {
            for (let j = 0; j < arry.length; j++) {
                let datasss = {}
                datasss[`${full[i]}${arry[j]}`] = document.getElementById(`${full[i]}-${arry[j]}`).checked;
                Object.assign(datas, datasss)
            }
        }

        if (!datas.role) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false;
            callfun('Please enter the Role', 'warning', 'self')
        }
        else {
            const result = await insertRoles(datas)
            setLoading(true)

            if (result === 'Added') {
                // alert(result)
                callfun('Role Added', 'success', '/TotalRoles')
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = true;
                // alert('Server Error')
            }
        }


        // document.getElementById('subnitbtn').disabled = 'true'
        // // const software = document.getElementById('software').checked=== true?true:false;
        // const asset_type = document.getElementById('asset_type').value;
        // const assettype_id = asset_type.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
        // const asset_type_desc = document.getElementById('asset_type_desc').value;

        // const username = localStorage.getItem('UserId');

        // // console.log(software)
        // if (!asset_type) {
        //     setLoading(true)
        //     document.getElementById('subnitbtn').disabled = false
        //     setDatas({ ...datas, message: "Please enter the Asset Type", title: "Error", type: "warning", route: "#", toggle: "true" })
        //     document.getElementById('snackbar').style.display = "block"
        // }
        // else {
        //     setLoading(true)
        //     const org = localStorage.getItem('Database')
        //     const result = await AddAssetTypeapi(org, assettype_id, asset_type, asset_type_desc, username);
        //     if (result === 'Added') {
        //         setDatas({ ...datas, message: "Asset Type Added", title: "success", type: "success", route: "/TotalAssetType", toggle: "true" })
        //         document.getElementById('snackbar').style.display = "block"
        //     }
        //     else if (result === 'Already') {
        //         document.getElementById('subnitbtn').disabled = false
        //         setDatas({ ...datas, message: "This Asset Already Exist", title: "warning", type: "Error" })
        //         document.getElementById('snackbar').style.display = "block"
        //     }
        //     else {
        //         document.getElementById('subnitbtn').disabled = false
        //         setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/AddAssetType", toggle: "true" })
        //         document.getElementById('snackbar').style.display = "block"
        //     }
        // }

    }

    const togglemasterdiv = () => {
        const val = document.getElementById('mastercheck').checked === true ? true : false
        const full = ['location', 'employee', 'assettype', 'assetstatus', 'manufacturer', 'software', 'issuetype', 'purchasetype', 'contracttype', 'priority', 'ticketstatus', 'billingfrq', 'vendcate', 'vendsubcate', 'serviceactiontype', 'servicegrouptype', 'vendormaster']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        if (val) {
            document.getElementById('mastercheck').checked = true
            document.getElementById('masteralldiv').style.display = 'table-row-group'
            document.getElementById('masterarrow').style.transform = 'rotate(90deg)'
            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    document.getElementById(`${full[i]}-${arry[j]}`).checked = true;
                    document.getElementById(`${full[i]}-${arry[j]}`).disabled = false;
                }
            }
        }
        else {
            document.getElementById('masteralldiv').style.display = 'none'
            document.getElementById('mastercheck').checked = false
            document.getElementById('masterarrow').style.transform = 'rotate(0deg)'
            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    if (arry[j] === 'full' || arry[j] === 'view') {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                    }
                    else {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                        document.getElementById(`${full[i]}-${arry[j]}`).disabled = true;
                    }
                }
            }
        }
    }


    const toggletransactiondiv = () => {
        const val = document.getElementById('transactioncheck').checked === true ? true : false
        const full = ['vendorinv', 'vendorpay']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        if (val) {
            document.getElementById('transactioncheck').checked = true
            document.getElementById('transactiondiv').style.display = 'table-row-group'
            document.getElementById('transationarrow').style.transform = 'rotate(90deg)'


            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    document.getElementById(`${full[i]}-${arry[j]}`).checked = true;
                    document.getElementById(`${full[i]}-${arry[j]}`).disabled = false;
                }
            }
        }
        else {
            document.getElementById('transactiondiv').style.display = 'none'
            document.getElementById('transactioncheck').checked = false
            document.getElementById('transationarrow').style.transform = 'rotate(0deg)'

            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    if (arry[j] === 'full' || arry[j] === 'view') {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                    }
                    else {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                        document.getElementById(`${full[i]}-${arry[j]}`).disabled = true;
                    }
                }
            }
        }
    }
    const togglehelpdeskdiv = () => {
        const val = document.getElementById('helpdeskcheck').checked === true ? true : false
        const full = ['tickets']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        if (val) {
            document.getElementById('helpdeskcheck').checked = true
            document.getElementById('helpdeskarrow').style.transform = 'rotate(90deg)'

            document.getElementById('helpdeskdiv').style.display = 'table-row-group'

            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    document.getElementById(`${full[i]}-${arry[j]}`).checked = true;
                    document.getElementById(`${full[i]}-${arry[j]}`).disabled = false;
                }
            }
        }
        else {
            document.getElementById('helpdeskdiv').style.display = 'none'
            document.getElementById('helpdeskcheck').checked = false
            document.getElementById('helpdeskarrow').style.transform = 'rotate(0deg)'

            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    if (arry[j] === 'full' || arry[j] === 'view') {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                    }
                    else {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                        document.getElementById(`${full[i]}-${arry[j]}`).disabled = true;
                    }
                }
            }
        }
    }

    const toggleSettingdiv = () => {
        const val = document.getElementById('settingcheck').checked === true ? true : false
        const full = ['role', 'assignrole', 'orgdetails', 'application']
        const arry = ['full', 'view', 'create', 'edit', 'deactive']
        if (val) {
            document.getElementById('settingcheck').checked = true
            document.getElementById('settingdiv').style.display = 'table-row-group'
            document.getElementById('settingarrow').style.transform = 'rotate(90deg)'

            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    document.getElementById(`${full[i]}-${arry[j]}`).checked = true;
                    document.getElementById(`${full[i]}-${arry[j]}`).disabled = false;
                }
            }
        }
        else {
            document.getElementById('settingdiv').style.display = 'none'
            document.getElementById('settingcheck').checked = false
            document.getElementById('settingarrow').style.transform = 'rotate(0deg)'
            for (let i = 0; i < full.length; i++) {
                for (let j = 0; j < arry.length; j++) {
                    if (arry[j] === 'full' || arry[j] === 'view') {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                    }
                    else {
                        document.getElementById(`${full[i]}-${arry[j]}`).checked = false;
                        document.getElementById(`${full[i]}-${arry[j]}`).disabled = true;
                    }
                }
            }
        }
    }



    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ################## Snackbar ####################### */}
                        {/* <div id="snackbar" style={{ display: "none" }}>
                            <Snackbar message={datas.message} title={datas.title} type={datas.type} Route={datas.route} toggle={datas.toggle} />
                        </div> */}
                        <Modal
                            theme={tooglevalue.theme}
                            text={tooglevalue.message}
                            show={tooglevalue.modalshowval}
                            url={tooglevalue.url}
                        />
                        {/* ################## Snackbar ####################### */}

                        <div className='main_container' >
                            <div className='main-inner-container d-flex justify-content-between  pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Role <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>New Role</span> </h4>
                                <button className='btn btn-secondary btn ' onClick={() => { window.location.href = '/TotalRoles' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card py-2">
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className='row'>
                                            <div className="col-md-5" >
                                                <label htmlFor='role'>Role <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id='role' />
                                            </div>
                                            <div className="col-md-5" >
                                                <label htmlFor='remarks'>Remarks</label>
                                                <input type="text" className="form-control" id='remarks' />
                                            </div>
                                        </div>
                                        <br />
                                        <div className='overflow-auto'>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Category <input type='checkbox' id='allval' style={checkboxStyle} onChange={allaccess} /></th>
                                                        <th scope="col">View</th>
                                                        <th scope="col">Create</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Deactive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='assets-full' style={checkboxStyle} onChange={() => fullaccess('assets')} /> Assets</th>
                                                        <td><input type='checkbox' id='assets-view' style={checkboxStyle} onChange={() => viewoff('assets')} /></td>
                                                        <td><input type='checkbox' id='assets-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assets-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assets-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendCont-full' style={checkboxStyle} onChange={() => fullaccess('vendCont')} /> Vendor Contract</th>
                                                        <td><input type='checkbox' id='vendCont-view' style={checkboxStyle} onChange={() => viewoff('vendCont')} /></td>
                                                        <td><input type='checkbox' id='vendCont-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendCont-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendCont-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    {/* <tr>
                                                    <th scope="row"><input type='checkbox' id='ticket-full' style={checkboxStyle} onChange={() => fullaccess('ticket')} /> Ticket</th>
                                                    <td><input type='checkbox' id='ticket-view' style={checkboxStyle} onChange={() => viewoff('ticket')} /></td>
                                                    <td><input type='checkbox' id='ticket-create' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='ticket-edit' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='ticket-deactive' style={checkboxStyle} disabled /></td>
                                                </tr> */}
                                                    {/* <tr>
                                                    <th scope="row"><input type='checkbox' id='master-full' style={checkboxStyle} onChange={() => fullaccess('master')} /> Masters</th>
                                                    <td><input type='checkbox' id='master-view' style={checkboxStyle} onChange={() => viewoff('master')} /></td>
                                                    <td><input type='checkbox' id='master-create' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='master-edit' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='master-deactive' style={checkboxStyle} disabled /></td>
                                                </tr> */}
                                                    {/* <tr>
                                                    <th scope="row"><input type='checkbox' id='transaction-full' style={checkboxStyle} onChange={() => fullaccess('transaction')} /> Transaction</th>
                                                    <td><input type='checkbox' id='transaction-view' style={checkboxStyle} onChange={() => viewoff('transaction')} /></td>
                                                    <td><input type='checkbox' id='transaction-create' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='transaction-edit' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='transaction-deactive' style={checkboxStyle} disabled /></td>
                                                </tr> */}
                                                    {/* <tr>
                                                    <th scope="row"><input type='checkbox' id='setting-full' style={checkboxStyle} onChange={() => fullaccess('setting')} /> Setting</th>
                                                    <td><input type='checkbox' id='setting-view' style={checkboxStyle} onChange={() => viewoff('setting')} /></td>
                                                    <td><input type='checkbox' id='setting-create' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='setting-edit' style={checkboxStyle} disabled /></td>
                                                    <td><input type='checkbox' id='setting-deactive' style={checkboxStyle} disabled /></td>
                                                </tr> */}
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='reports-full' style={checkboxStyle} onChange={() => fullaccess('reports')} /> Reports</th>
                                                        <td><input type='checkbox' id='reports-view' style={checkboxStyle} onChange={() => viewoff('reports')} /></td>
                                                        <td><input type='checkbox' id='reports-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='reports-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='reports-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    {/* ################################## Master ################################### */}
                                                    <tr >
                                                        <th scope="row" colSpan='5' className='text-danger' >
                                                            <input type='checkbox' id='mastercheck' style={{ height: '20px', width: '20px', accentColor: 'red' }} onChange={togglemasterdiv} /> Master &nbsp;
                                                            <MdKeyboardArrowRight id='masterarrow' className='ft-20' style={{ marginTop: '-10px' }} /></th>
                                                    </tr>

                                                </tbody>
                                                <tbody style={{ display: 'none' }} id='masteralldiv'>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='location-full' style={checkboxStyle} onChange={() => fullaccess('location')} /> Location</th>
                                                        <td><input type='checkbox' id='location-view' style={checkboxStyle} onChange={() => viewoff('location')} /></td>
                                                        <td><input type='checkbox' id='location-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='location-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='location-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='employee-full' style={checkboxStyle} onChange={() => fullaccess('employee')} /> Employee</th>
                                                        <td><input type='checkbox' id='employee-view' style={checkboxStyle} onChange={() => viewoff('employee')} /></td>
                                                        <td><input type='checkbox' id='employee-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='employee-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='employee-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='assettype-full' style={checkboxStyle} onChange={() => fullaccess('assettype')} /> Asset Type</th>
                                                        <td><input type='checkbox' id='assettype-view' style={checkboxStyle} onChange={() => viewoff('assettype')} /></td>
                                                        <td><input type='checkbox' id='assettype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assettype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assettype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='assetstatus-full' style={checkboxStyle} onChange={() => fullaccess('assetstatus')} /> Asset Status</th>
                                                        <td><input type='checkbox' id='assetstatus-view' style={checkboxStyle} onChange={() => viewoff('assetstatus')} /></td>
                                                        <td><input type='checkbox' id='assetstatus-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assetstatus-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assetstatus-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='manufacturer-full' style={checkboxStyle} onChange={() => fullaccess('manufacturer')} /> Manufacturer </th>
                                                        <td><input type='checkbox' id='manufacturer-view' style={checkboxStyle} onChange={() => viewoff('manufacturer')} /></td>
                                                        <td><input type='checkbox' id='manufacturer-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='manufacturer-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='manufacturer-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='software-full' style={checkboxStyle} onChange={() => fullaccess('software')} /> Software </th>
                                                        <td><input type='checkbox' id='software-view' style={checkboxStyle} onChange={() => viewoff('software')} /></td>
                                                        <td><input type='checkbox' id='software-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='software-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='software-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='issuetype-full' style={checkboxStyle} onChange={() => fullaccess('issuetype')} /> Issue Type </th>
                                                        <td><input type='checkbox' id='issuetype-view' style={checkboxStyle} onChange={() => viewoff('issuetype')} /></td>
                                                        <td><input type='checkbox' id='issuetype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='issuetype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='issuetype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='purchasetype-full' style={checkboxStyle} onChange={() => fullaccess('purchasetype')} /> Purchase Type </th>
                                                        <td><input type='checkbox' id='purchasetype-view' style={checkboxStyle} onChange={() => viewoff('purchasetype')} /></td>
                                                        <td><input type='checkbox' id='purchasetype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='purchasetype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='purchasetype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='contracttype-full' style={checkboxStyle} onChange={() => fullaccess('contracttype')} /> Contract Type </th>
                                                        <td><input type='checkbox' id='contracttype-view' style={checkboxStyle} onChange={() => viewoff('contracttype')} /></td>
                                                        <td><input type='checkbox' id='contracttype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='contracttype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='contracttype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='priority-full' style={checkboxStyle} onChange={() => fullaccess('priority')} /> Priority</th>
                                                        <td><input type='checkbox' id='priority-view' style={checkboxStyle} onChange={() => viewoff('priority')} /></td>
                                                        <td><input type='checkbox' id='priority-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='priority-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='priority-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='ticketstatus-full' style={checkboxStyle} onChange={() => fullaccess('ticketstatus')} /> Ticket Status</th>
                                                        <td><input type='checkbox' id='ticketstatus-view' style={checkboxStyle} onChange={() => viewoff('ticketstatus')} /></td>
                                                        <td><input type='checkbox' id='ticketstatus-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='ticketstatus-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='ticketstatus-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='billingfrq-full' style={checkboxStyle} onChange={() => fullaccess('billingfrq')} /> Billing Frequency</th>
                                                        <td><input type='checkbox' id='billingfrq-view' style={checkboxStyle} onChange={() => viewoff('billingfrq')} /></td>
                                                        <td><input type='checkbox' id='billingfrq-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='billingfrq-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='billingfrq-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendcate-full' style={checkboxStyle} onChange={() => fullaccess('vendcate')} /> Vendor Category</th>
                                                        <td><input type='checkbox' id='vendcate-view' style={checkboxStyle} onChange={() => viewoff('vendcate')} /></td>
                                                        <td><input type='checkbox' id='vendcate-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendcate-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendcate-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendsubcate-full' style={checkboxStyle} onChange={() => fullaccess('vendsubcate')} /> Vendor Sub Category</th>
                                                        <td><input type='checkbox' id='vendsubcate-view' style={checkboxStyle} onChange={() => viewoff('vendsubcate')} /></td>
                                                        <td><input type='checkbox' id='vendsubcate-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendsubcate-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendsubcate-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='serviceactiontype-full' style={checkboxStyle} onChange={() => fullaccess('serviceactiontype')} /> Service Action Type</th>
                                                        <td><input type='checkbox' id='serviceactiontype-view' style={checkboxStyle} onChange={() => viewoff('serviceactiontype')} /></td>
                                                        <td><input type='checkbox' id='serviceactiontype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='serviceactiontype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='serviceactiontype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='servicegrouptype-full' style={checkboxStyle} onChange={() => fullaccess('servicegrouptype')} /> Service Group Type</th>
                                                        <td><input type='checkbox' id='servicegrouptype-view' style={checkboxStyle} onChange={() => viewoff('servicegrouptype')} /></td>
                                                        <td><input type='checkbox' id='servicegrouptype-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='servicegrouptype-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='servicegrouptype-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendormaster-full' style={checkboxStyle} onChange={() => fullaccess('vendormaster')} /> Vendor Master</th>
                                                        <td><input type='checkbox' id='vendormaster-view' style={checkboxStyle} onChange={() => viewoff('vendormaster')} /></td>
                                                        <td><input type='checkbox' id='vendormaster-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendormaster-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendormaster-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>

                                                </tbody>

                                                {/* ################################## Transition ################################### */}
                                                <tbody>
                                                    <tr >
                                                        <th scope="row" colSpan='5' className='text-danger'>
                                                            <input type='checkbox' id='transactioncheck' style={{ height: '20px', width: '20px', accentColor: 'red' }} onChange={toggletransactiondiv} /> Transaction &nbsp;
                                                            <MdKeyboardArrowRight id='transationarrow' className='ft-20' style={{ marginTop: '-10px' }} />  </th>
                                                    </tr>
                                                </tbody>
                                                <tbody id='transactiondiv' style={{ display: 'none' }}>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendorinv-full' style={checkboxStyle} onChange={() => fullaccess('vendorinv')} /> Vendor Invoice</th>
                                                        <td><input type='checkbox' id='vendorinv-view' style={checkboxStyle} onChange={() => viewoff('vendorinv')} /></td>
                                                        <td><input type='checkbox' id='vendorinv-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendorinv-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendorinv-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='vendorpay-full' style={checkboxStyle} onChange={() => fullaccess('vendorpay')} /> Vendor Payment</th>
                                                        <td><input type='checkbox' id='vendorpay-view' style={checkboxStyle} onChange={() => viewoff('vendorpay')} /></td>
                                                        <td><input type='checkbox' id='vendorpay-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendorpay-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='vendorpay-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>

                                                </tbody>

                                                {/* ################################## Help Desk ################################### */}
                                                <tbody>
                                                    <tr >
                                                        <th scope="row" colSpan='5' className='text-danger' >
                                                            <input type='checkbox' id='helpdeskcheck' style={{ height: '20px', width: '20px', accentColor: 'red' }} onChange={togglehelpdeskdiv} /> Help Desk
                                                            &nbsp; <MdKeyboardArrowRight id='helpdeskarrow' className='ft-20' style={{ marginTop: '-10px' }} /> </th>

                                                    </tr>
                                                </tbody>
                                                <tbody id='helpdeskdiv' style={{ display: 'none' }}>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='tickets-full' style={checkboxStyle} onChange={() => fullaccess('tickets')} /> Tickets</th>
                                                        <td><input type='checkbox' id='tickets-view' style={checkboxStyle} onChange={() => viewoff('tickets')} /></td>
                                                        <td><input type='checkbox' id='tickets-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='tickets-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='tickets-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                </tbody>

                                                {/* ################################## Setting ################################### */}
                                                <tbody>
                                                    <tr >
                                                        <th scope="row" colSpan='5' className='text-danger' >
                                                            <input type='checkbox' id='settingcheck' style={{ height: '20px', width: '20px', accentColor: 'red' }} onChange={toggleSettingdiv} />  Setting
                                                            &nbsp; <MdKeyboardArrowRight id='settingarrow' className='ft-20' style={{ marginTop: '-10px' }} /> </th>
                                                    </tr>
                                                </tbody>
                                                <tbody id='settingdiv' style={{ display: 'none' }}>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='role-full' style={checkboxStyle} onChange={() => fullaccess('role')} /> Role</th>
                                                        <td><input type='checkbox' id='role-view' style={checkboxStyle} onChange={() => viewoff('role')} /></td>
                                                        <td><input type='checkbox' id='role-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='role-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='role-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='assignrole-full' style={checkboxStyle} onChange={() => fullaccess('assignrole')} /> AssignRole</th>
                                                        <td><input type='checkbox' id='assignrole-view' style={checkboxStyle} onChange={() => viewoff('assignrole')} /></td>
                                                        <td><input type='checkbox' id='assignrole-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assignrole-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='assignrole-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='orgdetails-full' style={checkboxStyle} onChange={() => fullaccess('orgdetails')} /> Organisation Details</th>
                                                        <td><input type='checkbox' id='orgdetails-view' style={checkboxStyle} onChange={() => viewoff('orgdetails')} /></td>
                                                        <td><input type='checkbox' id='orgdetails-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='orgdetails-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='orgdetails-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"><input type='checkbox' id='application-full' style={checkboxStyle} onChange={() => fullaccess('application')} /> Application</th>
                                                        <td><input type='checkbox' id='application-view' style={checkboxStyle} onChange={() => viewoff('application')} /></td>
                                                        <td><input type='checkbox' id='application-create' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='application-edit' style={checkboxStyle} disabled /></td>
                                                        <td><input type='checkbox' id='application-deactive' style={checkboxStyle} disabled /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="form-group mt-3" >
                                            <button type="submit" className="btn btn-voilet " id="subnitbtn" onClick={handleaddinsert}>Add Role</button>
                                            <button type="reset" className="btn btn-secondary mx-2">Reset</button>
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

export default AddRoles;