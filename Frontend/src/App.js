import React, { createContext, useState } from 'react';
import './App.css';
import './masterCss.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/LandingPage/Login/Login'
import ForgetPassword from './components/LandingPage/Forgetpassword/ForgetPassword'

import Signup from './components/LandingPage/Register/Register'
import LandingPage from './components/LandingPage/LandingPageHome/LandingPage'

import PrivatRoute from './components/HOC/PrivateRoutes';

import Dashboard from './components/pages/Dashboard/Dashboard.js';

import Totalseries from './components/pages/IperiscopeMaster/Series/Totalseries';
import Addseries from './components/pages/IperiscopeMaster/Series/Addseries';
import Editseries from './components/pages/IperiscopeMaster/Series/Editseries';

import TotalDeviceType from './components/pages/IperiscopeMaster/Device_Type/ShowDevice_Type';
import AddDevicetype from './components/pages/IperiscopeMaster/Device_Type/AddDevicetype';
import EditDevicetype from './components/pages/IperiscopeMaster/Device_Type/EditDevicetype';

import Showdevicegroup from './components/pages/IperiscopeMaster/Devicegroup/Showdevicegroup';
import AddDevicegroup from './components/pages/IperiscopeMaster/Devicegroup/AddDevicegroup';
import EditDevicegroup from './components/pages/IperiscopeMaster/Devicegroup/EditDevicegroup';

import TotalOperatingSystem from './components/pages/IperiscopeMaster/OperatingSystem/TotalOperatingSystem';
import AddOperatingSystem from './components/pages/IperiscopeMaster/OperatingSystem/AddOperatingSystem';
import EditOperatingSystem from './components/pages/IperiscopeMaster/OperatingSystem/EditOperatingSystem';

import ShowDeviceservices from './components/pages/IperiscopeMaster/Device_services/Show_deviceservices';
import AddDeviceservices from './components/pages/IperiscopeMaster/Device_services/Add_deviceservices';
import EditDeviceServices from './components/pages/IperiscopeMaster/Device_services/Edit_deviceservices';

import TotalServicecompliance from './components/pages/IperiscopeMaster/ServiceCompliance/TotalServiceCompliance';
import AddServicecompliance from './components/pages/IperiscopeMaster/ServiceCompliance/AddServiceCompliance';
import EditServiceCompliance from './components/pages/IperiscopeMaster/ServiceCompliance/EditServiceCompliance';

import TotalDeviceTask from './components/pages/IperiscopeMaster/Devicetask/TotalDevicetask';
import AddDevicetask from './components/pages/IperiscopeMaster/Devicetask/AddDevicetask';
import EditDevicetask from './components/pages/IperiscopeMaster/Devicetask/EditDevicetask';

import TotalAgent from './components/pages/IperiscopeMaster/Agent_master/TotalAgentmaster';
import AddAgent from './components/pages/IperiscopeMaster/Agent_master/AddAgent';
import EditAgent from './components/pages/IperiscopeMaster/Agent_master/EditAgent';

import TotalDevice from './components/pages/Device/TotalDevice';
import AddDevice from './components/pages/Device/AddDevice';
import EditDevice from './components/pages/Device/EditDevice';

import TotalDeviceComp from './components/pages/DeviceTask&Comp/DeviceComp/TotalDeviceComp';
import AddDeviceComp from './components/pages/DeviceTask&Comp/DeviceComp/AddDeviceComp';
import EditDeviceComp from './components/pages/DeviceTask&Comp/DeviceComp/Editdevicecomp';

import TotalDeviceServiceTask from './components/pages/DeviceTask&Comp/DeviceTask/TotalDeviceTask';
import AddDeviceServiceTask from './components/pages/DeviceTask&Comp/DeviceTask/AddDeviceServiceTask';
import EditDeviceServiceTask from './components/pages/DeviceTask&Comp/DeviceTask/EditDeviceServiceTask';

import TotalOrganization from './components/pages/DrizzleMaster/organization/Totalorganization'

import TotalEmployee from './components/pages/DrizzleMaster/Employee/TotalEmployee'
import AddEmployee from './components/pages/DrizzleMaster/Employee/AddEmployee'
import EditEmployee from './components/pages/DrizzleMaster/Employee/Editemployee';

