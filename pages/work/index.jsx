import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  // Vidéos à afficher dans le slider
  const videos = [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
      description: "Projet 1 : Présentation d'une vidéo professionnelle.",
      link: "https://example.com/projet1"
    },
    {
      src: "https://www.w3schools.com/html/movie.mp4",
      thumbnail: "https://www.w3schools.com/html/img_girl.jpg",
      description: "Projet 2 : Vidéo créative pour un client.",
      link: "https://example.com/projet2"
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://www.w3schools.com/html/img_chania.jpg",
      description: "Projet 3 : Animation et montage avancé.",
      link: "https://example.com/projet3"
    }
  ];

  // Slider custom
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-lightest)', color: 'var(--color-darkest)' }} className="py-36 flex items-center">
      <Circles />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              style={{ color: 'var(--color-darkest)' }}
              className="h2 xl:mt-12"
            >
              My work <span style={{ color: 'var(--color-accent)' }}>.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
              style={{ color: 'var(--color-mid)' }}
            >
              Découvrez quelques réalisations vidéo récentes. Survolez chaque vidéo pour voir la description, cliquez pour en savoir plus.
            </motion.p>
          </div>

          {/* slider vidéo */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
            style={{ display: 'flex', gap: '2rem', overflowX: 'auto', padding: '1rem 0' }}
          >
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', width: '340px', flex: '0 0 340px', position: 'relative', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(52,58,64,0.08)', background: 'var(--color-light)' }}
                className="group"
              >
                <div style={{ position: 'relative', width: '100%', height: '220px', background: 'var(--color-mid)' }}>
                  <VideoHoverPlayer src={video.src} thumbnail={video.thumbnail} />
                  <div
                    className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(33,37,41,0.7)', color: 'var(--color-lightest)', padding: '1rem', fontSize: '1rem', borderBottomLeftRadius: '18px', borderBottomRightRadius: '18px', pointerEvents: 'none' }}
                  >
                    {video.description}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

import React, { useRef, useState } from "react";

function VideoHoverPlayer({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative", cursor: "pointer" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      aria-label="Vidéo de présentation"
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "18px" }}
        muted
        loop
        playsInline
      />
      {!hovered && (
        <img
          src={thumbnail}
          alt="Miniature vidéo"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "18px" }}
        />
      )}
    </div>
  );
}

export default Work;
