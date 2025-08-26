import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";
// Format vertical reel Instagram, slider circulaire custom

const Work = () => {
  // Vidéos à afficher dans le slider
  const videos = [
    {
      src: "/reel%20aout%206.mp4",
      thumbnail: "thumb1.jpg",
      description: "Reel Août 6 : Vidéo verticale.",
      link: "#"
    },
    {
      src: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://www.w3schools.com/html/img_girl.jpg",
      description: "Reel 2 : Création Instagram.",
      link: "https://example.com/reel2"
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://www.w3schools.com/html/img_chania.jpg",
      description: "Reel 3 : Animation verticale.",
      link: "https://example.com/reel3"
    },
    {
      src: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://www.w3schools.com/html/img_girl.jpg",
      description: "Reel 4 : Vidéo créative.",
      link: "https://example.com/reel4"
    }
  ];

  const [active, setActive] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState(0); // -1 = left, 1 = right
  const total = videos.length;
  // Pour effet circulaire
  const getIndex = (i) => (i + total) % total;

  // Navigation
  const goLeft = () => {
    setDirection(-1);
    setAnimating(true);
    setTimeout(() => {
      setActive((a) => getIndex(a - 1));
      setAnimating(false);
    }, 350);
  };
  const goRight = () => {
    setDirection(1);
    setAnimating(true);
    setTimeout(() => {
      setActive((a) => getIndex(a + 1));
      setAnimating(false);
    }, 350);
  };

  // Slider custom
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-lightest)', color: 'var(--color-darkest)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Circles />
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '600px' }}>
        {/* Boutons proches de la vidéo centrale */}
        <button
          onClick={goLeft}
          aria-label="Précédent"
          style={{
            position: 'absolute',
            left: 'calc(50% - 220px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: 'var(--color-accent)',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 6px 24px rgba(52,58,64,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
            outline: 'none',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-lightest)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" stroke="var(--color-lightest)" strokeWidth="2" fill="none"/><polyline points="13 17 8 12 13 7" /></svg>
        </button>
        <button
          onClick={goRight}
          aria-label="Suivant"
          style={{
            position: 'absolute',
            left: 'calc(50% + 220px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: 'var(--color-accent)',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 6px 24px rgba(52,58,64,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
            outline: 'none',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-lightest)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="11" stroke="var(--color-lightest)" strokeWidth="2" fill="none"/><polyline points="11 7 16 12 11 17" /></svg>
        </button>
        {/* Carrousel vidéos */}
        <div style={{ width: 340, height: 600, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1200, overflow: 'visible' }}>
          {/* Vidéo gauche */}
          <CarouselVideo
            key={getIndex(active - 1)}
            video={videos[getIndex(active - 1)]}
            style={{ position: 'absolute', left: -220, top: 80, zIndex: 1, transform: 'scale(0.5) rotateY(20deg)', filter: 'blur(16px)', opacity: 0.3, width: 340, height: 600, pointerEvents: 'none' }}
          />
          {/* Vidéo droite */}
          <CarouselVideo
            key={getIndex(active + 1)}
            video={videos[getIndex(active + 1)]}
            style={{ position: 'absolute', left: 220, top: 80, zIndex: 1, transform: 'scale(0.5) rotateY(-20deg)', filter: 'blur(16px)', opacity: 0.3, width: 340, height: 600, pointerEvents: 'none' }}
          />
          {/* Vidéo centrale avec animation de slide */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3,
            width: 340,
            height: 600,
            transition: animating ? 'transform 0.35s cubic-bezier(.4,2,.3,1)' : 'none',
            transform: animating
              ? `translateX(${direction === -1 ? '-340px' : direction === 1 ? '340px' : '0'})`
              : 'translateX(0)',
          }}>
            <CarouselVideo
              key={active}
              video={videos[active]}
              isActive
              style={{ width: 340, height: 600, boxShadow: '0 8px 32px rgba(52,58,64,0.18)' }}
            />
          </div>
          {/* Vidéo suivante qui slide vers le centre */}
          {animating && (
            <div style={{
              position: 'absolute',
              left: direction === -1 ? 340 : -340,
              top: 0,
              zIndex: 2,
              width: 340,
              height: 600,
              transition: 'transform 0.35s cubic-bezier(.4,2,.3,1)',
              transform: 'translateX(' + (direction === -1 ? '-340px' : '340px') + ')',
              animation: `slideIn${direction === -1 ? 'Left' : 'Right'} 0.35s forwards`,
            }}>
              <CarouselVideo
                key={getIndex(active + direction)}
                video={videos[getIndex(active + direction)]}
                isActive
                style={{ width: 340, height: 600, boxShadow: '0 8px 32px rgba(52,58,64,0.18)' }}
              />
            </div>
          )}
        </div>
      </div>
      <Bulb />
    </div>
  );
};

import React, { useRef, useState } from "react";

// Composant vidéo du carrousel
function CarouselVideo({ video, isActive, style }) {
  const videoRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);

  // Démarrage automatique de la vidéo centrale
  React.useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  // Les vidéos latérales jouent en boucle
  React.useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.play();
    }
  }, [isActive]);

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        background: 'var(--color-mid)',
        boxShadow: '0 4px 24px rgba(52,58,64,0.08)',
        position: 'relative',
        display: 'block',
        ...style
      }}
      tabIndex={0}
      aria-label={video.description}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.thumbnail}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }}
        {...(isActive ? {} : { muted: true })}
        loop
        playsInline
        controls={isActive}
      />
      {isActive && hovered && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(33,37,41,0.7)', color: 'var(--color-lightest)', padding: '1rem', fontSize: '1.1rem', borderTopLeftRadius: 24, borderTopRightRadius: 24, pointerEvents: 'none', textAlign: 'center', transition: 'opacity 0.3s', opacity: 1 }}>
          {video.description}
        </div>
      )}
    </a>
  );
}

export default Work;
