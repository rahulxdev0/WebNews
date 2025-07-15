import React from 'react';
import { 
  Users, 
  Newspaper, 
  LayoutGrid, 
  Activity,
  Clock,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { useGetNewsListQuery } from '../store/api/newsEndpoints';
import { useGetCategoriesQuery } from '../store/api/categoryEndpoints';

const AdminDashboard = () => {
  // Sample data - replace with real data from your API
  const {data: newsData, isLoading: newsLoading, error: newsError} = useGetNewsListQuery();
  const {data: categories, isLoading: categoriesLoading} = useGetCategoriesQuery();

  // Handle the case where newsData might be a single object or array
  let newsArray = [];
  if (newsData) {
    if (Array.isArray(newsData)) {
      newsArray = newsData;
    } else if (typeof newsData === 'object') {
      newsArray = [newsData]; // Convert single object to array
    }
  }

  const totalNews = newsArray.length;
  const totalCategories = categories ? (Array.isArray(categories) ? categories.length : 1) : 0;

  console.log("News Data:", newsData);

  const stats = [
    { title: 'Total Users', value: '1,248', icon: Users, change: '+12%', trend: 'up' },
    { title: 'Total News', value: totalNews.toString(), icon: Newspaper, change: '+5%', trend: 'up' },
    { title: 'Categories', value: totalCategories.toString(), icon: LayoutGrid, change: '+2', trend: 'up' },
    { title: 'Active Sessions', value: '86', icon: Activity, change: '-3%', trend: 'down' }
  ];

  // Use actual data if available, otherwise fall back to sample data
  const recentNews = newsArray.length > 0 ? newsArray.slice(-4).map((item, index) => ({
    id: item.id || index + 1,
    title: String(item.name || item.title || 'Untitled News'),
    category: String(item.district?.name || item.category || 'General'),
    date: String(item.created_at || item.date || new Date().toISOString().split('T')[0]),
    views: String(item.views || `${Math.floor(Math.random() * 20) + 1}.${Math.floor(Math.random() * 9)}k`)
  })) : [
    { id: 1, title: 'Global Climate Summit Concludes', category: 'Politics', date: '2023-06-15', views: '12.4k' },
    { id: 2, title: 'New Breakthrough in Quantum Computing', category: 'Technology', date: '2023-06-14', views: '8.7k' },
    { id: 3, title: 'Stock Markets Reach All-Time High', category: 'Business', date: '2023-06-13', views: '5.2k' },
    { id: 4, title: 'Olympic Preparations in Full Swing', category: 'Sports', date: '2023-06-12', views: '9.1k' }
  ];

  const activities = [
    { id: 1, type: 'new_user', user: 'Sarah Johnson', time: '10 min ago' },
    { id: 2, type: 'news_published', user: 'Editor Team', time: '25 min ago' },
    { id: 3, type: 'category_added', user: 'Admin', time: '1 hour ago' },
    { id: 4, type: 'comment_reported', user: 'Michael Brown', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="">
        {/* Loading states */}
        {(newsLoading || categoriesLoading) && (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading dashboard data...</p>
          </div>
        )}
        
        {/* Error states */}
        {newsError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading news data
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className={`mt-4 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-medium">{stat.change}</span> from last month
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent News */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent News</h3>
                <p className="mt-1 text-sm text-gray-500">Most recently published articles</p>
              </div>
              <div className="divide-y divide-gray-200">
                {recentNews.map((news) => (
                  <div key={news.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-indigo-600">{news.category?.name}</p>
                          <p className="text-gray-900">{news.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          {news.date}
                        </span>
                        <span className="text-sm text-gray-500">
                          <TrendingUp className="inline h-4 w-4 mr-1" />
                          {news.views}
                        </span>
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-3 text-right">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all news →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                <p className="mt-1 text-sm text-gray-500">Latest actions in the system</p>
              </div>
              <div className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2">
                        {activity.type === 'new_user' && <Users className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'news_published' && <Newspaper className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'category_added' && <LayoutGrid className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'comment_reported' && <MessageSquare className="h-5 w-5 text-indigo-600" />}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type === 'new_user' && 'New user registered'}
                          {activity.type === 'news_published' && 'News published'}
                          {activity.type === 'category_added' && 'New category added'}
                          {activity.type === 'comment_reported' && 'Comment reported'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.user} · {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-3 text-right">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all activity →
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
              </div>
              <div className="px-6 py-4 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Newspaper className="h-5 w-5 mr-2" />
                  Add News
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <LayoutGrid className="h-5 w-5 mr-2" />
                  Add Category
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Users className="h-5 w-5 mr-2" />
                  Manage Users
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Manage Comments
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;