import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    // Function to fetch ticket data from the API
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://formitebackendnew2024-production.up.railway.app/api/users');
        // Assuming the API returns an array of ticket objects
        const ticketData = response.data.map((ticket, index) => ({
          id: index + 1,  // Generate an id if not provided
          subject: ticket.subject,
          time: new Date().toLocaleString(),  // Format time in localized string
          status: 'Open',  // Default status
          Contact: ticket.phone,
          description: `${ticket.name}, ${ticket.email}, ${ticket.location}, ${ticket.occupation}`,  // Combine all details into description
          isOpen: false  // Initially set to false
        }));

        // Sort tickets by time in descending order (latest on top)
        ticketData.sort((a, b) => new Date(b.time) - new Date(a.time));

        setTickets(ticketData);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTickets();
  }, []);

  const toggleStatus = (ticketId) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId && ticket.status === 'Open') {
        return { ...ticket, isOpen: !ticket.isOpen };
      }
      return ticket;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tickets</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-auto md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800 font-semibold">Ticket ID: {ticket.id}</p>
                <button onClick={() => toggleStatus(ticket.id)} disabled={ticket.status !== 'Open'}>
                  <FaAngleDown className={`text-gray-600 cursor-pointer ${ticket.status !== 'Open' && 'opacity-50'}`} />
                </button>
              </div>
              <p className="text-gray-700 mb-2">Subject: {ticket.subject}</p>
              <p className="text-gray-700 mb-2">Time: {ticket.time}</p>
              <p className="text-gray-700 mb-2">Contact No: {ticket.Contact}</p>
              {ticket.isOpen && (
                <div className="mt-2">
                  <p className="text-gray-700">{ticket.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