import TotalAssetType from './components/pages/DrizzleMaster/AssetTypeMaster/TotalAssetType';
import AddAssetType from './components/pages/DrizzleMaster/AssetTypeMaster/AddAssetType';
import EditAssetType from './components/pages/DrizzleMaster/AssetTypeMaster/EditAssetType';

import TotalAssetStatus from './components/pages/DrizzleMaster/AssetStatusMaster/TotalAssetStatus';
import AddAssetStatus from './components/pages/DrizzleMaster/AssetStatusMaster/AddAssetStatus';
import EditAssetStatus from './components/pages/DrizzleMaster/AssetStatusMaster/EditAssetStatus';

import TotalSoftware from './components/pages/DrizzleMaster/SoftwareMaster/TotalSoftware'
import AddSoftware from './components/pages/DrizzleMaster/SoftwareMaster/AddSoftware';
import EditSoftware from './components/pages/DrizzleMaster/SoftwareMaster/EditSoftware';

import TotalPurchaseType from './components/pages/DrizzleMaster/PurchaseTypeMaster/TotalIPurchaseType';
import AddPurchaseType from './components/pages/DrizzleMaster/PurchaseTypeMaster/AddPurchaseType';
import EditPurchaseType from './components/pages/DrizzleMaster/PurchaseTypeMaster/EditPurchaseType';

import TotalPriority from './components/pages/DrizzleMaster/PriorityMaster/TotalPriority';
import AddPriority from './components/pages/DrizzleMaster/PriorityMaster/AddPriority';
import EditPriority from './components/pages/DrizzleMaster/PriorityMaster/EditPriority';

import TotalBillingFreq from './components/pages/DrizzleMaster/BillingFrequency/Totalbillingfreq';
import AddBillingFreq from './components/pages/DrizzleMaster/BillingFrequency/AddBillingfreq';
import EditBillingFreq from './components/pages/DrizzleMaster/BillingFrequency/EditBillingfreq';

import TotalLocations from './components/pages/DrizzleMaster/Location/TotalLocation';
import AddLocation from './components/pages/DrizzleMaster/Location/AddLocation';
import EditLocation from './components/pages/DrizzleMaster/Location/EditLocation';

import TotalVendorCategory from './components/pages/DrizzleMaster/VendorCategoryMaster/TotalVendorcategory';
import AddVendorCategory from './components/pages/DrizzleMaster/VendorCategoryMaster/AddVendorcategory';
import EditVendorcategory from './components/pages/DrizzleMaster/VendorCategoryMaster/EditVebdorcategory'

import TotalManufacturer from './components/pages/DrizzleMaster/ManufacturerMaster/TotalManufacturer';
import EditManufacturer from './components/pages/DrizzleMaster/ManufacturerMaster/EditManufacturer';
import AddManufacturer from './components/pages/DrizzleMaster/ManufacturerMaster/AddManufacturer';

import TotalIssueType from './components/pages/DrizzleMaster/IssueType/TotalIssueType';
import EditIssueType from './components/pages/DrizzleMaster/IssueType/EditIssueType';
import AddIssueType from './components/pages/DrizzleMaster/IssueType/AddIssueType';

import TotalContractType from './components/pages/DrizzleMaster/ContractType/TotalContractType';
import EditContractType from './components/pages/DrizzleMaster/ContractType/EditContractType';
import AddContractType from './components/pages/DrizzleMaster/ContractType/AddContractType';

import TotalTicketStatus from './components/pages/DrizzleMaster/TicketStatus/TotalTicketStatus';
import EditTicketStatus from './components/pages/DrizzleMaster/TicketStatus/EditTicketStatus';
import AddTicketStatus from './components/pages/DrizzleMaster/TicketStatus/AddTicketStatus';

import TotalVendSubCate from './components/pages/DrizzleMaster/VendSubCategory/TotalVendSubCate';
import EditVendorSubCategory from './components/pages/DrizzleMaster/VendSubCategory/EditVendSubCate';
import AddVendorSubCategory from './components/pages/DrizzleMaster/VendSubCategory/AddVendSubCate';

import TotalServiceActionType from './components/pages/DrizzleMaster/ServiceActionType/TotalServiceActionType';
import EditServiceActionType from './components/pages/DrizzleMaster/ServiceActionType/EditServiceActionType';
import AddServiceActionType from './components/pages/DrizzleMaster/ServiceActionType/AddServiceActionType';

