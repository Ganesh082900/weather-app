import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubNav = () => {
    setIsSubNavOpen(!isSubNavOpen);
  };

  const isSelected = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      <div className="lg:hidden p-4">
        <MenuIcon className="text-3xl cursor-pointer" onClick={toggleSidebar} />
      </div>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="bg-blue-500 h-full w-64 shadow-lg flex flex-col">
          <div className="flex justify-between p-4">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <CloseIcon className="text-white cursor-pointer" onClick={toggleSidebar} />
          </div>
          <nav className="flex-grow">
            <Link
              to="view-leads"
              className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected("/view-leads") ? "underline-white" : ""}`}
              onClick={toggleSidebar}
            >
              <img className='w-6' src="../../../public/images/tab/group.png" alt="viewLeads" />
              <span className="ml-3">View Leads</span>
            </Link>
            <div>
              <div
                className="flex items-center justify-between p-4 text-white hover:bg-gray-800 cursor-pointer"
                onClick={toggleSubNav}
              >
                <div className="flex items-center">
                  <img className="w-6" src="../../../public/images/tab/leads.png" alt="createLeads" />
                  <span className="ml-3">Create Leads</span>
                </div>
                {isSubNavOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              {isSubNavOpen && (
                <div className="pl-8">
                  {subNavItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected(item.path) ? "underline-white" : ""}`}
                      onClick={() => {
                        toggleSidebar();
                        setIsSubNavOpen(false);
                      }}
                    >
                      <img className='w-6' src={item.icon} alt={item.name} />
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="hidden lg:block fixed h-full w-64 bg-blue-500 shadow-lg">
        <nav className="flex-grow">
          <Link
            to="view-leads"
            className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected("/view-leads") ? "underline-white" : ""}`}
          >
            <img className="w-6" src="../../../public/images/tab/group.png" alt="view leads" />
            <span className="ml-3">View Leads</span>
          </Link>
          <div>
            <div
              className="flex items-center justify-between p-4 text-white hover:bg-gray-800 cursor-pointer"
              onClick={toggleSubNav}
            >
              <div className="flex items-center">
                <img className="w-6" src="../../../public/images/tab/leads.png" alt="createLeads" />
                <span className="ml-3">Create Leads</span>
              </div>
              {isSubNavOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isSubNavOpen && (
              <div className="pl-8">
                {subNavItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected(item.path) ? "underline-white" : ""}`}
                  >
                    <img className="w-6" src={item.icon} alt={item.name} />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="create-admin"
            className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected("/create-admin") ? "underline-white" : ""}`}
          >
            <img className="w-6" src="../../../public/images/tab/group.png" alt="Create Admin" />
            <span className="ml-3">Create Admin</span>
          </Link>
          <Link
            to="create-user"
            className={`flex items-center p-4 text-white hover:bg-gray-800 ${isSelected("/create-user") ? "underline-white" : ""}`}
          >
            <img className="w-6" src="../../../public/images/tab/group.png" alt="Create User" />
            <span className="ml-3">Create User</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const subNavItems = [
  { name: "School", path: "create-school-lead", icon: "../../../public/images/Leads/schoolIcon.png" },
  { name: "Franchise", path: "create-franchise", icon: "../../../public/images/Leads/franchise.png" },
  { name: "School Agent", path: "create-school-agent", icon: "../../../public/images/Leads/agent.png" },
  { name: "Franchise Agent", path: "create-franchise-agent", icon: "../../../public/images/Leads/agent1.png" },
  { name: "REP", path: "create-rep", icon: "../../../public/images/Leads/schoolIcon.png" },
  { name: "B2C", path: "create-b2c", icon: "../../../public/images/Leads/schoolIcon.png" },
];


