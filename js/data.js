/* =========================================================================
   PRESTIGE AUTO — Configuration et contenus du site
   -------------------------------------------------------------------------
   • Les 4 annonces sont des EXEMPLES : aucun véhicule n'est en stock,
     aucun prix n'est indiqué.
   • Caractéristiques : site officiel Can-Am (can-am.brp.com, Canada-FR,
     modèles 2027), relevées le 16/11/2026. Elles peuvent varier selon le
     marché et l'année : vérifier sur la fiche officielle avant toute vente.
   • Can-Am, Maverick, Rotax, Smart-Lok sont des marques de BRP. Ce site est
     indépendant et n'est pas affilié à BRP.
   • PHOTOS / VIDÉOS : mettez vos fichiers dans le dossier "media/" puis
     indiquez leur chemin ci-dessous (ex. "media/x-rs-1.jpg").
     Tant qu'un champ est vide, une illustration est affichée à la place.
   ========================================================================= */

window.SITE_CONFIG = {
  name: "PRESTIGE AUTO",
  tagline: "Buggys Can-Am · Achat · Vente · Raids",
  // Numéro WhatsApp au format international SANS "+" ni espaces (ex. "212600000000").
  // Vide : le bouton ouvre WhatsApp et l'utilisateur choisit le destinataire.
  whatsappNumber: "",
  // Coordonnées affichées sur le site — à renseigner (laisser "" pour masquer).
  address: "",
  email: "",
  phone: "",
  heroPhoto: "", // ex. "media/accueil.jpg" — grande photo de l'accueil
};

/* Photos sous licence libre (Wikimedia Commons), téléchargées dans media/.
   Les crédits (auteur + licence) s'affichent automatiquement : obligatoires
   pour les licences CC BY / CC BY-SA. Clés utilisées par le site :
   hero (accueil), raid (bandeaux raid), raid2 (fiche du raid), xrs, x3…
   Pour vos propres photos : ajoutez une entrée { src, alt, title, author: "PRESTIGE AUTO" }. */
const OWN = { author: "PRESTIGE AUTO", own: true };
window.PHOTOS = {
  // Photos PRESTIGE AUTO (désert). Les variantes de couleur sont des retouches
  // de la même photo, utilisées comme visuels d'ambiance (non contractuels).
  hero: { ...OWN, src: "media/avant-noir.webp", wide: "media/avant-noir-large.webp", alt: "Buggy Can-Am noir dans les dunes, phares allumés", focus: "50% 45%" },
  raid: { ...OWN, src: "media/avant-noir.webp", wide: "media/avant-noir-large.webp", alt: "Buggy Can-Am dans les dunes" },
  raidBand: { ...OWN, src: "media/buggy-orange.webp", alt: "Buggy Can-Am Maverick X3 dans le sable" },
  raid2: { ...OWN, src: "media/buggy-turquoise.webp", alt: "Buggy Can-Am Maverick X3 dans le désert" },
  xrs: { ...OWN, src: "media/buggy-orange.webp", alt: "Buggy Can-Am Maverick X3, coloris orange (visuel d'ambiance)" },
  xrc: { ...OWN, src: "media/buggy-turquoise.webp", alt: "Buggy Can-Am Maverick X3, coloris turquoise (visuel d'ambiance)" },
  maxrs: { ...OWN, src: "media/avant-noir-carte.webp", alt: "Buggy Can-Am noir vu de face (visuel d'ambiance)" },
  maxrc: { ...OWN, src: "media/buggy-rouge.webp", alt: "Buggy Can-Am Maverick X3, coloris rouge (visuel d'ambiance)" },
  g1: { ...OWN, src: "media/avant-noir.webp", alt: "Buggy Can-Am noir dans les dunes" },
  g2: { ...OWN, src: "media/buggy-blanc.webp", alt: "Buggy Can-Am blanc dans le désert" },
  g3: { ...OWN, src: "media/buggy-bleu.webp", alt: "Buggy Can-Am bleu dans le sable" },
  g4: { ...OWN, src: "media/buggy-jaune.webp", alt: "Buggy Can-Am jaune dans le désert" },
  g5: { ...OWN, src: "media/buggy-rouge.webp", alt: "Buggy Can-Am rouge dans le sable" },
  g6: { ...OWN, src: "media/buggy-turquoise.webp", alt: "Buggy Can-Am turquoise dans les dunes" },
  v1: { ...OWN, src: "media/buggy-orange.webp", alt: "" },
  v2: { ...OWN, src: "media/buggy-jaune.webp", alt: "" },
  v3: { ...OWN, src: "media/buggy-blanc.webp", alt: "" },
  v4: { ...OWN, src: "media/buggy-bleu.webp", alt: "" },
  v5: { ...OWN, src: "media/avant-noir-carte.webp", alt: "" },
  v6: { ...OWN, src: "media/buggy-rouge.webp", alt: "" },
};

