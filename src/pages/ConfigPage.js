import React, { useState, useEffect } from 'react'; // Importando o useEffect
import './ConfigPage.css'; // Estilos do componente
import Logo from '../assets/logo.png';
import Voltar from '../assets/voltar.png';
import axios from 'axios'; // Importando o axios para fazer requisições

const ConfigPage = () => {
  // Estados para armazenar os dados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(null);  // Estado para armazenar o ID do usuário logado

  // Função para buscar dados do usuário da API
  useEffect(() => {
    const loggedUserId = localStorage.getItem('userId'); // Simulando que o ID do usuário logado está no localStorage

    if (loggedUserId) {
      setUserId(loggedUserId);  // Setando o ID do usuário logado

      async function fetchUserData() {
        try {
          const response = await axios.get(`https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/buscar/${loggedUserId}`);
          console.log('dados do usuario', response.data);
          
          // Preencher os campos com os dados do usuário
          setName(response.data.name);
          setEmail(response.data.email);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      }

      fetchUserData();
    }
  }, []); // Executa apenas uma vez quando o componente é montado

  // Função para manipular o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    const userData = { name, email };
    
    // Se a senha foi alterada, adicione ela ao corpo da requisição
    if (password) {
      userData.password = password;
    }

    try {
      const response = await fetch(`https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/update/${userId}`, {
        method: 'POST',  // Usando PUT ou PATCH dependendo da lógica da sua API
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
        <a href="/home" className="voltar">
          <img src={Voltar} alt="Logo" />
        </a>
        <div className="barraPesquisa">
          <input type="text" className="pesquisa-header" placeholder="Pesquise" />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </header>

      {/* Formulário de Configurações */}
      <div className="pai-config-container">
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

      <footer className="footer-config-page">
        <p>Contato: (11) 12345-6078 | Email: edusmart@gmail.com</p>
      </footer>
    </>
  );
};

export default ConfigPage;
