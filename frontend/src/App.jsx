import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { NoteProvider } from './context/NoteContext';
import Dashboard from './pages/Dashboard';
import { Login, Register } from './pages/Auth';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return <NoteProvider>{children}</NoteProvider>;
};

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