const OFFICIAL_BASE = "https://can-am.brp.com/off-road/ca/fr/modeles/cote-a-cote/sport/maverick-x3.html/trim/";
const SPEC_BASE = "https://can-am.brp.com/content/dam/global/en/can-am-off-road/my27/spec-sheets/na/fr/";

/* Moteur commun aux 4 versions (source officielle) */
const ENGINE_TURBO_RR =
  "Rotax ACE 900 cc, 3 cylindres, turbocompressé, refroidi par liquide, refroidisseur intermédiaire intégré";

window.MODELS = [
  {
    id: "maverick-x3-x-rs",
    photo: "xrs",
    photoNote: "Visuel d'ambiance — non contractuel",
    name: "Maverick X3 X rs Turbo RR",
    short: "X rs",
    year: 2027,
    family: "Sport · 2 places",
    tagline: "Le pilotage pur, taillé pour la vitesse et les grands espaces.",
    color: "#2f3236",
    accent: "#ff6b1a",
    seats: 2,
    max: false,
    photos: [], // ex. ["media/x-rs-1.jpg", "media/x-rs-2.jpg"]
    official: OFFICIAL_BASE + "maverick-x3-x-rs",
    specSheet: SPEC_BASE + "ORV_SSV_MY27_SPEC_MAVX3_Xrs_FRCA_HR.pdf",
    key: { power: "200 ch", travel: "56 / 61 cm", clearance: "40,6 cm", weight: "787 kg" },
    specs: [
      ["Moteur", ENGINE_TURBO_RR],
      ["Puissance", "200 ch"],
      ["Transmission", "CVT pDrive avec QRS-X ; gamme haute/basse, neutre, marche arrière, stationnement"],
      ["Transmission intégrale", "Différentiel avant Smart-Lok ; 2x4 / 4x4 diff. verrouillé / 4x4 TRAIL ACTIV / 4x4 TRAIL"],
      ["Suspension avant", "Double bras triangulaire arqué, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Suspension arrière", "4 bras TTX, barre stabilisatrice — débattement 61 cm (24 po)"],
      ["Amortisseurs", "FOX 2.5 PODIUM RC2 (av.) / FOX 3.0 PODIUM RC2 (arr.) — ou version Smart-Shox selon équipement"],
      ["Pneus / jantes", "XPS Trac Force 32 x 10 x 15 po ; jantes alu 15 po avec anneau de retenue"],
      ["L x l x H", "335,3 x 184,7 x 174 cm"],
      ["Empattement", "259,1 cm"],
      ["Garde au sol", "40,6 cm"],
      ["Poids à sec", "787 kg"],
      ["Réservoir", "40 L"],
      ["Places", "2"],
      ["Instrumentation", "Écran numérique 4,5 po + écran tactile 10,25 po"],
    ],
  },
  {
    id: "maverick-x3-x-rc",
    photo: "xrc",
    photoNote: "Visuel d'ambiance — non contractuel",
    name: "Maverick X3 X rc Turbo RR",
    short: "X rc",
    year: 2027,
    family: "Rock crawling · 2 places",
    tagline: "Conçu pour franchir les rochers : treuil, protections intégrales et pneus Hammer King.",
    color: "#3b4a3a",
    accent: "#ff6b1a",
    seats: 2,
    max: false,
    photos: [],
    official: OFFICIAL_BASE + "maverick-x3-x-rc",
    specSheet: SPEC_BASE + "ORV_SSV_MY27_SPEC_MAVX3_Xrc_FRCA_HR.pdf",
    key: { power: "200 ch", travel: "56 / 61 cm", clearance: "40,6 cm", weight: "837 kg" },
    specs: [
      ["Moteur", ENGINE_TURBO_RR],
      ["Puissance", "200 ch"],
      ["Transmission", "CVT pDrive avec QRS-X ; gamme haute/basse, neutre, marche arrière, stationnement"],
      ["Transmission intégrale", "Différentiel avant Smart-Lok ; 4 modes : 2x4 / 4x4 diff. verrouillé / 4x4 ROCK / 4x4 TRAIL"],
      ["Suspension avant", "Double bras triangulaire arqué, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Suspension arrière", "4 bras TTX, barre stabilisatrice, bras inférieur arqué — débattement 61 cm (24 po)"],
      ["Amortisseurs", "FOX 2.5 PODIUM RC2 (av.) / FOX 3.0 PODIUM RC2 (arr.)"],
      ["Pneus / jantes", "XPS Hammer King 32 x 10 x 15 po ; jantes alu 15 po avec anneau de retenue"],
      ["Treuil", "2 041 kg (4 500 lb), câble synthétique"],
      ["L x l x H", "341,6 x 184,9 x 174 cm"],
      ["Empattement", "259,1 cm"],
      ["Garde au sol", "40,6 cm"],
      ["Poids à sec", "837 kg"],
      ["Réservoir", "40 L"],
      ["Places", "2"],
    ],
  },
  {
    id: "maverick-x3-max-x-rs",
    photo: "maxrs",
    photoNote: "Visuel d'ambiance — non contractuel",
    name: "Maverick X3 MAX X rs Turbo RR",
    short: "MAX X rs",
    year: 2027,
    family: "Sport · 4 places",
    tagline: "Les performances du X rs, avec quatre places pour partager l'aventure.",
    color: "#1c1d20",
    accent: "#ff6b1a",
    seats: 4,
    max: true,
    photos: [],
    official: OFFICIAL_BASE + "maverick-x3-max-x-rs",
    specSheet: SPEC_BASE + "ORV_SSV_MY27_SPEC_MAVX3_MAX_Xrs_FRCA_HR.pdf",
    key: { power: "200 ch", travel: "56 / 56 cm", clearance: "40,6 cm", weight: "918 kg" },
    specs: [
      ["Moteur", ENGINE_TURBO_RR],
      ["Puissance", "200 ch"],
      ["Transmission", "CVT pDrive avec QRS-X ; gamme haute/basse, neutre, marche arrière, stationnement"],
      ["Transmission intégrale", "Différentiel avant Smart-Lok ; 2x4 / 4x4 diff. verrouillé / 4x4 TRAIL ACTIV / 4x4 TRAIL"],
      ["Suspension avant", "Double bras triangulaire arqué, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Suspension arrière", "4 bras TTX, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Amortisseurs", "FOX 2.5 PODIUM RC2 (av.) / FOX 3.0 PODIUM RC2 (arr.) — ou version Smart-Shox selon équipement"],
      ["Pneus / jantes", "XPS Trac Force 32 x 10 x 15 po ; jantes alu 15 po avec anneau de retenue"],
      ["L x l x H", "419,1 x 184,7 x 174 cm"],
      ["Empattement", "342,9 cm"],
      ["Garde au sol", "40,6 cm"],
      ["Poids à sec", "918 kg"],
      ["Réservoir", "40 L"],
      ["Places", "4"],
    ],
  },
  {
    id: "maverick-x3-max-x-rc",
    photo: "maxrc",
    photoNote: "Visuel d'ambiance — non contractuel",
    name: "Maverick X3 MAX X rc Turbo RR",
    short: "MAX X rc",
    year: 2027,
    family: "Rock crawling · 4 places",
    tagline: "L'équipement rock crawling du X rc dans une version quatre places.",
    color: "#4a3a2c",
    accent: "#ff6b1a",
    seats: 4,
    max: true,
    photos: [],
    official: OFFICIAL_BASE + "maverick-x3-max-x-rc",
    specSheet: SPEC_BASE + "ORV_SSV_MY27_SPEC_MAVX3_MAX_Xrc_FRCA_HR.pdf",
    key: { power: "200 ch", travel: "56 / 56 cm", clearance: "40,6 cm", weight: "960 kg" },
    specs: [
      ["Moteur", ENGINE_TURBO_RR],
      ["Puissance", "200 ch"],
      ["Transmission", "CVT pDrive avec QRS-X ; gamme haute/basse, neutre, marche arrière, stationnement"],
      ["Transmission intégrale", "Différentiel avant Smart-Lok ; 4 modes : 2x4 / 4x4 diff. verrouillé / 4x4 ROCK / 4x4 TRAIL"],
      ["Suspension avant", "Double bras triangulaire arqué, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Suspension arrière", "4 bras TTX, barre stabilisatrice — débattement 55,9 cm (22 po)"],
      ["Amortisseurs", "FOX 2.5 PODIUM RC2 (av.) / FOX 3.0 PODIUM RC2 (arr.)"],
      ["Pneus / jantes", "XPS Hammer King 32 x 10 x 15 po ; jantes alu 15 po avec anneau de retenue"],
      ["Treuil", "2 041 kg (4 500 lb), câble synthétique"],
      ["L x l x H", "419,1 x 184,7 x 174 cm"],
      ["Empattement", "342,9 cm"],
      ["Garde au sol", "40,6 cm"],
      ["Poids à sec", "960 kg"],
      ["Réservoir", "40 L"],
      ["Places", "4"],
    ],
  },
];

