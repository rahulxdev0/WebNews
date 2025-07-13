import { BarChart3, FileText, Home, Settings, User, Users, MapPin, Map, Newspaper } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLinkClick = (itemId) => {
    setActiveItem(itemId);
    // Add your navigation logic here
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg max-h-[100vh] transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Admin Portal</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/admin"
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeItem === 'dashboard' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/admin/manage-category"
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
              `}
            >
              <BarChart3 size={20} />
              <span className="font-medium">Manage Category</span>
            </Link>

            <Link
              to="/admin/manage-district"
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeItem === 'manage-pincode' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <MapPin size={20} />
              <span className="font-medium">Manage Districts</span>
            </Link>

            <Link
              to="/admin/manage-area"
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeItem === 'manage-area' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Map size={20} />
              <span className="font-medium">Manage Area</span>
            </Link>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('manage-news');
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeItem === 'manage-news' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Newspaper size={20} />
              <span className="font-medium">Manage News</span>
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('settings');
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${activeItem === 'settings' 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </a>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 px-4 py-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@portal.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;