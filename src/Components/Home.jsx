import React, { useState } from 'react';
import careerfairImage from '../assets/careerfair.jpg';
import concertImage from '../assets/concert.jpeg';
import hattersaturdayImage from '../assets/hattersaturday.jpg';
import showcaseImage from '../assets/showcase.jpg';
import graduationImage from '../assets/graduation.jpg';
import homecomingImage from '../assets/homecoming.jpg';
import residencehallImage from '../assets/residencehall.jpg';

const events = [
  {
    id: 1,
    title: 'Stetson Career Fair',
    date: 'February 21, 2025',
    description: 'Join us for the annual career fair where you can meet employers and find job opportunities.',
    image: careerfairImage, 
  },
  {
    id: 2,
    title: 'Stetson Jazz Ensemble',
    date: 'April 2, 2025',
    description: 'Enjoy a lively spring concert performed by Stetson students and local artists.',
    image: concertImage, 
  },
  {
    id: 3,
    title: 'Hatter Saturday',
    date: 'April 5, 2025',
    description: 'Celebrate your acceptance at Stetson University!',
    image: hattersaturdayImage, 
  },
  {
    id: 4,
    title: 'Stetson Showcase',
    date: 'April 15, 2025',
    description: 'Showcase your research to students and faculty.',
    image: showcaseImage, 
  },
  {
    id: 5,
    title: 'Graduation Ceremony',
    date: 'May 9th & 10th, 2025',
    description: 'Celebrate the achievements of Stetson graduates at the annual graduation ceremony.',
    image: graduationImage, 
  },
  {
    id: 6,
    title: 'Stetson Homecoming',
    date: 'October 24-26, 2025',
    description: 'Celebrate Stetson with us: Alumni, Students, Family, Friends, etc.',
    image: homecomingImage, 
  },
  {
    id: 7,
    title: 'New Residence Hall',
    date: 'Opening Spring 2026',
    description: 'See our New Residence Hall to come in 2026!',
    image: residencehallImage, 
  },
];

const Home = () => {
  const eventsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Page change
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5"></div>
      <h1>Welcome to Stetson University!</h1>
      <p>Keep up to date with what's happening at Stetson.</p>

      <div className="row">
        {currentEvents.map((event) => (
          <div className="col-md-4" key={event.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={event.image}
                alt={event.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="text-muted">Date: {event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={() => handlePageClick(2)}
          disabled={currentPage === 2}
        >
          2
        </button>
        <button
          className="btn btn-outline-secondary mx-2"
          onClick={() => handlePageClick(3)}
          disabled={currentPage === 3}
        >
          3
        </button>
      </div>
    </div>
  );
};

export default Home;

