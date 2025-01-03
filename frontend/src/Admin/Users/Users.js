import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS } from "../../Redux/actions/user.actions";
import AsideNavbar from "../../Components/AsideNavbar";
import "./users.css";
import { useNavigate } from "react-router-dom";
import UserStatus from "../../Components/UserStatus";

const Users = () => {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);

  useEffect(() => {
    dispatch(GET_ALL_USERS());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users?.filter((user) => {
        const userStatus = user.isActive ? "active" : "deactivated";
        return (
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          userStatus.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [users, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
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
      <div className="users-table">
        <div className="users-content">
          <div className="table-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Users</h2>
              <button
                style={{ marginLeft: "auto" }}
                className="more-button"
                onClick={() => navigate(`/create-user`)}
              >
                Create A New User
              </button>
            </div>

            <input
              type="text"
              placeholder="Search by username, email, contact, or status"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
            />
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((filteredUser) => (
                  <tr key={filteredUser.userId}>
                    <td>{filteredUser.userId.slice(0, 6)}</td>
                    <td>{filteredUser.username}</td>
                    <td>{filteredUser.email}</td>
                    <td>{filteredUser.phoneNumber}</td>
                    <td>{filteredUser.role}</td>
                    <td>
                      <UserStatus userDetails={filteredUser.isActive} />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/users/${filteredUser.userId}`)
                        }
                        className="more-button"
                      >
                        More
                      </button>
                    </td>
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
                {Math.ceil(filteredUsers.length / usersPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / usersPerPage)
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

export default Users;
