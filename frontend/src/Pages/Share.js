

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faWhatsapp, faTelegram, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import QRCode from 'qrcode.react';
import '../Styles/share.css'
import AsideNavbar from '../Components/AsideNavbar';
import { Link } from 'react-router-dom';
import { link} from '../config/serverapi';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Share = () => {

    const {user} = useSelector((state)=> state.user)
    const referralLink =`${link}=${user.referralCode}`

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied to clipboard!');
    };

    return (
        <>
        <AsideNavbar/>
        <div className="main-content" style={{backgroundColor: '#f5f5f5'}}>
            <div className="referral-share-container">
                <h1>Share and Earn!</h1>
                <p>Share the link below with your friends and earn rewards when they sign up:</p>
                <input className="referral-link-input" type="text" value={referralLink} readOnly />
                <button onClick={handleCopyLink} className="copy-button">Copy Link</button>
            </div>
            <div className="referral-share-container">
                <h1>Earn Extra Cash Now!</h1>
                <p>Share on social media to earn more money:</p>
                <div className="social-share">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Check%20this%20out!`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                    <a href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faTelegram} size="2x" />
                    </a>
                    <a href={`fb-messenger://share?link=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookMessenger} size="2x" />
                    </a>
                </div>
            </div>
            <div className="referral-share-container">
                <div className="qr-code-container">
                    <p>Or scan the QR code:</p>
                    <QRCode value={referralLink} size={128} />
                </div>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Developed by <Link to='https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' style={{color: 'blue', textDecoration: 'none'}}>@Wayne_Marwa.ke</Link></p>
        </div>
        <ToastContainer/>
        </>
);
};

export default Share