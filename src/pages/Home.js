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
  const navigate = useNavigate();
  const [progressos, setProgressos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userImage = localStorage.getItem('userImage');
  localStorage.setItem('userName', 'Nome do usuário');
  const userName = localStorage.getItem('userName') || 'Visitante';

  const buscarProgressosHome = useCallback(async () => {
    const userIdItem = localStorage.getItem('userId');
    if (!userIdItem) {
      console.error('userId enviado:', userIdItem);
      setLoading(false);
      return;
    }

    try {
      const listaProgresso = await axios.post('https://b1eaafe0-1717-43fd-bb29-cad15cdb9b1d-00-2aila5im7ld5y.janeway.replit.dev/api/progress/buscarUser', {
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
          <img src={userImage || Logo} alt="Logo ou Foto do Usuário" />
          EDUSMART
        </div>

        <div className='barraPesquisa'>
          <input type="text" placeholder="Pesquise qualquer coisa" />
          <span className="search-icon2">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="profile" onClick={handleLoginClick}>
          <img src={Perfil} alt="Perfil" className="profile-img" />
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
