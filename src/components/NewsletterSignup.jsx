import React, { useState } from 'react';

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

export default NewsletterSignup;
