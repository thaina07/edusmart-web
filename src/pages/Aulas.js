import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'; // Certifique-se de importar Link
import Logo from '../assets/logo.png';
import Perfil from '../assets/perfil.png';
import './Aulas.css';

function Aulas() {
  const { materia } = useParams(); // Pega o parâmetro dinâmico da URL (matéria)
  const [conteudoAtual, setConteudoAtual] = useState(materia || 'matematica'); // Define um valor padrão

  // Conteúdos específicos para cada matéria
  const conteudoMaterias = {
    matematica: (
      <>
        <h3>Introdução à Álgebra</h3>
        <p>
          A álgebra é um dos ramos da matemática que lida com variáveis e as operações realizadas com elas.
          Diferente da aritmética, onde trabalhamos apenas com números fixos, a álgebra utiliza letras para
          representar valores desconhecidos ou variáveis, que podem mudar.
        </p>
        <h4>Exemplo de Equação Simples:</h4>
        <p>
          <strong>Equação:</strong> 2x + 3 = 7 <br />
          <strong>Solução:</strong> Subtraia 3 de ambos os lados: 2x = 4. <br />
          Divida ambos os lados por 2: x = 2.
        </p>
        <h4>Questões para Praticar:</h4>
        <ol>
          <li>Resolva a equação: 3x - 5 = 10.</li>
          <li>Simplifique a expressão: 2(x + 3) - 4.</li>
          <li>Encontre o valor de "x" na equação: 4x + 6 = 18.</li>
        </ol>
        <h4>Desafio:</h4>
        <p>
          Resolva a seguinte equação quadrática: x² - 4x - 5 = 0
        </p>
      </>
    ),
    portugues: "Conteúdo de Português",
    quimica: "Conteúdo de Química",
    historia: "Conteúdo de História",
    geografia: "Conteúdo de Geografia",
    fisica: "Conteúdo de Física",
    sociologia: "Conteúdo de Sociologia",
    filosofia: "Conteúdo de Filosofia",
    ingles: "Conteúdo de Inglês",
  };

  // Atualiza o conteúdo quando a matéria muda
  useEffect(() => {
    setConteudoAtual(materia || 'matematica'); // Atualiza o estado com o valor da matéria ou o padrão
  }, [materia]);

  // Caso a matéria não seja encontrada
  const conteudo = conteudoMaterias[conteudoAtual] || "Matéria não encontrada";

  return (
    <>
      <header className="header">
        <div className="logo"><img src={Logo} alt="Logo" />EDUSMART</div>
        <div className='barraPesquisa'>
          <input type="text" placeholder="Pesquise qualquer coisa" />
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <div className="profile">
          <img src={Perfil} alt="Perfil" className="profile-img" />
          <span className="saudacao">Olá, Thainá</span>
        </div>
      </header>

      <div className="container-aula">
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
        <div className="conteudo-aula">
          <h2>{conteudoAtual.charAt(0).toUpperCase() + conteudoAtual.slice(1)}</h2> 
          <div className="conteudo-materia">
            {conteudo}
          </div>
        </div>
      </div>
    </>
  );
}

export default Aulas;
