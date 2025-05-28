import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, User, BookOpen, Loader } from "lucide-react";
import BookContext from "../context/BookContext";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, getBookById } = useContext(BookContext);

  useEffect(() => {
    if (id) {
      getBookById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="h-10 w-10 text-amber-600 animate-spin" />
      </div>
    );
  }
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
        <p className="text-gray-600 mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/books"
          className="text-yellow-700 hover:underline font-medium"
        >
          Browse all books
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-yellow-900">
      <div className="flex flex-col md:flex-row gap-10 bg-yellow-100 p-8 rounded-xl shadow-lg">
        {/* Book Cover */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="w-full max-w-xs h-auto object-cover rounded-xl border-2 border-yellow-300"
          />
        </div>

        {/* Book Details */}
        <div className="md:w-2/3 space-y-6">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-yellow-300 text-yellow-900 rounded-full">
              {book.genre}
            </span>
            <h1 className="text-4xl font-bold mt-2">{book.title}</h1>
            <p className="text-lg text-yellow-800">by {book.author}</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5"
                  fill={
                    i < Math.round(book.averageRating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-yellow-800 text-sm">
              {book.averageRating.toFixed(1)} ({book.reviews?.length || 0} reviews)
            </span>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About this book</h2>
            <p className="text-yellow-900 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-yellow-700 mr-2" />
              <div>
                <p className="text-sm text-yellow-700">Published</p>
                <p className="font-medium">{book.publishedYear}</p>
              </div>
            </div>

            <div className="flex items-center">
              <User className="h-5 w-5 text-yellow-700 mr-2" />
              <div>
                <p className="text-sm text-yellow-700">Author</p>
                <p className="font-medium">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-700 mr-2" />
              <div>
                <p className="text-sm text-yellow-700">Reading Time</p>
                <p className="font-medium">~4 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-yellow-900 mb-6">Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {book.reviews && book.reviews.length > 0 ? (
              book.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <p className="text-yellow-700 mb-2">
                  No reviews yet for this book.
                </p>
                <p className="text-yellow-800">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>

          <div>
            <ReviewForm bookId={book._id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetailPage;