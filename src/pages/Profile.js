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
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const [avatarData, setAvatarData] = useState('');

    useEffect(() => {
        // Função para buscar dados do usuário da API
        async function fetchUserData() {
            try {
                const response = await axios.get('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/buscar'); // Exemplo de URL da API
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
                const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/avatar-usuario', {userId})
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
            const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/upload-photo', {
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
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle('dark-theme', !isDarkTheme);
        document.body.classList.toggle('light-theme', isDarkTheme);
    };
    useEffect(() => {
        document.body.classList.add('light-theme'); // Define tema padrão como claro
    }, []);
    
    const handleAvatarClick = () => {
        setShowAvatarModal(true);
    };
    const handleCloseModal = () => {
        setShowAvatarModal(false);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Você tem certeza que deseja sair?");
        if (confirmLogout) {
            // Limpar dados do usuário (se necessário)
            localStorage.removeItem('userId'); // Exemplo de limpeza do localStorage
            // Redirecionar para a página de login
            window.location.href = "/perfil"; 
        }
    };
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir sua conta?");
        if (confirmDelete) {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.post('https://c71fb123-e176-4c5f-99b7-13c231aefe98-00-16a60ugt11qeq.riker.replit.dev/api/users/delete', {
                    userId
                });
    
                if (response.status === 200) {
                    alert("Conta excluída com sucesso.");
                    localStorage.removeItem('userId'); // Limpa os dados do localStorage
                    window.location.href = "/perfil"; // Redireciona para a página de login
                }
            } catch (error) {
                console.error("Erro ao excluir a conta:", error);
                alert("Não foi possível excluir sua conta. Tente novamente.");
            }
        }
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
        <div className="page-profile">
        <header className="headerP">
                <a href="/home" className="voltar">
                    <i className="fas fa-arrow-left"></i>
                </a>
                <div className="header-right">
                    <div className="notifications">
                        <i className="fas fa-bell"></i>
                    </div>
                    <label className="theme-switch">
                        <input type="checkbox" onChange={toggleTheme} />
                        <span className="slider round"></span>
                        <span className="theme-label">Mudar Tema</span>
                    </label>
                </div>
            </header>
            <div className="perfil-container">
            <div className="logo">
            <img src={Logo} alt="Logo"/>

</div>
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
                        <li><a href="/configuracoes"><i class="fas fa-cogs"></i>Configurações</a></li>
                        <li><a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Sair</a></li>
                        <li><a href="#" onClick={handleDeleteAccount}><i className="fas fa-trash-alt"></i>Excluir conta</a></li>
                    </ul>
                </div>
                {showAvatarModal && (
                <AvatarModal
                    onClose={handleCloseModal}
                    onSelectAvatar={handleAvatarSelect}
                    
                />
            )}
            </div>
            </div>
        </>
    );
}

export default Profile;
