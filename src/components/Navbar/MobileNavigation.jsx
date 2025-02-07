import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const MobileNavigation = ({ onMobileMenuToggle }) => (
  <div className="lg:hidden flex items-center justify-between px-4 py-0">
    {/* Logo as an Image */}
    <Link to="/" className="flex items-center">
      <span className="text-1xl font-bold">Menu</span>
    </Link>
    {/* Hamburger Icon */}
    <button
      onClick={onMobileMenuToggle}
      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
);

export default MobileNavigation;
