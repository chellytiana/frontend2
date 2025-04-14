import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SignupModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" className="form-control mb-2" placeholder="Username" />
        <input type="email" className="form-control mb-2" placeholder="Email" />
        <input type="password" className="form-control mb-2" placeholder="Password" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="success">Sign Up</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
