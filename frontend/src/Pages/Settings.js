

import React from 'react'
import '../Styles/setting.css'
import UpdateUser from './UpdateUser'
import UpdatePassword from './UpdatePassword'
import AsideNavbar from '../Components/AsideNavbar'
import { Link } from 'react-router-dom'

const Settings = () => {
    return (
        <>
        <AsideNavbar/>
            <div className='setting-container'>
                <h1>Settings</h1>

                {/* update Account Information */}
                <UpdateUser />

                {/* Update Password section */}
                <UpdatePassword />

                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'30px' }}>Developed by<Link to='https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' style={{color: 'blue', textDecoration: 'none'}}>@Wayne_Marwa.ke</Link></p>

            </div>
        </>
    )
}

export default Settings