import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/asidenavbar.css";
import { useSelector } from "react-redux";
import { server } from "../config/serverapi";
import axios from "axios";
import { toast } from "react-toastify";

const AsideNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //Display NavBar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // console.log(user)
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/auth/logout-user`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`aside-navbar ${isSidebarOpen ? "open" : ""}`}>
        <div className="profile">
          <img
            src={user?.avatar}
            alt="Profile"
            className="profile-image"
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            id="profileImageInput"
            style={{ display: "none" }}
          />
          <div className="profile-details">
            <h3 style={{textTransform:'uppercase'}}>{`${user?.firstName} ${user?.lastName}`}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogOut}>
          Logout
        </button>
        <nav>
          <ul>
            {user && user.role === "Admin" ? (
              <>
                <br />
                <li>
                  <Link to="/admindashboard">Dashboard</Link>
                </li>
                
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/referrals">Referrals</Link>
                </li>
                <li>
                  <Link to="/withdrawal-requests">Withdrawals</Link>
                </li>
                <li>
                  <Link to="/mails">Contact Support</Link>
                </li>
                <li>
                  <Link to={`/settings/${user?.userId}`}>Account Settings</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/dashboard/${user?.userId}`}>
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={`/share/${user?.userId}`}>
                    <i className="fas fa-share-alt"></i> Share
                  </Link>
                </li>
                <li>
                  <Link to={`/earn/${user?.userId}`}>
                    <i className="fas fa-coins"></i> Earn
                  </Link>
                </li>
                <li>
                  <Link to={`/getpaid/${user?.userId}`}>
                    <i className="fas fa-money-bill-wave"></i> Get Paid
                  </Link>
                </li>
                <li>
                  <Link to={`/settings/${user?.userId}`}>
                    <i className="fas fa-cog"></i> Account Setting
                  </Link>
                </li>
                <li>
                  <Link to={`/contact/${user?.userId}`}>
                    <i className="fas fa-envelope"></i> Contact-us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AsideNavbar;
