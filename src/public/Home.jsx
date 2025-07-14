import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX, FiUser, FiBookmark, FiShare2, FiClock } from 'react-icons/fi';
import { useGetNewsByCategoryQuery, useGetNewsListQuery } from '../store/api/newsEndpoints';
import { useGetCategoriesQuery } from '../store/api/categoryEndpoints';
import { Link } from 'react-router-dom';

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

const CategorySection = ({ title, newsItems, categoryId, newsCount = 0 }) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link to={`/category/${categoryId}`} className="text-red-700 font-medium hover:text-blue-800 transition-colors">
          View all {newsCount > 0 && `(${newsCount})`}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

const TrendingItem = ({ rank, title, category }) => {
  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <div className="text-2xl font-bold text-gray-300 mr-4">{rank}</div>
      <div>
        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full">{category}</span>
        <h3 className="font-medium text-gray-900 mt-1 hover:text-red-700 cursor-pointer transition-colors">{title}</h3>
      </div>
    </div>
  );
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-bold">Newsletter</h3>
      </div>
      <p className="mb-4">Stay updated with our latest news and articles. Subscribe to our newsletter.</p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <button 
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

// Custom hook to fetch all categories with their news
const useCategoriesWithNews = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  
  // Create an array of category IDs for conditional fetching
  const categoryIds = categories?.map(cat => cat.id) || [];
  
  // Dynamically fetch news for each category
  const categoryNewsQueries = categoryIds.map(id => 
    useGetNewsByCategoryQuery(id, { skip: !id })
  );
  
  // Transform data into a more usable format
  const categoriesWithNews = categories?.map((category, index) => ({
    ...category,
    news: categoryNewsQueries[index]?.data || [],
    isLoading: categoryNewsQueries[index]?.isLoading || false,
    error: categoryNewsQueries[index]?.error || null
  })) || [];
  
  return {
    categoriesWithNews,
    isLoading: categoriesLoading,
    hasData: categories && categories.length > 0
  };
};

const Home = () => {
  const { categoriesWithNews, isLoading, hasData } = useCategoriesWithNews();
  
  // Transform API news data to component props format and limit to 3 items
  const transformNewsData = (newsArray, categoryName, limit = 3) => {
    if (!newsArray || newsArray.length === 0) return [];
    
    return newsArray.slice(0, limit).map(item => ({
      title: item.title,
      category: categoryName,
      excerpt: item.content ? item.content.substring(0, 100) + '...' : 'No description available',
      time: item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown date',
      image: item.image,
      id: item.id
    }));
  };

  // Generate trending news from all categories
  const generateTrendingNews = () => {
    const allNews = [];
    
    categoriesWithNews.forEach(category => {
      if (category.news && category.news.length > 0) {
        category.news.forEach(newsItem => {
          allNews.push({
            ...newsItem,
            categoryName: category.name
          });
        });
      }
    });
    
    // Sort by created_at (most recent first) and take top 5
    return allNews
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        title: item.title,
        category: item.categoryName
      }));
  };

  const trendingNews = generateTrendingNews();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  // Show error state if no data
  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No categories found. Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {categoriesWithNews.map((category) => {
              const newsItems = transformNewsData(category.news, category.name);
              
              // Only render section if there are news items
              if (newsItems.length === 0) return null;
              
              return (
                <CategorySection 
                  key={category.id}
                  title={category.name} 
                  newsItems={newsItems} 
                  categoryId={category.id}
                  newsCount={category.news?.length || 0}
                />
              );
            })}
            
            {/* Show message if no news available */}
            {categoriesWithNews.every(cat => !cat.news || cat.news.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No news articles available at the moment.</p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Now</h3>
              <div>
                {trendingNews.length > 0 ? (
                  trendingNews.map((item, index) => (
                    <TrendingItem key={index} {...item} />
                  ))
                ) : (
                  <p className="text-gray-500">No trending news available</p>
                )}
              </div>
            </div>
            
            <NewsletterSignup />
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {categoriesWithNews.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.id}`}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                      {category.news?.length || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
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
                {categoriesWithNews.map((category) => (
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
  );
};

export default Home;