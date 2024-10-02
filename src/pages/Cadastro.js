import React, { useState } from "react";
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Google from '../assets/google.png';
import Facebook from '../assets/facebook.png';
import Apple from '../assets/apple.png';
import Img1 from '../assets/img1.png';
import Img2 from '../assets/img2.png';
import '@fortawesome/fontawesome-free/css/all.min.css';



const Cadastro = ({ setIsLogado }) => {

  const [receberNotificacoes, setReceberNotificacoes] = useState(false);
  const [loginStatus, setLoginStatus] = useState(''); 
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

 
  const handleRegisterClick = () => {
    navigate('/Cadastro');
  };

  const handleLoginClick = () => {
    navigate('/Perfil');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      setMsg('As senhas não coincidem!');
      return;
    }

  
    const usuario = { nome, email, senha, receberNotificacoes };

    try {
      const response = await fetch('https://27bc352d-8ef8-4b52-976f-c6126bf6661d-00-28ordud37745w.riker.replit.dev/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        setIsLogado(true);
        navigate('/');
        setMsg('Cadastro feito com sucesso!');
      } else {
        setMsg('Erro ao cadastrar');
      }
    } catch (error) {
      setMsg('Erro: ' + error.message);
    }
  };

  return (
    <>
      <header className="header">
      <div className="logo"><img src={Logo} alt="Logo" />EDUSMART</div>
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

        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="titulo">Inscreva-se e comece a aprender</h1>
            <input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome de usuário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Criar senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          required
        />
        <p className="msg">{msg}</p>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={receberNotificacoes}
            onChange={(e) => setReceberNotificacoes(e.target.checked)}
          />
          Deseja receber notificações?
        </label>
        <button className="submit1">Cadastre-se</button>
        <p className="termos">
          Ao se inscrever, você concorda com nossos 
          <a href="/termos-de-uso" target="_blank">Termos de Uso</a> 
          e com a 
          <a href="/politica-de-privacidade" target="_blank">Política de Privacidade</a>.
        </p>
            <div className="welcome-message">
          Seja bem-vindo!
        </div>
            {loginStatus && (
              <p className={loginStatus.includes('sucesso') ? 'success' : 'error'}>
                {loginStatus}
              </p>
            )}

            <div className="box">Já tem login?<a href="/Perfil">Fazer Login</a> </div>
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

export default Cadastro;