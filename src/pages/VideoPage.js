// VideoPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    async function buscarVideo() {
      try {
        const response = await axios.get('https://f533fab9-53d1-43b6-8ce1-37a26704fbff-00-2yo2wzmcactmx.picard.replit.dev/api/products/find');
        const produto = response.data.produtos.find(p => p._id === videoId);
        if (produto) {
          setVideoUrl(produto.videoUrl);
        } else {
          console.error('Aula não encontrada');
        }
      } catch (error) {
        console.error("Erro ao buscar dados do produto", error);
      }
    }

    buscarVideo();
  }, [videoId]);

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  if (!videoUrl) {
    return <div>Carregando...</div>;
  }

  // Extrair o videoId se for uma URL do YouTube
  let embedUrl = '';
  try {
    const urlObj = new URL(videoUrl);
    const v = urlObj.searchParams.get('v');
    if (v) {
      embedUrl = `https://www.youtube.com/embed/${v}`;
    } else {
      embedUrl = videoUrl; // Caso a URL não seja do YouTube, use diretamente
    }
  } catch (e) {
    console.error("URL inválida:", videoUrl);
    embedUrl = videoUrl; // Use diretamente se não puder extrair o videoId
  }

  return (
    <div className="video-page">
      <button onClick={handleBack}>Voltar</button>
      <h1>Aula</h1>
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="Video Player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPage;
