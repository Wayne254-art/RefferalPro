import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsideNavbar from "../../Components/AsideNavbar";
import { GET_ALL_REFERRALS } from "../../Redux/actions/referrals.actions";

const Referrals = () => {
  const dispatch = useDispatch();
  const { allReferrals, loading } = useSelector((state) => state.referrals);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [referralsPerPage] = useState(4);

    useEffect(() => {
      dispatch(GET_ALL_REFERRALS());
    }, [dispatch]);

  // console.log(allReferrals);
  useEffect(() => {
    setFilteredReferrals(
      allReferrals?.filter((referral) => {
        const referralId = referral.referralId.toString();
        const referrerId = referral.referrerId.toString();
        const referredId = referral.referredId.toString();
        const referralCode = referral.referralCode.toLowerCase();
        const date = referral.createdAt.toLowerCase();
        const query = searchQuery.toLowerCase();

        return (
          referralId.includes(query) ||
          referrerId.includes(query) ||
          referredId.includes(query) ||
          referralCode.includes(query) ||
          date.includes(query)
        );
      })
    );
  }, [allReferrals, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get current users for the page
  const indexOfLastUser = currentPage * referralsPerPage;
  const indexOfFirstUser = indexOfLastUser - referralsPerPage;
  const currentReferrals = filteredReferrals.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredReferrals.length / referralsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <AsideNavbar />
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <div className="table-container">
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              Referrals
            </h2>
            <input
              type="text"
              placeholder="Search by Refferal ID, referrer ID, referrer Code ,referred ID, or date"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
            />
            <table>
              <thead>
                <tr>
                  <th>Refferal ID</th>
                  <th>Referrer ID</th>
                  <th>Referrer Code</th>
                  <th>Referred ID</th>
                  <th>Referral Date</th>
                </tr>
              </thead>
              <tbody>
                {currentReferrals?.map((referral) => (
                  <tr key={referral.referralId}>
                    <td>{referral.referralId}</td>
                    <td>{referral.referrerId}</td>
                    <td>{referral.referralCode}</td>
                    <td>{referral.referredId}</td>
                    <td>{new Date(referral.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredReferrals.length / referralsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(filteredReferrals.length / referralsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referrals;
