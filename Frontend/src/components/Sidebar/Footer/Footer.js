import { Link } from 'react-router-dom';
import './Footer.css'
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
const Footer = () => {
    return (
        <>
            <div className="footer mt-4 pt-3 d-flex justify-content-between px-4 ">
                <h6 style={{ color: "#424242" }}>Copyright © 2022 Drizzle. All rights reserved</h6>
                <div className='social_media_links'>
                    <Link to='' className='text-decoration-none'><AiOutlineTwitter style={{ fontSize: "27px" }} /></Link>
                    <Link to='' className='mx-3 text-decoration-none'><BsFacebook style={{ fontSize: "24px" }} /></Link>
                    <Link to='' className='text-decoration-none'><BsLinkedin style={{ fontSize: "22px" }} /></Link>
                </div>
            </div>
        </>
    )
}

export default Footer;