/* Raids — informations communiquées, à confirmer. Aucun programme n'est inventé. */
window.RAIDS = {
  main: {
    name: "Royal Raid Maroc",
    dates: "Du 8 au 12 décembre 2026",
    status: "Dates à confirmer",
    place: "Marrakech, Maroc",
  },
  // Galerie : renseignez "src" avec vos photos (ex. "media/raid-1.jpg").
  gallery: [
    { photo: "g1", src: "", caption: "Prêt pour le départ", scene: "dunes" },
    { photo: "g2", src: "", caption: "Dans les dunes", scene: "dunes" },
    { photo: "g3", src: "", caption: "Sur le sable", scene: "plain" },
    { photo: "g4", src: "", caption: "Coucher de soleil", scene: "dunes" },
    { photo: "g5", src: "", caption: "En piste", scene: "plain" },
    { photo: "g6", src: "", caption: "Le terrain de jeu", scene: "dunes" },
  ],
};

/* Vidéos — emplacements prêts. Pour chaque vidéo, renseignez SOIT "src"
   (fichier mp4 dans media/), SOIT "youtube" (identifiant de la vidéo,
   ex. "dQw4w9WgXcQ"). "poster" = image d'aperçu facultative. */
window.VIDEOS = [
  { title: "Essai Maverick X3 dans les dunes", category: "Buggys", src: "", youtube: "", poster: "", photo: "v1" },
  { title: "Préparation d'un buggy avant raid", category: "Buggys", src: "", youtube: "", poster: "", photo: "v2" },
  { title: "Randonnée dans le Haut Atlas", category: "Randonnées", src: "", youtube: "", poster: "", photo: "v3" },
  { title: "Sortie découverte en groupe", category: "Randonnées", src: "", youtube: "", poster: "", photo: "v4" },
  { title: "Royal Raid Maroc — résumé", category: "Raids", src: "", youtube: "", poster: "", photo: "v5" },
  { title: "Bivouac et ambiance du raid", category: "Raids", src: "", youtube: "", poster: "", photo: "v6" },
];

/* --------- Utilitaires partagés --------- */
window.PA = window.PA || {};
PA.escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
PA.getModel = (id) => window.MODELS.find((m) => m.id === id);
PA.waLink = (message) => {
  const n = (window.SITE_CONFIG.whatsappNumber || "").replace(/\D/g, "");
  const text = encodeURIComponent(message || "Bonjour PRESTIGE AUTO, je souhaite obtenir des informations.");
  return n ? `https://wa.me/${n}?text=${text}` : `https://wa.me/?text=${text}`;
};
