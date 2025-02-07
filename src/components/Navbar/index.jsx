import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, X, CircleUser } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import useCategories from "../../hooks/useCategory";
import MobileNavigation from "./MobileNavigation";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  // State for mobile menu, login, and profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get categories and loading status from the hook (still available if needed elsewhere)
  const { categories, loading: categoriesLoading } = useCategories();
  // Get cart count from context
  const { cartCount } = useCartContext();
  // Get logout function from auth hook
  const { logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Check login status based on token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close menus when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle the profile dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600 shadow-lg">
      <div className="relative container mx-auto px-4 h-20 flex items-center">
        {/* Left Side: Promo & Destinations (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-0">
          <Link
            to="/promo"
            className="flex items-center space-x-1 py-2 text-white hover:text-blue-200 transition-colors duration-300"
          >
            <span>Promo</span>
          </Link>
          <Link
            to="/activity"
            className="flex items-center space-x-1 py-2 text-white hover:text-blue-200 transition-colors duration-300"
          >
            <span>Destinations</span>
          </Link>
        </div>

        {/* Center: Logo (Always Centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/logo-Jalan-kuy.png"
              alt="Jalankuy Logo"
              className="h-15" // Adjust height as needed
            />
          </Link>
        </div>

        {/* Right Side: Cart & Profile (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-4 absolute right-0">
          <Link
            to="/cart"
            className="p-2 rounded-full text-white hover:bg-blue-500 transition-colors duration-300 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full text-white hover:bg-blue-500"
              >
                <CircleUser className="w-6 h-6" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-5 py-2.5 text-sm font-medium text-white border border-white rounded-xl hover:bg-blue-500 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 text-sm font-medium text-blue-600 bg-white rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Icon (Always on Right) */}
        <div className="lg:hidden flex items-center absolute right-0">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white hover:bg-blue-500 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isMobileMenuOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onMobileMenuToggle={toggleMobileMenu}
        onLogout={handleLogout}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute right-0 top-0 w-3/4 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-blue-600 border-b border-blue-500">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:text-blue-200 rounded-lg hover:bg-blue-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Mobile Menu Content */}
            <div className="py-4">
              <div className="space-y-1">
                <Link
                  to="/promo"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  Promo
                </Link>
                <Link
                  to="/activity"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  Destinations
                </Link>
                <Link
                  to="/cart"
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 inline-block mr-3" />
                    Cart
                  </div>
                </Link>
              </div>
              {/* Mobile Actions */}
              <div className="p-4 mt-4 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
