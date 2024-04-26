import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Support = () => {
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Issue with login', time: '2024-04-24 09:00', status: 'Open', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis odio eu quam posuere consectetur.' },
    { id: 2, subject: 'Error loading page', time: '2024-04-23 15:30', status: 'Open', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis odio eu quam posuere consectetur.' },
    { id: 3, subject: 'Cannot update profile', time: '2024-04-22 11:45', Contact:" 0227272", status: 'In Progress', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis odio eu quam posuere consectetur.' }
  ]);

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
            <p className={`text-sm font-semibold mt-2 ${ticket.status === 'Open' ? 'text-green-600' : ticket.status === 'Closed' ? 'text-green-600' : 'text-yellow-600'}`}>
              Status: {ticket.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
