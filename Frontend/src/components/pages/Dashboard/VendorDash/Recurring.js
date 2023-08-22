import React, { useEffect, useState } from 'react'
import './Recurring.css'
import ReactPaginate from 'react-paginate';
import { Recurring_Vendor, Recurring_Frequency,Outstanding_Invoice_filter } from '../../../../api/index'
import { CSVLink } from "react-csv";
import { BiExport } from 'react-icons/bi'
import { SiMicrosoftexcel } from 'react-icons/si'
import { GrDocumentCsv } from 'react-icons/gr'
import { ExcelConvertData } from './Excel'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

export default function Recurring() {
  const [Recurringdata, setRecurringData] = useState([])
  const [TotalRecurring, setTotalRecurring] = useState()
  const [lastval, setLastval] = useState()
  const [VendorFreq, setVendorFreq] = useState({})
  const [rowperpage, setRowPerPage] = useState(10)
  const [toogle, setToogle] = useState(false)
  const [data,setData] = useState([])

  const exportExcel = async () => {
    const datasss = ExcelConvertData(Recurringdata)
  }

  const handleClick = async(type,value) =>{
    console.log(type,value)
    const result = await Outstanding_Invoice_filter(localStorage.getItem('Database'),type,value)
    setData(result)
  }

  // const handlePrint= (e) =>{
  //   e.preventDefault()
  //   var backup = document.body.innerHTML;
  //   var divcontent = document.getElementById('pagination').innerHTML;
  //   document.body.innerHTML = divcontent;
  //   window.print();
  //   document.body.innerHTML = backup;
  //   window.location.reload()
  // }

  useEffect(() => {
    const fetch = async () => {
      const VendorFreq = await Recurring_Frequency(localStorage.getItem('Database'))
      setVendorFreq(VendorFreq)
      const datas = await Recurring_Vendor(localStorage.getItem('Database'), 1, 10)
      setRecurringData(datas.data)
      setTotalRecurring(datas.TotalData[0].Totaldata)
      const total = datas.TotalData[0]["Totaldata"]
      setRowPerPage(10)
      setLastval(Math.ceil(total / 10))

    }
    fetch();
  }, [])

  const handleChange = async (e) => {
    e.preventDefault();
    setRowPerPage(e.target.value)
    const datas = await Recurring_Vendor(localStorage.getItem('Database'), 1, e.target.value)
    setRecurringData(datas.data)
    const total = datas.TotalData[0]["Totaldata"]
    setLastval(Math.ceil(total / e.target.value))
  }

  const handlePageClick = async (data) => {
    const datas = await Recurring_Vendor(localStorage.getItem('Database'), data.selected + 1, rowperpage)
    setRecurringData(datas.data)
  }

  return (
    <div className='Recurring_div justify-content-around mx-2'>

      <div className='recurring_table position-relative bg-light rounded' >
        <div className="recurringhead position-absolute px-3  d-flex justify-content-between pt-3">
          <p className='text-white px-2 mx-1'>Vendor Recurring Details</p>
          <div title="Export" className="d-flex justify-content-end text-white cursor-pointer" onClick={(e) => { e.preventDefault(); setToogle(value => !value) }} >
            <BiExport style={{ fontSize: "25px" }} />
          </div>
          {
            toogle ?
              <div className="d-flex flex-column justify-content-center align-items-center bg-light position-absolute rounded py-1" style={{ right: "4%", top: '25%', width: "5%", boxShadow: "3px 3px 10px black" }}>
                <a href="#"
                  onClick={exportExcel}
                ><SiMicrosoftexcel className='ft-20' /></a>
                <CSVLink
                  data={Recurringdata}
                  filename="RecurringData"
                > <GrDocumentCsv className='ft-20' />
                </CSVLink>
              </div>
              : ''
          }
        </div>

        <div className='recurring_table_inside px-3'>
          <div id="pagination">
            <table className="table " >
              <thead>
                <tr>
                  <th scope="col">Vendor</th>
                  <th scope="col">Location</th>
                  <th scope="col">Major Category</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Account no</th>
                  <th scope="col">Reference No</th>
                  <th scope="col">Help Desk no</th>
                  <th scope="col">Billing Frequency</th>
                </tr>
              </thead>
              <tbody>
                {
                  Recurringdata.map((elements, index) => {
                    return (
                      <tr key={index}>
                      <td style={{cursor:"pointer"}} data-toggle="modal" data-target="#vendorModal" onClick={(e)=>{e.preventDefault(); handleClick('Vendor',elements.vendor)}} >{elements.vendor}</td>
                        <td>{elements.location}</td>
                        <td>{elements.major_category}</td>
                        <td>{elements.sub_category}</td>
                        <td>{elements.customer_account_no}</td>
                        <td style={{cursor:"pointer"}} data-toggle="modal" data-target="#ReferanceModal" onClick={(e)=>{e.preventDefault(); handleClick('Referance',elements.reference_no)}}>{elements.reference_no}</td>
                        <td>{elements.help_desk_no}</td>
                        <td>{elements.billling_freq}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
        <div className="for_pnation justify-content-end mx-3">
          <div className='rows_per_page mx-4'>
            <label className='mx-2'>Rows / page</label>
            <select onChange={handleChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className='react_pagination'>
            <ReactPaginate
              breakLabel="..."
              nextLabel={<IoMdArrowDropright style={{ fontSize: "24px" }} />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={lastval}
              previousLabel={<IoMdArrowDropleft style={{ fontSize: "24px" }} />}
              renderOnZeroPageCount={null}
              containerClassName={'pagination justify-content-end'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div>
        </div>

      </div>
      <div className='recurring_cards bg-light p-2 rounded'>
        <div className='recurring_card text-center text-light pt-2 rounded mb-2 '>
          <p className='mb-0'>Recurring</p>
          <h3>{TotalRecurring}</h3>
        </div>

        <div className='recurring_card text-center text-light pt-2 rounded mb-2'>
          <p className='mb-0'>Annual</p>
          <h3>{VendorFreq.Annualy}</h3>
        </div>

        <div className='recurring_card text-center text-light pt-2 rounded mb-2'>
          <p className='mb-0'>Quarterly</p>
          <h3>{VendorFreq.Quaterly}</h3>
        </div>

        <div className='recurring_card text-center text-light pt-2 rounded mb-2'>
          <p className='mb-0'>Monthly</p>
          <h3>{VendorFreq.Monthly}</h3>
        </div>
        <div className='recurring_card text-center text-light pt-2 rounded mb-2'>
          <p className='mb-0'>Invoice Received</p>
          <h3>{VendorFreq.InvoiceReceived}</h3>
        </div>
      </div>

    {/* Vendor Modal */}

    <div className="modal fade" id="vendorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Vendor Details</h5>
            </div>
            <div className="modal-body" style={{maxHeight:"80vh",overflow:"auto"}}>
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
                  {
                    data.length?
                    data.map((value)=>(
                      <tr>
                      <td>{value.vendor_name}</td>
                      <td>{value.company_email}</td>
                      <td>{value.company_phone}</td>
                      <td>{value.contact_person_name}</td>
                      </tr>
                    )
                    ):""
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Referance Modal */}

 <div className="modal fade" id="ReferanceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Referance Details</h5>
            </div>
            <div className="modal-body" style={{maxHeight:"80vh",overflow:"auto"}}>
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
                  {
                    data.map((value)=>(
                      <tr>
                      <td>{value.company}</td>
                      <td>{value.reference_no}</td>
                      <td>{value.location}</td>
                      <td>{value.payee_name}</td>
                      </tr>
                    )
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
