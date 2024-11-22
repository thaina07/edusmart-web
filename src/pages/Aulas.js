import { useState, useEffect, useRef } from "react";
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Aulas.css';

const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName') || 'Usuário';
console.log('User ID após login:', localStorage.getItem('userId'));


function Aulas() {
  const [velocidadeY, setVelocidadeY] = useState(2);
  const [posX, setPosX] = useState(0); // Posição inicial X
  const [posY, setPosY] = useState(0); // Posição inicial Y
  const [velocidadeX, setVelocidadeX] = useState(2);
  const bonecoRef = useRef(null); // Definindo a referência
  const bonecoRefCard = useRef(null); // Ref para o boneco no card
  const bonecoRefMenu = useRef(null); // Ref para o boneco no menu de matérias
  const conteudoCardRef = useRef(null); // Ref para o conteúdo onde o boneco se move
  const navigate = useNavigate();
  const { materia } = useParams();
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica');
  const [listaComponenteMaterias, setListaComponenteMaterias] = useState({});


  function getIconForMateria(materia) {
    switch (materia) {
      case 'matematica': return 'fa-calculator';
      case 'portugues': return 'fa-book';
      case 'fisica': return 'fa-atom';
      case 'quimica': return 'fa-flask';
      case 'biologia': return 'fa-atom';
      case 'geografia': return 'fa-globe';
      case 'historia': return 'fa-landmark';
      case 'sociologia': return 'fa-users';
      case 'filosofia': return 'fa-brain';
      case 'ingles': return 'fa-language';
      default: return 'fa-question-circle';
    }
  }

  axios.defaults.timeout = 10000;
  

  async function buscarProgressoPorDisciplina(disciplina) {
    try {
      const response = await axios.get('https://b1eaafe0-1717-43fd-bb29-cad15cdb9b1d-00-2aila5im7ld5y.janeway.replit.dev/api/progress/buscarProgresso', {
        params: { disciplina, userId }
      });
      console.log('Resposta da API:', response.data);
      return response.data || [];
    } catch (error) {
      console.error(`Erro ao buscar progresso para ${disciplina}: `, error.response ? error.response.data : error.message);
      return [];
    }
  }
  

  async function gerarComponentes(lista, disciplina) {
    const progressoDisciplina = await buscarProgressoPorDisciplina(disciplina);
    
    // Verifique a estrutura da resposta antes de tentar acessar
    console.log('Progresso da disciplina:', progressoDisciplina);
  
    return lista.map((materia, index) => {
      const progresso = progressoDisciplina && progressoDisciplina.length > 0
        ? progressoDisciplina.find(p => p.aulaId === materia._id)?.progresso || 0
        : 0;
  
      return (
        <div
          key={materia._id}
          className='produto'
          onClick={() => handleVideoClick(materia.videoUrl, disciplina, materia._id, index)}
          style={{ cursor: 'pointer' }}
        >
          <img src={materia.imagem} alt={materia.nome} className="produto-img" />
          <div className="produto-info">
            <p className="produto-nome">{materia.nome}</p>
            <div className="progresso-barra">
              <div className="progresso-barra-preenchido">
                <div className='progresso-barra-verde' style={{ width: `${progresso}%` }}></div>
              </div>
            </div>
            <p>Progresso: {progresso}%</p>
          </div>
        </div>
      );
    });
  }  
  

  async function buscandoProgresso() {
    try {
      const response = await axios.get('https://b1eaafe0-1717-43fd-bb29-cad15cdb9b1d-00-2aila5im7ld5y.janeway.replit.dev/api/products/find');
      const listaMaterias = response.data.produtos;

      const componentesMaterias = {
        matematica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Matemática"), "matematica"),
         portugues: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Português"), "portugues"),
        fisica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Física"), "fisica"),
        quimica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Química"), "quimica"),
        biologia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Biologia"), "biologia"),
        geografia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Geografia"), "geografia"),
        historia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "História"), "historia"),
        sociologia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Sociologia"), "sociologia"),
        filosofia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Filosofia"), "filosofia"),
        ingles: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Inglês"), "ingles"),
      };
      setListaComponenteMaterias(componentesMaterias);
    } catch (err) {
      console.error('Erro ao buscar progresso: ', err);
    }
  }
  useEffect(() => {
    const moverBoneco = () => {
      const conteudoCard = conteudoCardRef.current;
      const bonecoCard = bonecoRefCard.current;
  
      if (!conteudoCard || !bonecoCard) return;
  
      const limiteEsquerda = 0;
      const limiteDireita = conteudoCard.offsetWidth - bonecoCard.offsetWidth;
      const limiteSuperior = 0;
      const limiteInferior = conteudoCard.offsetHeight - bonecoCard.offsetHeight;
  
      // Atualizando posX
      setPosX((prevPosX) => {
        const novaPosX = prevPosX + velocidadeX;
        if (novaPosX >= limiteDireita || novaPosX <= limiteEsquerda) {
          setVelocidadeX((prevVelocidade) => -prevVelocidade);
        }
        return novaPosX;
      });
  
      // Atualizando posY
      setPosY((prevPosY) => {
        const novaPosY = prevPosY + velocidadeY;
        if (novaPosY >= limiteInferior || novaPosY <= limiteSuperior) {
          setVelocidadeY((prevVelocidade) => -prevVelocidade);
        }
        return novaPosY;
      });
  
      requestAnimationFrame(moverBoneco);
    };
  
    const animacaoId = requestAnimationFrame(moverBoneco);
    return () => cancelAnimationFrame(animacaoId);
  }, [velocidadeX, velocidadeY]);
  
  
  useEffect(() => {
    buscandoProgresso();
  }, [materia]); 

  const handleVideoClick = async (url, disciplina, aulaId) => {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      console.error('User ID is null!');
      alert('Usuário não encontrado. Por favor, faça login.');
      return;
    }
  
    try {
      const response = await axios.post('https://b1eaafe0-1717-43fd-bb29-cad15cdb9b1d-00-2aila5im7ld5y.janeway.replit.dev/api/progress/atualizarAula', {
        userId,
        disciplina,
        aulaId
      });
  
      console.log('Progresso atualizado:', response.data);
  
      // Aqui, você pode atualizar o estado para refletir a mudança do progresso na UI
      buscandoProgresso(); // Atualiza a lista de progresso após a atualização
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error.response ? error.response.data : error.message);
    }
  
    window.open(url, "_blank", "noreferrer");
  };
  
  
  
  const handleLoginClick = () => {
    navigate('/Profile');
  };

  // Definindo a variável `conteudoMaterias`
  const conteudoMaterias = {
    matematica: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Matemática</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.matematica}
             <img 
                ref={bonecoRefMenu} 
                src={Logo} 
                alt="Logo EDUSMART" 
                className="boneco" 
                style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
            />
          </div>
        </div>
      </div>
    ),
    portugues: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Português</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.portugues}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    fisica: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Física</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.fisica}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    quimica: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Química</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.quimica}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    biologia: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Biologia</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.biologia}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    geografia: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Geografia</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.geografia}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    historia: (
      <div className="geral">
        <h1 className='conteudo-titulo'>História</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.historia}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    sociologia: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Sociologia</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.sociologia}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    filosofia: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Filosofia</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.filosofia}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
    ingles: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Inglês</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.ingles}
             <img 
  ref={bonecoRefMenu} 
  src={Logo} 
  alt="Logo EDUSMART" 
  className="boneco" 
  style={{ top: `${posY}px`, left: `${posX}px`, position: 'absolute' }} 
/>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <>
      <header className="header-home">
        <a href="/home" className="logo">
          <img src={Logo} alt="Logo" />
          EDUSMART
        </a>
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
            {Object.keys(conteudoMaterias).map((key) => (
              <li key={key}>
                <Link to={`/Aulas/${key}`} onClick={() => setConteudoAtual(key)}>
                  <i className={`fas ${getIconForMateria(key)}`} style={{ marginRight: '8px' }} />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-aula">
          <div className="conteudo-aula">
            <div className="conteudo-materia">
              {conteudoMaterias[conteudoAtual]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Aulas;
