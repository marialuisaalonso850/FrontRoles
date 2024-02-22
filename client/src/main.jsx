import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from '../src/routes/Login';
import Signup from '../src/routes/signup'; 
import Dashboard from '../src/routes/dashboard'; 
import ProtectedRoute from '../src/routes/protectedRaute'; 
import { AuthProvider } from '../src/Autenticacion/AutProvider'; 
import Home from '../src/components/Home';
import Perfil from '../src/routes/perfil';
import ContactUs from '../src/routes/contactUs';

import Post from '../src/pages/post/Post';
import Posts from '../src/pages/posts/Posts';//./pages/posts/Posts
import Puestos from '../src/routes/puestos';//./routes/puestos
import PostInfo from '../src/pages/posts/PostsInfo';//./pages/posts/PostsInfo
import Reserva from '../src/routes/Reserva';//./routes/Reserva
import Reservas from '../src/routes/Reservas';//./routes/Reservas

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/info" element={<PostInfo />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reserva/:id" element={<Reserva />} />
          <Route path="/puestos" element={<Puestos />} />
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
