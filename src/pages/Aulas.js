import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Aulas.css';

function Aulas() {
  const navigate = useNavigate();
  const { materia } = useParams();
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica');
  const [listaComponenteMaterias, setListaComponenteMaterias] = useState({});
  const userName = localStorage.getItem('userName') || 'Usuário';

  useEffect(() => {
    async function buscandoProgresso() {
      try {
        const response = await axios.get('https://f533fab9-53d1-43b6-8ce1-37a26704fbff-00-2yo2wzmcactmx.picard.replit.dev/api/products/find');
        console.log("resposta:", response.data.produtos);
  
        var listaMaterias = response.data.produtos; // Guarda a lista de produtos
  
        // Filtrando matérias por categorias
        const listaMatematica = listaMaterias.filter((materia) => materia.categoria === "Matemática");
        const listaPortugues = listaMaterias.filter((materia) => materia.categoria === "Português");
        const listaFisica = listaMaterias.filter((materia) => materia.categoria === "Física");
        const listaGeografia = listaMaterias.filter((materia) => materia.categoria === "Geografia");
        const listaHistoria = listaMaterias.filter((materia) => materia.categoria === "História");
        const listaQuimica = listaMaterias.filter((materia) => materia.categoria === "Química");
        const listaSociologia = listaMaterias.filter((materia) => materia.categoria === "Sociologia");
        const listaFilosofia = listaMaterias.filter((materia) => materia.categoria === "Filosofia");
        const listaIngles = listaMaterias.filter((materia) => materia.categoria === "Inglês");

        // Função para gerar os componentes das matérias
        const gerarComponentes = (lista) => {
          return lista.map((materia) => (
            <div key={materia._id} className='produto' onClick={() => window.location.href = materia.videoUrl}
            style={{ cursor: 'pointer' }} >
              <img src={materia.imagem} alt={materia.nome} className="produto-img" />
              <div className="produto-info">
                <p className="produto-nome"> {materia.nome}</p>
                <div className="progresso-barra">
                  <div
                    className="progresso-barra-preenchido"
                    style={{ width: `${materia.progresso || 0}%` }}
                  ></div>
                </div>
                <p>Progresso: {materia.progresso || 0}%</p>
              </div>
            </div>
          ));
        };

        // Definindo o estado com todos os componentes gerados
        setListaComponenteMaterias({
          matematica: gerarComponentes(listaMatematica),
          portugues: gerarComponentes(listaPortugues),
          fisica: gerarComponentes(listaFisica),
          geografia: gerarComponentes(listaGeografia),
          historia: gerarComponentes(listaHistoria),
          quimica: gerarComponentes(listaQuimica),
          sociologia: gerarComponentes(listaSociologia),
          filosofia: gerarComponentes(listaFilosofia),
          ingles: gerarComponentes(listaIngles)
        });

      } catch (error) {
        console.error("Erro ao buscar dados do produto", error);
      }
    }

    buscandoProgresso();
  }, []);
  

  const conteudoMaterias = {
    matematica: (
      <div className="geral">
        <h1 className='conteudo-titulo'>Matemática</h1>
        <div className="conteudo-card-wrapper">
          <div className='conteudo-card'>
            {/* {[1, 2, 3].map(produtoId => (
              <div key={produtoId} className='produto'>
                <p>Produto {produtoId}</p>
                <div className="progresso-barra">
                  <div
                    className="progresso-barra-preenchido"
                    style={{ width: `${progressos[produtoId]?.progresso || 0}%` }}
                  ></div>
                </div>
                <p>Progresso: {progressos[produtoId]?.progresso || 0}%</p>
              </div>
            ))} */}
            {listaComponenteMaterias.matematica}{/*mostra a lista de itens das materias */}
          </div>
          <div className='conteudo-card'>
          {listaComponenteMaterias.matematica}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.portugues}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.fisica}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.quimica}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.geografia}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.historia}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.sociologia}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.filosofia}
          </div>

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

          <div className='conteudo-card'>
          {listaComponenteMaterias.ingles}
          </div>

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
        <div className="logo">
          <img src={Logo} alt="Logo" />EDUSMART
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
            {Object.keys(conteudoMaterias).map((key) => (
              <li key={key}>
                <Link to={`/Aulas/${key}`} onClick={() => setConteudoAtual(key)}>
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
