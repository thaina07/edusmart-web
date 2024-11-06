import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Aulas.css';

const userId = localStorage.getItem('userId'); // Adicione esta linha
const userName = localStorage.getItem('userName') || 'Usuário';


function Aulas() {
  const navigate = useNavigate();
  const { materia } = useParams();
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica');
  const [listaComponenteMaterias, setListaComponenteMaterias] = useState({});
  const userName = localStorage.getItem('userName') || 'Usuário';

  function getIconForMateria(materia) {
    switch (materia) {
      case 'matematica': return 'fa-calculator';
      case 'portugues': return 'fa-book';
      case 'fisica': return 'fa-atom';
      case 'quimica': return 'fa-flask';
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
      console.log('disciplina: ', disciplina)
      const response = await axios.post('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/progress/buscar', { disciplina });
      return response.data.progressos || [];
    } catch (error) {
      console.error(`Erro ao buscar progresso para ${disciplina}: `, error.response ? error.response.data : error.message);
      return [];
    }
  }
  // Função para inserir ou atualizar progresso
  async function atualizarProgresso(userId, disciplina) {
    try {
      console.log('Enviando dados:', { userId, disciplina });  // Adicione para verificar os dados enviados
      const response = await axios.post('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/progress/atualizar', { 
        userId,
        disciplina 
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error.response ? error.response.data : error.message);
      // Exiba o erro detalhado, isso pode ajudar a identificar o motivo do erro 404
    }
  }

  async function gerarComponentes(lista, disciplina) {
    const progressoDisciplina = await buscarProgressoPorDisciplina(disciplina);

    return lista.map((materia) => {
      const progresso = progressoDisciplina.find(p => p.disciplina === disciplina)?.progresso || 0;
      console.log(materia)
      return (
        <div
          key={materia._id}
          className='produto'
          onClick={() => handleVideoClick(materia.videoUrl, materia.categoria)}
          style={{ cursor: 'pointer' }}
        >
          <img src={materia.imagem} alt={materia.nome} className="produto-img" />
          <div className="produto-info">
            <p className="produto-nome"> {materia.nome}</p>
            <div className="progresso-barra">
              <div
                className="progresso-barra-preenchido"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            <p>Progresso: {progresso}%</p>
          </div>
        </div>
      );
    });
  }

  async function buscandoProgresso() {
    try {
      const response = await axios.get('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/products/find');
      const listaMaterias = response.data.produtos;

      const componentesMaterias = {
        matematica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Matemática"), "matematica"),
        portugues: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Português"), "portugues"),
        fisica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Física"), "fisica"),
        quimica: await gerarComponentes(listaMaterias.filter(item => item.categoria === "Química"), "quimica"),
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
    buscandoProgresso();
  }, []);

  // Função para manipular clique no vídeo e atualizar progresso
const handleVideoClick = async (url, disciplina, aulaId) => {
  const userId = localStorage.getItem('userId'); // Pega o ID do usuário

  // Envia os dados da aula e do usuário para atualizar o progresso para 100%
  try {
    const response = await axios.post('https://b7089caa-e476-42ba-82fb-5e43b96e9b62-00-1jkv1557vl3bj.worf.replit.dev/api/progress/atualizarAula', { 
      userId,
      disciplina,
      aulaId, // Identificador único da aula
      progresso: 100 // Define o progresso da aula como 100%
    });
    console.log('Progresso da aula atualizado para 100%: ', response.data);
  } catch (error) {
    console.error('Erro ao atualizar progresso da aula:', error.response ? error.response.data : error.message);
  }

  // Abre o vídeo em uma nova janela
  window.open(url, "_blank", "noreferrer");
};


  const conteudoMaterias = {
    matematica: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Matemática</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {listaComponenteMaterias.matematica}
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
          </div>
        </div>
      </div>
    ),
  };

  const handleLoginClick = () => {
    navigate('/Profile');
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
