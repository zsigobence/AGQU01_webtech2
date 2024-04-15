import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'



const Register = () => {
    
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
  
    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:3001/register', { username, password, password2 });
            alert('Sikeres regisztráció!');
            navigate('/Login');
          } catch (error) {
            if (error.response && error.response.status === 400) {
              alert('A megadott jelszavak nem egyeznek!');
            } else if (error.response && error.response.status === 409) {
              alert('A felhasználónév már foglalt!');
            } else {
              console.error('Hiba:', error);
              alert('Hiba történt a regisztráció során!');
            }
          }
    };
  
  
    return (
        <div id="registerContainer">
        <h2 id="registerTitle">Regisztráció</h2>
        <div>
          <label>Felhasználónév:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Jelszó:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Jelszó mégegyszer:</label>
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </div>
        <Link to="/">
          <button class="registerbutton">Vissza a bejelentkezéshez</button>
        </Link>
        <button class="registerbutton" onClick={handleRegister}>Regisztráció</button>
      </div>
        
    );
  };


  export default Register;