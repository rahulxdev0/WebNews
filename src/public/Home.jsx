import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { useGetNewsByCategoryQuery } from '../store/api/newsEndpoints';
import { useGetCategoriesQuery } from '../store/api/categoryEndpoints';

// Helper function to transform news data
const transformNewsData = (newsArray, categoryName) => {
  if (!newsArray || !Array.isArray(newsArray)) return [];
  
  return newsArray.map(news => ({
    title: news.title || 'Untitled',
    category: categoryName || news.category?.name || 'General',
    excerpt: news.excerpt || news.description || 'No description available',
    time: news.created_at ? new Date(news.created_at).toLocaleDateString() : 'Recently',
    image: news.image || null,
    id: news.id
  }));
};

// Sample trending news data
const trendingNews = [
  { rank: '01', title: 'Breaking: Major Technology Breakthrough', category: 'Technology' },
  { rank: '02', title: 'Sports Championship Finals This Weekend', category: 'Sports' },
  { rank: '03', title: 'Economic Markets Show Strong Growth', category: 'Business' },
  { rank: '04', title: 'Climate Change Summit Begins', category: 'Environment' },
  { rank: '05', title: 'New Health Guidelines Released', category: 'Health' }
];

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

// Category component to fetch and display news for a specific category
const CategoryNewsSection = ({ category }) => {
  const { data: categoryNews, isLoading: newsLoading, error } = useGetNewsByCategoryQuery(category.id);
  
  if (newsLoading) {
    return (
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !categoryNews || categoryNews.length === 0) {
    return null; // Don't render empty sections
  }

  const newsItems = transformNewsData(categoryNews, category.name);
  
  return (
    <CategorySection 
      title={category.name} 
      newsItems={newsItems} 
      categoryId={category.id}
      newsCount={categoryNews.length}
    />
  );
};

const Home = () => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

  // Show loading state
  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Show error state if no categories
  if (categoriesError || !categories || categories.length === 0) {
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
            {categories.map((category) => (
              <CategoryNewsSection key={category.id} category={category} />
            ))}
            
            {/* Show message if no categories available */}
            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No news categories available at the moment.</p>
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
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.id}`}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">{category.name}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                      {category.news_count || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;