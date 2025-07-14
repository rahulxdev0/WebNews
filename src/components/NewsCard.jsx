import React from 'react';
import { FiBookmark, FiShare2, FiClock } from 'react-icons/fi';

const NewsCard = ({ title, category, excerpt, time, image, isFeatured = false }) => {
  return (
    <div className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
      <div className="relative">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {category}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all">
            <FiBookmark size={16} />
          </button>
          <button className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all">
            <FiShare2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiClock className="mr-1" />
          <span>{time} ago</span>
        </div>
        <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'} group-hover:text-red-700 transition-colors`}>
          {title}
        </h3>
        <p className="text-gray-600">{excerpt}</p>
        <button className="mt-4 text-red-700 font-medium hover:text-blue-800 flex items-center transition-colors">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
