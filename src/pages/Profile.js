import React, { useEffect, useState } from "react";
import './Profile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Perfil from '../assets/perfil.png';
import Logo from '../assets/logo.png'; // Adicione a importação do Logo
import axios from 'axios'; // Biblioteca para fazer requisições HTTP

function Profile() {
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário

    useEffect(() => {
        // Função para buscar dados do usuário da API
        async function fetchUserData() {
            try {
                const response = await axios.get('https://05386a25-9acd-4b84-8acd-6fcbd630c722-00-t1eg5yb8e50p.janeway.replit.dev/api/users'); // Exemplo de URL da API
                setUserData(response.data); // Armazena os dados do usuário no estado
            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error);
            }
        }

        fetchUserData();
    }, []);

    // Se os dados do usuário ainda não foram carregados, exibe um loading
    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src={Logo} alt="Logo" />EDUSMART
                </div>
                <div className='barraPesquisa-p'>
                    <input type="text" placeholder="Pesquise qualquer coisa" />
                    <span className="search-icon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </header>
            <div className="perfil-container">
                <div className="perfil">
                    <img src={userData.profilePicture || Perfil} alt="profile" />
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
            </div>
        </>
    );
}

export default Profile;