import TotalServiceGroup from './components/pages/DrizzleMaster/ServiceGroup/TotalServiceGroup';
import EditServiceGroup from './components/pages/DrizzleMaster/ServiceGroup/EditServiceGroup';
import AddServiceGroup from './components/pages/DrizzleMaster/ServiceGroup/AddServiceGroup';

import TotalVendorCode from './components/pages/DrizzleMain/VendorCode/TotalVendorCode';
import EditVendorCode from './components/pages/DrizzleMain/VendorCode/EditVendorCode';
import AddVendorCode from './components/pages/DrizzleMain/VendorCode/AddVendorCode';

import TotalVendorContract from './components/pages/DrizzleMain/VendorContract/TotalVendorContract';
import EditVendorContract from './components/pages/DrizzleMain/VendorContract/EditVendorContract';
import AddVendorContract from './components/pages/DrizzleMain/VendorContract/AddVendorContract';



import TotalVendorInvoice from './components/pages/Transaction/VendorInvoice/TotalVendorInvoice';
import AddVendorInvoice from './components/pages/Transaction/VendorInvoice/AddVendorInvoice';
import EditVendorInvoice from './components/pages/Transaction/VendorInvoice/EditVendorInvoice';

import TotalVendorPayment from './components/pages/Transaction/VendorPayment/TotalVendorPayment';
import AddVendorPayment from './components/pages/Transaction/VendorPayment/AddVendorPayment';
import EditVendorPayments from './components/pages/Transaction/VendorPayment/EditVendorPayment';


import TotalNewAssets from './components/pages/HelpDesk/NewAssets/TotalNewAssets';
import AddNewAssets from './components/pages/HelpDesk/NewAssets/AddNewAssets';
import EditAsset from './components/pages/HelpDesk/NewAssets/EditAsset';

import AddTicket from './components/pages/HelpDesk/Tickets/AddTicket';
import EditTicket from './components/pages/HelpDesk/Tickets/EditTicket';
import TotalTicket from './components/pages/HelpDesk/Tickets/TotalTicket';
import OpenTotalTickets from './components/pages/HelpDesk/Tickets/OpenTicket';
import HoldTotalTickets from './components/pages/HelpDesk/Tickets/HoldTicket';

import HelpDeskSideBar from './components/HelpDeskUi/HelpDeskSideBar';
import Profile from './components/Profile/Profile';

import ChangePassword from './components/pages/ChangePassword/ChangePassword';


import Contactus from './components/Sidebar/Contactus/Contactus';

import TotalRoles from './components/pages/Setting/Roles/TotalRoles';
import AddRoles from './components/pages/Setting/Roles/AddRole';
import EditRole from './components/pages/Setting/Roles/EditRole'

import OrganisationDetails from './components/LandingPage/Register/Organistion';

import TotalAssignRole from './components/pages/Setting/AssignRole/TotalAssignRole';
import AddAssignRole from './components/pages/Setting/AssignRole/AddAssignRole';
import EditAssignRole from './components/pages/Setting/AssignRole/EditAssignRole';

import PageNotFound from './components/404/404';
import Reports from './components/pages/Reports/Reports';
import AssetReports from './components/Sidebar/Reports/AssetReport';


export const GlobalAlertInfo = createContext();


