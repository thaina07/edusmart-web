import React, { useState } from "react";
import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Google from '../assets/google.png';
import Facebook from '../assets/facebook.png';
import Apple from '../assets/apple.png';
import Img1 from '../assets/img1.png';
import Img2 from '../assets/img2.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";

const Perfil = ({ setIsLogado }) => {  
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleRegisterClick = () => {
    navigate('/Cadastro');
  };

  const handleLoginClick = () => {
    navigate('/Perfil');
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (response) => {
      setIsLogado(true); // O usuário logou com sucesso via Google
      // Aqui você pode armazenar os dados do usuário ou fazer outras ações necessárias
    },
    onError: (error) => {
      setIsLogado(false); // Se o login falhar
      console.error('Erro ao fazer login com Google:', error);
    }
  });
  

  // Marque a função como assíncrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/login';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      console.log('Resposta da API:', response);
  
      const data = await response.json();
      console.log('Dados recebidos:', data); 
  
      if (response.ok) {
        localStorage.setItem('userName', data.nome);  // Salve o nome após o login
        setIsLogado(true);  // Atualiza o estado de login para true
        localStorage.setItem('userId', data.userId);  // Certifique-se de armazenar o userId
        navigate('/Home');  // Navegue para a Home
      } else {
        setLoginStatus(data.message || "Erro ao efetuar login. Verifique suas credenciais.");
        setIsLogado(false); // Caso o login falhe, mantenha o estado como false
      }
    } catch (error) {
      setLoginStatus("Erro ao se conectar com a API. Tente novamente mais tarde.");
      console.error(error);
    }
  
    console.log(email, senha);
  };  
  

  return (
    <>
      <header className="header">
        <div className="logoPe"><a href="/Inicial"><img src={Logo} alt="Logo" /></a>EDUSMART</div>
        <nav class="nav-links">
    <a href="#features">Funcionalidades</a>
    <a href="#about">Sobre</a>
    <a href="#support">Suporte</a>
  </nav>

        <div className="action">
          <button className="btn" onClick={handleLoginClick}>Fazer login</button>
          <button className="btn" onClick={handleRegisterClick}>Cadastrar-se</button>
        </div>
      </header>
      
      <div className="content-container">
        <div className="imagem-container">
          <div className="imagem1"><img src={Img1} alt="img1"/></div>
          <div className="imagem2"><img src={Img2} alt="img2"/></div>
        </div>

        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="titulo">Faça login na sua conta EduSmart</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              
            />
            <button className="submit">Fazer Login</button>
            <div className="forgot-password">
              <a href="/forgotpassword">Esqueceu sua senha?</a>
            </div>

            {loginStatus && (
              <p className={loginStatus.includes('sucesso') ? 'success' : 'error'}>
                {loginStatus}
              </p>
            )}

            <div className="opcoes">Outras opções de login</div>
            <div className="btn-opcoes">
              <button className="google" onClick={handleGoogleLogin}><img src={Google} alt="Google"/></button>
              <button className="facebook" onClick={handleLoginClick}><img src={Facebook} alt="Facebook"/></button>
              <button className="apple" onClick={handleLoginClick}><img src={Apple} alt="Apple"/></button>
            </div>

            <div className="box">Não tem cadastro?<a href="/Cadastro">Cadastre-se</a> </div>
            <div className="box"><a href="/forgot-password">Faça login com sua organização</a></div>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 EduSmart. Todos os direitos reservados.</p>
          <ul className="footer-links">
            <li><a href="/about">Sobre nós</a></li>
            <li><a href="/contact">Contato</a></li>
            <li><a href="/privacy">Política de Privacidade</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Perfil;