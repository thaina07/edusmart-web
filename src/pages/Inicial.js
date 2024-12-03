import { useNavigate } from 'react-router-dom';
import './Inicial.css';
import Imagem1 from '../assets/imagem1.png';
import Logo from '../assets/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Ana from '../assets/ana.png';
import Carlos from '../assets/carlos.png';
import Celulares from '../assets/image.png'
import React, { useState } from 'react';

const Modal = ({ title, content, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose} className="btn-close">Fechar</button>
            </div>
        </div>
    );
};

// Componente Testimonial
const Testimonial = ({ name, role, text, photo }) => {
    return (
        <div style={styles.container}>
            <div style={styles.photoContainer}>
                <img src={photo} alt={name} style={styles.photo} />
            </div>
            <div style={styles.content}>
                <h3>{name}</h3>
                <p><em>{text}</em></p>
                <p>– {role}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '400px'
    },
    photoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px',
    },
    photo: {
        borderRadius: '50%',
        width: '60px',
        height: '60px',
    },
    content: {
        textAlign: 'center'
    }
};

// Componente Inicial
const Inicial = () => {
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: '' });


    const handleRegisterClick = () => {
        navigate('/Cadastro');
    };

    const handleLoginClick = () => {
        navigate('/Perfil');
    };

    const openModal = (title, content) => {
        setModalInfo({ isOpen: true, title, content });
    };

    const closeModal = () => {
        setModalInfo({ isOpen: false, title: '', content: '' });
    };

    return (
        <>
            <header className="header">
                <div className="logoIn">
                    <img src={Logo} alt="Logo" />EDUSMART
                </div>
                <nav class="nav-links">
                <a href="#" onClick={() => openModal('Funcionalidades', 'Aqui no site é possível é possível encontrar todas as aulas de matérias e conteúdos que caem no ENEM, além disso, você pode acompanhar seu progresso de estudos de forma prática')}>Funcionalidades</a>
                    <a href="#" onClick={() => openModal('Sobre', 'EduSmart é uma plataforma inovadora para aprendizado eficiente, com o progresso você pode se motivar em assistir cada vez mais aulas e se programar até o ENEM')}>Sobre</a>
                    <a href="#" onClick={() => openModal('Suporte', 'Entre em contato com nossa equipe de suporte para dúvidas.')}>Suporte</a>
  </nav>

                <div className="action">
                    <button className="btn" onClick={handleLoginClick}>Fazer login</button>
                    <button className="btn" onClick={handleRegisterClick}>Cadastrar-se</button>
                </div>
            </header>
            {modalInfo.isOpen && (
                <Modal 
                    title={modalInfo.title} 
                    content={modalInfo.content} 
                    onClose={closeModal} 
                />
            )}

            <div className="home-container">
                <div className="home-content">
                    <h1>Aprenda de forma mais inteligente e eficiente com o nosso app</h1>
                    <p>No EduSmart você pode acompanhar seu progresso<br />todos os dias</p>
                    <p className="secondary-text">Baixe nosso app e comece sua jornada<br />de aprendizado hoje!</p>

                    <button className="btn-download-btn">Baixar</button>
                </div>
                <div className="home-image">
                    <img src={Imagem1} alt="imagem" />
                </div>
            </div>

            <div className="testimonials-section">
                <h2>Confira os relatos de nossos alunos:</h2>
                <div className="testimonials">
               
                    <Testimonial 
                        name="Ana P." 
                        role="Estudante do ensino médio" 
                        text="O melhor app de estudos que já usei! Eu já testei vários aplicativos, mas nenhum foi tão completo quanto esse. Ele tem quizzes, lembretes de estudo e até conteúdo exclusivo. Desde que comecei a usar, minhas notas melhoraram muito!" 
                        photo={Ana}
                    />
                 
                    <Testimonial 
                        name="Carlos M." 
                        role="Estudante universitário" 
                        text="O app mudou minha forma de estudar! Sempre tive dificuldade em me organizar, mas com esse app, consigo acompanhar meu progresso e aprender de maneira muito mais eficiente. A interface é fácil de usar e as funcionalidades são incríveis! Recomendo demais." 
                        photo={Carlos}
                    />
                </div>
                <p className="highlight">No nosso app você pode acompanhar seu progresso, estudar por<br />matérias, conferir gabaritos antigos e muito mais!</p>
                <img src={Celulares} alt="img2" className="image-celulares" />

            </div>
            <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 EduSmart. Todos os direitos reservados.</p>
        <ul className="footer-links">
          <li><a href="/about">Sobre nós</a></li>
          <li><a href="/contact">Contato</a></li>
          <li><a href="/privacy">Política de Privacidade</a></li>
        </ul>
      </div>
    </footer>
        </>
    );
};

export default Inicial;

