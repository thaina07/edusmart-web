import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Voltar from '../assets/voltar.png';
import './ConfigPage.css';
import Config from '../assets/config.png';

const ConfigPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userId = localStorage.getItem('userId'); // Recuperando o userId do localStorage

  useEffect(() => {
    if (userId) {
      async function fetchUserData() {
        try {
          const response = await axios.get(
            `https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/buscar`,
            {
              headers: {
                'Authorization': `Bearer ${userId}`, // Envia o userId como Bearer token (se necessário)
              }
            }
          );
          setName(response.data.name || '');  // Garante que 'name' seja uma string
          setEmail(response.data.email || '');  // Garante que 'email' seja uma string
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!email || !password) {
      alert("Email e senha são obrigatórios.");
      return;
    }

    const userData = { email, senha: password };

    console.log("Dados sendo enviados:", userData);

    try {
      const response = await fetch(
        `https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/update/${userId}`, // Passando userId na URL
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData.message);
        alert('Erro ao salvar os dados: ' + errorData.message);
      } else {
        alert('Dados salvos com sucesso!');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao salvar os dados.');
    }
  };

  return (
    <div className="config-page-container">
      <header className='header-config'>
        <a href="/home" className="voltar">
          <img src={Voltar} alt="Voltar para home" />
        </a>
      </header>
      <div className="config-image">
        <img src={Config} alt="imagem" />
      </div>

      <div className="config-container">
        <div className="icon-container">
          <i className="fas fa-user-cog"></i>
        </div>
        <h2 className="config-title">Configurações</h2>
        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <h2 className="password-title">Redefinir Senha</h2>
          <div className="form-group">
            <label>Nova Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Confirme a Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">
              Salvar Alterações
            </button>
            <a href='/home'>
            <button type="button" className="cancel-button">
              Cancelar
            </button></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigPage;
