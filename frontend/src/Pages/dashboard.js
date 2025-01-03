import React, { useEffect } from "react";
import "../Styles/dashboard.css";
import AsideNavbar from "../Components/AsideNavbar";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeposit } from "../Redux/actions/deposits.actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { user, loading } = useSelector((state) => state.user);
//   const { deposit, loading, error } = useSelector((state) => state.deposit);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchDeposit(user.userId));
    }
    
    if(user.role ==="Admin"){
      navigate(`/admindashboard`);
    }
  }, [dispatch, user.userId, user.role, navigate]);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }
//   if (error) return <div>{error}</div>;

  return (
    <>
      <AsideNavbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome To our Community!</h1>
          <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Hi 👋 <span style={{color:'blue',textTransform:'uppercase'}}>{user?.username}</span>, You are one step away from winning!
          </p>
          <div className="referral-info">
            <h2>Start earning now.</h2>
            <h2>Refer a friend or family member.</h2>
            <h2>Earn rewards on every approved referral.</h2>
            <h4>MORE FRIENDS CAN LEAD TO MORE REWARDS FOR YOU.</h4>
            <p>For approved referrals, you will earn:</p>
            <div className="reward-tier">
              <p>REFER</p>
              <h2 style={{color:'blue'}}>1</h2>
              <p>FRIEND</p>
              <p>EARN</p>
              <h2 style={{color:'blue'}}>50</h2>
              <p>REWARD</p>
            </div>
            <div className="reward-tier">
              <p>REFER</p>
              <h2 style={{color:'blue'}}>3</h2>
              <p>FRIENDS</p>
              <p>EARN</p>
              <h2 style={{color:'blue'}}>170</h2>
              <p>REWARD</p>
            </div>
            <div className="reward-tier">
              <p>REFER</p>
              <h2 style={{color:'blue'}}>5</h2>
              <p>FRIENDS</p>
              <p>EARN</p>
              <h2 style={{color:'blue'}}>300</h2>
              <p>REWARD</p>
            </div>
            <div className="reward-tier">
              <p>REFER</p>
              <h2 style={{color:'blue'}}>10</h2>
              <p>FRIENDS</p>
              <p>EARN</p>
              <h2 style={{color:'blue'}}>700</h2>
              <p>REWARD</p>
            </div>
            <h2>NB:If your first deposit is gives you 20% back</h2>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              Developed by{" "}
              <Link
                to="https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                style={{ color: "blue", textDecoration: "none" }}
              >
                @Wayne_Marwa.ke
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
