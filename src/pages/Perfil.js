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

  // Marque a função como assíncrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://f533fab9-53d1-43b6-8ce1-37a26704fbff-00-2yo2wzmcactmx.picard.replit.dev/api/users/login'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      // Verifique se a resposta indica sucesso
      if (response.ok) {
        setLoginStatus("Login efetuado com sucesso!");
        setIsLogado(true);  
        localStorage.setItem('userName', data.nome); // Armazena o nome do usuário no localStorage
        navigate('/Home'); // Navegue para a Home
      } else {
        setLoginStatus(data.message || "Erro ao efetuar login. Verifique suas credenciais.");
        setIsLogado(false); 
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
        <div className="logo"><a href="/Inicial"><img src={Logo} alt="Logo" /></a>EDUSMART</div>
        <div className='barraPesquisa'>
          <input type="text" placeholder="Pesquise qualquer coisa" />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

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
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button className="submit">Fazer Login</button>
            <div className="forgot-password">
              <a href="/forgot-password">Esqueceu sua senha?</a>
            </div>

            {loginStatus && (
              <p className={loginStatus.includes('sucesso') ? 'success' : 'error'}>
                {loginStatus}
              </p>
            )}

            <div className="opcoes">Outras opções de login</div>
            <div className="btn-opcoes">
              <button className="google" onClick={handleLoginClick}><img src={Google} alt="Google"/></button>
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