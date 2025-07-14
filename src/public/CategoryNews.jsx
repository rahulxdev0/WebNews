import React from 'react';
import { useParams } from 'react-router-dom';
import { FiClock, FiBookmark, FiShare2, FiArrowLeft } from 'react-icons/fi';
import { useGetNewsByCategoryQuery } from '../store/api/newsEndpoints';
import { useGetCategoriesQuery } from '../store/api/categoryEndpoints';
import { Link } from 'react-router-dom';

const NewsCard = ({ title, category, excerpt, time, image, id }) => {
  return (
    <div className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
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
          <span>{time}</span>
        </div>
        <h3 className="font-bold text-xl mb-2 group-hover:text-red-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <button className="text-red-700 font-medium hover:text-blue-800 flex items-center transition-colors">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CategoryNews = () => {
  const { categoryId } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const { data: news, isLoading, error } = useGetNewsByCategoryQuery(parseInt(categoryId));

  const getCategoryName = () => {
    if (!categories) return 'Category';
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : 'Category';
  };

  const transformNewsData = (newsArray, categoryName) => {
    if (!newsArray) return [];
    
    return newsArray.map(item => ({
      title: item.title,
      category: categoryName,
      excerpt: item.content ? item.content.substring(0, 150) + '...' : 'No description available',
      time: new Date(item.created_at).toLocaleDateString(),
      image: item.image,
      id: item.id
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading news</p>
          <Link to="/" className="mt-4 inline-block text-purple-600 hover:text-purple-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryName();
  const transformedNews = transformNewsData(news, categoryName);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName} News</h1>
          <p className="text-gray-600">
            Latest news and updates from {categoryName.toLowerCase()} category
          </p>
        </div>

        {transformedNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedNews.map((item, index) => (
              <NewsCard key={item.id || index} {...item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryNews;
