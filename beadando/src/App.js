
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import Register from './Register';
import './App.css'

const Login = ({ setLoggedIn, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:3001/login', { username, password });
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user', username);
      window.location.href = '/Mainpage';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Hibás felhasználónév vagy jelszó');
      } else {
      console.error('Hiba:', error);
      alert('Hiba történt a bejelentkezés során!');
      }
    }
  };


  return (
    <div id="appContainer">
  <div class="container">
    <h2 id="login">Bejelentkezés</h2>
    <div>
      <label>Felhasználónév:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div>
      <label>Jelszó:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button class="loginbutton" onClick={handleLogin}>Bejelentkezés</button>
    <a href="/Register">
      <button class="loginbutton">Regisztráció</button>
    </a>
  </div>
</div>
      
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setLoggedIn(true);
    } else if(window.location.pathname == "/Mainpage"){
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/Mainpage" element={loggedIn ? <Mainpage /> : null} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
};

export default App;
