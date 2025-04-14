import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Container, Card, Button } from 'react-bootstrap'; 
import userImage from '../assets/user.jpg';

const UserProfile = () => {
    const { userId } = useParams(); 
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            setLoading(true);
            console.log("Fetching user with ID:", userId);

            try {
                const response = await fetch("http://138.197.99.80:2490/api/users", {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Response status:", response.status);

                if (!response.ok) {
                    console.error('Failed to fetch user. Status:', response.status);
                    setUser(null);
                } else {
                    const data = await response.json();
                    console.log("User data received:", data);

                    const foundUser = data.find(user => user._id === userId);
                    if (foundUser) {
                        setUser(foundUser); 
                    } else {
                        console.error("User not found in the list.");
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUsers(); 
    }, [userId]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!user) {
        return <div className="text-center mt-5">Error: Unable to load profile.</div>;
    }

    return (
        <div className="min-vh-100 w-100">
            <Container className="mt-4">
                <div className="d-flex">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        ← Back 
                    </Button>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                    <Card style={{ width: '28rem', paddingTop: '0rem', paddingBottom: '1rem' }}>
                        <div className="d-flex justify-content-center align-items-center">
                            <Card.Img
                                variant="top"
                                src={user.profilePhoto || userImage}
                                className="rounded-circle img-fluid"
                                style={{ height: '220px', width: '240px' }}
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                            <Card.Text><strong>Username:</strong> {user.user_name}</Card.Text>
                            <Card.Text><strong>Major:</strong> {user.major}</Card.Text>
                            <Card.Text><strong>Graduation Year:</strong> {user.year_graduated}</Card.Text>
                            <Card.Text><strong>Company:</strong> {user.company}</Card.Text>
                            <Card.Text><strong>Title:</strong> {user.title}</Card.Text>
                            <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                            <Card.Text>
                                <strong>LinkedIn:</strong> {user.linkedin_link ? (
                                    <a href={user.linkedin_link} target="_blank" rel="noopener noreferrer">Profile</a>
                                ) : "No LinkedIn provided"}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default UserProfile;
