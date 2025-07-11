import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX, FiUser, FiSun, FiMoon } from "react-icons/fi";
import AuthModal from "./AuthModal";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
  }

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

              {/* User */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 text-gray-700  hover:text-red-600 "
              >
                <FiUser size={20} />
              </button>

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
                <div className="mt-4 pt-4 border-t  flex justify-center space-x-6">
                  <button className="p-2">
                    <FiUser size={24} />
                  </button>
                  <button className="p-2">
                    <FiSearch size={24} />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
      <AuthModal isModalOpen={isAuthModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PublicHeader;