const App = () => {

  // #############################  Test ##############################
  const [tooglevalue, setTogglevalue] = useState({
    modalshowval: false,
    message: "",
    theme: "success",
    url: "self"
  });
  const callfun = (mess, thm, hrf) => {
    setTogglevalue({
      modalshowval: true,
      message: mess,
      theme: thm,
      url: hrf
    });

    setInterval(() => {
      setTogglevalue({ modalshowval: false });
      hrf !== 'self' ? window.location.href = hrf : setTogglevalue({ modalshowval: false });
    }, 3000);
  };

  // ########################### Test ##################################

  return (
    <GlobalAlertInfo.Provider value={{ callfun: callfun, tooglevalue: tooglevalue }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Signin" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />

          <Route element={<PrivatRoute />}>

            <Route path="/dashboard" element={<Dashboard />} />
            {/* ---- Not in Use */}
            <Route path="/Totalseries" element={<Totalseries />} />
            <Route path="/Addseries" element={<Addseries />} />
            <Route path="/Editseries" element={<Editseries />} />

            <Route path="/TotalDeviceType" element={<TotalDeviceType />} />
            <Route path="/AddDevicetype" element={<AddDevicetype />} />
            <Route path="/EditDevicetype" element={<EditDevicetype />} />

            {/* Not in use */}
            <Route path="/Showdevicegroup" element={<Showdevicegroup />} />
            <Route path="/AddDevicegroup" element={<AddDevicegroup />} />
            <Route path="/EditDevicegroup" element={<EditDevicegroup />} />

            {/* Not in use */}
            <Route path="/TotalOperatingSystem" element={<TotalOperatingSystem />} />
            <Route path="/AddOperatingSystem" element={<AddOperatingSystem />} />
            <Route path="/EditOperatingSystem" element={<EditOperatingSystem />} />

            {/* Not in use */}
            <Route path="/ShowDeviceservices" element={<ShowDeviceservices />} />
            <Route path="/AddDeviceservices" element={<AddDeviceservices />} />
            <Route path="/EditDeviceServices" element={<EditDeviceServices />} />

            {/* Not in use */}
            <Route path="/TotalServicecompliance" element={<TotalServicecompliance />} />
            <Route path="/AddServicecompliance" element={<AddServicecompliance />} />
            <Route path="/EditServiceCompliance" element={<EditServiceCompliance />} />

            {/* Not in use */}
            <Route path="/TotalDeviceTask" element={<TotalDeviceTask />} />
            <Route path="/AddDevicetask" element={<AddDevicetask />} />
            <Route path="/EditDevicetask" element={<EditDevicetask />} />

            {/* Not in use */}
            <Route path="/TotalAgent" element={<TotalAgent />} />
            <Route path="/AddAgent" element={<AddAgent />} />
            <Route path="/EditAgent" element={<EditAgent />} />

            <Route path="/TotalDevice" element={<TotalDevice />} />
            <Route path="/AddDevice" element={<AddDevice />} />
            <Route path="/EditDevice" element={<EditDevice />} />

            <Route path="/TotalDeviceComp" element={<TotalDeviceComp />} />
            <Route path="/AddDeviceComp" element={<AddDeviceComp />} />
            <Route path="/EditDeviceComp" element={<EditDeviceComp />} />

            <Route path="/TotalDeviceServiceTask" element={<TotalDeviceServiceTask />} />
            <Route path="/AddDeviceServiceTask" element={<AddDeviceServiceTask />} />
            <Route path="/EditDeviceServiceTask" element={<EditDeviceServiceTask />} />

            <Route path="/TotalOrganization" element={<TotalOrganization />} />

            <Route path="/TotalLocations" element={<TotalLocations />} />
            <Route path="/AddLocation" element={<AddLocation />} />
            <Route path="/EditLocation" element={<EditLocation />} />

            <Route path="/TotalEmployee" element={<TotalEmployee />} />
            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/EditEmployee" element={<EditEmployee />} />

            <Route path="/TotalAssetType" element={<TotalAssetType />} />
            <Route path="/AddAssetType" element={<AddAssetType />} />
            <Route path="/EditAssetType" element={<EditAssetType />} />

            <Route path="/TotalManufacturer" element={<TotalManufacturer />} />
            <Route path="/AddManufacturer" element={<AddManufacturer />} />
            <Route path="/EditManufacturer" element={<EditManufacturer />} />

            <Route path="/TotalIssueType" element={<TotalIssueType />} />
            <Route path="/AddIssueType" element={<AddIssueType />} />
            <Route path="/EditIssueType" element={<EditIssueType />} />

            <Route path="/TotalContractType" element={<TotalContractType />} />
            <Route path="/AddContractType" element={<AddContractType />} />
            <Route path="/EditContractType" element={<EditContractType />} />

            <Route path="/TotalAssetStatus" element={<TotalAssetStatus />} />
            <Route path="/AddAssetStatus" element={<AddAssetStatus />} />
            <Route path="/EditAssetStatus" element={<EditAssetStatus />} />

            <Route path="/TotalSoftware" element={<TotalSoftware />} />
            <Route path="/AddSoftware" element={<AddSoftware />} />
            <Route path="/EditSoftware" element={<EditSoftware />} />

            <Route path="/TotalPurchaseType" element={<TotalPurchaseType />} />
            <Route path="/AddPurchaseType" element={<AddPurchaseType />} />
            <Route path="/EditPurchaseType" element={<EditPurchaseType />} />

            <Route path="/TotalPriority" element={<TotalPriority />} />
            <Route path="/AddPriority" element={<AddPriority />} />
            <Route path="/EditPriority" element={<EditPriority />} />

            <Route path="/TotalBillingFreq" element={<TotalBillingFreq />} />
            <Route path="/AddBillingFreq" element={<AddBillingFreq />} />
            <Route path="/EditBillingFreq" element={<EditBillingFreq />} />

            <Route path="/TotalVendorCategory" element={<TotalVendorCategory />} />
            <Route path="/AddVendorCategory" element={<AddVendorCategory />} />
            <Route path="/EditVendorcategory" element={<EditVendorcategory />} />

            <Route path="/TotalTicketStatus" element={<TotalTicketStatus />} />
            <Route path="/AddTicketStatus" element={<AddTicketStatus />} />
            <Route path="/EditTicketStatus" element={<EditTicketStatus />} />
            <Route path="/OpenTotalTickets" element={<OpenTotalTickets />} />
            <Route path="/HoldTotalTickets" element={<HoldTotalTickets />} />




            <Route path="/TotalVendSubCate" element={<TotalVendSubCate />} />
            <Route path="/AddVendorSubCategory" element={<AddVendorSubCategory />} />
            <Route path="/EditVendorSubCategory" element={<EditVendorSubCategory />} />

            <Route path="/TotalServiceActionType" element={<TotalServiceActionType />} />
            <Route path="/EditServiceActionType" element={<EditServiceActionType />} />
            <Route path="/AddServiceActionType" element={<AddServiceActionType />} />

            <Route path="/TotalServiceGroup" element={<TotalServiceGroup />} />
            <Route path="/EditServiceGroup" element={<EditServiceGroup />} />
            <Route path="/AddServiceGroup" element={<AddServiceGroup />} />

            <Route path="/TotalVendorCode" element={<TotalVendorCode />} />
            <Route path="/EditVendorCode" element={<EditVendorCode />} />
            <Route path="/AddVendorCode" element={<AddVendorCode />} />

            <Route path="/TotalVendorContract" element={<TotalVendorContract />} />
            <Route path="/EditVendorContract" element={<EditVendorContract />} />
            <Route path="/AddVendorContract" element={<AddVendorContract />} />

            <Route path="/TotalVendorInvoice" element={<TotalVendorInvoice />} />
            <Route path="/AddVendorInvoice" element={<AddVendorInvoice />} />
            <Route path="/EditVendorInvoice" element={<EditVendorInvoice />} />


            <Route path="/TotalVendorPayment" element={<TotalVendorPayment />} />
            <Route path="/AddVendorPayment" element={<AddVendorPayment />} />
            <Route path="/EditVendorPayments" element={<EditVendorPayments />} />

            <Route path="/TotalNewAssets" element={<TotalNewAssets />} />
            <Route path="/AddNewAssets" element={<AddNewAssets />} />
            <Route path="/EditAsset" element={<EditAsset />} />

            <Route path="/EditTicket" element={<EditTicket />} />
            <Route path="/TotalTicket" element={<TotalTicket />} />
            <Route path="/AddTickets" element={<AddTicket />} />

            <Route path="/ChangePassword" element={<ChangePassword />} />

            <Route path="/Profile" element={<Profile />} />
            <Route path='/OrganisationDetails' element={<OrganisationDetails />} />

            <Route path='/Contactus' element={<Contactus />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/assetreports' element={<AssetReports />} />

            <Route path='/TotalRoles' element={<TotalRoles />} />
            <Route path='/NewRoles' element={<AddRoles />} />
            <Route path='/EditRole' element={<EditRole />} />


            <Route path='/TotalAssignRole' element={<TotalAssignRole />} />
            <Route path='/AddAssignRole' element={<AddAssignRole />} />
            <Route path='/EditAssignRole' element={<EditAssignRole />} />

          </Route>

          <Route path="/HelpDescription" element={<HelpDeskSideBar />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>

      </BrowserRouter>
    </GlobalAlertInfo.Provider>
  );
};

export default App;