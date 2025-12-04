// src/components/Decathlon/JokesCarousel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { jokes } from '../../data/decathlonData';
import './Carousel.css';

const JokesCarousel = ({ onFinish }) => {
  const [progress, setProgress] = useState(50);
  const itemsRef = useRef([]);
  
  // Variables pour le drag (non-state pour performance)
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    currentProgress: 50
  });

  // Fonction utilitaire pour le Z-Index
  const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)));

  // Mise à jour de l'affichage
  useEffect(() => {
    const active = Math.floor(progress / 100 * (jokes.length - 1));
    const zIndexes = getZindex(jokes, active);

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      // Mise à jour des variables CSS dynamiquement
      item.style.setProperty('--zIndex', zIndexes[index]);
      item.style.setProperty('--active', (index - active) / jokes.length);
    });
  }, [progress]);

  // Gestionnaires d'événements
  const handleWheel = (e) => {
    const speedWheel = 0.05; // Ajuste la vitesse ici
    let newProgress = progress + (e.deltaY * speedWheel);
    newProgress = Math.max(0, Math.min(newProgress, 100));
    setProgress(newProgress);
    dragRef.current.currentProgress = newProgress;
  };

  const handleMouseDown = (e) => {
    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - dragRef.current.startX) * -0.2; // Vitesse drag
    
    let newProgress = dragRef.current.currentProgress + mouseProgress;
    newProgress = Math.max(0, Math.min(newProgress, 100));
    
    setProgress(newProgress);
  };

  const handleMouseUp = () => {
    dragRef.current.isDown = false;
    dragRef.current.currentProgress = progress; // Sauvegarde la position finale
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 uppercase">
        Phase 2 : Prise de conscience
      </h2>
      
      {/* Container du Carousel */}
      <div 
        className="carousel-container shadow-2xl"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="carousel-wrapper">
          {jokes.map((joke, i) => (
            <div 
              key={joke.id}
              className="carousel-item"
              ref={el => itemsRef.current[i] = el}
              onClick={() => setProgress((i / jokes.length) * 100 + 10)}
            >
              <div className="carousel-box">
                <div className="carousel-title">{joke.title}</div>
                <div className="carousel-num">{joke.num}</div>
                <p className="carousel-text">{joke.text}</p>
                <img className="carousel-img" src={joke.image} alt={joke.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center max-w-lg">
        <p className="text-gray-600 mb-6 italic">
          "Si tu prends plus soin de tes commits que de ton dos, on a un problème."
        </p>
        <button
          onClick={onFinish}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          Accéder à ma Routine de Réparation &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default JokesCarousel;