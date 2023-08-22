import "./Outstandingdetail.css";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  TotalOutstanding,
  PaidInvoice,
  FilterInvoice,
  Outstanding_Invoice_filter,
} from "../../../../api/index";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { MdDownload } from 'react-icons/md'


const Outstatndingdetails = () => {
  const [TotalVendor, setTotalVendor] = useState([]);
  const [PaidInvoicess, setPaidInvoice] = useState([]);
  const [rowperpage, setRowPerPage] = useState(10);
  const [lastval, setLastval] = useState();
  const [paidrowperpage, setPaidRowPerPage] = useState(10);
  const [paidlastval, setPaidLastval] = useState();
  const [filter, setFilter] = useState(false);
  const [filterval, setFilterVal] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Database");

      const datas = await TotalOutstanding(org, 1, 10);
      console.log(datas);
      setTotalVendor(datas.data);
      setRowPerPage(10);
      const total = datas.TotalData[0]["Totaldata"];

      setLastval(Math.ceil(total / 10));

      const paidinvoices = await PaidInvoice(org, 1, 10);
      console.log('paid',paidinvoices);
      setPaidInvoice(paidinvoices.data);
      setPaidRowPerPage(10);
      const totalval = paidinvoices.TotalData[0]["Totaldata"];
      setPaidLastval(Math.ceil(totalval / 10));
    };
    fetchdata();
  }, []);

  const filterdata = async (e) => {
    e.preventDefault();
    const values = document.getElementById("filterSearch").value
    const org = localStorage.getItem("Database");
    // if (values) {
      setFilterVal(values);
      const datas = await FilterInvoice(org, values, 1, 10);
      console.log(datas)
      setTotalVendor(datas.data);
      setRowPerPage(10);
      const total = datas.TotalData[0]["Totaldata"];
      setLastval(Math.ceil(total / 10));
      // setPaidInvoice(datas.PaidInv);
      // setPaidRowPerPage(10);
      // const totalval = datas.Paiddata[0]["Totaldata"];
      // setPaidLastval(Math.ceil(totalval / 10));
      setFilter(true);
    // } else {
    //   return;
    // }
  };

  const handlePageClick = async (data) => {
    if (filter === true) {
      const datas = await FilterInvoice(
        localStorage.getItem("Database"),
        filterval,
        data.selected + 1,
        10
      );
      setTotalVendor(datas.data);
      const total = datas.TotalData[0]["Totaldata"];
      setLastval(Math.ceil(total / 10));
    } else {
      const datas = await TotalOutstanding(
        localStorage.getItem("Database"),
        data.selected + 1,
        rowperpage
      );
      setTotalVendor(datas.data);
    }
  };

  const handlePageClickpaid = async (data) => {
    if (filter === true) {
      const datas = await FilterInvoice(
        localStorage.getItem("Database"),
        filterval,
        data.selected + 1,
        10
      );
      setPaidInvoice(datas.PaidInv);
      const totalval = datas.Paiddata[0]["Totaldata"];
      setPaidLastval(Math.ceil(totalval / 10));
    } else {
      const datas = await PaidInvoice(
        localStorage.getItem("Database"),
        data.selected + 1,
        paidrowperpage
      );
      setPaidInvoice(datas.data);
    }
  };
  const handleChange = () => {
    document.getElementById("display").style.display = "flex";
  };

  const handleClick = async (type, value) => {
    const result = await Outstanding_Invoice_filter(
      localStorage.getItem("Database"),
      type,
      value
    );
    setData(result);
  };

  return (
    <>
      <div className="search-field ">
          <input className="form-control text-captilization" type="search" id="filterSearch" onChange={filterdata} placeholder="Search ..."/>
      </div>

      <div className="outstanding_details position-relative justify-content-around">
        <div className="Outstanding_details_table_div bg-white rounded shadow1-silver">
          <p className=" text-white text-white rounded">
            Total Invoice-Detailed
          </p>
          <div className="Outstanding_details_table rounded px-3">
            <table className="table" >
              <thead className="position-sticky bg-white top-0" >
                <tr className="text-danger">
                  <th scope="col">Vendor</th>
                  <th scope="col">Invoice_no</th>
                  <th scope="col">Reference No</th>
                  <th scope="col">Invoice Amt</th>
                  <th scope="col">Invoice Date</th>
                  <th scope="col">Reading</th>
                  <th scope="col">Remark</th>
                  <th scope="col">Download Invoice</th>
                  <th scope="col">Download Payment</th>
                  <th scope="col">Payment Amount</th>
                  <th scope="col">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {TotalVendor.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="4">Table have no Data </td>
                  </tr>
                ) : (
                  TotalVendor.map((elements, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#vendorModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Vendor", elements.vendor);
                          }}
                        >
                          {elements.vendor}
                        </td>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#invoiceModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Invoice", elements.invoice_no);
                          }}
                        >
                          {elements.invoice_no}
                        </td>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#ReferanceModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Referance", elements.reference_no);
                          }}
                        >
                          {elements.reference_no}
                        </td>
                        <td>{elements.invoice_amt}</td>
                        <td>{elements.date}</td>
                        <td>{elements.printer_counter}</td>
                        <td>{elements.remark}</td>

                        <td className="cursor-pointer" style={{ fontSize: "22px" }}>
                          {elements.uploadInvoice ? (
                            <a
                              href={elements.uploadInvoice}
                              className="text-success"
                              target="_blank"
                              download
                            >
                              <MdDownload title="Download Invoice" />
                            </a>
                          ) : (
                            <MdDownload
                              className="text-danger"
                              title="Invoice Not Uploaded"
                            />
                          )}
                        </td>
                        <td className="cursor-pointer " style={{ fontSize: "22px" }} >
                          {elements.uploadpayment ? (
                            <a href={elements.uploadpayment} className="text-success" target="_blank" download>
                              <MdDownload title="Download Invoice" />
                            </a>
                          ) : (
                            <MdDownload className="text-danger" title="Invoice Not Uploaded"/>
                          )}
                        </td>
                        <td>{elements.invoice_amt}</td>
                        <td>{elements.Payment_date}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<IoMdArrowDropright style={{ fontSize: "24px" }} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={lastval}
            previousLabel={<IoMdArrowDropleft style={{ fontSize: "24px" }} />}
            renderOnZeroPageCount={null}
            containerClassName={
              "outstanding-pagination bg-white pagination justify-content-end"
            }
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        {/* <div className="Outstanding_details_table_div bg-white rounded shadow1-silver ">
          <p
            className=" text-white text-white rounded"
            style={{
              background:
                " linear-gradient(45deg, rgb(55, 55, 55), rgb(121, 118, 113))",
            }}
          >
            Paid Invoices - Detailed
          </p>
          <div className="Outstanding_details_table px-3 rounded">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Vendor</th>
                  <th scope="col">Invoice_no</th>
                  <th scope="col">Reference No</th>
                  <th scope="col">Payment Amount</th>
                  <th scope="col">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {PaidInvoicess.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="4">Table have no data</td>
                  </tr>
                ) : (
                  PaidInvoicess.map((elements, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#vendorModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Vendor", elements.vendor);
                          }}
                        >
                          {elements.vendor}
                        </td>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#invoiceModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Invoice", elements.invoice_no);
                          }}
                        >
                          {elements.invoice_no}
                        </td>
                        <td
                          className="cursor-pointer text-primary"
                          data-toggle="modal"
                          data-target="#ReferanceModal"
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("Referance", elements.reference_no);
                          }}
                        >
                          {elements.reference_no}
                        </td>
                      
                        <td>{elements.invoice_amt}</td>
                        <td>{elements.Payment_date}</td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<IoMdArrowDropright style={{ fontSize: "24px" }} />}
            onPageChange={handlePageClickpaid}
            pageRangeDisplayed={3}
            pageCount={paidlastval}
            previousLabel={<IoMdArrowDropleft style={{ fontSize: "24px" }} />}
            renderOnZeroPageCount={null}
            containerClassName={
              "outstanding-pagination bg-white pagination justify-content-end"
            }
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div> */}
      </div>
      {/* Vendor Modal */}

      <div className="modal fade" id="vendorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle"> Vendor Details </h5>
            </div>
            <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }} >
              <table className="table ">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Company Email</th>
                    <th>Ticket Phone</th>
                    <th>Contact Person</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length
                    ? data.map((value, index) => (
                        <tr key={index}>
                          <td>{value.vendor_name}</td>
                          <td>{value.company_email}</td>
                          <td>{value.company_phone}</td>
                          <td>{value.contact_person_name}</td>
                        </tr>
                      ))
                    : <tr><td>No Data</td></tr>
                    }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button  type="button"  className="btn btn-secondary"  data-dismiss="modal" > Close </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <div className="modal fade" id="invoiceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Invoice Details
              </h5>
            </div>
            <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }}>
              <table className="table ">
                <thead>
                  <tr>
                    <th>Invoice Name</th>
                    <th>Account Number</th>
                    <th>Vendor</th>
                    <th>Referance Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index) => (
                    <tr key={index}>
                      <td>{value.invoice_no}</td>
                      <td>{value.account_no}</td>
                      <td>{value.vendor}</td>
                      <td>{value.reference_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" >  Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Referance Modal */}

      <div className="modal fade" id="ReferanceModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle"> Referance Details</h5>
            </div>
            <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }} >
              <table className="table ">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Referance Number</th>
                    <th>Location</th>
                    <th>Payee Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index) => (
                    <tr key={index}>
                      <td>{value.company}</td>
                      <td>{value.reference_no}</td>
                      <td>{value.location}</td>
                      <td>{value.payee_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" > Close </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Outstatndingdetails;
