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
  const materias = [
    { nome: "Matemática", icon: faCalculator, link: "/aulas/matematica" },
    { nome: "Português", icon: faBookOpen, link: "/aulas/portugues" },
    { nome: "Química", icon: faFlask, link: "/aulas/quimica" },
    { nome: "História", icon: faHistory, link: "/aulas/historia" },
    { nome: "Geografia", icon: faGlobe, link: "/aulas/geografia" },
    { nome: "Física", icon: faFlask, link: "/aulas/fisica" },
    { nome: "Sociologia", icon: faUsers, link: "/aulas/sociologia" },
    { nome: "Filosofia", icon: faComments, link: "/aulas/filosofia" },
    { nome: "Inglês", icon: faLanguage, link: "/aulas/ingles" },
    { nome: "Questões", icon: faQuestion, link: "/aulas/questoes" },
  ];

  const filteredMaterias = materias.filter(materia =>
    materia.nome.toLowerCase().includes(searchTerm)
  );
  async function fetchUserAvatar() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/avatar-usuario', { userId });
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
  async function fetchUserName() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    try {
      const response = await axios.post(
        'https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/nome-usuario', // Alterar para sua URL correta
        { userId }
      );
  
      if (response.status === 200 && response.data.nome) {
        const userName = response.data.nome;
        setUserName(userName); // Atualiza o estado com o nome do usuário
        localStorage.setItem('userName', userName); // Armazena no localStorage
        console.log(localStorage.getItem('userId'));
      } else {
        console.warn('Nome do usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar nome do usuário:', error);
    }
  }
  useEffect(() => {
    fetchUserName();
  }, []);
  
  

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
          'https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/progress/buscarUser',
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
      const listaProgresso = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/progress/buscarUser', {
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
        <div className="logoH">
          <img src={Logo} alt="Logo" />
          EDUSMART
        </div>

        <div className="barraPesquisaH">
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
            {filteredMaterias.length > 0 ? (
              filteredMaterias.map((materia, index) => (
                <li key={index}>
                  <a href={materia.link} aria-label={`Aulas de ${materia.nome}`}>
                    <FontAwesomeIcon icon={materia.icon} /> {materia.nome}
                  </a>
                </li>
              ))
            ) : (
              <p>Nenhuma matéria encontrada</p>
            )}
          </ul>
        </div>

        <div className="conteudo">
          <h1 className="conteudo-titulo">Seja Bem-vindo(a) ao EduSmart, {userName}</h1>
          <div className="banner"><img src={Banner} alt="banner-img" /></div>
          <h2 className="progresso-titulo">Seu progresso</h2>
          <div className="progresso-container">
          {progressos && progressos.length > 0 ? (
  progressos.map((item, index) => (
    <div className="progresso-quadrado" key={item.id || index}>
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
