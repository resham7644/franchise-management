// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Info, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";

// const FranDashboard = () => {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(7);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Fetch data from API
//   function fetchApplications() {
//     setLoading(true);
//     axios.get("http://localhost:2004/form/allapplicants")
//       .then((response) => {
//         setItems(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   // Reset to first page when tab changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeTab]);

//   // Tabs Configurations
//   const tabs = [
//     { id: "pending", label: "Pending", status: 0 },
//     { id: "accepted", label: "Accepted", status: 1 },
//     { id: "rejected", label: "Rejected", status: 2 },
//   ];

//   // Filter items based on active tab status
//   const filteredItems = items.filter((item) => item.status === tabs.find(t => t.id === activeTab).status);

//   // Calculate pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   // Handle button actions
//   const handleAction = async (id, action) => {
//     console.log(`Performing ${action} on ID: ${id}`);

//     try {
//       let url = "";
//       if (action === "accept") url = "http://localhost:2004/form/accept";
//       else if (action === "reject") url = "http://localhost:2004/form/reject";
//       else if (action === "delete") url = "http://localhost:2004/form/delete";
//       else if (action === "franchise") url = "http://localhost:2004/form/franchise";
//       else if (action === "decline") url = "http://localhost:2004/form/decline";

//       await axios.post(url, { id }, { headers: { "Content-Type": "application/json" } });
      
//       alert(`Application ${action}ed successfully`);
      
//       // After successful action, fetch updated data
//       fetchApplications();
//     } catch (error) {
//       console.error(`Error performing ${action}:`, error);
//     }
//   };

//   // View application details
//   const handleViewDetails = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   // Generate application number
//   const getApplicationNumber = (item, index) => {
//     return `APP-${new Date(item.createdAt || Date.now()).getFullYear()}-${(index + 1 + indexOfFirstItem).toString().padStart(4, '0')}`;
//   };

//   // Pagination controls
//   const paginate = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen ml-64 mt-14 p-6 bg-gray-50 dark:bg-neutral-900">
//       <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
//         {/* Tabs Header */}
//         <div className="border-b border-gray-200 dark:border-neutral-700">
//           <nav className="flex gap-x-4 px-4" role="tablist">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={`py-4 px-6 text-sm font-medium border-b-2 transition-all whitespace-nowrap
//                 ${
//                   activeTab === tab.id
//                     ? "border-blue-600 text-blue-600 font-semibold"
//                     : "border-transparent text-gray-500 hover:text-gray-600"
//                 }
//                 dark:text-neutral-400 dark:hover:text-blue-500`}
//                 onClick={() => setActiveTab(tab.id)}
//                 role="tab"
//               >
//                 {tab.label} 
//                 <span className="ml-2 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-full text-xs">
//                   {items.filter(item => item.status === tab.status).length}
//                 </span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Table Content */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="p-8 text-center">
//               <p className="text-gray-500 dark:text-gray-400">Loading applications...</p>
//             </div>
//           ) : filteredItems.length > 0 ? (
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 dark:bg-neutral-700 text-center text-gray-500 dark:text-gray-400">
//                   <th className="p-4 font-medium text-gray-600 dark:text-gray-200">S.No</th>
//                   <th className="p-4 font-medium text-gray-600 dark:text-gray-200">Application No.</th>
//                   <th className="p-4 font-medium text-gray-600 dark:text-gray-200">Name</th>
//                   <th className="p-4 font-medium text-gray-600 dark:text-gray-200">Email</th>
                  
//                   <th className="p-4 font-medium text-gray-600 dark:text-gray-200 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr 
//                     key={item._id} 
//                     className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-750"
//                   >
//                     <td className="p-4 text-gray-700 dark:text-gray-300">{indexOfFirstItem + index + 1}</td>
//                     <td className="p-4 text-gray-700 dark:text-gray-300">{getApplicationNumber(item, index)}</td>
//                     <td className="p-4 font-medium text-gray-800 dark:text-white">{item.name}</td>
//                     <td className="p-4 text-gray-600 dark:text-gray-400">{item.email}</td>
                    
//                     <td className="p-4">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleViewDetails(item)}
//                           className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>
                        
