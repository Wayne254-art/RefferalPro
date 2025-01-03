

import React from 'react';
import '../Styles/contact-us.css';
import AsideNavbar from '../Components/AsideNavbar';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <>
    <AsideNavbar/>
        <div className='signup-container'>
            <form className="contact-form">
                <h4 style={{ display: 'flex', justifyContent: 'center', color: 'green',marginBottom:'20px' }}>Contact our Staff for assistance</h4>
                <input
                    type="text"
                    id="name"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
                <input
                    type="email"
                    id="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <textarea
                    id="message"
                    // value={message}
                    // onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    required
                />
                <button type="submit">
                    {/* {loading ? 'Sending...' : 'Send Message'} */}send message
                </button>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'20px',fontSize:'13px' }}>Developed by <Link to='https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' style={{color: '#FF4433', textDecoration: 'none'}}>@Wayne_Marwa.ke</Link></p>
            </form>
            {/* <ToastContainer /> */}
    </div>
    </>
);
};
export default ContactUs