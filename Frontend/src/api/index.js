import axios from 'axios';

export const UserLogin = async (userid, password) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/login`
    return axios.post(url, { userid, password }).then(response => response.data).catch(error => console.log(error));
}


export const changePassword = async (user_id, password, CurrentPassword) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ChangePassword`
    return axios.post(url, { user_id, password, CurrentPassword }).then(response => response.data).catch(error => console.log(error));
}
export const insertUserLogin = async (user_name, user_id, user_password, DBname) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertuserlogin`
    return axios.post(url, { user_name, user_id, user_password, DBname }).then(response => response.data).catch(error => console.log(error));
}

export const TotalCountry = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalcountry`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const TotalState = async (country_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalstate`
    return axios.post(url, { country_id }).then(response => response.data).catch(error => console.log(error));
}
export const TotalCity = async (state_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalcity`
    return axios.post(url, { state_id }).then(response => response.data).catch(error => console.log(error));
}

// export const UploadCountry = async (datas) => {
//     const url = `https://drizzlebackend.awlworldwide.com/api/UploadCountry`
//     return axios.post(url,{datas}).then(response => response.data).catch(error => console.log(error));
// }
// export const UploadState = async (datas) => {
//     const url = `https://drizzlebackend.awlworldwide.com/api/UploadState`
//     return axios.post(url,{datas}).then(response => response.data).catch(error => console.log(error));
// }

