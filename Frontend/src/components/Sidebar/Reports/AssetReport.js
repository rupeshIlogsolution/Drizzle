import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./Reports.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {
  ActiveLocation,
  ActiveVendorCode,
  AssetReport,
} from "../../../api/index.js";

export default function AssetReports() {
  const [data, setData] = useState([]);
  const [locationlist, setLocationlist] = useState([]);
  const [vendorlist, setVendorlist] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [toogle, setToogle] = useState(false);
  const [dataCount, setDataCount] = useState({});

  const columns = [
    {
      name: "Company",
      selector: "company",
      sortable: true,
    },

    {
      name: "Location",
      selector: "location",
      sortable: true,
    },

    {
      name: "Asset Type",
      selector: "asset_type",
      sortable: true,
    },
    {
      name: "Asset Assign",
      selector: "asset_assign",
      sortable: true,
    },
    {
      name: "Asset Status",
      selector: "asset_status",
      sortable: true,
    },
    {
      name: "Asset ID",
      selector: "new_asset_type_id",
      sortable: true,
    },
    {
      name: "Purchase Type",
      selector: "purchase_type",
      sortable: true,
    },
    {
      name: "Purchase Price",
      selector: "purchases_price",
      sortable: true,
    },
    {
      name: "Rent Per Month",
      selector: "rent_per_month",
      sortable: true,
    },
    {
      name: "Serial Number",
      selector: "serial_no",
      sortable: true,
    },
    {
      name: "Vendor",
      selector: "vendor",
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchdata = async () => {
      const org = localStorage.getItem("Database");
      const tablelocation = await ActiveLocation(org);
      setLocationlist(tablelocation);
      const vendorall = await ActiveVendorCode(
        localStorage.getItem("Database")
      );
      setVendorlist(vendorall);
    };
    fetchdata();
  }, []);

  const handleLocationChange = async (e) => {
    setSelectedLocation(e.target.value);
    const result = await AssetReport(e.target.value, selectedVendor);
    setData(result?.Data);
    setToogle(true);
    setDataCount(result?.Count);
    console.log(result);
  };

  const handleVendorChange = async (e) => {
    setSelectedVendor(e.target.value);
    const result = await AssetReport(selectedLocation, e.target.value);
    setData(result?.Data);
    setToogle(true);
    setDataCount(result?.Count);
    console.log(result);
  };

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <Sidebar>
        <div
          className="main_container"
          style={{ background: "white", padding: "19px" }}
        >
          <h4>Asset Reports</h4>
          <div className="mt-1 card pb-3 ">
            <article className="card-body border-none">
              <div className="d-flex justify-content-end  rounded">
                {toogle ? (
                  <div className="d-flex w-50 select_div text-center rounded bg-white">
                    <p className="mx-2">
                      {`Purchase Price `}
                      <span className="text-danger">{`${dataCount?.purchases_price}`}</span>
                    </p>
                    <p className="mx-2">
                      {`Rent Per Month `}
                      <span className="text-danger">{`${dataCount?.rent_per_month}`}</span>
                    </p>
                    <p className="mx-2">
                      {`Desktop `}
                      <span className="text-danger">{`${dataCount?.Desktop}`}</span>
                    </p>
                    <p className="mx-2">
                      {`Laptop `}
                      <span className="text-danger">{`${dataCount?.Latptop}`}</span>
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="w-25 select_div text-center rounded bg-white">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="Location"
                    onChange={handleLocationChange}
                  >
                    <option  value="">
                      All
                    </option>
                    {locationlist.map((item, index) => (
                      <option key={index} value={item.location_code}>
                        {item.location_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-25 select_div text-center mx-2 rounded bg-white">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="Vendname"
                    onChange={handleVendorChange}
                  >
                    <option value="">
                      All
                    </option>
                    {vendorlist.map((item, index) => (
                      <option key={index} value={[`${item.vendor_code}`]}>
                        {item.vendor_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* </div> */}
              <div className="d-flex m-2 justify-content-around">
                <div className="border border-dark overflow-auto pb-1 pt-2 px-2 rounded">
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      // customStyles={customStyles}
                    />
                  </DataTableExtensions>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
