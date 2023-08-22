import React from 'react'
import '../Sidebar/Navbar.css'
import { FaUserCircle } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'
import DrizzleLogo from '../../image/drizzle_logo.png'

const Helpnavbar = (propes) => {

    const navheight = {
        height: "60px",
        width: "100%",
        padding: "5px 0px 0px 15px ",
        boxShadow: "3px 3px 10px gray",
        borderRadius: "10px 0px 0px 10px",
        position: "relative",
        fontFamily: 'Roboto'
    }
    const profile = {
        position: "absolute",
        right: "5%",
        top: "5%",
        fontSize: "25px",
        color: "rgb(164,43,122)",
        cursor: "pointer"
    }

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    return (
        <>
            <div className="navbarcontainer bg-white mb-3 d-flex " style={navheight} >
                {propes.isOpen ?
                    <h5 style={{ color: "#603AE9", margin: "7px" }}>Drizzle
                    </h5> : <img src={DrizzleLogo} style={{ height: "80%" }} />}

                <div className=" dropdown show w-100" >
                    <a className=" " href="./" style={profile}>
                        Back
                    </a>


                </div>

            </div>
        </>
    )
}

export default Helpnavbar;