import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Order from './pages/Order';
import PrivateRoute from './components/PrivateRoute'; // ✅ Add this line
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
          <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/order" element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } />

       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
