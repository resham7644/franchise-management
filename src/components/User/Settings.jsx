// import { useState } from "react";
// import { User, Lock, Bell, Globe, Shield, Save, Upload, Check } from "lucide-react";
// import Navbar from "./Navbar/Navbar";
// import AdminDashboard from "./AdminDashboard";

// const AdminSettings = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [successMessage, setSuccessMessage] = useState("");
  
//   // Profile state
//   const [profile, setProfile] = useState({
//     name: "John Doe",
//     email: "johndoe@example.com",
//     phone: "+1 (555) 123-4567",
//     position: "Regional Manager",
//     location: "New York, NY"
//   });
  
//   // Password state
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });
  
//   // Notification settings
//   const [notifications, setNotifications] = useState({
//     emailAlerts: true,
//     smsAlerts: false,
//     salesReports: true,
//     systemUpdates: true
//   });
  
//   // System settings
//   const [systemSettings, setSystemSettings] = useState({
//     language: "english",
//     timezone: "America/New_York",
//     dateFormat: "MM/DD/YYYY",
//     autoLogout: 30
//   });
  
//   // Handle profile form change
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   // Handle password form change
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   // Handle notification toggle
//   const handleNotificationToggle = (setting) => {
//     setNotifications(prev => ({
//       ...prev,
//       [setting]: !prev[setting]
//     }));
//   };
  
//   // Handle system settings change
//   const handleSystemSettingChange = (e) => {
//     const { name, value } = e.target;
//     setSystemSettings(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   // Save settings - simulates API call
//   const saveSettings = (type) => {
//     setSuccessMessage(`${type} settings saved successfully!`);
//     setTimeout(() => setSuccessMessage(""), 3000);
//   };
  
//   // Validate password form
//   const isPasswordFormValid = () => {
//     return (
//       passwordForm.currentPassword.length >= 8 &&
//       passwordForm.newPassword.length >= 8 &&
//       passwordForm.newPassword === passwordForm.confirmPassword
//     );
//   };
  
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* <Navbar /> */}
      
//       <div className="flex mt-16"> {/* Add margin-top to account for fixed navbar */}
//         {/* <AdminDashboard setActive={() => {}} /> */}
        
//         <div className="ml-64 flex-1 p-6 bg-gray-100">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             {/* Settings Header */}
//             <div className="bg-gray-800 text-white p-4">
//               <h1 className="text-2xl font-bold">Settings</h1>
//               <p className="text-gray-300">Manage your account preferences and system settings</p>
//             </div>
            
//             {/* Success Message */}
//             {successMessage && (
//               <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center">
//                 <Check className="w-5 h-5 mr-2" />
//                 {successMessage}
//               </div>
//             )}
            
//             {/* Settings Tabs */}
//             <div className="flex border-b">
//               <button 
//                 className={`px-6 py-4 font-medium flex items-center ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
//                 onClick={() => setActiveTab("profile")}
//               >
//                 <User className="w-5 h-5 mr-2" />
//                 Profile
//               </button>
//               <button 
//                 className={`px-6 py-4 font-medium flex items-center ${activeTab === "security" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
//                 onClick={() => setActiveTab("security")}
//               >
//                 <Lock className="w-5 h-5 mr-2" />
//                 Security
//               </button>
//               <button 
//                 className={`px-6 py-4 font-medium flex items-center ${activeTab === "notifications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
//                 onClick={() => setActiveTab("notifications")}
//               >
//                 <Bell className="w-5 h-5 mr-2" />
//                 Notifications
//               </button>
//               <button 
//                 className={`px-6 py-4 font-medium flex items-center ${activeTab === "system" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
//                 onClick={() => setActiveTab("system")}
//               >
//                 <Globe className="w-5 h-5 mr-2" />
//                 System
//               </button>
//             </div>
            
//             {/* Tab Content */}
//             <div className="p-6">
//               {/* Profile Settings */}
//               {activeTab === "profile" && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
//                   <div className="flex flex-wrap md:flex-nowrap gap-6">
//                     {/* Profile Picture */}
//                     <div className="w-full md:w-1/3 flex flex-col items-center">
//                       <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4">
//                         <img 
//                           src="https://via.placeholder.com/150" 
//                           alt="Profile" 
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center">
//                         <Upload className="w-4 h-4 mr-2" />
//                         Upload Photo
//                       </button>
//                     </div>
                    
//                     {/* Profile Form */}
//                     <div className="w-full md:w-2/3">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                           <input 
//                             type="text" 
//                             name="name" 
//                             value={profile.name} 
//                             onChange={handleProfileChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                           <input 
//                             type="email" 
//                             name="email" 
//                             value={profile.email} 
//                             onChange={handleProfileChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                           <input 
//                             type="text" 
//                             name="phone" 
//                             value={profile.phone} 
//                             onChange={handleProfileChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
//                           <input 
//                             type="text" 
//                             name="position" 
//                             value={profile.position} 
//                             onChange={handleProfileChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                           <input 
//                             type="text" 
//                             name="location" 
//                             value={profile.location} 
//                             onChange={handleProfileChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                       </div>
//                       <div className="mt-6">
//                         <button 
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center"
//                           onClick={() => saveSettings("Profile")}
//                         >
//                           <Save className="w-4 h-4 mr-2" />
//                           Save Changes
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Security Settings */}
//               {activeTab === "security" && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                  
//                   <div className="max-w-md">
//                     <h3 className="text-lg font-medium mb-4">Change Password</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
//                         <input 
//                           type="password" 
//                           name="currentPassword" 
//                           value={passwordForm.currentPassword} 
//                           onChange={handlePasswordChange}
//                           className="w-full p-2 border rounded-md"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//                         <input 
//                           type="password" 
//                           name="newPassword" 
//                           value={passwordForm.newPassword} 
//                           onChange={handlePasswordChange}
//                           className="w-full p-2 border rounded-md"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                           Password must be at least 8 characters long
//                         </p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//                         <input 
//                           type="password" 
//                           name="confirmPassword" 
//                           value={passwordForm.confirmPassword} 
//                           onChange={handlePasswordChange}
//                           className="w-full p-2 border rounded-md"
//                         />
//                         {passwordForm.newPassword && passwordForm.confirmPassword && 
//                           passwordForm.newPassword !== passwordForm.confirmPassword && (
//                           <p className="text-xs text-red-500 mt-1">
//                             Passwords do not match
//                           </p>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="mt-6">
//                       <button 
//                         className={`${isPasswordFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white px-6 py-2 rounded-md flex items-center`}
//                         onClick={() => isPasswordFormValid() && saveSettings("Password")}
//                         disabled={!isPasswordFormValid()}
//                       >
//                         <Shield className="w-4 h-4 mr-2" />
//                         Update Password
//                       </button>
//                     </div>
                    
