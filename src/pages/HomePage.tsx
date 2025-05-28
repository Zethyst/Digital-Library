import { useContext } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star, TrendingUp, Book } from "lucide-react";
import BookContext from "../context/BookContext";

const BookCard = ({ book }: any) => (
  <Link to={`/books/${book._id}`} className="group">
    <div
      style={{
        backgroundColor: "#ffff99",
        color: "#2d1b0e",
        border: "3px solid #d4af37",
        borderRadius: "0",
        boxShadow:
          "4px 4px 0px rgba(0,0,0,0.3), inset 0 0 10px rgba(212,175,55,0.2)",
      }}
      className="group relative shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-200 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/20 to-amber-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-4">
        {book.coverImage ? (
          <div className="h-80 overflow-hidden">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-4 flex items-center justify-center border border-amber-300 shadow-inner">
            <Book className="h-12 w-12 text-amber-600" />
          </div>
        )}
        <h3 className="font-bold text-amber-900 text-lg mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-amber-700 text-sm mb-2">by {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs rounded-full font-medium border border-amber-300">
            {book.genre}
          </span>
          <div className="flex items-center text-amber-600">
            <span className="text-sm font-semibold mr-1">★</span>
            <span className="text-sm">{book.rating}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const HomePage = () => {
  const { featuredBooks, loading } = useContext(BookContext);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: '"Cutive Mono", monospace',
        backgroundColor: "#3d2914",
        backgroundImage: `
        linear-gradient(90deg, rgba(0,0,0,0.1) 50%, transparent 50%),
        linear-gradient(rgba(0,0,0,0.05) 50%, transparent 50%)
      `,
        backgroundSize: "4px 4px",
      }}
    >
      {/* Hero Section */}
      <section
        className="relative py-20 px-4"
        style={{
          background:
            "linear-gradient(135deg, #2d1b0e 0%, #4a2c17 50%, #3d2914 100%)",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.3)",
        }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="relative">
            {/* Decorative book stack illustration */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-20">
              <div className="flex space-x-1">
                <div className="w-3 h-16 bg-amber-700 transform -rotate-12"></div>
                <div className="w-3 h-14 bg-red-800 transform rotate-6"></div>
                <div className="w-3 h-18 bg-green-800 transform -rotate-3"></div>
              </div>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-amber-50 relative z-10"
              style={{
                textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
                letterSpacing: "0.02em",
              }}
            >
              Discover, Review & Rate <br />
              <span className="text-yellow-300">Your Favorite Book</span>
            </h1>

            <p
              className="text-xl md:text-2xl mb-10 text-amber-100 max-w-3xl mx-auto leading-relaxed"
              style={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              Explore top-rated books, share your honest reviews, and find your
              next great read — all in one platform built for book lovers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/books"
                className="relative group px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "#ffff99",
                  color: "#2d1b0e",
                  border: "3px solid #d4af37",
                  borderRadius: "0",
                  boxShadow:
                    "4px 4px 0px rgba(0,0,0,0.3), inset 0 0 10px rgba(212,175,55,0.2)",
                }}
              >
                <BookOpen className="inline-block w-5 h-5 mr-2" />
                Browse Books
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>

              <Link
                to="/register"
                className="relative group px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffff99",
                  border: "3px solid #ffff99",
                  borderRadius: "0",
                  boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                }}
              >
                Sign Up Free
                <div className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold flex items-center"
              style={{ color: "#ffff99" }}
            >
              <TrendingUp className="h-8 w-8 mr-3 text-yellow-400" />
              Featured Books
            </h2>
            <Link
              to="/books"
              className="text-yellow-300 hover:text-yellow-100 font-medium text-lg transition-colors duration-300 underline decoration-2 underline-offset-4"
            >
              View All Books →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
                <BookOpen className="absolute inset-0 m-auto h-6 w-6 text-yellow-400" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredBooks.slice(0, 8).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, #1a0f08 0%, #2d1b0e 50%, #1a0f08 100%)",
          boxShadow: "inset 0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute -top-2 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-yellow-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-30"></div>

            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-amber-50"
              style={{
                textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
              }}
            >
              Ready to Start Your
              <br />
              <span className="text-yellow-300">Reading Journey?</span>
            </h2>

            <p className="text-xl md:text-2xl text-amber-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of readers who have found their next favorite book
              through our digital library platform.
            </p>

            <Link
              to="/register"
              className="inline-block relative group px-10 py-5 text-xl font-semibold transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: "#ffff99",
                color: "#2d1b0e",
                border: "4px solid #d4af37",
                borderRadius: "0",
                boxShadow:
                  "6px 6px 0px rgba(0,0,0,0.4), inset 0 0 15px rgba(212,175,55,0.3)",
              }}
            >
              <Star className="inline-block w-6 h-6 mr-3" />
              Create Free Account
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
