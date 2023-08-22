import React from 'react'
import './Contactus.css'
import Sidebar from '../Sidebar'
import { RiContactsBookFill } from 'react-icons/ri';

export default function Contactus() {
    return (
        <>
            <Sidebar>
                <div className=' main_container d-flex justify-content-center align-items-center'>
                    <div className='contact_us_card d-flex rounded15 bg-white shadow1-silver overflow-hidden'>
                        <div className='contact_us_logo d-flex flex-column align-items-center justify-content-center text-light '>
                            <RiContactsBookFill />
                            <h4>Contact Us</h4>
                        </div>
                        <div className='contact_us_content d-flex flex-column justify-content-center align-items-center'>
                            <span>
                                <h4>AWL INDIA PRIVATE LIMITED</h4>
                                <p>Vatika Atrium Ground Floor Tower-B Golf Course Road Sector-53 Gurgaon - 122002,India</p>
                                <p>Phone:  +91-124-427-9462</p>
                                <p>Fax:  +91-101-124-5999</p>
                            </span>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}
