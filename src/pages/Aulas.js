import { useState, useEffect, useRef, useCallback } from "react";
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Aulas.css';
import Gif from '../assets/gif.gif';

const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName') || 'Usuário';
console.log('User ID após login:', localStorage.getItem('userId'));


function Aulas() {
  const [userImage, setUserImage] = useState(localStorage.getItem("userImage") || Perfil);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Visitante");
  const [loading, setLoading] = useState(true);
  const bonecoRefMenu = useRef(null);  // Adicione esta linha
  const [searchTerm, setSearchTerm] = useState('');
  const [velocidadeY, setVelocidadeY] = useState(2);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [velocidadeX, setVelocidadeX] = useState(2);
  const bonecoRefCard = useRef(null);
  const conteudoCardRef = useRef(null);
  const navigate = useNavigate();
  const { materia } = useParams();
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica');
  const [listaComponenteMaterias, setListaComponenteMaterias] = useState({});
  


  const fetchUserAvatar = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.post(
        "https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/avatar-usuario",
        { userId }
      );

      if (response.status === 200) {
        const avatarUrl = response.data.avatar;
        setUserImage(avatarUrl);
        localStorage.setItem("userImage", avatarUrl); // Atualiza o localStorage
      }
    } catch (error) {
      console.error("Erro ao buscar avatar do usuário:", error);
    }
  }, []);

  // Função para buscar o nome do usuário
  const fetchUserName = useCallback(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName("Visitante");
    }
  }, []);

  useEffect(() => {
    fetchUserAvatar();
    fetchUserName();
  }, [fetchUserAvatar, fetchUserName]);


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
  
  

  async function buscarProgressoPorDisciplina(disciplina, topico) {
    try {
      const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/progress/buscar', {
        userId, disciplina, topico
      });
      console.log('Resposta da API:', response.data);
      return response.data || [];
    } catch (error) {
      console.error(`Erro ao buscar progresso para ${disciplina}: `, error.response ? error.response.data : error.message);
      return [];
    }
  }
  

  async function gerarComponentes(lista, disciplina) {
    // console.log('Progresso da disciplina:', progressoDisciplina);

    const listaMateriaComponente = await Promise.all(lista.map(async (materia) => {
      const progressoDisciplina = await buscarProgressoPorDisciplina(disciplina, materia.nome, materia._id);
      const progresso = progressoDisciplina && progressoDisciplina.length > 0
        ? progressoDisciplina.find(p => p.aulaId === materia._id)?.progresso || 0
        : 0;
  
      return (
        <div
          key={materia._id}
          className='produto'
          onClick={() => handleVideoClick(materia.videoUrl, disciplina, materia._id, materia.nome)}
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
    }));
    
    return listaMateriaComponente;
  }  
  

  async function buscandoProgresso() {
    setLoading(true); 
    try {
      const response = await axios.get('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/products/find');
      const listaMaterias = response.data.produtos;

      const componentesMaterias = {
        matematica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Matemática"), "Matemática"),
         portugues: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Português"), "Português"),
        fisica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Física"), "Física"),
        quimica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Química"), "Química"),
        biologia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Biologia"), "Biologia"),
        geografia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Geografia"), "Geografia"),
        historia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "História"), "História"),
        sociologia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Sociologia"), "Sociologia"),
        filosofia: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Filosofia"), "Filosofia"),
        ingles: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Inglês"), "Inglês"),
      };
      setListaComponenteMaterias(componentesMaterias);
    }catch (err) {
      console.error('Erro ao buscar progresso: ', err);
    } finally {
      setLoading(false); // Termina o carregamento
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
    setConteudoAtual(materia || 'matematica');
  }, [materia]);
  
  useEffect(() => {
    buscandoProgresso();
  }, [materia]); 

  const handleVideoClick = async ( url, disciplina, aulaId, aula) => {
    const userId = localStorage.getItem('userId');
    console.log('Aula ID:', aulaId);

  
    if (!userId) {
      console.error('User ID is null!');
      alert('Usuário não encontrado. Por favor, faça login.');
      return;
    }
  
    try {
      const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/progress/atualizarAula', {
        userId,
        disciplina,
        aulaId,
        aula
      });
  
      console.log('Progresso atualizado:', response.data);
  
      // Aqui, você pode atualizar o estado para refletir a mudança do progresso na UI
      buscandoProgresso(); // Atualiza a lista de progresso após a atualização
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error.response ? error.response.data : error.message);
    }
  
    window.open(url, "_blank", "noreferrer");
  };
  
  // Função para tratar mudanças na barra de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Função para filtrar as matérias com base na pesquisa
  const filteredMaterias = Object.keys(listaComponenteMaterias)
    .filter(key => key.includes(searchTerm) || searchTerm === '')
    .map(key => ({
      key,
      componentes: listaComponenteMaterias[key]
    }));
  
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
    {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
       {loading && (
    <div className="loading-container">
      <img src={Gif} alt="Carregando..." className="loading-gif" />
    </div>
  )}
      {listaComponenteMaterias[conteudoAtual]}
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
        <a href="/home" className="logoA">
          <img src={Logo} alt="Logo" />
          EDUSMART
        </a>
        <div className="barraPesquisaA">
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
            {filteredMaterias.map(({ key }) => (
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
          <div className="container-aula">
          {loading ? (
            <div className="loading-container">
              <img src={Gif} alt="Carregando..." className="loading-gif" />
            </div>
          ) : (
            <>{conteudoMaterias[conteudoAtual]}</>
          )}
        </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Aulas;
