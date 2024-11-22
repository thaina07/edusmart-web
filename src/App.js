import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin, googleLogout} from '@react-oauth/google';
import './App.css';

import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Inicial from './pages/Inicial';
import Profile from './pages/Profile';
import Aulas from './pages/Aulas';
import VideoPage from './pages/VideoPage';

function App() {
  const [ setIsLogado] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
      <Router>
        <div className="App">
          <h2>React Google Login</h2>
          <br />
          <br />
          {profile ? (
            <div>
              <img src={profile.picture} alt="imagem do usuário" />
              <h3>Usuário conectado</h3>
              <p>Nome: {profile.name}</p>
              <p>Endereço de e-mail: {profile.email}</p>
              <br />
              <br />
              <button onClick={logOut}>Sair</button>
            </div>
          ) : (
            <GoogleLogin>
              <button>Entrar com o Google <span role="img" aria-label="foguete">🚀</span></button>
            </GoogleLogin>
          )}

          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/cadastro' element={<Cadastro setIsLogado={setIsLogado} />} />
            <Route path='/perfil' element={<Perfil setIsLogado={setIsLogado} />} />
            <Route path='/inicial' element={<Inicial />} />
            <Route path='/Aulas' element={<Aulas />} />
            <Route path="/aulas/matematica" element={<Aulas />} />
            <Route path="/aulas/portugues" element={<Aulas />} />
            <Route path="/aulas/quimica" element={<Aulas />} />
            <Route path="/aulas/geografia" element={<Aulas />} />
            <Route path="/aulas/biologia" element={<Aulas />} />
            <Route path="/aulas/historia" element={<Aulas />} />
            <Route path="/aulas/ingles" element={<Aulas />} />
            <Route path="/aulas/sociologia" element={<Aulas />} />
            <Route path="/aulas/filosofia" element={<Aulas />} />
            <Route path="/aulas/fisica" element={<Aulas />} />
            <Route path="/aulas/questoes" element={<Aulas />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
