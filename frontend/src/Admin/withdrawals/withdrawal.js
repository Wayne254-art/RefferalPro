import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./withdrawal.css";
import {
  fetchWithdrawalRequests,
  updateWithdrawalStatus,
} from "../../Redux/actions/withdrawals.actions";
import AsideNavbar from "../../Components/AsideNavbar";

const WithdrawalRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.withdrawal);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(4);

  useEffect(() => {
    dispatch(fetchWithdrawalRequests());
  }, [dispatch]);

  useEffect(() => {
    const filtered = requests?.filter((request) => {
      const username = request.activityData?.username?.toLowerCase() || '';
      const email = request.activityData?.email?.toLowerCase() || '';
      const phoneNumber = request.activityData?.phoneNumber || '';
      return (
        username.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery)
      );
    });
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [requests, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get current requests for the page
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredRequests.length / requestsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleComplete = (requestId) => {
    dispatch(updateWithdrawalStatus(requestId));
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
      <div className="withdrawal-requests">
        <h1>Withdrawal Requests</h1>
        <input
          type="text"
          placeholder="Search by username, email, or phone number"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
        />
        {currentRequests.length === 0 ? (
          <p>No withdrawal requests found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Activity ID</th>
                <th>Request or Paid Date</th>
                <th>Time</th>
                <th>Username</th>
                <th>User Email</th>
                <th>Amount</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request) => (
                <tr key={request.activityId}>
                  <td>{request.activityId.slice(0, 8)}</td>
                  {request.activityStatus === "completed" ? (
                    <td>{request.updatedAt.slice(0, 10)}</td>
                  ) : (
                    <td>{request.createdAt.slice(0, 10)}</td>
                  )}
                  {request.activityStatus === "completed" ? (
                    <td>{new Date(request.updatedAt).toLocaleString().slice(10)}</td>
                  ) : (
                    <td>{new Date(request.createdAt).toLocaleString().slice(10)}</td>
                  )}

                  <td>{request.activityData?.username || 'N/A'}</td>
                  <td>{request.activityData?.email || 'N/A'}</td>
                  <td>{request.activityAmount}</td>
                  <td>{request.activityData?.phoneNumber || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleComplete(request.activityId)}
                      disabled={request.activityStatus === "completed"}
                      style={{
                        backgroundColor:
                          request.activityStatus === "completed"
                            ? "green"
                            : "red",
                        color: "white",
                        cursor:
                          request.activityStatus === "completed"
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {request.activityStatus === "completed"
                        ? "Completed"
                        : "Mark as Complete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(filteredRequests.length / requestsPerPage)}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredRequests.length / requestsPerPage)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default WithdrawalRequests;