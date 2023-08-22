import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { AiOutlinePlus } from 'react-icons/ai'
import { ColumnsReport, TableReports, GraphReport } from '../../../api/index'
import Select from 'react-select';
import Chart from 'chart.js/auto'
import './reports.css'

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
    const [tableReport, setTableReport] = useState([])
    let [charts, setCharts] = useState('bar')

    const handleColumns = async (e) => {
        e.preventDefault();
        const result = await ColumnsReport(localStorage.getItem('Database'), e.target.value)
        setColumns(result)
        // console.log(resuly)
    }
    let datass = []


    const handleReport = async (e) => {
        e.preventDefault();
        selectedColumns.map(ele => datass.push(ele.value))
        const table = document.getElementById('tableselect').value
        const result = await TableReports(localStorage.getItem('Database'), table, datass)
        setTableReport(result)
    }

    async function abc(type) {
        const table = document.getElementById('tableselect').value
        selectedColumns.map(ele => datass.push(ele.value))

        const result = await GraphReport(localStorage.getItem('Database'), table, datass[0])
        var grapharea = document.getElementById("acquisitions").getContext("2d");


        var myChart = new Chart(
            grapharea,
            {
                type: type ? type : 'bar',
                data: {
                    labels: result.map(row => row.name),
                    datasets:
                        [
                            {
                                label: datass[0],
                                data: result.map(row => row.value),
                            }
                        ]

                },
                options:{
                    plugins:{
                        legend:{
                            display:true,
                            labels:{
                                color:'#000',
                                
                            }
                        }
                    }

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


    let options = columns.map((ele) => {
        return { value: ele.COLUMN_NAME, label: ele.COLUMN_NAME };
    })
    const handleChange = (selectedOption) => {
        setSelectedColumns(selectedOption)
    }

    const handleClickGraph = (e) => {
        e.preventDefault();
        document.getElementById('chart-div').style.background = '#000'
        document.getElementById('table-div').style.background = 'gray'
        setToggle('Graph')
        abc()
    }
    const handleClickTable = (e) => {
        e.preventDefault();
        document.getElementById('chart-div').style.background = 'gray'
        document.getElementById('table-div').style.background = '#000'
        setToggle('Table')
    }
    const handleChangeCharts = async (e) => {
        e.preventDefault();

        let grapharea = Chart.getChart("acquisitions");
        if (Chart.getChart("acquisitions")) {
            grapharea.destroy();
        }
        abc(e.target.value)

    }

    return (
        <>
            <Sidebar>
                <div className='main_container py-2'>
                    <h4>Reports</h4>

                    <div className="bg-white shadow1-silver rounded15 mt-2 card inner-card pb-3">
                        <article className="card-body " >
                            <div className="form-group row mt-2 mx-3">
                                <div className="col-md-4 " >
                                    <label htmlFor='tableselect'>Major <span className='text-danger'>*</span></label>
                                    <select onChange={handleColumns} id="tableselect" className="form-select">
                                        <option value="" hidden>Select ...</option>
                                        <option value="tbl_new_assets">Assets</option>
                                        <option value="tbl_vendor_code_master">Vendor Contract</option>
                                        <option value="tbl_vendor_invoice">Invoice</option>
                                        <option value="tbl_ticket">Ticket</option>
                                    </select>
                                </div>
                                <div className="col-md-4" >
                                    <label htmlFor='services'>Columns <span className='text-danger'>*</span></label>
                                    <Select
                                        options={options}
                                        isMulti={true}
                                        onChange={handleChange}
                                        id='services'
                                    />
                                </div>
                                <div className="col-md-4" >
                                    <label htmlFor='datacount'>Data </label>
                                    <select  id="datacount" className="form-select">
                                        <option value="" hidden>Select ...</option>
                                        <option value="all">All</option>
                                        <option value="top10">Top 10</option>
                                        <option value="top50">Top 50</option>
                                        <option value="top100">Top 100</option>
                                    </select>
                                </div>
                            </div>
                            <button className='btn btn-voilet mx-4 mt-4' onClick={handleReport}> <AiOutlinePlus /> Generate Report</button>
                        </article>
                        <div className="row mx-5 mt-2 ">
                            <div className="col text-white text-center cursor-pointer" title='Click To Show in Graph' id='chart-div' onClick={handleClickGraph} style={{ background: 'gray' }}>Chart</div>
                            <div className="col text-white text-center cursor-pointer" title='Click To Show in Table' id='table-div' onClick={handleClickTable} style={{ background: '#000' }}>Table</div>
                        </div>
                        <div>
                            {
                                toogle == 'Graph' ?
                                    <>
                                        <div className="form-group row mt-2 mx-3 col">
                                            <label htmlFor='tableselect'>Select Chart Type</label>
                                            <div className="col-md-4" >
                                                <select onChange={handleChangeCharts} id="chart" className='form-select'>
                                                    <option value="bar">Bar Chart</option>
                                                    <option value="line">Line Chart</option>
                                                    <option value="pie">Pie Chart</option>
                                                    <option value="doughnut">Doughnut Chart</option>
                                                    <option value="radar">Radar Chart</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-2 m-auto graph-div">
                                            <canvas id='acquisitions' width='1000' role='img' />
                                        </div>
                                    </>
                                    :
                                    <div className=" m-auto text-center overflow-auto" style={{ maxHeight: "47vh", width: '90%' }}>
                                        <table className="table table-hover border" >
                                            <thead className="position-sticky top-0 bg-white">
                                                <tr>
                                                    {
                                                        selectedColumns.map((ele, index) => (
                                                            <th key={index} scope="col" className='text-uppercase'>{ele.value}</th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tableReport.map((ele, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {
                                                                    selectedColumns.map((val, index) => (
                                                                        <td key={index}>{ele[val.value]}</td>
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




                    </div>

                </div>
            </Sidebar>
        </>
    )
}
