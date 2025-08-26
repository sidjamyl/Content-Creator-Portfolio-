
import { useState } from "react";
import { motion } from "framer-motion";
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import { fadeIn } from "../../variants";

const services = [
  {
    name: "Instagram",
    icon: FaInstagram,
    packs: [
      {
        name: "Pack Essentiel",
        details: [
          "1 vidéo unique (8 000 – 12 000 DA)",
          "Analyse de l’entreprise et du compte Instagram",
          "Rédaction du script",
          "Réalisation complète de la vidéo (tournage + montage)"
        ],
        price: "8000 DA"
      },
      {
        name: "Pack Croissance",
        details: [
          "4 à 6 vidéos (20 000 – 35 000 DA)",
          "Tout ce qui est inclus dans le Pack Essentiel",
          "Plan de communication adapté aux objectifs de l’entreprise"
        ],
        price: "20000 DA"
      },
      {
        name: "Pack Premium",
        details: [
          "Campagne mensuelle (50 000 – 500 000 DA)",
          "4 à 8 vidéos par mois",
          "2 à 4 designs par mois",
          "Plan de communication sur plusieurs mois",
          "Gestion complète des réseaux sociaux (publications, réponses aux messages, stories, interactions)",
          "Réalisation complète des vidéos (scripts, tournage, montage)"
        ],
        price: "50000 DA"
      }
    ],
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    packs: [
      {
        name: "Pack Essentiel",
        details: [
          "3 à 6 vidéos (8 000 – 12 000 DA)",
          "Analyse de l’entreprise et du compte TikTok",
          "Recherche de tendances adaptées",
          "Rédaction des scripts",
          "Réalisation complète des vidéos (tournage + montage)"
        ],
        price: "8000 DA"
      },
      {
        name: "Pack Croissance",
        details: [
          "6 à 15 vidéos (20 000 – 30 000 DA)",
          "Tout ce qui est inclus dans le Pack Essentiel",
          "Réalisation d’un plan de communication adapté à TikTok"
        ],
        price: "20000 DA"
      },
      {
        name: "Pack Premium",
        details: [
          "Campagne mensuelle",
          "15 à 20 vidéos par mois",
          "Gestion complète du compte TikTok (publications, réponses aux messages, interactions)",
          "Plan de communication sur plusieurs mois",
          "Réalisation complète des vidéos (scripts, tournage, montage)"
        ],
        price: "50000 DA"
      }
    ],
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    packs: [
      {
        name: "Pack Gestion & Contenu",
        details: [
          "2 à 3 publications par semaine (articles, posts, photos, designs)",
          "Gestion du compte LinkedIn (réponses aux commentaires, interactions, réponses aux messages)",
          "Mise en place d’une ligne éditoriale adaptée au public professionnel"
        ],
        price: "Sur devis"
      }
    ],
  },
];

const Services = () => {
  const [selected, setSelected] = useState(null);

  // Fonction pour déterminer la couleur premium selon le prix
  const getPackColor = (price) => {
    const value = parseInt(price);
    if (value >= 100) return "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg";
    if (value >= 80) return "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow";
    if (value >= 50) return "bg-gradient-to-r from-sky-400 to-blue-600 text-white";
    return "bg-primary/40 text-white";
  };

  return (
    <div className="min-h-screen bg-primary/30 py-24 flex items-center overflow-y-auto">
      <Circles />
      <div className="container mx-auto">
        {/* Réseaux sociaux d'abord */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              variants={fadeIn("up", 0.2 + i * 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={`flex flex-col items-center bg-black/40 border border-accent rounded-2xl p-8 shadow-lg hover:scale-[1.03] transition cursor-pointer ${selected === i ? "ring-2 ring-accent" : ""}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <service.icon className="text-5xl text-accent mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{service.name}</h2>
              <p className="text-white/80 text-center mb-4">Découvrez nos packs pour {service.name}.</p>
              <button className="mt-auto px-6 py-2 rounded bg-accent text-white font-semibold hover:bg-accent/80 transition">Voir les packs</button>
            </motion.div>
          ))}
        </div>

        {/* Section d'intro ensuite, texte plus petit */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            <span role="img" aria-label="globe">🌍</span> Nos services <span className="text-accent">.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/80">
            Nous proposons une gamme de services adaptés aux différentes plateformes sociales, avec des packs modulables selon vos besoins et vos objectifs.<br />
            Que ce soit pour Instagram, TikTok ou LinkedIn, nous concevons et réalisons du contenu original (scripts, tournage, montage, designs), mettons en place des plans de communication et assurons la gestion quotidienne des comptes.<br />
            Nous travaillons avec notre propre matériel (téléphone, trépieds, micros) et gérons également les campagnes sponsorisées : le suivi et la stratégie sont inclus, mais le budget publicitaire reste à la charge du client.
          </p>
        </motion.div>

        {/* Packs modal */}
        {selected !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-primary/90 rounded-2xl p-8 max-w-4xl w-full shadow-2xl relative flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-accent text-center w-full">
                  Packs {services[selected].name}
                </h3>
                <button
                  className="ml-4 px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-accent/80 transition"
                  onClick={() => setSelected(null)}
                  aria-label="Retour"
                >
                  Retour
                </button>
              </div>
              <div className="flex flex-row gap-6 justify-center items-stretch">
                {services[selected].packs.map((pack, j) => (
                  <div key={pack.name} className="rounded-xl border border-accent p-4 bg-black/30 shadow-lg w-full max-w-[340px] flex flex-col justify-between"
                    style={{ minHeight: '120px' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-semibold">{pack.name}</span>
                      <span className="text-lg font-bold">{pack.price}</span>
                    </div>
                    <ul className="list-disc ml-4 text-white/80 text-sm">
                      {pack.details.map((detail, k) => (
                        <li key={k}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Bulb />
    </div>
  );
};
export default Services;
