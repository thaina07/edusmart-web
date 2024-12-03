import React, { useState } from 'react';
import './ForgotPassword.css'; // Arquivo de estilos CSS
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/Cadastro');
    };

    const handleLoginClick = () => {
        navigate('/Perfil');
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage('Por favor, insira um email válido.');
      return;
    }
    setErrorMessage('');
    // Aqui você pode adicionar a lógica para enviar o email para redefinir a senha
    console.log('Solicitação de redefinir senha para:', email);
  };

  return (
    <div className="containerF">
        <header className="header">
                <div className="logoIn">
                    <img src={Logo} alt="Logo" />EDUSMART
                </div>
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
      <div className="form-container">
        <div className="image-container">
          <img
            src={Logo}
            alt="Ilustração de uma pessoa pensando em uma chave"
            className="image"
          />
        </div>
        <div className="form-content">
          <h2 className="title">Esqueceu Sua Senha?</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="email" className="label">
                Endereço de Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Digite seu email"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <button type="submit" className="submit-button">
              REDEFINIR SENHA
            </button>
          </form>
          <a href="/perfil" className="back-link">
            Voltar para o login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
