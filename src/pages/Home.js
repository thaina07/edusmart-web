import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import Banner from '../assets/banner1.png';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  // Estado para armazenar os dados de progresso
  const [progressos, setProgressos] = useState([]);

  useEffect(() => {
    // Simulação de chamada de API
    fetch('https://05386a25-9acd-4b84-8acd-6fcbd630c722-00-t1eg5yb8e50p.janeway.replit.dev/api/progress')  
      .then(response => response.json())
      .then(data => {
        setProgressos(data.progressos);
      })
      .catch(error => console.error('Erro ao buscar progresso:', error));
  }, []);

  const handleLoginClick = () => {
    navigate('/Profile');
  };

  return (
    <>
      <header className="header-home">
        <div className="logo"><img src={Logo} alt="Logo" />EDUSMART</div>
        <div className='barraPesquisa'>
          <input type="text" placeholder="Pesquise qualquer coisa" />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="profile" onClick={handleLoginClick}>
          <img src={Perfil} alt="Perfil" className="profile-img" />
          <span className="saudacao">Olá, Thainá</span>
        </div>
      </header>

      <div className="container-home">
        <div className="materias">
          <h2 className="materias-titulo">Escolha a matéria</h2>
          <ul className="materias-lista">
            <li><a href="/matematica">Matemática</a></li>
            <li><a href="/portugues">Português</a></li>
            <li><a href="/quimica">Química</a></li>
            <li><a href="/historia">História</a></li>
            <li><a href="/geografia">Geografia</a></li>
            <li><a href="/fisica">Física</a></li>
            <li><a href="/sociologia">Sociologia</a></li>
            <li><a href="/filosofia">Filosofia</a></li>
            <li><a href="/ingles">Inglês</a></li>
            <li><a href="/questoes">Questões para estudar</a></li>
            <li><a href="/configuracoes">Configurações</a></li>
          </ul>
        </div>

        <div className="conteudo">
            <h1 className="conteudo-titulo">Seja Bem-vindo(a) ao EduSmart Thainá</h1>
            <div className="banner"><img src={Banner} alt="banner-img"/></div>
            <h2 className="progresso-titulo">Seu progresso</h2>
            <div className="progresso-container">
            {progressos.map((item) => (
              <div className="progresso-quadrado" key={item.id}>
                Progresso {item.id}
                <div className="progresso-barra">
                  <div className="progresso-barra-preenchido" style={{ width: `${item.progresso}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
