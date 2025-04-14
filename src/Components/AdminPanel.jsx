import React from 'react';
import innovationImage from '../assets/innovation.jpg'; 
import userImage from '../assets/user.jpg'; 

const AdminPanel = ({ dataType }) => {
  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>
      <p>Approving: {dataType === "posted" ? "Posted Content" : "New Users"}</p>

      {/* Innovation Lab info when "Approve Posted Opportunity" is selected */}
      {dataType === "posted" && (
        <div className="card mt-4 shadow-sm">
          <img 
            src={innovationImage} 
            alt="Innovation Lab" 
            className="card-img-top" 
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">Innovation Lab Internship Opportunity</h5>
            <p className="card-text">
              Check out this possible internship opportunity with the Innovation Lab! 
              Gain hands-on experience with <strong>3D Printing, the Woodshop, and more</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Dummy new users when "Approve New User" is selected */}
      {dataType === "newUsers" && (
        <div className="mt-4">
          <h3>Pending New Users</h3>

          {/* User 1 */}
          <div className="card mt-3 shadow-sm">
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                <img 
                  src={userImage} 
                  alt="User 1" 
                  className="rounded-circle img-fluid" 
                  style={{ height: '120px', width: '120px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">David Lynch</h5>
                  <p className="card-text"><strong>Major:</strong> Computer Engineering</p>
                  <p className="card-text"><strong>Company:</strong> Jacksonville University</p>
                  <button className="btn btn-success me-2">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              </div>
            </div>
          </div>

          {/* User 2 */}
          <div className="card mt-3 shadow-sm">
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                <img 
                  src={userImage} 
                  alt="User 2" 
                  className="rounded-circle img-fluid" 
                  style={{ height: '120px', width: '120px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Keely Reid</h5>
                  <p className="card-text"><strong>Major:</strong> Business Administration</p>
                  <p className="card-text"><strong>Company:</strong> Unemployed</p>
                  <button className="btn btn-success me-2">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminPanel;
