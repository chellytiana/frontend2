// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import User from './Components/User';
import Opportunities from './Components/Opportunities';
import Profile from './Components/Profile';
import AdminPanel from './Components/AdminPanel.jsx';
import LoginModal from './Components/LoginModal';
import SignupModal from './Components/SignupModal';
import UserProfile from './Components/UserProfile'; 
import './Styles/styles.css';
import stetsonLogo from './assets/stetson.jpeg';

function App() {
  const [loginStatus, setLoginStatus] = useState('none'); 
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img 
                src={stetsonLogo} 
                alt="Stetson University" 
                style={{ height: '65px' }} 
              />
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {(loginStatus !== 'none') && (
                  <>
                    {/* Home button appears only when logged in */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/users">User</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/opportunities">Opportunities</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                  </>
                )}
                {loginStatus === 'admin' && (
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                      Admin Panel
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/admin/approve-posted">Approve Posted Opportunity</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/approve-new-user">Approve New User</Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>

              <div className="d-flex">
                {loginStatus === 'none' ? (
                  <>
                    <button className="btn btn-outline-primary me-2" onClick={() => setShowLogin(true)}>
                      Login
                    </button>
                    <button className="btn btn-outline-success" onClick={() => setShowSignup(true)}>
                      Sign Up
                    </button>
                  </>
                ) : (
                  <span className="navbar-text">Logged in as: {loginStatus}</span>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/approve-posted" element={<AdminPanel dataType="posted" />} />
          <Route path="/admin/approve-new-user" element={<AdminPanel dataType="newUsers" />} />
          <Route path="/profile/:userId" element={<UserProfile />} /> 
        </Routes>

        {/* Requirement #1 */}
        <div className="text-center mt-5">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              {loginStatus === 'none' ? "Not Logged In" : loginStatus === 'user' ? "User Logged In" : "Admin Logged In"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => setLoginStatus('none')}>
                  Not Logged In
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setLoginStatus('user')}>
                  User Logged In
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setLoginStatus('admin')}>
                  Admin Logged In
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Modals */}
        <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
        <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
      </div>
    </Router>
  );
}

export default App;
