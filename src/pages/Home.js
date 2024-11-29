import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import Banner from '../assets/banner1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faBookOpen, faFlask, faGlobe, faHistory, faUsers, faComments, faPen, faLanguage, faQuestion } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import axios from "axios";

function Home() {
  const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || Perfil);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Visitante');
  const [progressos, setProgressos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  async function fetchUserAvatar() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await axios.post('https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/avatar-usuario', { userId });
      if (response.status === 200) {
        const avatarUrl = response.data.avatar;
        setUserImage(avatarUrl); // Atualiza o estado com o avatar
        localStorage.setItem('userImage', avatarUrl); // Armazena no localStorage
      }
    } catch (error) {
      console.error('Erro ao buscar avatar do usuário:', error);
    }
  }
  useEffect(() => {
    fetchUserAvatar(); // Chama a função para buscar o avatar
  }, []);
  
  localStorage.setItem('userName', 'Nome do usuário');
  useEffect(() => {
    async function fetchUserData() {
      console.log("Iniciando fetchUserData...");
      const userIdItem = localStorage.getItem('userId');
      console.log("userId recuperado do localStorage:", userIdItem);
  
      if (!userIdItem) {
        console.warn("Nenhum userId encontrado.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post(
          'https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/progress/buscarUser',
          { userId: userIdItem }
        );
  
        console.log("Resposta da API:", response.data);
  
        if (response.data) {
          const userData = response.data;
          console.log("Dados do usuário recebidos:", userData);
  
          if (userData.nome) {
            console.log("Nome encontrado:", userData.nome);
            localStorage.setItem('userName', userData.nome);
            setUserName(userData.nome); // Chama a atualização do estado
          } else {
            console.warn("Nome não encontrado nos dados do usuário.");
          }
          setProgressos(userData.progressos || []);
        } else {
          console.warn("Nenhum dado de usuário retornado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    console.log("Nome recuperado do localStorage:", storedName); // Verifica se o nome está sendo recuperado corretamente
    if (storedName) {
        setUserName(storedName);
    } else {
        setUserName('Visitante'); // Caso o nome não esteja no localStorage
    }
}, []);

  
  
  const buscarProgressosHome = useCallback(async () => {
    const userIdItem = localStorage.getItem('userId');
    if (!userIdItem) {
      console.error('userId enviado:', userIdItem);
      setLoading(false);
      return;
    }

    try {
      const listaProgresso = await axios.post('https://c55023c1-63fe-4aa0-aff2-9acc396c9f9c-00-26z23t0h0ej8o.worf.replit.dev/api/progress/buscarUser', {
        userId: userIdItem
      });
    
      if (listaProgresso.data) {
        setProgressos(listaProgresso.data.progressos);
      }
    } catch (error) {
      if (error.response) {
        // Caso o erro tenha uma resposta do servidor
        console.error('Erro na requisição:', error.response.data);
      } else if (error.request) {
        // Caso a requisição tenha sido feita mas não tenha recebido resposta
        console.error('Erro na requisição sem resposta:', error.request);
      } else {
        // Caso o erro tenha sido causado por outra coisa
        console.error('Erro desconhecido:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarProgressosHome();
  }, [buscarProgressosHome]);

  const handleLoginClick = () => {
    navigate('/Profile');
  };

  return (
    <>
      <header className="header-home">
        <div className="logo">
          <img src={Logo} alt="Logo ou Foto do Usuário" />
          EDUSMART
        </div>

        <div className="barraPesquisa">
          <input
            type="text"
            placeholder="Pesquise qualquer matéria"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="search-icon2">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="profile" onClick={handleLoginClick}>
        <img src={userImage} alt="Perfil" className="profile-img" />
          <span className="saudacao">Olá, {userName}</span>
        </div>
      </header>

      <div className="container-home">
        <div className="materias">
          <h2 className="materias-titulo">Escolha a matéria</h2>
          <ul className="materias-lista">
            <li><a href="/aulas/matematica" aria-label="Aulas de Matemática"><FontAwesomeIcon icon={faCalculator} /> Matemática</a></li>
            <li><a href="/aulas/portugues" aria-label="Aulas de Português"><FontAwesomeIcon icon={faBookOpen} /> Português</a></li>
            <li><a href="/aulas/quimica" aria-label="Aulas de Química"><FontAwesomeIcon icon={faFlask} /> Química</a></li>
            <li><a href="/aulas/historia" aria-label="Aulas de História"><FontAwesomeIcon icon={faHistory} /> História</a></li>
            <li><a href="/aulas/geografia" aria-label="Aulas de Geografia"><FontAwesomeIcon icon={faGlobe} /> Geografia</a></li>
            <li><a href="/aulas/fisica" aria-label="Aulas de Física"><FontAwesomeIcon icon={faFlask} /> Física</a></li>
            <li><a href="/aulas/sociologia" aria-label="Aulas de Sociologia"><FontAwesomeIcon icon={faUsers} /> Sociologia</a></li>
            <li><a href="/aulas/filosofia" aria-label="Aulas de Filosofia"><FontAwesomeIcon icon={faComments} /> Filosofia</a></li>
            <li><a href="/aulas/ingles" aria-label="Aulas de Inglês"><FontAwesomeIcon icon={faLanguage} /> Inglês</a></li>
            <li><a href="/aulas/questoes" aria-label="Questões para estudar"><FontAwesomeIcon icon={faQuestion} /> Questões para estudar</a></li>
            <li><a href="/configuracoes" aria-label="Configurações"><FontAwesomeIcon icon={faPen} /> Configurações</a></li>
          </ul>
        </div>

        <div className="conteudo">
          <h1 className="conteudo-titulo">Seja Bem-vindo(a) ao EduSmart, {userName}</h1>
          <div className="banner"><img src={Banner} alt="banner-img" /></div>
          <h2 className="progresso-titulo">Seu progresso</h2>
          <div className="progresso-container">
  {progressos && progressos.length > 0 ? (
    progressos.map((item) => (
      <div className="progresso-quadrado" key={item.id}>
        Progresso {item.discplina}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${item.progresso}%` }}></div>
        </div>
      </div>
    ))
  ) : (
    <p>Nenhum progresso encontrado</p>
  )}
</div>
        </div>
      </div>
    </>
  );
}

export default Home;
