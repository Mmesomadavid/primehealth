import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Use this to detect route changes

  // Simulate initial loading effect
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating 2 seconds loading time
      setLoading(false);
    };
    loadData();
  }, []);

  // Show loader during route transitions
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); // Optional delay to show the loader for at least 1 second during transitions
    };

    handleRouteChange(); // Call once to handle initial page load
  }, [location]); // Runs this effect every time the route changes

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <Routes>
      {/* Public Routes: Login and Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

// Wrap the App component with BrowserRouter
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
