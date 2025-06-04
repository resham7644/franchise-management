import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationCard from "../ApplicationCard"; 

const ApplicantDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [items, setItems] = useState([]);
  

  // Fetch data from API
  function fetchApplications() {
    axios.get("http://localhost:2004/form/allapplicants")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle button actions
    const handleAction = async (id, action) => {
      console.log(`Performing ${action} on ID: ${id}`);
  
      try {
        let url = "";
        if (action === "accept") url = "http://localhost:2004/form/accept";
        else if (action === "reject") url = "http://localhost:2004/form/reject";
        else if (action === "delete") url = "http://localhost:2004/form/delete";
        else if (action === "decline") url = "http://localhost:2004/form/decline";
        else if (action === "franchise") {
          url = "http://localhost:2004/form/franchise";
          doFranchise(id);
           }
        
  
        await axios.post(url, { id }, { headers: { "Content-Type": "application/json" } });
        
        alert(`Application ${action}ed successfully`);
        
        // After successful action, fetch updated data
        fetchApplications();
      } catch (error) {
        console.error(`Error performing ${action}:`, error);
      }
    };
    
    async function doFranchise(id){
      try{
      let url = "http://localhost:2004/user/save";
      let fd=new FormData();
      let user = items.find((item) => item._id === id);
      console.log(user);
      await axios.post(url,{
        id: user._id,
        name: user.name,
        email: user.email
      }, { headers: { "Content-Type": "application/json" } });
      alert("Franchise Created Successfully");
    } catch (error) {
      console.error(error);
    }
    };

  // Tabs Configurations
  const tabs = [
    { id: "pending", label: "Pending", status: 0 },
    { id: "accepted", label: "Accepted", status: 1 },
    { id: "rejected", label: "Rejected", status: 2 },
  ];

  const renderApplications = () => {
// Filter items based on active tab status
const filtered = items.filter((item) => item.status === tabs.find(t => t.id === activeTab).status);    console.log(items)
    if (filtered.length === 0) {
      return (
        <p className="text-gray-500 dark:text-neutral-400">
          No <span className="capitalize">{activeTab}</span> applications found.
        </p>
      );
    }
    return <ApplicationCard items={filtered} btnclick={handleAction}/>;

  };

  return (
    <div className="flex-1 w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
      {/* Tabs */}
      <div className="relative border-b border-gray-200 px-4 dark:border-neutral-700">
      <nav
        className="flex gap-x-2"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 px-2 inline-flex items-center gap-x-2 text-m whitespace-nowrap
              transition-all duration-300 border-b-2
              ${
                activeTab === tab.id
                  ? "border-blue-800 text-blue-800 font-semibold"
                  : "border-transparent text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-600"
              }
            `}
            id={`tab-${tab}`}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab.label}
            <span className="ml-2 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-full text-xs">
                  {items.filter(item => item.status === tab.status).length}
                </span>
          </button>
        ))}
      </nav>
    </div>


      {/* Tab content */}
      <div className="mt-3 p-4" role="tabpanel">
        {renderApplications()}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
