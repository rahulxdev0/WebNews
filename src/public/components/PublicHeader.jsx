import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import AuthModal from "./AuthModal";
import { useUserInfoQuery } from "../../store/api/authEndpoints";
import AdminRegisterModal from "./AdminRegisterModal";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { data } = useUserInfoQuery();
  console.log("user info", data);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setIsUserDropdownOpen(false);
    // You might want to call a logout mutation here
  };

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Politics", href: "#" },
    { name: "Business", href: "#" },
    { name: "Technology", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Entertainment", href: "#" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white  shadow-md py-2"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-red-600 w-10 h-10 rounded-full mr-3"></div>
              <span className="text-2xl font-bold text-gray-900 ">
                News<span className="text-red-600">Portal</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-red-600   transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-base  font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Become Author
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700  hover:text-red-600 "
              >
                <FiSearch size={20} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-700  hover:text-red-600 "
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* User Section */}
              {data && data.username ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {data.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {data.username}
                    </span>
                    <FiChevronDown
                      size={16}
                      className={`transition-transform ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {data.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {data.full_name || data.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {data.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Role:</span>
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {data.role}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="p-2 text-gray-700  hover:text-red-600 "
                >
                  <FiUser size={20} />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-gray-700 "
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full px-4 py-2 bg-gray-100  rounded-l-lg focus:outline-none"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors">
                Search
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50">
            <div className="absolute right-0 top-0 h-full w-4/5 bg-white  shadow-lg">
              <div className="p-4 border-b  flex justify-end">
                <button onClick={() => setIsMenuOpen(false)}>
                  <FiX size={24} className="text-gray-700 " />
                </button>
              </div>
              <nav className="flex flex-col p-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100  rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile User Section */}
                {data && data.username ? (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {data.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {data.full_name || data.username}
                        </p>
                        <p className="text-xs text-gray-500">{data.email}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          Role: {data.role}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center space-x-6">
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="p-2"
                    >
                      <FiUser size={24} />
                    </button>
                    <button className="p-2">
                      <FiSearch size={24} />
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
      <AuthModal isModalOpen={isAuthModalOpen} onClose={handleCloseModal} />
      <AdminRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PublicHeader;
