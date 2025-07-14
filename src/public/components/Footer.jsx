import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg mr-2"></div>
                <span className="text-xl font-bold">
                  News<span className="text-blue-400">Portal</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Delivering accurate and timely news from around the world since 2005.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {["Sports", "Technology", "Health", "Business"].map((category) => (
                  <li key={category.id}>
                    <Link to={`/category/${category.id}`} className="text-gray-400 hover:text-white transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'Careers', 'Advertise', 'Terms of Service', 'Privacy Policy'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">
                Get the latest news delivered to your inbox daily.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2023 NewsPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer