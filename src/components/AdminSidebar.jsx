import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Gauge,
  Activity,
  TicketPercent,
  Menu,
  SquareArrowDownLeft,
  UserCog,
  ChartBarStacked,
  Presentation,
  HandCoins,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import ljk from "/src/assets/logo-Jalan-kuy-2.png";
import lki from "/src/assets/Jalan-kuy-icon.png";

const AdminSidebar = ({ isExpanded, setIsExpanded }) => {
  const activeClassName = "bg-blue-500 text-white"; // Active link style
  const inactiveClassName =
    "text-gray-700 hover:bg-blue-200 hover:text-gray-900"; // Inactive link style
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsExpanded]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 bg-white text-gray-900 transition-all duration-300 ease-in-out flex flex-col
        ${isExpanded ? "w-64" : "w-10"}`}
    >
      {/* Header */}
      <div
        className={`py-3 border-b border-blue-300 ${
          isExpanded ? "px-4" : "px-2"
        }`}
      >
        <div className="flex items-center">
          <img
            // Change logo based on isExpanded:
            src={isExpanded ? ljk : lki}
            alt="Logo"
            className={isExpanded ? "w-40 h-20" : "w-7 h-7"}
          />
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center gap-3 py-3 text-gray-600 hover:bg-blue-200 transition-colors ${
          isExpanded ? "px-4" : "px-2 justify-center"
        }`}
      >
        <Menu
          className={`w-5 h-5 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <Gauge
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Dashboard
              </span>
            </>
          )}
        </NavLink>

        {/* Manage User */}
        <NavLink
          to="/user-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <UserCog
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Manage User
              </span>
            </>
          )}
        </NavLink>

        {/* Manage Category */}
        <NavLink
          to="/category-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <ChartBarStacked
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Manage Category
              </span>
            </>
          )}
        </NavLink>

        {/* Activity Management */}
        <NavLink
          to="/activity-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <Activity
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Activity Management
              </span>
            </>
          )}
        </NavLink>

        {/* Promo */}
        <NavLink
          to="/promo-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <TicketPercent
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Promo
              </span>
            </>
          )}
        </NavLink>

        {/* Banner Management */}
        <NavLink
          to="/banner-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <Presentation
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Banner
              </span>
            </>
          )}
        </NavLink>

        {/* Transaction Management */}
        <NavLink
          to="/transaction-management"
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 transition-colors ${
              isExpanded ? "px-4" : "px-2 justify-center"
            } ${isActive ? activeClassName : inactiveClassName}`
          }
        >
          {({ isActive }) => (
            <>
              <HandCoins
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : "text-blue-600"
                }`}
              />
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
                }`}
              >
                Transaction
              </span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Footer with Logout */}
      <div className="border-t border-blue-300">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 py-3 text-red-600 hover:bg-red-100 hover:text-red-800
            ${isExpanded ? "px-4" : "px-2 justify-center"}`}
        >
          <SquareArrowDownLeft className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
