import React from "react";
import { Link, NavLink } from "react-router-dom";
import './sidebar2.css'
import { FiUserPlus } from 'react-icons/fi'
import { GrUserExpert } from 'react-icons/gr'
import { CgOrganisation } from 'react-icons/cg'
import { TiVendorMicrosoft } from 'react-icons/ti'

const Sidebar2 = (props) => {
    return (
        <>
            <aside className={props.sidebar2toggle ? 'sidebar2open sidebarcontainer2' : 'sidebar2close sidebarcontainer2'}>
                <div className="d-flex justify-content-between mt-3 mx-4 "  >
                    <h5 className="sidebar-head mt-2 mb-0">Setting</h5>
                    <span className="cursor-pointer " style={{ fontSize: '25px' }} onClick={props.togglesidebar2}>
                        &#215;</span>
                </div>
                <section className="px-2 mt-3">
                    <Link to='/TotalRoles' className="text-decoration-none text-dark">
                        <div className='sidebar2-navdiv d-flex px-2 align-items-center'>
                            <span className="sidebar2-icons px-3 ft-20"><FiUserPlus /></span>
                            <span> New Role</span>
                        </div>
                    </Link>
                    <Link to='/TotalAssignRole' className="text-decoration-none text-dark">
                        <div className='sidebar2-navdiv d-flex px-2 align-items-center'>
                            <span className="sidebar2-icons px-3 ft-20"><GrUserExpert /></span>
                            <span> Assign Role </span>
                        </div>
                    </Link>
                    <Link to='/OrganisationDetails' className="text-decoration-none text-dark">
                        <div className='sidebar2-navdiv d-flex px-2 align-items-center'>
                            <span className="sidebar2-icons px-3 ft-20"><CgOrganisation /></span>
                            <span>  Organisation Details </span>
                        </div>
                    </Link>
                    <Link to='#' className="text-decoration-none text-dark"><div className='sidebar2-navdiv d-flex px-2 align-items-center'>
                        <span className="sidebar2-icons px-3 ft-20"><TiVendorMicrosoft /></span>
                        <span>  Appliction </span>
                    </div></Link>
                </section>
                <section className="sidebar2-themesec mt-2 px-4 ">
                    <h5>Theme</h5>
                    <div className='sidebar2-themediv px-2'>
                        <span>  Sidebar Color</span>
                        <div className="color-div mt-2 d-flex justify-content-around">
                            <div className="color-span bg-primary rounded-circle cursor-pointer"></div>
                            <div className="color-span bg-success rounded-circle cursor-pointer "></div>
                            <div className="color-span bg-danger rounded-circle cursor-pointer"></div>
                            <div className="color-span bg-dark rounded-circle cursor-pointer"></div>
                            <div className="color-span bg-info rounded-circle cursor-pointer"></div>
                            <div className="color-span bg-secondary rounded-circle cursor-pointer"></div>
                            <div className="color-span bg-light rounded-circle border border-dark cursor-pointer"></div>
                        </div>
                    </div>
                </section>

            </aside>
        </>
    )
}

export default Sidebar2;