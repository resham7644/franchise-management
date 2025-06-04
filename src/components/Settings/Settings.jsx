import { useState } from 'react';
import axios from 'axios';
import { User, Image, Lock, UploadCloud } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

export default function SettingsComponent() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = new FormData();
    if (username) formData.append('name', username);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('pic', profilePic);

    if (formData.has('name') || formData.has('password') || formData.has('pic')) {
      try {
        const resp = await axios.put(`http://localhost:2004/user/update/${user.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (resp.data.success) {
          setUser({
            id: resp.data.user._id,
            name: resp.data.user.name,
            email: resp.data.user.email,
            role: resp.data.user.role,
            profile: resp.data.user.pic,
            token: resp.data.token,
          });
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          alert('Profile updated successfully');
        } else {
          alert('Profile update failed');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the profile');
      }
    } else {
      alert('Please fill at least one field to update your profile');
    }
  };

  const currentProfilePic = user?.profile ? user.profile : 'nopic.jpg';

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-8 p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Profile Section */}
      <section className="flex-grow basis-2/3">
        <div className="flex flex-row mb-4">
          <h2 className="text-3xl font-semibold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600 mt-3 ml-2">
            Manage your personal information, security, and profile picture.
          </p>
        </div>

        {/* Name Update */}
        <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
          Update Name
        </label>
        <div className="flex items-center mb-4 bg-white rounded-md shadow-sm">
          <User className="text-gray-500 ml-3" />
          <input
            id="username"
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow py-2 px-3 border-0 rounded-md focus:ring-0 text-gray-900"
          />
        </div>


          {/* Password Update */}
          <div className="flex-grow">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
              Change Password
            </label>
            <div className="flex items-center bg-white rounded-md shadow-sm mb-4">
              <Lock className="text-gray-500 ml-3" />
              <input
                id="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow py-2 px-3 border-0 rounded-md focus:ring-0 text-gray-900"
              />
            </div>

          {/* Confirm Password */}
          <div className="flex-grow">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="flex items-center bg-white rounded-md shadow-sm mb-4">
              <Lock className="text-gray-500 ml-3" />
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-grow py-2 px-3 border-0 rounded-md focus:ring-0 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-2">
              Choose Profile Pic
            </label>
        <label htmlFor="file-input" className="sr-only">Choose file</label>
  <input type="file" name="idProof" onChange={(e) => {
      setProfilePic(e.target.files[0]);
    }} id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"/>
    </div>
      </section>


      {/* Submit Button */}
      <div className="w-full flex justify-center mt-4">
        <button
          type="submit"
          className="text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-2 px-6 rounded-md shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
