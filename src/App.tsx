import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PasswordReset from './pages/Auth/PasswordReset';
import { contextData } from './context/AuthContext';
import Loader from './components/Loader';

function App() {
  const { fetching, user } = contextData();

  useEffect(() => {
    // This effect is added to trigger a re-render when the user state changes
  }, [user]);

  if (fetching) return <Loader />;

  if (!user) {
    return (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    );
  }

  // Add logic for authenticated routes if needed.
  return <div>Authenticated Content</div>;
}

export default App;
