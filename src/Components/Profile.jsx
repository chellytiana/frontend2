import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import profileImage from '../assets/profile.jpg';

function Profile() {
    
    const [_id, setId] = useState(null);
    const [user_name, setUserName] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [year_graduated, setYearGraduated] = useState(null);
    const [major, setMajor] = useState(null);
    const [company, setCompany] = useState(null);
    const [title, setTitle] = useState(null);
    const [email, setEmail] = useState(null);
    const [linkedin_link, setLinkedin] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token'); 
        try {
            const response = await fetch('http://138.197.99.80:2490/api/users/ctjohnson', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const profile = await response.json(); 

                setId(profile._id);
                setUserName(profile.user_name);
                setFirstName(profile.first_name);
                setLastName(profile.last_name);
                setYearGraduated(profile.year_graduated);
                setMajor(profile.major);
                setCompany(profile.company);
                setTitle(profile.title);
                setEmail(profile.email);
                setLinkedin(profile.linkedin_link);
            } else {
                console.error("Failed to fetch profile. Status:", response.status);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <div className="min-vh-100 w-100">
            <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Card style={{ width: '28rem', paddingTop: '3rem', paddingBottom: '3rem' }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <Card.Img variant="top" src={profileImage} className="rounded-circle img-fluid" style={{ height: '220px', width: '240px' }} />
                    </div>
                    <Card.Body>
                        <Card.Title>{first_name} {last_name}</Card.Title>
                        <Card.Text><strong>Username:</strong> {user_name}</Card.Text>
                        <Card.Text><strong>Major:</strong> {major}</Card.Text>
                        <Card.Text><strong>Graduation Year:</strong> {year_graduated}</Card.Text>
                        <Card.Text><strong>Company:</strong> {company}</Card.Text>
                        <Card.Text><strong>Title:</strong> {title}</Card.Text>
                        <Card.Text><strong>Email:</strong> {email}</Card.Text>
                        <Card.Text>
                            <strong>LinkedIn:</strong> {linkedin_link ? <a href={linkedin_link} target="_blank" rel="noopener noreferrer">Profile</a> : "No LinkedIn provided"}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Profile;


