import React, { useState } from 'react';

const Setting = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if currentPassword matches the admin's actual current password
    // Check if newPassword matches confirmNewPassword
    // Perform password change action (API call or other logic)
    // Display success or error message accordingly
    if (newPassword === confirmNewPassword) {
      // Perform password change action here
      setMessage('Password changed successfully.');
    } else {
      setMessage('New password and confirm password do not match.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-gray-700 font-semibold">Current Password</label>
          <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-semibold">New Password</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-gray-700 font-semibold">Confirm New Password</label>
          <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="mt-1 p-2 border rounded-md w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Change Password</button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Setting;
