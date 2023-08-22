import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import { MdOutlineKeyboardArrowRight, MdFileUpload } from "react-icons/md";
import {
  ActiveVendorContract,
  VendorContractDetail,
  InsertVendorInvoice,
  FileUpload,
  VendorContractOnChange,
  InvoiceEmail,
} from "../../../../api";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GlobalAlertInfo } from "../../../../App";
import Modal from "../../AlertModal/Modal";
import "./addVendorInvoice.css";

function AddVendorInvoice() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [todatdate, setTodaydate] = useState("");
  const [count, setCount] = useState(0);
  const [arry, setArry] = useState([0]);
  const [arryval, setArryval] = useState([{}]);
  const [vendorcontractlist, setVendorcontractlist] = useState([]);
  const [Vendorname, setVendorname] = useState([]);
  const [indexno, setIndexno] = useState();
  const [uploadindexno, setUploadindexno] = useState();

  const [file, setFile] = useState([]);

  // ########################### Modal Alert #############################################
  const { tooglevalue, callfun } = useContext(GlobalAlertInfo);
  // ########################### Modal Alert #############################################

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Database");
      const vendorcontract = await ActiveVendorContract(org);
      setVendorcontractlist(vendorcontract);
      console.log(vendorcontract);
      todaydate();
      setLoading(true);
    };
    fetchdata();
  }, []);

  const todaydate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    let today = year + "-" + month + "-" + day;
    setTodaydate(today);
  };

  const addRow = () => {
    let val = count + 1;
    setCount(val);
    setArry([...arry, val]);
  };

  const RemoveRow = () => {
    if (!(count === 1)) {
      let val = [...arry];
      val.pop();
      setCount(val.length);
      setArry(val);
      let objval = [...arryval];
      objval.pop();
      setArryval(objval);
    } else {
      let objval = [...arryval];
      objval.pop();
      setArryval(objval);
    }
  };

  const savatoarry = (index) => {
    let vendor = Vendorname[index];
    const accountno = document.getElementById(`accountno-${index}`).value;
    const invno = document.getElementById(`invno-${index}`).value;
    const invamt = document.getElementById(`invamt-${index}`).value;

    const invdate = document.getElementById(`invdate-${index}`).value;
    const invduedate = document.getElementById(`invduedate-${index}`).value;
    const invsubdate = document.getElementById(`invsubdate-${index}`).value;
    const remark = document.getElementById(`remark-${index}`).value;
    const refno = document.getElementById(`refno-${index}`).value;
    const printercount = document.getElementById(`printercount-${index}`).value;

    let obj = {
      vendor: vendor,
      accountno: accountno,
      invno: invno,
      invamt: invamt,
      invdate: invdate,
      invduedate: invduedate,
      invsubdate: invsubdate,
      remark: remark,
      refno: refno,
      printercount: printercount,
      filedata: file[index],
    };

    arryval[index] = obj;
  };

  const handleAddVendorIvoice = async (e) => {
    e.preventDefault();

    document.getElementById("subnitbtn").disabled = "true";
    setLoading(false);
    const org = localStorage.getItem("Database");

    console.log(arryval);

    let errorcount = 0;
    for (let i = 0; i < arryval.length; i++) {
      if (!arryval[i]) {
        setLoading(true);
        callfun("Please Select the vendor", "warning", "self");
        document.getElementById("subnitbtn").disabled = false;

        errorcount = errorcount + 1;
        return false;
      } else if (!arryval[i].vendor) {
        setLoading(true);
        document.getElementById("subnitbtn").disabled = false;
        callfun("Please Select the vendor", "warning", "self");

        errorcount = errorcount + 1;
        return false;
      } else if (!arryval[i].invno || !arryval[i].invamt) {
        setLoading(true);
        document.getElementById("subnitbtn").disabled = false;
        callfun("Please enter the Mandatory field", "warning", "self");

        errorcount = errorcount + 1;
        return false;
      }
    }
    if (errorcount === 0) {
      setLoading(true);

      const result = await InsertVendorInvoice(
        org,
        arryval,
        localStorage.getItem("UserId")
      );
      if (result === "Data Added") {
        for (let i = 0; i < arryval.length; i++) {
          const message = {
            type: "Add",
            invoiceno: arryval[i].invno,
            vendorname: arryval[i].vendor,
            reference_no: arryval[i].refno,
            invoice_date: arryval[i].invdate,
            invoice_receive_date: arryval[i].invsubdate,
            invoice_amount: arryval[i].invamt,
            upload: file[i] || "",
          };

          const sendmailresult = await InvoiceEmail(message);
        }
        callfun("Vendor Invoice Added", "success", "/TotalVendorInvoice");
      } else {
        callfun("Server Error", "danger", "self");
        document.getElementById("subnitbtn").disabled = false;
      }
    }
  };

  const handleChnageVendorDetail = async (e) => {
    console.log(e);
    const org = localStorage.getItem("Database");

    let data = Vendorname;
    data[e.Index] = e.vendor;
    setVendorname(data);
    document.getElementById(`button${e.Index}`).innerHTML = e.vendor;

    console.log(Vendorname);

    const detail = await VendorContractDetail(org, e.sno);
    document.getElementById(`accountno-${e.Index}`).value =
      detail.customer_account_no;
    document.getElementById(`refno-${e.Index}`).value = detail.reference_no;
  };

  const handleGetVendorName = async (e) => {
    const getname = await VendorContractOnChange(
      localStorage.getItem("Database"),
      e.target.value
    );
    setVendorcontractlist(getname);
  };

  return (
    <>
      {loading ? (
        <Sidebar>
          {/* ######################### Sanckbar Start ##################################### */}
          <Modal
            theme={tooglevalue.theme}
            text={tooglevalue.message}
            show={tooglevalue.modalshowval}
            url={tooglevalue.url}
          />
          {/* ######################### Sanckbar End ##################################### */}

          <div className="main_container px-1">
            <div className="main-inner-container d-flex justify-content-between  pt-4 pb-3">
              <h4>
                <span className="page-type-head1">
                  Vendor Invoice <MdOutlineKeyboardArrowRight />
                </span>{" "}
                <span className="page-type-head2">Add Vendor Invoice</span>{" "}
              </h4>
              <button
                className="btn btn-secondary btn "
                onClick={() => {
                  window.location.href = "/TotalVendorInvoice";
                }}
              >
                Back <RiArrowGoBackFill />
              </button>
            </div>
            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
              <header className="card-header d-flex justify-content-between align-items-center px-3">
                <h5>Add Vendor Invoice</h5>
                <div>
                  <button className="btn btn-voilet" onClick={addRow}>
                    Add row
                  </button>
                  <button
                    className="btn btn-secondary mx-2 "
                    onClick={RemoveRow}
                  >
                    Remove row
                  </button>
                </div>
              </header>
              <article className="card-body">
                <form autoComplete="off">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">
                          Vendor <span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Account No<span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Invoice No <span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Invoice Amt <span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Invoice Date <span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Invoice DueDate <span className="text-danger">*</span>
                        </th>
                        <th scope="col">
                          Invoice SubDate <span className="text-danger">*</span>
                        </th>
                        <th scope="col">Remark </th>
                        <th scope="col">
                          Ref no. <span className="text-danger">*</span>
                        </th>
                        <th scope="col">Reading</th>
                        <th scope="col">Upload</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arry.map((item, index) => (
                        <tr key={index}>
                          <td className="p-0 ">
                            <button
                              type="button"
                              id={`button${index}`}
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#vendorModalCenter"
                              onClick={(e) => {
                                setIndexno(index);
                                setTimeout(() => {
                                  document
                                    .getElementById("searchInvoice")
                                    .focus();
                                }, 200);
                              }}
                            >
                              {"Select"}
                            </button>
                          </td>
                          <td className="p-0 ">
                            <input
                              type="text"
                              id={`accountno-${index}`}
                              className="form-control m-0  border-0"
                              disabled
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="text"
                              id={`invno-${index}`}
                              className="form-control m-0  border-0"
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="number"
                              id={`invamt-${index}`}
                              className="form-control m-0  border-0"
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="date"
                              id={`invdate-${index}`}
                              className="form-control m-0  border-0"
                              defaultValue={todatdate}
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="date"
                              id={`invduedate-${index}`}
                              className="form-control m-0  border-0"
                              defaultValue={todatdate}
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="date"
                              id={`invsubdate-${index}`}
                              className="form-control m-0  border-0"
                              defaultValue={todatdate}
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="text"
                              id={`remark-${index}`}
                              className="form-control m-0  border-0"
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="text"
                              id={`refno-${index}`}
                              className="form-control m-0  border-0"
                              disabled
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <input
                              type="text"
                              id={`printercount-${index}`}
                              className="form-control m-0  border-0"
                              onBlur={() => savatoarry(index)}
                            />
                          </td>
                          <td className="p-0 ">
                            <button
                              className="form-control m-0  border-0"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={(e) => {
                                e.preventDefault();
                                setUploadindexno(index);
                                document.getElementById(
                                  "uploadbutton"
                                ).style.display = "none";
                                document.getElementById("inputfile").value = "";
                              }}
                            >
                              <MdFileUpload
                                style={{
                                  fontSize: "25px",
                                  color: file[index] ? "green" : "",
                                }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="btn_div mx-2">
                    <button
                      className="btn btn-voilet"
                      id="subnitbtn"
                      onClick={handleAddVendorIvoice}
                    >
                      Submit
                    </button>
                    <button type="reset" className="btn btn-secondary mx-2">
                      Reset
                    </button>
                  </div>
                </form>
              </article>
            </div>
          </div>
        </Sidebar>
      ) : (
        <LoadingPage />
      )}

      {/* ####################### Upload  Modal  Start ################################## */}

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Upload Invoice
              </h5>
            </div>
            <div className="modal-body">
              <input
                type="file"
                id="inputfile"
                onChange={async (event) => {
                  console.log(event.target.files[0]);
                  setLoading2(true);
                  setTimeout(async () => {
                    const data = new FormData();
                    data.append("images", event.target.files[0]);
                    const UploadLink = await FileUpload(data);
                    if (UploadLink.length > 1) {
                      file[uploadindexno] = UploadLink;
                      document.getElementById("uploadbutton").style.display =
                        "flex";
                      setLoading2(false);
                    }
                  }, 2000);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="uploadbutton"
                data-dismiss="modal"
                style={{ display: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  savatoarry(uploadindexno);
                }}
              >
                Upload
              </button>
              {loading2 ? "Wait a Sec" : null}
            </div>
          </div>
        </div>
      </div>
      {/* ####################### Upload  Modal  ENd ################################## */}

      {/* ####################### Vendor  Modal  Start ################################## */}
      <div
        className="modal fade"
        id="vendorModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ minWidth: "53vw" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Select Vendor Name
              </h5>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control col"
                  placeholder="Enter vendor name to search "
                  id="searchInvoice"
                  onChange={handleGetVendorName}
                />
              </div>
            </div>
            <div
              className="modal-body overflow-auto position-relative p-0"
              style={{ maxHeight: "60vh" }}
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Vendor Name</th>
                    <th>Reference no</th>
                    <th>Account no</th>
                    <th>Printer Count</th>

                  </tr>
                </thead>
                <tbody>
                  {vendorcontractlist.map((item, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer"
                      data-dismiss="modal"
                      value={`${item.sno},${item.vendor}`}
                      onClick={(e) => {
                        handleChnageVendorDetail({
                          sno: item.sno,
                          vendor: item.vendor,
                          reference_no: item.reference_no,
                          Index: indexno,
                        });
                        savatoarry(indexno);
                      }}
                    >
                      <td>{item.company}</td>
                      <td>{item.vendor}</td>
                      <td>{item.reference_no}</td>
                      <td>{item.customer_account_no}</td>
                      <td>{item.printer_counter}</td>

                      
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className='mt-0 d-flex justify-content-between px-5 text-danger border-bottom border-dark position-sticky top-0  bg-white '
                                style={{ zIndex: '2' }}><span>Vendor Name(Reference  no)</span><span>Account no</span></div> */}

              {/* <ul>
                                {
                                    vendorcontractlist.map((item, index) => (
                                        <li key={index} className="vendor-Invoice-list cursor-pointer d-flex justify-content-between" data-dismiss="modal"
                                            value={`${item.sno},${item.vendor}`}
                                            onClick={(e) => {
                                                handleChnageVendorDetail({ sno: item.sno, vendor: item.vendor, reference_no: item.reference_no, Index: indexno });
                                                savatoarry(indexno)
                                            }}
                                        ><span>{item.vendor}, ({item.reference_no})</span> <span>{item.customer_account_no}</span></li>
                                    ))
                                }
                            </ul> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ####################### Vendor  Modal  End ################################## */}
    </>
  );
}

export default AddVendorInvoice;
