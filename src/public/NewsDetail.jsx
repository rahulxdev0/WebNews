import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetNewsDetailQuery } from '../store/api/newsEndpoints';
import { useCreateCommentMutation } from '../store/api/commentEndpoints';
import { useUserInfoQuery } from '../store/api/authEndpoints';
import AuthModal from './components/AuthModal';

const NewsDetail = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetNewsDetailQuery(newsId);
  const { data: user } = useUserInfoQuery();
  const [createComment, { isLoading: isCreatingComment }] = useCreateCommentMutation();
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: '' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user || user === undefined) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!newComment.comment.trim()) return;

    try {
      const commentData = {
        content: newComment.comment,
        news: parseInt(newsId),
      };

      await createComment(commentData).unwrap();
      setNewComment({ comment: '' });
      // Optionally refetch comments or update local state
    } catch (error) {
      console.error('Failed to create comment:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">News Not Found</h1>
          <p className="text-gray-600 mb-6">The news article you're looking for doesn't exist.</p>
          <Link to="/" className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/" className="text-red-700 hover:text-red-800">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{news.category?.name || 'News'}</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500">Article</span>
          </nav>

          {/* News Article */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {/* Category and Date */}
            <div className="px-6 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {news.category?.name || 'General'}
                </span>
                <time className="text-gray-500 text-sm">
                  {news.created_at ? new Date(news.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Recently'}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
              </h1>

              {/* Excerpt */}
              {news.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {news.excerpt}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {news.image && (
              <div className="px-6 mb-6">
                <img
                  src="https://picsum.photos/600/300"
                  alt={news.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {news.description || news.content || 'No content available for this article.'}
                </p>
              </div>

              {/* Author and Share */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-700 font-semibold text-sm">
                      {news.author?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {news.author || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({comments.length})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                placeholder={user ? "Write your comment... *" : "Please login to write a comment"}
                rows="4"
                value={newComment.comment}
                onChange={(e) => setNewComment({ comment: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                required
                disabled={!user}
              ></textarea>
              <button
                type="submit"
                disabled={!user || isCreatingComment}
                className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCreatingComment ? 'Posting...' : user ? 'Post Comment' : 'Login to Comment'}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                          <span className="text-gray-500 text-sm">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isModalOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default NewsDetail;
