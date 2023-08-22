import { MdFacebook } from 'react-icons/md';
import { BsLinkedin, BsYoutube, BsTwitter } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';

const LandingFooter = () => {
    return (
        <>
            <footer className='landingfooter_main'>
                <div className="landingfooter justify-content-around">
                    <div className="div_for_list">
                        <ul className='footer_link-list p-0'>
                            <li >Company</li>
                            <li>About</li>
                            <li>Careers</li>
                            <li>Locations</li>
                            <li>Suppliers</li>
                            <li>Investors</li>
                            <li>Newsrooms</li>
                        </ul>
                        <ul className='footer_link-list p-0'>
                            <li >Service and support</li>
                            <li>Service</li>
                            <li>Not Support portal</li>
                        </ul>
                        <ul className='footer_link-list p-0'>
                            <li >Resources</li>
                            <li>Customer stories</li>
                            <li>ServiceNow Research</li>
                            <li>Now on Now</li>
                        </ul>
                        <ul className='footer_link-list p-0'>
                            <li >My Account</li>
                            <li><a style={{ textDecoration: "none", color: "rgb(33,37,48)" }} href='/signin'>Sign in</a></li>
                            <li><a style={{ textDecoration: "none", color: "rgb(33,37,48)" }} href='/signup'>Register</a></li>
                        </ul>
                    </div>
                </div>
                {/* ################################## Social Icon Section ############################################# */}
                <section className='div_for_icon d-flex justify-content-center py-3 align-items-center'>
                    <h6 className='footertitle'>Connect with Us</h6>
                    <span><MdFacebook className='social-icons' /></span>
                    <span> <BsYoutube className='social-icons' /></span>
                    <span> <BsLinkedin className='social-icons' /></span>
                    <span><FaInstagramSquare className='social-icons' /></span>
                    <span><BsTwitter className='social-icons' /></span>
                </section>
            </footer>
        </>
    )
}

export default LandingFooter;