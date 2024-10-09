import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Home.css';

function Aulas() {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const { materia } = useParams(); // Pega o parâmetro dinâmico da URL (matéria)
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica'); // Define um valor padrão
  const userName = localStorage.getItem('userName') || 'Usuário'; // Pega o nome do usuário do localStorage


  const conteudoMaterias = {
    matematica: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Matemática</h1>
        <div className='matematica-card'>
          <div className='produto'></div>
        </div>
      </div>
    ),
    portugues: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Português: Gramática</h1>
        <h3>Elementos da Frase</h3>
        <p>
          A língua portuguesa é rica e complexa. Uma frase é composta por sujeito e predicado.
        </p>
        <h4>Tipos de Sujeito:</h4>
        <ul>
          <li>Sujeito simples</li>
          <li>Sujeito composto</li>
          <li>Sujeito oculto</li>
        </ul>
        <h4>Exercícios:</h4>
        <ol>
          <li>Identifique o sujeito na frase: "O gato dorme no sofá."</li>
          <li>Reescreva a frase no passado.</li>
        </ol>
      </div>
    ),
    quimica: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Química: Introdução</h1>
        <h3>O que é Química?</h3>
        <p>
          A química é a ciência que estuda a composição, estrutura e propriedades da matéria.
        </p>
        <h4>Principais Áreas da Química:</h4>
        <ul>
          <li>Química Orgânica</li>
          <li>Química Inorgânica</li>
          <li>Química Analítica</li>
        </ul>
        <h4>Experimentos Simples:</h4>
        <ol>
          <li>Reação do bicarbonato de sódio com vinagre.</li>
          <li>Produção de gás oxigênio a partir da decomposição da água oxigenada.</li>
        </ol>
      </div>
    ),
    historia: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>História: Idade Média</h1>
        <p>
          A Idade Média é um período da história que se estende do século V ao século XV.
        </p>
        <h4>Principais Características:</h4>
        <ul>
          <li>Feudalismo</li>
          <li>Crescimento do Cristianismo</li>
          <li>Crusadas</li>
        </ul>
      </div>
    ),
    geografia: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Geografia: Continentes</h1>
        <p>
          A Geografia estuda a superfície terrestre e suas interações com os seres humanos.
        </p>
        <h4>Os Continentes:</h4>
        <ul>
          <li>África</li>
          <li>América</li>
          <li>Ásia</li>
          <li>Europa</li>
          <li>Oceania</li>
          <li>Antártida</li>
        </ul>
      </div>
    ),
    fisica: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Física: Leis de Newton</h1>
        <p>
          As leis de Newton descrevem o movimento dos corpos e as forças que atuam sobre eles.
        </p>
        <h4>Primeira Lei:</h4>
        <p>Um corpo em repouso permanece em repouso, e um corpo em movimento permanece em movimento.</p>
      </div>
    ),
    sociologia: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Sociologia: Estruturas Sociais</h1>
        <p>
          A sociologia estuda a sociedade, suas estruturas e suas dinâmicas.
        </p>
        <h4>Elementos das Estruturas Sociais:</h4>
        <ul>
          <li>Grupos sociais</li>
          <li>Instituições</li>
          <li>Classes sociais</li>
        </ul>
      </div>
    ),
    filosofia: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Filosofia: Questões Fundamentais</h1>
        <p>
          A filosofia busca entender questões fundamentais sobre a existência, conhecimento e ética.
        </p>
      </div>
    ),
    ingles: (
      <div className="conteudo">
        <h1 className='conteudo-titulo'>Inglês: Gramática Básica</h1>
        <p>
          A gramática da língua inglesa é fundamental para a construção de frases corretas.
        </p>
        <h4>Estrutura da Frase:</h4>
        <p>Uma frase básica em inglês é composta por sujeito, verbo e objeto.</p>
      </div>
    ),
  };

  // Função para lidar com o clique no perfil
  const handleLoginClick = () => {
    navigate('/Profile');
    console.log('Perfil clicado!');
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
    <h2>{conteudoAtual.charAt(0).toUpperCase() + conteudoAtual.slice(1)}</h2>
    <div className="conteudo-materia">
      {conteudoMaterias[conteudoAtual]}
      {/* Adicione um console.log aqui para verificar se está acessando corretamente */}
      {console.log(conteudoMaterias[conteudoAtual])}
    </div>
  </div>
        </div>
      </div>
    </>
  );
}

export default Aulas;
