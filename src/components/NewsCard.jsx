import React from 'react';
import { FiBookmark, FiShare2, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewsCard = ({ title, category, excerpt, time, image, id, isFeatured = false }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/600/300';
  };

  return (
    <Link to={`/news/${id}`} className="block group">
      <article className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
        <div className="relative overflow-hidden">
          <img
            src={image || 'https://picsum.photos/600/300'}
            alt={title}
            onError={handleImageError}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 border-dashed-2 border-red-800"
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-all shadow-sm"
              onClick={(e) => e.preventDefault()}
            >
              <FiBookmark size={16} />
            </button>
            <button
              className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-all shadow-sm"
              onClick={(e) => e.preventDefault()}
            >
              <FiShare2 size={16} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm flex items-center">
              <FiClock className="mr-1" size={14} />
              {time}
            </span>
          </div>

          <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2 ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-red-700 text-sm font-medium group-hover:text-red-800 transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
