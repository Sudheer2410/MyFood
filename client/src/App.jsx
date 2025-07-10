import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCart } from './context/CartContext';
import { useSearch } from './context/SearchContext';
import { useAuth } from './context/AuthContext';
import { paypalConfig } from './api/paypalApi';
import Logo from './components/Logo';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LocationDemoPage from './pages/LocationDemoPage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isProfilePage = location.pathname === '/profile';
  const isMenuPage = location.pathname === '/menu';
  const { getCartCount } = useCart();
  const { searchTerm, updateSearchTerm } = useSearch();
  const { isLoggedIn, user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isOnboarding) {
    return <OnboardingPage />;
  }

  // Render auth pages without header and main wrapper
  if (isAuthPage || location.pathname === '/verify') {
    return (
      <PayPalScriptProvider options={paypalConfig}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyEmailPage />} />
        </Routes>
      </PayPalScriptProvider>
    );
  }

  // Render profile page without main header since it has its own design
  if (isProfilePage) {
    return (
      <PayPalScriptProvider options={paypalConfig}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </PayPalScriptProvider>
    );
  }

  return (
    <PayPalScriptProvider options={paypalConfig}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="w-full px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link to="/" className="flex items-center -ml-4">
                <Logo size="large" />
              </Link>

              {/* Search Bar - Always visible, context-aware placeholder */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => updateSearchTerm(e.target.value)}
                    placeholder={isMenuPage ? "Search for dishes..." : "Search for restaurants, cuisines, or dishes..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Search Bar - Always visible, context-aware placeholder */}
              <div className="lg:hidden w-full absolute top-full left-0 bg-white border-b border-gray-200 px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => updateSearchTerm(e.target.value)}
                    placeholder={isMenuPage ? "Search for dishes..." : "Search for restaurants, cuisines, or dishes..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                <Link to="/menu" className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition">
                  <span>Menu</span>
                </Link>
                <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition relative">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Cart</span>
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition">
                  <span>Orders</span>
                </Link>
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition">
                      {isLoggedIn && user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border-2 border-orange-200 shadow"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </Link>
                    {/* <button 
                      onClick={logout}
                      className="text-gray-700 hover:text-red-500 transition text-sm"
                    >
                      Logout
                    </button> */}
                  </div>
                ) : (
                  <Link to="/login" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition">
                    Login
                  </Link>
                )}
              </nav>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-red-500 transition"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              {/* Profile Icon */}
              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                className='lg:hidden p-2 -ml-14 -mr-3 text-gray-700 hover:text-red-500 transistion'
                aria-label='User Profile'>
                {isLoggedIn && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-orange-200 shadow"
                  />
                ) : (
                  <User className='w-6 h-6' />
                )}
              </Link>

            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-200 bg-white">
                <nav className="flex flex-col py-4 space-y-4">
                  <Link 
                    to="/menu" 
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* <Menu className="w-5 h-5" /> */}
                    <span>Menu</span>
                  </Link>
                  <Link 
                    to="/cart" 
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition relative"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Cart</span>
                    {getCartCount() > 0 && (
                      <span className=" ml-1  bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCartCount()}
                      </span>
                    )}
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Orders</span>
                  </Link>
                  {/* {isLoggedIn ? (
                    <> */}
                      {/* <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" /> */}
                      {/* </Link> */}
                      {/* <button 
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 transition w-full text-left"
                      >
                        <span>Logout</span>
                      </button>
                    </>
                  ) : ( */}
                    {/* <Link 
                      to="/login" 
                      className="mx-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )} */}
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin/menu" element={<AdminMenuPage />} />
            <Route path="/location-demo" element={<LocationDemoPage />} />
          </Routes>
        </main>
      </div>
    </PayPalScriptProvider>
  );
}

export default App; 