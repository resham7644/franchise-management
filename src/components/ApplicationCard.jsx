  import React, { useState } from "react";
  import { formatDistanceToNow, parseISO } from "date-fns";

  const ApplicationCard = ({ items, index,btnclick }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    
    function toggleExpand(index) {
      setExpandedIndex(prev => (prev === index ? null : index)); 
    }

    function handleAction(id, action) {
      console.log(`Performing ${action} on ID: ${id}`);
      btnclick(id, action);
    };

    return (
      <div className=" bg-gray-100 dark:bg-neutral-700 rounded-lg shadow-md"> 
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sr. No.
                </th>
                  <th scope="col" class="px-6 py-3">
                      Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                      City
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Area
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Expand
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <React.Fragment key={index}>
              <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4">
                      {index + 1}
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                  </th>
                  <td class="px-6 py-4">
                      {item.email}
                  </td>
                  <td class="px-6 py-4">
                      {item.city || "NA"}
                  </td>
                  <td class="px-6 py-4">
                      {item.area || "NA"}
                  </td>
                  <td class="px-6 py-4">
                      <button onClick={() => toggleExpand(index)}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      {expandedIndex === index ? "Hide" : "View"}
                      </button>
                  </td>
                  <td className="px-6 py-4 space-x-4">
                    { item.status === 0 && (
                      <>
                      <button onClick={() => handleAction(item._id, "accept")}
                      className="px-3 py-2 rounded-xl font-semibold text-white bg-green-600 
                                  hover:bg-green-700 active:scale-95   
                                  transition duration-150 ease-in-out">
                                  Approve
                                </button>
                                <button onClick={() => handleAction(item._id, "reject")}
                                className="px-3 py-2 rounded-xl font-semibold text-white bg-red-600 
                                hover:bg-red-700 active:scale-95 
                                transition duration-150 ease-in-out">
                                Reject
                              </button>
                      </>
                    )}
                    { item.status === 1 && (
                      <>
                      <button onClick={() => handleAction(item._id, "franchise")}
                      className="px-3 py-2 rounded-xl font-semibold text-white bg-green-600 
                                  hover:bg-green-700 active:scale-95   
                                  transition duration-150 ease-in-out">
                                  Franchise
                                </button>
                                <button onClick={() => handleAction(item._id, "reject")}
                                className="px-3 py-2 rounded-xl font-semibold text-white bg-red-600 
                                hover:bg-red-700 active:scale-95 
                                transition duration-150 ease-in-out">
                                Decline
                              </button>
                      </>
                    )}
                    { item.status === 2 && (
                      <>
                      <button onClick={() => handleAction(item._id, "accept")}
                      className="px-3 py-2 rounded-xl font-semibold text-white bg-green-600 
                                  hover:bg-green-700 active:scale-95   
                                  transition duration-150 ease-in-out">
                                  Approve
                                </button>
                                <button  onClick={() => handleAction(item._id, "delete")}
                                className="px-3 py-2 rounded-xl font-semibold text-white bg-red-600 
                                hover:bg-red-700 active:scale-95 
                                transition duration-150 ease-in-out">
                                Delete
                              </button>
                      </>
                    )}
                  </td>
              </tr>
              {/* Expanded Row (conditionally rendered) */}
              {expandedIndex === index && (
                  <tr className="bg-gray-100 dark:bg-gray-900">
                  <td colSpan="7" className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col md:flex-row gap-6">
                
                      {/* 🕒 Time & Date badge (top-right corner) */}
                      <div className="absolute top-4 right-4 text-sm text-right text-gray-600 dark:text-gray-300">
                        <p><strong>Date:</strong> {new Date(item.doa).toLocaleDateString()}</p>
                        <p><strong>{formatDistanceToNow(new Date(item.doa), { addSuffix: true })}</strong></p>
                      </div>
                
                      {/* Left: Personal Information */}
                      <div className="w-full md:w-1/2 space-y-2">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Personal Information</h2>
                        <p><strong>Name:</strong> {item.name || "NA"}</p>
                        <p><strong>Email:</strong> {item.email || "NA"}</p>
                        <p><strong>Phone:</strong> {item.cont || "NA"}</p>
                        <p><strong>Business:</strong> {item.buisness || "NA"}</p>
                        <p><strong>ID Proof:</strong> <a href={item.idProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click Here</a></p>
                      </div>
                
                      {/* Right: Site Information */}
                      <div className="w-full md:w-1/2 space-y-2">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Site Information</h2>
                        <p><strong>Ownership:</strong> {item.ownership || "NA"}</p>
                        <p><strong>Address:</strong> {item.address || "NA"}</p>
                        <p><strong>City:</strong> {item.city || "NA"}</p>
                        <p><strong>Pincode:</strong> {item.pincode || "NA"}</p>
                        <p><strong>Area:</strong> {item.area || "NA"}</p>
                      </div>
                
                    </div>
                  </td>
                </tr>                
                
                )}
              </React.Fragment>
          ))}
          </tbody>
      </table>
  </div>

      </div>

      
    );
  };

  export default ApplicationCard;
