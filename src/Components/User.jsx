import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userImage from '../assets/user.jpg'; 

const User = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://138.197.99.80:2490/api/users', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsersData(data);
      } else {
        console.error('Failed to fetch users. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1>Users</h1>

      <div className="row">
        {currentUsers.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={user.profilePhoto || userImage} 
                alt={user.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                <p className="card-text">
                  <strong>Major:</strong> {user.major}<br />
                  <strong>Company:</strong> {user.company}
                </p>
                <Link to={`/profile/${user._id}`} className="btn btn-primary">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
          )}
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(pageNumber + 1)}>
                {pageNumber + 1}
              </button>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default User;
