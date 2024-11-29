import React, { useEffect, useState } from "react";
import './Profile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Perfil from '../assets/perfil.png';
import Logo from '../assets/logo.png'; // Adicione a importação do Logo
import axios from 'axios'; // Biblioteca para fazer requisições HTTP
import Voltar from '../assets/voltar.png';
import Gif from '../assets/gif.gif';
import Avatar1 from '../assets/avatar1.png';
import Avatar2 from '../assets/avatar2.png';
import Avatar3 from '../assets/avatar3.png';
import AvatarG1 from '../assets/avatarG1.png';
import AvatarG2 from '../assets/avatarG2.png';
import AvatarG3 from '../assets/avatarG3.png';
import AvatarH1 from '../assets/avatarH1.png';
import AvatarH2 from '../assets/avatarH2.png';
import AvatarH3 from '../assets/avatarH3.png';


function AvatarModal({ onClose, onSelectAvatar }) {
    const avatars = [Avatar1, Avatar2, Avatar3, AvatarG1, AvatarG2, AvatarG3, AvatarH1, AvatarH2, AvatarH3];


    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Choose your avatar</h2>
                <div className="avatar-grid">
                    {avatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className="avatar-option"
                            onClick={() => onSelectAvatar(avatar)}
                        />
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function Profile() {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({ nome: '', email: '', profilePhoto: '' });

    const [avatarData, setAvatarData] = useState('');

    useEffect(() => {
        // Função para buscar dados do usuário da API
        async function fetchUserData() {
            try {
                const response = await axios.get('https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/buscar'); // Exemplo de URL da API
                console.log('dados do usuario', response.data)
                setUserData(response.data); // Armazena os dados do usuário no estado
            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error);
            }
        }
        fetchUserData();

        async function fetchUserAvatar() {
            const userId = localStorage.getItem('userId')

            try {
                const response = await axios.post('https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/avatar-usuario', {userId})
                if (response.status == 200) {
                    setAvatarData(response.data.avatar)
                }
            }catch (error) {
                console.error('Erro ao buscar avatar do usuário: ', error)
            }
        }

        fetchUserAvatar();
    }, []);

    const handleAvatarSelect = async (avatar) => {
        // const formData = new FormData();
        // formData.append('userId', userData._id);  // Envia o ID do usuário
        // formData.append('profilePhoto', avatar);  // Envia o arquivo da imagem (não a URL)

        const userId = localStorage.getItem('userId');
    
        console.log('tga:', userData._id)
        try {
            // Enviar requisição à API para atualizar o avatar do usuário
            const response = await axios.post('https://a4cbe45d-4755-42a7-bb7c-8a519c38281c-00-2vitw121bd8i8.picard.replit.dev/api/users/upload-photo', {
                userId,
                profilePhoto: avatar
            });
            console.log("Resposta da API:", response.data);
            console.log('Dados enviados:', {
                userId: userData._id,   // ID do usuário
                profilePhoto: avatar,   // Avatar escolhido
            });

            if(response.status == 200){
                setAvatarData(avatar)
            }
            
            setShowAvatarModal(false); // Fechar o modal
        } catch (error) {
            console.error("Erro ao atualizar o avatar:", error);
            if (error.response) {
                console.error("Detalhes do erro:", error.response.data); // Exibe os detalhes do erro
            }
            alert("Não foi possível salvar o avatar. Tente novamente.");
        }
    };
    
    
    const handleAvatarClick = () => {
        setShowAvatarModal(true);
    };
    const handleCloseModal = () => {
        setShowAvatarModal(false);
    };


    useEffect(() => {
        console.log('userName no localStorage:', localStorage.getItem('userName'));
      }, []);

      useEffect(() => {
        // Simulação de carregamento de dados
        setTimeout(() => {
          setUserData({ name: 'Usuário' }); // Exemplo de dados carregados
          setLoading(false);
        }, 2000); // Simula um atraso de 2 segundos
      }, []);
    // Se os dados do usuário ainda não foram carregados, exibe um loading
    if (!userData) {
        if (loading) {
          return (
            <div className="loading-container">
              <img src={Gif} alt="Carregando..." className="loading-gif" />
            </div>
          );
        }
        return <div>Carregando dados...</div>; // Texto ou algo adicional enquanto não há loading
      }
            

    return (
        <>
            <header className="header">
                <a href="/home" className="voltar">
                    <img src={Voltar} alt="Logo" />
                </a>
                <div className='barraPesquisa-p'>
                    <input type="text" placeholder="Pesquise qualquer coisa" />
                    <span className="search-icon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </header>
            <div className="perfil-container">
            <div className="perfil">
                    <img src={avatarData || Perfil} alt="profile" />
                    <span className="camera-icon" onClick={handleAvatarClick}>
                        <i className="fas fa-camera"></i>
                    </span>
                </div>
                <h2>{userData.nome}</h2> {/* Substitui pelo nome do usuário */}
                <div className="conteudo-perfil">
                    <ul className="lista">
                        <li>{userData.email}</li> {/* Substitui pelo email do usuário */}
                        <li><a href="/configuracoes">Configurações</a></li>
                        <li><a href="/sair">Sair</a></li>
                        <li><a href="/excluir">Excluir conta</a></li>
                    </ul>
                </div>
                {showAvatarModal && (
                <AvatarModal
                    onClose={handleCloseModal}
                    onSelectAvatar={handleAvatarSelect}
                    
                />
            )}
            </div>
        </>
    );
}

export default Profile;
