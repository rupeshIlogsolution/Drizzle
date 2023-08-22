import Sidebar from '../../../Sidebar/Sidebar';
import React, { useEffect, useState, useContext } from 'react';
import { GetSoftwareapi, UpdateSoftwareapi } from '../../../../api'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import LoadingPage from '../../../LoadingPage/LoadingPage';
// import Snackbar from '../../../../Snackbar/Snackbar';
import { RiArrowGoBackFill } from 'react-icons/ri'
import { GlobalAlertInfo } from '../../../../App';
import Modal from '../../AlertModal/Modal';

function EditSoftware() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)


    // ########################### Modal Alert #############################################
    //  const [datas, setDatas] = useState({
    //     message: "abc",
    //     title: "title",
    //     type: "type",
    //     route: "#",
    //     toggle: "true",
    // })

    const { tooglevalue, callfun } = useContext(GlobalAlertInfo)
    // ########################### Modal Alert #############################################


    useEffect(() => {
        const fetchdata = async () => {
            const org = localStorage.getItem('Database')
            const result = await GetSoftwareapi(org, localStorage.getItem('softwaresno'))
            setData(result[0]);
            setLoading(true)
        }
        fetchdata()
    }, [])

    const handleadddevice = async (e) => {
        e.preventDefault();
        setLoading(false)
        document.getElementById('subnitbtn').disabled = 'true'

        const software = document.getElementById('software').value;
        const software_desc = document.getElementById('software_desc').value;
        const username = localStorage.getItem('UserId');
        const sno = localStorage.getItem('softwaresno')

        if (!software) {
            setLoading(true)
            document.getElementById('subnitbtn').disabled = false
            callfun('Please enter the Software', 'warning', 'self')

            // setDatas({ ...datas, message: "Please enter all mandatory fields", title: "Error", type: "warning", route: "#", toggle: "true" })
            // document.getElementById('snackbar').style.display = "block"
        }
        else {
            const org = localStorage.getItem('Database')
            const result = await UpdateSoftwareapi(org, sno, software, software_desc, username);
            setLoading(true)

            if (result === 'Updated') {
                localStorage.removeItem('softwaresno');
                callfun('Software Updated', 'success', '/TotalSoftware')

                // setDatas({ ...datas, message: "Software Updated", title: "success", type: "success", route: "/TotalSoftware", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else if (result === 'Already') {
                callfun('Software Already Exist', 'warning', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Software Already Exist", title: "warning", type: "Error", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
            else {
                callfun('Server Error', 'danger', 'self')
                document.getElementById('subnitbtn').disabled = false
                // setDatas({ ...datas, message: "Server Error", title: "Error", type: "danger", route: "/EditSoftware", toggle: "true" })
                // document.getElementById('snackbar').style.display = "block"
            }
        }

    }

    return (
        <>
            {
                loading ?
                    <Sidebar >
                        {/* ######################### Sanckbar Start ##################################### */}

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

                        <div className='main_container'>
                            <div className=' d-flex justify-content-between mx-5 pt-4 pb-3'>
                                <h4><span className='page-type-head1'>Software <MdOutlineKeyboardArrowRight /></span> <span className='page-type-head2'>Edit Software</span> </h4>
                                <button className='btn btn-secondary ' onClick={() => { localStorage.removeItem('softwaresno'); window.location.href = '/TotalSoftware' }} >Back <RiArrowGoBackFill /></button>
                            </div>
                            <div className="bg-white shadow1-silver rounded15 mt-1 card inner-card pb-3">
                                <div className='card-header'>Edit Software:</div>
                                <article className="card-body" >
                                    <form className='px-3' autoComplete='off'>
                                        <div className="form-group col-md-5" >
                                            <label htmlFor='seriesid'> Software <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id='software' defaultValue={data.software_name} />
                                        </div>
                                        <div className="form-group col-md-7 mt-3" >
                                            <label htmlFor='software_desc'>Remarks</label>
                                            <textarea className="form-control" id='software_desc' rows='3' defaultValue={data.software_description} />
                                        </div>
                                        <button type="submit" className="btn btn-voilet mt-3" id="subnitbtn" onClick={handleadddevice}>Update Software</button>
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

export default EditSoftware;