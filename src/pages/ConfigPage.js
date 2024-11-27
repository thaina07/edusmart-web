import React, { useState } from 'react';
import './ConfigPage.css'; // Estilos do componente
import Logo from '../assets/logo.png';
const ConfigPage = () => {
  // Estados para armazenar os dados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para manipular o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await fetch('https://b19c12c9-4a42-48c0-9e18-45cccae95eb0-00-1sgyzy7k6iy73.janeway.replit.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Dados salvos com sucesso!');
      } else {
        alert('Erro ao salvar dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro na conexão com o servidor.');
    }
  };

  return (
    <>
      {/* Cabeçalho com logo e barra de pesquisa */}
      <header className="header-home">
        <div className="logo">
          <img src={Logo} alt="Logo" />EDUSMART
        </div>
        <div className="barraPesquisa">
          <input type="text" className='pesquisa-header' placeholder="Pesquise" />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </header>

      {/* Formulário de Configurações */}
      <div className='pai-config-container'>
        <div className="config-container">
          <h1>Configurações</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome e Sobrenome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <h2>Redefinir Senha</h2>

            <div className="form-group">
              <label>Nova Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Digite a Senha Novamente</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="save-btn">Salvar Alterações</button>
          </form>

        </div>
      </div>
      <footer className='footer-config-page'>
        <p>Contato: (11) 12345-6078 | Email: edusmart@gmail.com</p>
      </footer>
    </>
  );
};

export default ConfigPage;