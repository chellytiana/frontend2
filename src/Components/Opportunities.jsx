import React, { useState, useEffect } from 'react';

const Opportunities = () => {
    const [opportunitiesData, setOpportunitiesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const opportunitiesPerPage = 3;

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://138.197.99.80:2490/api/opportunities', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setOpportunitiesData(data);
            } else {
                console.error("Failed to fetch opportunities. Status:", response.status);
            }
        } catch (error) {
            console.error('Error fetching opportunities:', error);
        }
    };

    const toggleDescription = (id) => {
        setOpportunitiesData(opportunitiesData.map(opp =>
            opp._id === id ? { ...opp, isExpanded: !opp.isExpanded } : opp
        ));
    };

    const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
    const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
    const currentOpportunities = opportunitiesData.slice(indexOfFirstOpportunity, indexOfLastOpportunity);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(opportunitiesData.length / opportunitiesPerPage);

    return (
        <div className="container mt-5">
            <h1>Opportunities</h1>
            {currentOpportunities.map((opp) => (
                <div key={opp._id} className="opportunity-item mb-4 p-4 border rounded-lg shadow-md">
                    <h3 className="text-xl font-bold">{opp.title}</h3>
                    <p><strong>Posted by:</strong> {opp.posted_by}</p>
                    <p><strong>Type:</strong> {opp.type}</p>
                    <p><strong>Description:</strong> {opp.description}</p>
                    <p><strong>Payment:</strong> {opp.is_paid ? opp.amount : "Unpaid"}</p>
                    <button 
                        className="btn btn-primary mt-2" 
                        onClick={() => toggleDescription(opp._id)}
                    >
                        {opp.isExpanded ? 'Hide Details' : 'See Details'}
                    </button>
                    {opp.isExpanded && (
                        <div className="mt-3">
                            <h4 className="font-semibold">Opportunity Details</h4>
                            <p>{opp.description}</p>
                        </div>
                    )}
                    <button className="btn btn-secondary mt-2">Message</button>
                </div>
            ))}
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

export default Opportunities;
