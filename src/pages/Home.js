import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import Banner from '../assets/banner1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importando os ícones
import { faCalculator, faBookOpen, faFlask, faGlobe, faHistory, faUsers, faComments, faPen, faLanguage, faQuestion } from '@fortawesome/free-solid-svg-icons'; // Adicione os ícones que precisar
import './Home.css';
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [progressos, setProgressos] = useState([]);
  const userImage = localStorage.getItem('userImage'); // Assumindo que você salvou a URL no localStorage
  localStorage.setItem('userName', 'Nome do usuário');
  const userName = localStorage.getItem('userName') || 'Visitante';
  console.log(localStorage.getItem('userName'));
  console.log('User ID após login:', localStorage.getItem('userId'));

  async function buscarProgressosHome() {
    const userIdItem = localStorage.getItem('userId');

    const listaProgresso = await axios.post('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/progress/buscarUser', {
      userId: userIdItem
    });

    if (listaProgresso.data) {
      setProgressos(listaProgresso.data.progressos);
      console.log('clcalcla', progressos)
    }
  }

  useEffect(() => {
    // Simulação de chamada de API
    const userIdItem = localStorage.getItem('userId');
    console.log('betinho: ', userIdItem);

    buscarProgressosHome();

    // fetch('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/progress/buscarUser', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userId: userIdItem })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setProgressos(data.progressos);
    //   })
    //   .catch(error => console.error('Erro ao buscar progresso:', error));
  }, []);

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
            {progressos ? (
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
