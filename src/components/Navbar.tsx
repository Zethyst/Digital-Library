import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, User, LogOut, LogIn, Search, Menu, X, Home, Library } from "lucide-react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActiveLink = (path:any) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, onClick, className = "" }:any) => (
    <Link
      to={to}
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group
        ${isActiveLink(to) 
          ? 'text-yellow-200 bg-yellow-900/30 border border-yellow-600/30' 
          : 'text-amber-100 hover:text-yellow-200 hover:bg-yellow-900/20'
        }
        ${className}
      `}
      style={{
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
      }}
    >
      {children}
      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
    </Link>
  );

  return (
    <>
      <nav
        className="sticky top-0 z-50 text-amber-50 shadow-lg border-b-2 border-yellow-800/30"
        style={{
          background: "linear-gradient(180deg, rgba(25,15,8,0.95) 0%, rgba(45,27,14,0.95) 50%, rgba(35,21,12,0.95) 100%)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,153,0.1)"
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-6"
                style={{
                  backgroundColor: "#ffff99",
                  border: "3px solid #d4af37",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.3), inset 0 0 15px rgba(212,175,55,0.2)"
                }}
              >
                <BookOpen className="h-7 w-7 text-amber-900" />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-2xl font-bold text-yellow-200 group-hover:text-yellow-100 transition-colors"
                  style={{ fontFamily: '"Cutive Mono", monospace', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                >
                  BookReviews
                </span>
                <span className="text-xs text-amber-300 opacity-80 -mt-1">Digital Library</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <NavLink to="/">
                <Home className="h-4 w-4 mr-2 inline-block" />
                Home
              </NavLink>
              <NavLink to="/books">
                <Library className="h-4 w-4 mr-2 inline-block" />
                Books
              </NavLink>
              
       
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <NavLink to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <User className="h-4 w-4 text-amber-900" />
                    </div>
                    <span className="text-sm font-medium text-yellow-200">
                      {user?.name || 'User'}
                    </span>
                  </NavLink>
                  
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg font-medium text-yellow-200  hover:bg-red-900/20 transition-all duration-300 group"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline-block " />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <NavLink to="/login">
                    <LogIn className="h-4 w-4 mr-2 inline-block" />
                    Login
                  </NavLink>
                  
                  <Link
                    to="/register"
                    className="px-6 py-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 group"
                    style={{
                      backgroundColor: '#ffff99',
                      color: '#2d1b0e',
                      border: '2px solid #d4af37',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px rgba(212,175,55,0.2)'
                    }}
                  >
                    Sign Up
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-yellow-900/20 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-yellow-200" />
              ) : (
                <Menu className="h-6 w-6 text-yellow-200" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-20 inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="absolute top-20 left-4 right-4 rounded-xl p-6 max-w-sm mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(25,15,8,0.98) 0%, rgba(45,27,14,0.98) 100%)",
              border: "2px solid #d4af37",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-400" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-lg text-amber-900 placeholder-amber-700"
                style={{
                  backgroundColor: 'rgba(255,255,153,0.9)',
                  border: '2px solid #d4af37'
                }}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-6">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left">
                <Home className="h-4 w-4 mr-3 inline-block" />
                Home
              </NavLink>
              <NavLink to="/books" onClick={() => setIsMenuOpen(false)} className="block w-full text-left">
                <Library className="h-4 w-4 mr-3 inline-block" />
                Books
              </NavLink>
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-yellow-800/30 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-900/20 border border-yellow-600/30 mb-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <User className="h-4 w-4 text-amber-900" />
                    </div>
                    <span className="font-medium text-yellow-200">{user?.name || 'User'}</span>
                  </div>
                  
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="block w-full text-left">
                    <User className="h-4 w-4 mr-3 inline-block" />
                    Profile
                  </NavLink>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg font-medium text-amber-200 hover:text-red-100 hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3 inline-block" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left">
                    <LogIn className="h-4 w-4 mr-3 inline-block" />
                    Login
                  </NavLink>
                  
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 font-semibold rounded-lg transition-colors"
                    style={{
                      backgroundColor: '#ffff99',
                      color: '#2d1b0e',
                      border: '2px solid #d4af37'
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;