//                     <div className="mt-8 border-t pt-6">
//                       <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
//                       <div className="flex items-center justify-between py-2">
//                         <div>
//                           <p className="font-medium">SMS Authentication</p>
//                           <p className="text-sm text-gray-500">Use your phone number for two-factor authentication</p>
//                         </div>
//                         <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
//                           Setup
//                         </button>
//                       </div>
//                       <div className="flex items-center justify-between py-2">
//                         <div>
//                           <p className="font-medium">Authenticator App</p>
//                           <p className="text-sm text-gray-500">Use an authenticator app for two-factor authentication</p>
//                         </div>
//                         <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
//                           Setup
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Notification Settings */}
//               {activeTab === "notifications" && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//                       <div>
//                         <p className="font-medium">Email Alerts</p>
//                         <p className="text-sm text-gray-500">Receive important notifications via email</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={notifications.emailAlerts} 
//                           onChange={() => handleNotificationToggle("emailAlerts")}
//                           className="sr-only peer"
//                         />
//                         <div className={`w-11 h-6 rounded-full peer ${notifications.emailAlerts ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
//                       </label>
//                     </div>
                    
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//                       <div>
//                         <p className="font-medium">SMS Alerts</p>
//                         <p className="text-sm text-gray-500">Receive urgent notifications via SMS</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={notifications.smsAlerts} 
//                           onChange={() => handleNotificationToggle("smsAlerts")}
//                           className="sr-only peer"
//                         />
//                         <div className={`w-11 h-6 rounded-full peer ${notifications.smsAlerts ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
//                       </label>
//                     </div>
                    
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//                       <div>
//                         <p className="font-medium">Sales Reports</p>
//                         <p className="text-sm text-gray-500">Receive daily and weekly sales report summaries</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={notifications.salesReports} 
//                           onChange={() => handleNotificationToggle("salesReports")}
//                           className="sr-only peer"
//                         />
//                         <div className={`w-11 h-6 rounded-full peer ${notifications.salesReports ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
//                       </label>
//                     </div>
                    
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
//                       <div>
//                         <p className="font-medium">System Updates</p>
//                         <p className="text-sm text-gray-500">Receive notifications about system updates and maintenance</p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={notifications.systemUpdates} 
//                           onChange={() => handleNotificationToggle("systemUpdates")}
//                           className="sr-only peer"
//                         />
//                         <div className={`w-11 h-6 rounded-full peer ${notifications.systemUpdates ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6">
//                     <button 
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center"
//                       onClick={() => saveSettings("Notification")}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Preferences
//                     </button>
//                   </div>
//                 </div>
//               )}
              
//               {/* System Settings */}
//               {activeTab === "system" && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">System Preferences</h2>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//                       <select 
//                         name="language" 
//                         value={systemSettings.language} 
//                         onChange={handleSystemSettingChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="english">English</option>
//                         <option value="spanish">Spanish</option>
//                         <option value="french">French</option>
//                         <option value="german">German</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
//                       <select 
//                         name="timezone" 
//                         value={systemSettings.timezone} 
//                         onChange={handleSystemSettingChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="America/New_York">Eastern Time (US & Canada)</option>
//                         <option value="America/Chicago">Central Time (US & Canada)</option>
//                         <option value="America/Denver">Mountain Time (US & Canada)</option>
//                         <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
//                         <option value="Europe/London">London</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
//                       <select 
//                         name="dateFormat" 
//                         value={systemSettings.dateFormat} 
//                         onChange={handleSystemSettingChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                         <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                         <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Auto Logout (minutes)</label>
//                       <select 
//                         name="autoLogout" 
//                         value={systemSettings.autoLogout} 
//                         onChange={handleSystemSettingChange}
//                         className="w-full p-2 border rounded-md"
//                       >
//                         <option value="15">15 minutes</option>
//                         <option value="30">30 minutes</option>
//                         <option value="60">60 minutes</option>
//                         <option value="120">120 minutes</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div className="mt-8 border-t pt-6">
//                     <h3 className="text-lg font-medium mb-4">Data Management</h3>
                    
//                     <div className="flex flex-col md:flex-row gap-4">
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center justify-center">
//                         <Save className="w-4 h-4 mr-2" />
//                         Export Data
//                       </button>
                      
//                       <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center justify-center">
//                         Clear All Data
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6">
//                     <button 
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center"
//                       onClick={() => saveSettings("System")}
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Settings
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;