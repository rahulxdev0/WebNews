import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX, FiUser, FiBookmark, FiShare2, FiClock } from 'react-icons/fi';


const NewsCard = ({ title, category, excerpt, time, image, isFeatured = false }) => {
  return (
    <div className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
      <div className="relative">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
        <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'} group-hover:text-blue-600 transition-colors`}>
          {title}
        </h3>
        <p className="text-gray-600">{excerpt}</p>
        <button className="mt-4 text-blue-600 font-medium hover:text-blue-800 flex items-center transition-colors">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CategorySection = ({ title, newsItems }) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          View all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
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
        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{category}</span>
        <h3 className="font-medium text-gray-900 mt-1 hover:text-blue-600 cursor-pointer transition-colors">{title}</h3>
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

const Home = () => {

  const politicsNews = [
    {
      title: "New Legislation Aims to Reform Healthcare System",
      category: "Politics",
      excerpt: "Bipartisan bill proposes significant changes to healthcare access and affordability.",
      time: "3 hours"
    },
    {
      title: "Foreign Minister Meets with Counterparts to Discuss Security",
      category: "Politics",
      excerpt: "Regional security and economic cooperation top the agenda in high-level talks.",
      time: "5 hours"
    },
    {
      title: "Election Commission Announces New Voting Measures",
      category: "Politics",
      excerpt: "Enhanced security protocols to be implemented for upcoming national elections.",
      time: "8 hours"
    }
  ];

  const trendingNews = [
    { rank: 1, title: "Olympic Athlete Breaks World Record in 100m Final", category: "Sports" },
    { rank: 2, title: "Tech Giant Unveils Revolutionary Smartphone with Foldable Display", category: "Technology" },
    { rank: 3, title: "Celebrity Chef Opens New Restaurant in Downtown", category: "Entertainment" },
    { rank: 4, title: "Scientists Discover New Species in Amazon Rainforest", category: "Science" },
    { rank: 5, title: "Stock Markets Reach All-Time High Amid Economic Recovery", category: "Business" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CategorySection title="Politics" newsItems={politicsNews} />
            
            <CategorySection title="Technology" newsItems={[
              {
                title: "New AI Model Can Write Code Better Than Humans",
                category: "Technology",
                excerpt: "Researchers develop an AI system that outperforms human programmers in efficiency tests.",
                time: "1 hour"
              },
              {
                title: "SpaceX Launches Mission to International Space Station",
                category: "Technology",
                excerpt: "Private space company successfully sends crew and supplies to orbiting laboratory.",
                time: "3 hours"
              },
              {
                title: "Cybersecurity Experts Warn of New Phishing Threat",
                category: "Technology",
                excerpt: "Sophisticated email scam targeting corporate networks detected by security firms.",
                time: "7 hours"
              }
            ]} />
            
            <CategorySection title="Entertainment" newsItems={[
              {
                title: "Award-Winning Director Announces New Film Project",
                category: "Entertainment",
                excerpt: "Details emerge about the upcoming historical drama featuring A-list actors.",
                time: "2 hours"
              },
              {
                title: "Music Festival Returns After Three-Year Hiatus",
                category: "Entertainment",
                excerpt: "Popular summer event announces impressive lineup of international artists.",
                time: "5 hours"
              },
              {
                title: "Streaming Service Hits Record Subscriber Numbers",
                category: "Entertainment",
                excerpt: "Platform adds 10 million new users following exclusive content releases.",
                time: "9 hours"
              }
            ]} />
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Now</h3>
              <div>
                {trendingNews.map((item, index) => (
                  <TrendingItem key={index} {...item} />
                ))}
              </div>
            </div>
            
            <NewsletterSignup />
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {['Technology', 'Business', 'Politics', 'Health', 'Sports', 'Entertainment', 'Science', 'Travel'].map((category, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">{category}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">24</span>
                  </a>
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
                {['World', 'Politics', 'Business', 'Technology', 'Health', 'Sports', 'Entertainment', 'Science'].map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{category}</a>
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
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