export const UploadCity = async (datas) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UploadCity`
    return axios.post(url, { datas }).then(response => response.data).catch(error => console.log(error));
}

//  Iperioscope Series start
export const Totalseriesapi = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalseries`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Updateseriesstatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatesseriestatus`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Addseriesapi = async (type_id, services_id, task_id, agent_id, group_id, os_id, comp_id, device_id, taskandcomp_id, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/addseries`
    return axios.post(url, { type_id, services_id, task_id, agent_id, group_id, os_id, comp_id, device_id, taskandcomp_id, username }).then(response => response.data).catch(error => console.log(error));
}
export const Getseries = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getseries`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updateseries = async (sno, type_id, services_id, task_id, agent_id, group_id, os_id, comp_id, device_id, taskandcomp_id, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateseries`
    return axios.post(url, { sno, type_id, services_id, task_id, agent_id, group_id, os_id, comp_id, device_id, taskandcomp_id, username }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveSeries = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activeseriesmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

//  Iperioscope Series End

export const TotalCount = async (table) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalcount`
    return axios.post(url, { table }).then(response => response.data).catch(error => console.log(error));
}

//Device Type 
export const TotalDevicetype = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaldevicetypemaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const Statusdevicetype = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatetypestatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const AddDevicetypeapi = async (devicetypeid, device_type, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddevicetypemaster`
    return axios.post(url, { devicetypeid, device_type, remark, username }).then(response => response.data).catch(error => console.log(error));
}
export const Getdevicetype = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetypemaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicetype = async (sno, devicetypeid, device_type, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetypemaster`
    return axios.post(url, { sno, devicetypeid, device_type, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveDevicetype = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activedevicetype`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


//   Device Group Start
export const TotalDevicegroup = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaldevicegroupmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const DeviceGroupStatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updategroupstatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Adddevicegroup = async (devicegroupid, device_group, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddevicegroupmaster`
    return axios.post(url, { devicegroupid, device_group, remark, username }).then(response => response.data).catch(error => console.log(error));
}
export const Getdevicegroup = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicegroupmaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicegroup = async (sno, devicegroupid, device_group, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicegroupmaster`
    return axios.post(url, { sno, devicegroupid, device_group, remark, username }).then(response => response.data).catch(error => console.log(error));
}

//   Device Group End


export const ActiveDevicegroup = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activedevicegroup`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


// //os Master

export const TotalOperatingSystemapi = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaloperatingsystemmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const AddOperatingsystem = async (operatingsystemid, operatingsystem, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/addoperatingsystemmaster`
    return axios.post(url, { operatingsystemid, operatingsystem, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const GetOperatingSystem = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getoperatingsystemmaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const EditOperatingsystem = async (sno, operatingsystemid, operatingsystem, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateoperatingsystemmaster`
    return axios.post(url, { sno, operatingsystemid, operatingsystem, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const OperatingSystemStatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateoperatingstatusstatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}
export const ActiveOperatingSystem = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activeoperatingsystem`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}



// // Device Services Compliance 

export const TotalServiceCompliance = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalservicecompliancemaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Addservicecompliance = async (servicecomplianceid, device_service, services_compliance, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/addservicecompliancemaster`
    return axios.post(url, { servicecomplianceid, device_service, services_compliance, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const GetServiceCompliance = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getservicecompliancemaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updateservicecompliance = async (sno, servicecomplianceid, device_service, services_compliance, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateservicecompliancemaster`
    return axios.post(url, { sno, servicecomplianceid, device_service, services_compliance, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const ServiceComplianceStatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateservicecompliancestatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveServiceCompliance = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activeservicecompliance`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}


// // Device Services

export const Totaldeviceservices = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaldeviceservicesmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}
export const Adddeviceservice = async (deviceserviceid, device_service, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddeviceservicemaster`
    return axios.post(url, { deviceserviceid, device_service, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Updatestatusdeviceservices = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedeviceservicestatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Getdeviceservicesdata = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdeviceservicemaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedeviceservice = async (sno, deviceserviceid, device_service, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedeviceservicemaster`
    return axios.post(url, { sno, deviceserviceid, device_service, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveDeviceService = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activedeviceservice`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}



// // Agent Master
export const Totalagent = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalagentmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Updateagentstatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateagentstatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}


export const Addagent = async (agentid, agent_name, agent_email, agent_phone, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/addagentmaster`
    return axios.post(url, { agentid, agent_name, agent_email, agent_phone, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Getagent = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getagentmaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const updateagent = async (sno, agentid, agent_name, agent_email, agent_phone, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateagentmaster`
    return axios.post(url, { sno, agentid, agent_name, agent_email, agent_phone, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveAgent = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activeagent`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

// Device Task
export const Totaldevicetask = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaldevicetaskmaster`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicetaskstatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetaskstatusmaster`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Getdevicetask = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetaskmaster`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}
export const AddDevicetaskapi = async (devicetaskid, device_tasks, device_tasks_frequency, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddevicetaskmaster`
    return axios.post(url, { devicetaskid, device_tasks, device_tasks_frequency, remark, username }).then(response => response.data).catch(error => console.log(error));
}


export const Updatedevicetask = async (sno, devicetaskid, device_tasks, device_tasks_frequency, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetaskmaster`
    return axios.post(url, { sno, devicetaskid, device_tasks, device_tasks_frequency, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Activedevicetask = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activedevicetask`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const GetDevicetaskfrequency = async (task) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetaskfrequency`
    return axios.post(url, { task }).then(response => response.data).catch(error => console.log(error));
}

export const Adddevice = async (device_id, device_name, device_type, device_group, device_ip_address, device_host_master, device_os, services, device_creation_date, device_reg_date, agent, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddevice`
    return axios.post(url, { device_id, device_name, device_type, device_group, device_ip_address, device_host_master, device_os, services, device_creation_date, device_reg_date, agent, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Totaldeviceapi = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totaldevice`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicestatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicestatus`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Getdevice = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevice`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevice = async (sno, device_id, device_name, device_type, device_group, device_ip_address, device_host_master, device_os, services, device_creation_date, device_reg_date, agent, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevice`
    return axios.post(url, { sno, device_id, device_name, device_type, device_group, device_ip_address, device_host_master, device_os, services, device_creation_date, device_reg_date, agent, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Activedevice = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/activedevice`
    return axios.get(url).then(response => response.data).catch(error => console.log(error));
}

export const Getdevicetaskcompliancebyname = async (name) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetaskcompliancebyname`
    return axios.post(url, { name }).then(response => response.data).catch(error => console.log(error));
}

export const AddDevicetaskCompliance = async (devicename, services, add_compliance, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddeviceTaskcomp`
    return axios.post(url, { devicename, services, add_compliance, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const getdevicetaskcomp = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetaskcomp`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicetaskcomp = async (sno, devicename, services, add_compliance, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetaskcomp`
    return axios.post(url, { sno, devicename, services, add_compliance, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicecompstatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicecompstatus`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Getdevicetaskbyname = async (name) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getdevicetaskbyname`
    return axios.post(url, { name }).then(response => response.data).catch(error => console.log(error));
}

export const Adddevicetaskby = async (devicename, services, task, completion_date, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/adddevicetaskes`
    return axios.post(url, { devicename, services, task, completion_date, remark, username }).then(response => response.data).catch(error => console.log(error));
}

export const Updatedevicetaskastatus = async (status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetaskastatus`
    return axios.post(url, { status, sno }).then(response => response.data).catch(error => console.log(error));
}


export const GetDevicestask = async (sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/Getdevicestask`
    return axios.post(url, { sno }).then(response => response.data).catch(error => console.log(error));
}


export const UpdateDevicetaskes = async (sno, devicename, services, task, task_frequency, completion_date, remark, username) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatedevicetaskes`
    return axios.post(url, { sno, devicename, services, task, task_frequency, completion_date, remark, username }).then(response => response.data).catch(error => console.log(error));
}



// Drizzle Master
//Organization

export const TotalOrganization = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalorganization`
    return axios.post(url).then(response => response.data).catch(error => console.log(error));
}

//Employee

export const TotalEmployees = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalEmployee`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddEmployees = async (org, employee_id, employee_name, location, employee_email, employee_number, company, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertEmployee`
    return axios.post(url, { org, employee_id, employee_name, location, employee_email, employee_number, company, user_id }).then(response => response.data).catch(error => console.log(error));
}
export const GetEmployees = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getEmployee`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteEmployees = async (org, status, sno) => {
    console.log(status, sno)
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteEmployee`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateEmployees = async (org, sno, employee_name, location, employee_email, employee_number, company, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateEmployee`
    return axios.post(url, { org, sno, employee_name, location, employee_email, employee_number, company, user_id }).then(response => response.data).catch(error => console.log(error));
}


export const ActiveEmployees = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveEmployee`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const EmployeesDetail = async (org, empid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/EmployeeDetail`
    return axios.post(url, { org, empid }).then(response => response.data).catch(error => console.log(error));
}


//Assets Type
export const TotalAssetTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalAssetType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddAssetTypeapi = async (org, asset_type_id, asset_type, asset_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertAssetType`
    return axios.post(url, { org, asset_type_id, asset_type, asset_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetAssetTypeapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getAssetType`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteAssetTypeapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteAssetType`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAssettypeapi = async (org, sno, asset_type, asset_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateAssetType`
    return axios.post(url, { org, sno, asset_type, asset_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveAssetesType = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveAssetesType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

//Asset Status

export const TotalAssetStatusapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalAssetStatus`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddAssetStatusapi = async (org, asset_status_id, asset_status, asset_status_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertAssetStatus`
    return axios.post(url, { org, asset_status_id, asset_status, asset_status_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteAssetStatusapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteAssetStatus`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetAssetStatusapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getAssetStatus`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateAssetStatusapi = async (org, sno, asset_status, asset_status_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateAssetStatus`
    return axios.post(url, { org, sno, asset_status, asset_status_description, user_id }).then(response => response.data).catch(error => console.log(error));
}


export const ActiveAssetStatus = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveAssetesStatus`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Software Master

export const TotalSoftwareapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalSoftware`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddSoftwareapi = async (org, software_id, software_name, software_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertSoftware`
    return axios.post(url, { org, software_id, software_name, software_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteSoftwaresapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteSoftware`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetSoftwareapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getSoftware`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateSoftwareapi = async (org, sno, software_name, software_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateSoftware`
    return axios.post(url, { org, sno, software_name, software_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveSoftware = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveSoftware`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Purchase Master

export const TotalPurchaseTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalPurchaseType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddPurchaseTypeeapi = async (org, purchase_id, purchase_type, purchase_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertPurchaseType`
    return axios.post(url, { org, purchase_id, purchase_type, purchase_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeletePurchaseTypeapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deletePurchaseType`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetPurchaseTypeapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getPurchaseType`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdatePurchaseapi = async (org, sno, purchase_type, purchase_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatePurchaseType`
    return axios.post(url, { org, sno, purchase_type, purchase_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActivePurchaseTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActivePurchasetype`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Priority Master

export const TotalPriorityapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalPriority`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const AddPriorityapi = async (org, priority_id, priority_type, priority_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertPriority`
    return axios.post(url, { org, priority_id, priority_type, priority_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const DeletePriorityapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deletePriority`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetPriorityapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getPriority`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}
export const UpdatePriorityapi = async (org, sno, priority_type, priority_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updatePriority`
    return axios.post(url, { org, sno, priority_type, priority_description, user_id }).then(response => response.data).catch(error => console.log(error));
}


export const ActivePriority = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActivePriority`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Billing Frequency
export const TotalBillingFreqapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalBillingFrequency`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteBillingFreqapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteBillingFrequency`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}
export const AddBillingFreqapi = async (org, billing_freq_id, billing_freq, billing_freq_description, user_id) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/insertBillingFrequency`
    return axios.post(url, { org, billing_freq_id, billing_freq, billing_freq_description, user_id }).then(response => response.data).catch(error => console.log(error));
}
export const GetBillingFreqapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getBillingFrequency`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateBillingFreqapi = async (org, sno, billing_freq, billing_freq_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateBillingFrequency`
    return axios.post(url, { org, sno, billing_freq, billing_freq_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveBillingFreq = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveBillingFreq`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Vendor Category
export const TotalVendorCategoryapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalVendorCategory`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const DeleteVendorCategoryapi = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteVendorCategory`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const AddVendorCategoryapi = async (org, vendor_category_id, vendor_category, vendor_category_description, user_id) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/insertVendorCategory`
    return axios.post(url, { org, vendor_category_id, vendor_category, vendor_category_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetVendorCategoryapi = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getVendorCategory`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendorCategoryapi = async (org, sno, vendor_category, vendor_category_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateVendorCategory`
    return axios.post(url, { org, sno, vendor_category, vendor_category_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveVendorCategory = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getallvendorcategory`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

//  Location Master

export const TotalLocation = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalLocation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateLocationStatus = async (org, status, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/deleteLocation`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const AddLocationapi = async (org, location_id, company_name, location_code, location_name, location_address_line1, location_address_line2, location_city, location_state, location_pin_code, location_gst, contact_person, contact_person_email, contact_person_number, location_latitude, location_longitude, user_id, location_country) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertLocation`
    return axios.post(url, { org, location_id, company_name, location_code, location_name, location_address_line1, location_address_line2, location_city, location_state, location_pin_code, location_gst, contact_person, contact_person_email, contact_person_number, location_latitude, location_longitude, user_id, location_country }).then(response => response.data).catch(error => console.log(error));
}

export const GetLocation = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getLocation`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateLocation = async (org, sno, company_name, location_code, location_name, location_address_line1, location_address_line2, location_city, location_state, location_pin_code, location_gst, contact_person, contact_person_email, contact_person_number, location_latitude, location_longitude, user_id, location_country) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/updateLocation`
    return axios.post(url, { org, sno, company_name, location_code, location_name, location_address_line1, location_address_line2, location_city, location_state, location_pin_code, location_gst, contact_person, contact_person_email, contact_person_number, location_latitude, location_longitude, user_id, location_country }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveLocation = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getalllocation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Manufacturer Master

export const TotalManufacturerapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalManufacturer`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const UpdateManufacturerStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteManufacturer`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}


export const InsertManufacturer = async (org, manufacturer_id, manufacturer_name, manufacturer_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertManufacturer`
    return axios.post(url, { org, manufacturer_id, manufacturer_name, manufacturer_description, user_id }).then(response => response.data).catch(error => console.log(error));
}


export const GetManufacturer = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getManufacturer`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateManufacturer = async (org, sno, manufacturer_name, manufacturer_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateManufacturer`
    return axios.post(url, { org, sno, manufacturer_name, manufacturer_description, user_id }).then(response => response.data).catch(error => console.log(error));
}


export const ActiveManufacturer = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveManufacturer`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// Issue Type Master

export const TotalIssueTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalIssueType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const UpdateIssueTypeStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteIssueType`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertIssueType = async (org, issue_id, issue_type, issue_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertIssueType`
    return axios.post(url, { org, issue_id, issue_type, issue_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetIssueType = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getIssueType`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateIssueType = async (org, sno, issue_type, issue_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateIssueType`
    return axios.post(url, { org, sno, issue_type, issue_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveIssue = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ActiveIssue`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Contract Type Master

export const TotalContractTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalContractType`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateContractTypeStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteContractType`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertContractType = async (org, contract_id, contract_type, contract_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertContractType`
    return axios.post(url, { org, contract_id, contract_type, contract_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetContractType = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getContractType`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateContractType = async (org, sno, contract_type, contract_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateContractType`
    return axios.post(url, { org, sno, contract_type, contract_description, user_id }).then(response => response.data).catch(error => console.log(error));
}
export const ActiveContractType = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getallcontracttype`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


// Ticket Status Master

export const TotalTicketstatusapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalTicketStatus`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateTicketstatusActive = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteTicketStatus`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertTicketstatus = async (org, ticket_id, ticket_status, ticket_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertTicketStatus`
    return axios.post(url, { org, ticket_id, ticket_status, ticket_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetTicketstatus = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getTicketStatus`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateTicketstatus = async (org, sno, ticket_status, ticket_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateTicketStatus`
    return axios.post(url, { org, sno, ticket_status, ticket_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveTicketStatus = async (org) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/ActiveTicketStatus`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// Vendor Sub Category Master

export const TotalVendSubCateapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalVendorSubCategory`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendSubCateStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteVendorSubCategory`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertVendSubCate = async (org, vendor_sub_category_id, vendor_category, vendor_sub_category, vendor_sub_category_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertVendorSubCategory`
    return axios.post(url, { org, vendor_sub_category_id, vendor_category, vendor_sub_category, vendor_sub_category_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetVendSubCate = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getVendorSubCategory`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendSubCate = async (org, sno, vendor_category, vendor_sub_category, vendor_sub_category_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateVendorSubCategory`
    return axios.post(url, { org, sno, vendor_category, vendor_sub_category, vendor_sub_category_description, user_id }).then(response => response.data).catch(error => console.log(error));
}
export const ActiveVendSubCate = async (org, vendor_category) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getvendorsubcategorybyvend`
    return axios.post(url, { org, vendor_category }).then(response => response.data).catch(error => console.log(error));
}

// Service Action Type Master

export const TotalServiceActionTypeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalServiceAction`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteServiceActionTypeStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteServiceAction`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertServiceActionType = async (org, service_action_id, service_action_type, service_action_type_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertServiceAction`
    return axios.post(url, { org, service_action_id, service_action_type, service_action_type_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetServiceActionType = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getServiceAction`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateServiceActionType = async (org, sno, service_action_type, service_action_type_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateServiceAction`
    return axios.post(url, { org, sno, service_action_type, service_action_type_description, user_id }).then(response => response.data).catch(error => console.log(error));
}


// Service Group Master

export const TotalServiceGroupapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalServiceGroup`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteServiceGroupStatus = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteServiceGroup`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertServiceGroup = async (org, service_group_id, service_group_type, service_group_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertServiceGroup`
    return axios.post(url, { org, service_group_id, service_group_type, service_group_description, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const GetServiceGroup = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getServiceGroup`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateServiceGroup = async (org, sno, service_group_type, service_group_description, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateServiceGroup`
    return axios.post(url, { org, sno, service_group_type, service_group_description, user_id }).then(response => response.data).catch(error => console.log(error));
}



// Vendor Code Master

export const TotalVendorCodeapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalVendorCode`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendorCode = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteVendorCode`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const InsertVendorCode = async (org, vendor_code_id, vendor_code, vendor_name, comp_email, comp_website, comp_gst,
    comp_phone, company_country_id, comp_country, comp_state_id, comp_state, comp_city, comp_pincode, comp_addr1, comp_addr2,
    vendor_portal, contact_person, contact_no, contact_email, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertVendorCode`
    return axios.post(url, {
        org, vendor_code_id, vendor_code, vendor_name, comp_email, comp_website, comp_gst,
        comp_phone, company_country_id, comp_country, comp_state_id, comp_state, comp_city, comp_pincode, comp_addr1, comp_addr2,
        vendor_portal, contact_person, contact_no, contact_email, user_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const GetVendorCode = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getVendorCode`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendorCode = async (org, sno, vendor_code, vendor_name, comp_gst, comp_website, comp_email, comp_phone, comp_country_id, comp_country,
    comp_state_id, comp_state, comp_city, comp_addr1, comp_addr2, comp_pincode, vendor_portal, contact_person, contact_no, contact_email, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateVendorCode`
    return axios.post(url, {
        org, sno, vendor_code, vendor_name, comp_gst, comp_website, comp_email, comp_phone, comp_country_id, comp_country,
        comp_state_id, comp_state, comp_city, comp_addr1, comp_addr2, comp_pincode, vendor_portal, contact_person, contact_no, contact_email, user_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveVendorCode = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getallvendor`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const GetVendorDetails = async (org, vendor_name) => {
    console.log(org, vendor_name)
    const url = `https://drizzlebackend.awlworldwide.com/api/getvendordetails`
    return axios.post(url, { org, vendor_name }).then(response => response.data).catch(error => console.log(error));
}
// Vendor Contract Master

export const TotalVendorContractapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalVendorContract`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const InsertVendorContract = async (org, vendor_contract_id, vendor, type_of_contract,
    major_category, sub_category, location, company, customer_account_no, reference_no, contact_plain_details,
    rate_per_month, contract_start_date, invoice_generation_date, billing_freq, payee_name, tds, link_id_no,
    help_desk_no, userid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/InsertVendorContract`
    return axios.post(url, {org,vendor_contract_id, vendor, type_of_contract,major_category, sub_category, location, company, customer_account_no, reference_no, contact_plain_details,
        rate_per_month, contract_start_date, invoice_generation_date, billing_freq, payee_name, tds, link_id_no,help_desk_no, userid
    }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendorContract = async (org, sno, vendor, type_of_contract,major_category, sub_category, location, company, customer_account_no, reference_no, contact_plain_details,
    rate_per_month, contract_start_date, invoice_generation_date, billing_freq, payee_name, tds, link_id_no,help_desk_no, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdateVendorContract`
    return axios.post(url, {org,sno, vendor, type_of_contract,major_category, sub_category, location, company, customer_account_no, reference_no, contact_plain_details,
        rate_per_month, contract_start_date, invoice_generation_date, billing_freq, payee_name, tds, link_id_no,help_desk_no, user_id
    }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteVendorContract = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/deleteVendorContract`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}

export const GetVendorContract = async (org, sno) => {
    const url = ` https://drizzlebackend.awlworldwide.com/api/getVendorContract`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const ActiveVendorContract = async (org) => {
    const url = `http://localhost:2008/api/ActiveVendorContract`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const VendorContractDetail = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/VendorContractDetail`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const VendorContractOnChange = async (org, value) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/vendorcontractonchange`
    return axios.post(url, { org, value }).then(response => response.data).catch(error => console.log(error));
}

//  #########################   New Assets ##############################

export const TotalNewAssets = async (org,type) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalNewAssets`
    return axios.post(url, { org,type }).then(response => response.data).catch(error => console.log(error));
}

export const InsertNewAssets = async (org, new_asset_type_id, asset_type, asset_tag, serial_no, location, manufacture,
    software, model, asset_status, description, purchase_type, purchase_date, company, vendor, invoice_no,
    rent_per_month, purchases_price, latest_inventory, asset_name, asset_assign, asset_assign_empid, remarks, userid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/InsertNewAssets`
    return axios.post(url, {
        org, new_asset_type_id, asset_type, asset_tag, serial_no, location, manufacture,
        software, model, asset_status, description, purchase_type, purchase_date, company, vendor, invoice_no,
        rent_per_month, purchases_price, latest_inventory, asset_name, asset_assign, asset_assign_empid, remarks, userid
    }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteNewAssets = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/DeleteNewAssets`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}
export const GetNewAssets = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/GetNewAssets`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const CountNewAssets = async (org, asset_type) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/CountNewAssets`
    return axios.post(url, { org, asset_type }).then(response => response.data).catch(error => console.log(error));
}

export const GetNewAssetAssign = async (org, asset_assign_empid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/GetNewAssetAssign`
    return axios.post(url, { org, asset_assign_empid }).then(response => response.data).catch(error => console.log(error));
}
export const UpdateNewAssets = async (org, asset_type, assetetag, serialno, location, manufacture, software,
    model, assetstatus, description, purchase_type, purchasesdate, company, vendor, invoiceno,
    rentpermonth, purchaseprice, latestinventory, assetname, assetassign, asset_assign_empid, remark, userid, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdateNewAssets`
    return axios.post(url, {org, asset_type, assetetag, serialno, location, manufacture, software,model, assetstatus, description, purchase_type, purchasesdate, company, vendor, invoiceno,
        rentpermonth, purchaseprice, latestinventory, assetname, assetassign, asset_assign_empid, remark, userid, sno
    }).then(response => response.data).catch(error => console.log(error));
}

//  #########################   New Assets SubCode ##############################

export const InsertAssetSubCode = async (org, asset_id, asset_tag, software) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertassetssoftware`
    return axios.post(url, { org, asset_id, asset_tag, software }).then(response => response.data).catch(error => console.log(error));
}

//  #########################   Ticketes ##############################

export const InsertTicket = async (org, emp_id, emp_name, asset_type, asset_serial, location, assign_ticket, type_of_issue, email_id,
    ticket_date, ticket_status, ticket_subject, priority, issue_discription, remarks, user_id, AssetTag, AssetCondition) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/InsertTicket`
    return axios.post(url, {org, emp_id, emp_name, asset_type, asset_serial, location, assign_ticket, type_of_issue, email_id,
        ticket_date, ticket_status, ticket_subject, priority, issue_discription, remarks, user_id, AssetTag, AssetCondition
    }).then(response => response.data).catch(error => console.log(error));
}

export const CountTickets = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/CountTickets`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}


export const TotalTicket = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalTicket`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DeleteTickets = async (org, status, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/DeleteTickets`
    return axios.post(url, { org, status, sno }).then(response => response.data).catch(error => console.log(error));
}
export const getTickets = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getTickets`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateTicket = async (org, emp_id, emp_name, asset_type, asset_serial, location, assign_ticket, type_of_issue, email_id,
    ticket_date, ticket_status, ticket_subject, priority, issue_discription, remarks, user_id, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdateTicket`
    return axios.post(url, {org, emp_id, emp_name, asset_type, asset_serial, location, assign_ticket, type_of_issue, email_id,
        ticket_date, ticket_status, ticket_subject, priority, issue_discription, remarks, user_id, sno
    }).then(response => response.data).catch(error => console.log(error));
}

export const OpenTotalTicket = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/OpenTotalTicket`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}



export const TotalHoldTicket = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalHoldTicket`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

//  Voice Invoice

export const InsertVendorInvoice = async (org, data, userid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/InsertVendorInvoice`
    return axios.post(url, { org, data, userid }).then(response => response.data).catch(error => console.log(error));
}
export const GetVendorInvoice = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/GetVendorInvoice`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const PendingVendorInvoice = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/PendingVendorInvoice`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const PendingVendorInvoiceOnChnage = async (org, value) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/vendorinvoiceonchange`
    return axios.post(url, { org, value }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendorInvoice = async (org, data, userid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdateVendorInvoice`
    return axios.post(url, { org, data, userid }).then(response => response.data).catch(error => console.log(error));
}
export const UpdatePendingVendorInvoice = async (org, vendor, accountno, invno, invamt, invdate, invduedate, invsubdate, remark, refno, printercount, sno, filedata) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdatePendingVendorInvoice`
    return axios.post(url, { org, vendor, accountno, invno, invamt, invdate, invduedate, invsubdate, remark, refno, printercount, sno, filedata }).then(response => response.data).catch(error => console.log(error));
}

export const TotalVendorPaymentapi = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalVendorPayment`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const GetVendorPayment = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/GetVendorPayment`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateVendorPayment = async (org, paymentdetail, paymentamt, paymentdate, remark, sno, filedata, ApprovedAmt) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UpdateVendorPayment`
    return axios.post(url, { org, paymentdetail, paymentamt, paymentdate, remark, sno, filedata, ApprovedAmt }).then(response => response.data).catch(error => console.log(error));
}

export const UploadInvoice = async (org, type, document, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/UploadInvoice`
    return axios.post(url, { org, type, document, sno }).then(response => response.data).catch(error => console.log(error));
}

// Dashboard 

export const DashboarDetails = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_details`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const DashboarProcedure = async (type) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_procedure`
    return axios.post(url, { type }).then(response => response.data).catch(error => console.log(error));
}

export const Dashboard_Location_Name = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_location_name`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Dashboard_Software = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_software`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const Dashboard_Manufacture = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_manufacture`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// Ticket Dashboard

export const Ticket_Summary = async (org, userid) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ticket_summary`
    return axios.post(url, { org, userid }).then(response => response.data).catch(error => console.log(error));
}

export const Ticket_Priority = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ticket_priority`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Ticket_issue_type = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ticket_issue_type`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Filter_Ticket_Summary = async (org, statustype, filterby, value) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/filter_ticket_summary`
    return axios.post(url, { org, statustype, filterby, value }).then(response => response.data).catch(error => console.log(error));
}

export const Filter_Ticket_Summary_Count = async (org, type, value) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/filter_ticket_summary_count`
    return axios.post(url, { org, type, value }).then(response => response.data).catch(error => console.log(error));
}

// Vendor Dashboard
export const Vendor_Reference_no = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ReferanceNumber`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const Recurring_Vendor = async (org, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/RecurringVendor`
    return axios.post(url, { org, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const Recurring_Frequency = async (org, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/RecurringFrequency`
    return axios.post(url, { org, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const TotalVendorContract = async (org, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalVendorContractDetails`
    return axios.post(url, { org, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const FilterVendorContract = async (org, type, value, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/FilterVendorContract`
    return axios.post(url, { org, type, value, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const ExportTotalVendorContract = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/exporttotalvendorcontract`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

//Invoice Dashboard
export const Invoice_Outstanding = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/Invoice_Outstanding`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}
export const TotalOutstanding = async (org, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/TotalOutstanding`
    return axios.post(url, { org, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const VendorInvoice = async (org, pageno, rowsperpage,vendorname) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/VendorInvoice`
    return axios.post(url, { org, pageno, rowsperpage,vendorname }).then(response => response.data).catch(error => console.log(error));
}
export const PaidInvoice = async (org, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/PaidInvoice`
    return axios.post(url, { org, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const FilterInvoice = async (org, value, pageno, rowsperpage) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/FilterInvoice`
    return axios.post(url, { org, value, pageno, rowsperpage }).then(response => response.data).catch(error => console.log(error));
}

export const PendingRecurringInvoiceApi = async (org,billling_freq) => {
    const url = `http://localhost:2008/api/recurringpendinginvoice`
    return axios.post(url, { org,billling_freq }).then(response => response.data).catch(error => console.log(error));
}
export const Outstanding_Invoice_filter = async (org, type, value) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/outstandinginvoicefilter`
    return axios.post(url, { org, type, value }).then(response => response.data).catch(error => console.log(error));
}

export const ExportOutstandingInvoiceData = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/exportoutstandinginvoicedata`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

// User Details
export const getUserdetails = async (org, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getuserdetails`
    return axios.post(url, { org, user_id }).then(response => response.data).catch(error => console.log(error));
}

export const updateUserdetails = async (org, employee_name, location, employee_email, employee_number, company, user_id) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateuserdetails`
    return axios.post(url, { org, employee_name, location, employee_email, employee_number, company, user_id }).then(response => response.data).catch(error => console.log(error));
}

// Organisation
export const AddOrganisation = async (org_id, org_name, org_country, org_state, org_city, org_currency, org_gst, org_logo) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/addorganisation`
    return axios.post(url, { org_id, org_name, org_country, org_state, org_city, org_currency, org_gst, org_logo }).then(response => response.data).catch(error => console.log(error));
}

export const getOrganisation = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getorganisation`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const UpdateOrganisationDetails = async (org, org_name, org_country, org_state, org_city, org_currency) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updateorganizationdetails`
    return axios.post(url, { org, org_name, org_country, org_state, org_city, org_currency }).then(response => response.data).catch(error => console.log(error));
}

// Currency Master

// export const CurrencyMaster = async () => {
//     const url = `https://country-info.p.rapidapi.com/`
//     return axios.get(url, {
//         headers: {
//             'X-RapidAPI-Key': '86b0c2197amshffb1cfe02f00926p1f0330jsn8771bfdd86c5',
//             'X-RapidAPI-Host': 'country-info.p.rapidapi.com'
//         }
//     }).then(response => response.data).catch(error => console.log(error))
// }

//Role Master
export const totalRoles = async (org) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/totalroles`
    return axios.post(url, { org }).then(response => response.data).catch(error => console.log(error));
}

export const insertRoles = async (data) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/insertroles`
    return axios.post(url, { data }).then(response => response.data).catch(error => console.log(error));
}

export const getrole = async (org, sno) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/getrole`
    return axios.post(url, { org, sno }).then(response => response.data).catch(error => console.log(error));
}

export const Updaterole = async (data) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/updaterole`
    return axios.post(url, { data }).then(response => response.data).catch(error => console.log(error));
}

//Report

export const ColumnsReport = async (org, table) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/ColumnsReport`
    return axios.post(url, { org, table }).then(response => response.data).catch(error => console.log(error));
}

export const TableReports = async (org, table, columns) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/tableReports`
    return axios.post(url, { org, table, columns }).then(response => response.data).catch(error => console.log(error));
}

export const GraphReport = async (org, table, columns) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/GraphReport`
    return axios.post(url, { org, table, columns }).then(response => response.data).catch(error => console.log(error));
}

// Upload 
export const FileUpload = async (images) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/FileUpload`
    return axios.post(url, images).then(response => response.data).catch(error => console.log(error));
}
// Mail
export const Mail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/Email`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}
export const AssetEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/assetemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}
export const InvoiceEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/invoiceemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}

export const VendorPaymentEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/vendorpaymentemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}

export const VendorCreateEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/vendorcreateemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}


export const EmployeeCreateEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/employeecreateemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}

export const VendorContractEmail = async (message) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/vendorcontractemail`
    return axios.post(url, { message }).then(response => response.data).catch(error => console.log(error));
}

export const AssetReport = async ( location, vendor) => {
    const url = `https://drizzlebackend.awlworldwide.com/api/assetreport`
    return axios.post(url, {location, vendor }).then(response => response.data).catch(error => console.log(error));
}

export const dashboard_asset_data = async () => {
    const url = `https://drizzlebackend.awlworldwide.com/api/dashboard_asset_data`
    return axios.post(url, {}).then(response => response.data).catch(error => console.log(error));
}