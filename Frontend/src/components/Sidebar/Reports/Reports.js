import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import './Reports.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { ColumnsReport, TableReports,GraphReport } from '../../../api/index'
import Select from 'react-select';
import { RiContactsBookLine } from 'react-icons/ri'
import Chart from 'chart.js/auto'


const customStyles = {
    // table: {
    //     style: {
    //         border:'2px solid red',
    //         minHeight:'55vh'
    //     }
    // },
    title: {
        style: {
            fontColor: 'red',
            fontWeight: '900',
        }
    },
    rows: {
        style: {
            minHeight: '35px'
        }
    },
    headCells: {
        style: {
            fontSize: '14px',
            background: 'rgb(105,59,233)',
            color: 'white',
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            // fontWeight:'600',
            background: 'rgb(242,242,242)	',
            borderBottom: "1px solid silver"
        },
    },
};

export default function Reports() {
    const [columns, setColumns] = useState([])
    const [toogle, setToggle] = useState()
    const [selectedColumns, setSelectedColumns] = useState([])
    const [tableReport,setTableReport] = useState([])
    let [charts,setCharts] = useState('bar')

    const handleColumns = async (e) => {
        e.preventDefault();
        console.log(e.target.value)
        const result = await ColumnsReport(localStorage.getItem('Database'), e.target.value)
        setColumns(result)
    }
    let datass = []


    const handleReport = async (e) => {
        e.preventDefault();
        console.log(selectedColumns)
        selectedColumns.map(ele => datass.push(ele.value))
        console.log(typeof(datass[0]))
        const table = document.getElementById('tableselect').value
        const result = await TableReports(localStorage.getItem('Database'), table, datass)
        console.log(result[0].new_asset_type_id)
        setTableReport(result)

   
    }

    async function abc(type) {

        console.log(type)

        const table = document.getElementById('tableselect').value
        selectedColumns.map(ele => datass.push(ele.value))

        const result = await GraphReport(localStorage.getItem('Database'), table, datass[0])
        console.log(document.getElementById('acquisitions').getContext("2d"))

        var grapharea = document.getElementById("acquisitions").getContext("2d");


        var myChart = new Chart(
            grapharea,
            {
                type:type?type:'bar',
                data:{
                    labels:result.map(row => row.name),
                    datasets:
                    [
                        {
                            label:'datass',                    
                        data:result.map(row=> row.value), 
                        }
                    ]
                    
                }
            }
        )
        // myChart.destroy();
        // var myChart = new Chart(
        //     grapharea,
        //     {
        //         type:'line',
        //         data:{
        //             labels:result.map(row => row.name),
        //             datasets:
        //             [
        //                 {
        //                     label:'datass',                    
        //                 data:result.map(row=> row.value), 
        //                 }
        //             ]
                    
        //         }
        //     }
        // )

    }

    useEffect(()=>{

    })
    

    let options = columns.map((ele) => {
        return { value: ele.COLUMN_NAME, label: ele.COLUMN_NAME };
    })
    const handleChange = (selectedOption) => {
        console.log(selectedOption)
        setSelectedColumns(selectedOption)
    }

    const handleClickGraph = (e) =>{
        e.preventDefault(); 
        setToggle('Graph')
        abc()


    }
    const handleChangeCharts = async(e) =>{
        e.preventDefault();
        let grapharea = Chart.getChart("acquisitions");
        if(Chart.getChart("acquisitions")){
            grapharea.destroy();
        }
      abc(e.target.value)  

    }

    return (
        <>
            <Sidebar>
                <div className='main_container' style={{ background: "white", padding: "19px" }}>
                    <h4>Reports</h4>

                    <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                        <article className="card-body" >
                            <div className="d-flex m-7 justify-content-around">

                                <div className="col-md-4 mt-2" >
                                    <label htmlFor='asset_type'>Major <span className='text-danger'>*</span></label>

                                    <select onChange={handleColumns} id="tableselect" className="form-control">
                                        <option value="" hidden>Select ...</option>
                                        <option value="tbl_new_assets">Assets</option>
                                        <option value="tbl_vendor_code_master">Vendor Contract</option>
                                        <option value="tbl_vendor_invoice">Invoice</option>
                                        <option value="tbl_ticket">Ticket</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mt-2" >
                                    <label htmlFor='asset_type'>Columns <span className='text-danger'>*</span></label>
                                    <Select
                                        options={options}
                                        isMulti={true}
                                        onChange={handleChange}
                                        id='services'
                                    />
                                </div>
                            </div>
                            <button className='btn btn-voilet mx-4 mt-4' onClick={handleReport}> <AiOutlinePlus /> Generate Report</button>

                            <div className="row mx-5 mt-2">
                                <div className="col bg-secondary text-white text-center" onClick={handleClickGraph}>Chart</div>
                                <div className="col bg-dark text-white text-center" onClick={(e) => { e.preventDefault(); setToggle('Table') }}>Table</div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">

                                {
                                    toogle == 'Graph' ?
                                    <div className="border border-primary mt-2">
                                    <div>
                                    <select onChange={handleChangeCharts} id="chart">
                                        <option defaultValue='bar' hidden>Select </option>
                                        <option value="bar">Bar </option>
                                        <option value="line">Line </option>
                                        <option value="pie">Pie </option>
                                        <option value="doughnut">Doughnut </option>
                                        <option value="radar">Radar </option>


                                    </select>

                                      
                                    </div>
                                        <canvas id='acquisitions' width='1000' height='500' role = 'img'>
                                        </canvas>
                                        </div>
                                        :
                                        <div className="" style={{maxHeight:"70vh",overflow:"auto"}}>
                                            Whole Table
                                            <table className="table" >
                                                <thead className="position-sticky top-0 bg-white">
                                                    <tr>
                                                    {
                                                        selectedColumns.map((ele)=>(
                                                            <th scope="col">{ele.value}</th>

                                                        ))
                                                    }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    tableReport.map((ele)=>{
                                                        return(
                                                            <tr>
                                                            {
                                                                selectedColumns.map((val)=>(
                                                                    <td>{ele[val.value]}</td>

                                                                    ))
                                                            }

                                                            </tr>
                                                        )
                                                    })
                                                }

                                                </tbody>
                                            </table>

                                        </div>
                                }
                            </div>


                        </article>

                    </div>

                </div>
            </Sidebar>
        </>
    )
}
