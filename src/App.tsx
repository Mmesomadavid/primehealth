import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulating a loading effect
  useEffect(() => {
    const loadData = async () => {
      // Simulate a data fetching or loading time
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating 2 seconds loading time
      setLoading(false); // Set loading to false after data has loaded
    };

    loadData();
  }, []);

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes: Login and Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