//                         {activeTab === "pending" && (
//                           <>
//                             <button
//                               onClick={() => handleAction(item._id, "accept")}
//                               className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition text-sm"
//                             >
//                               Accept
//                             </button>
//                             <button
//                               onClick={() => handleAction(item._id, "reject")}
//                               className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition text-sm"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                         {activeTab === "accepted" && (
//                           <>
//                             <button
//                               onClick={() => handleAction(item._id, "franchise")}
//                               className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition text-sm"
//                             >
//                               Franchise
//                             </button>
//                             <button
//                               onClick={() => handleAction(item._id, "decline")}
//                               className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition text-sm"
//                             >
//                               Decline
//                             </button>
//                           </>
//                         )}
//                         {activeTab === "rejected" && (
//                           <>
//                             <button
//                               onClick={() => handleAction(item._id, "accept")}
//                               className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition text-sm"
//                             >
//                               Accept
//                             </button>
//                             <button
//                               ={() => handleAction(item._ionClickd, "delete")}
//                               className="bg-red-700 text-white px-3 py-1 rounded-lg shadow hover:bg-red-800 transition text-sm"
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="p-8 text-center">
//               <p className="text-gray-500 dark:text-gray-400">No applications found</p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {filteredItems.length > 0 && (
//           <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-700 px-4 py-3">
//             <div className="text-sm text-gray-500 dark:text-gray-400">
//               Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
//               <span className="font-medium">
//                 {Math.min(indexOfLastItem, filteredItems.length)}
//               </span>{" "}
//               of <span className="font-medium">{filteredItems.length}</span> applications
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-md ${
//                   currentPage === 1
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
//                 } border border-gray-200 dark:border-neutral-600`}
//               >
//                 <ChevronLeft size={18} />
//               </button>
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => paginate(i + 1)}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white"
//                       : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
//                   } border border-gray-200 dark:border-neutral-600`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`p-2 rounded-md ${
//                   currentPage === totalPages
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
//                 } border border-gray-200 dark:border-neutral-600`}
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Detailed Information Modal */}
//       {showModal && selectedItem && (
//         <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-auto">
//             <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 p-4">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Application Details
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-6 grid grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Personal Information</h4>
//                   <div className="mt-2 space-y-2">
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Full Name:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.name}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Email:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.email}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Phone:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.phone || "N/A"}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Information</h4>
//                   <div className="mt-2 space-y-2">
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Business Type:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.buisness || "N/A"}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Experience:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.experience || "N/A"}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location Information</h4>
//                   <div className="mt-2 space-y-2">
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">City:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.city || "N/A"}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Area:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.area || "N/A"}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Address:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">{selectedItem.address || "N/A"}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Application Status</h4>
//                   <div className="mt-2 space-y-2">
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Status:</span>
//                       <span className={`font-medium px-2 py-1 rounded-full text-sm ${
//                         selectedItem.status === 0 ? "bg-yellow-100 text-yellow-800" : 
//                         selectedItem.status === 1 ? "bg-green-100 text-green-800" :
//                         "bg-red-100 text-red-800"
//                       }`}>
//                         {selectedItem.status === 0 ? "Pending" : 
//                          selectedItem.status === 1 ? "Accepted" : "Rejected"}
//                       </span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-gray-600 dark:text-gray-400">Date Applied:</span>
//                       <span className="font-medium text-gray-900 dark:text-white">
//                         {selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleDateString() : "N/A"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               {selectedItem.comments && (
//                 <div className="col-span-2">
//                   <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Comments</h4>
//                   <p className="mt-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
//                     {selectedItem.comments}
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-neutral-700 p-4">
//               {selectedItem.status === 0 && (
//                 <>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "accept");
//                       setShowModal(false);
//                     }}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "reject");
//                       setShowModal(false);
//                     }}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}
//               {selectedItem.status === 1 && (
//                 <>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "franchise");
//                       setShowModal(false);
//                     }}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//                   >
//                     Franchise
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "decline");
//                       setShowModal(false);
//                     }}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
//                   >
//                     Decline
//                   </button>
//                 </>
//               )}
//               {selectedItem.status === 2 && (
//                 <>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "accept");
//                       setShowModal(false);
//                     }}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleAction(selectedItem._id, "delete");
//                       setShowModal(false);
//                     }}
//                     className="bg-red-700 text-white px-4 py-2 rounded-lg shadow hover:bg-red-800 transition"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FranDashboard;