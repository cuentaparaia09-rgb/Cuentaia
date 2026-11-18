// Datos iniciales de demostración para Distrito Arocena
// Museo Arocena - Torreón, Coahuila

const INITIAL_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Noche de Jazz & Vinos de Coahuila",
    category: "vino",
    categoryLabel: "Cultura del Vino",
    tagline: "Maridaje enológico con bodegas de Parras en el Patio Central",
    description: "Una velada inigualable bajo las estrellas en el emblemático Patio Central del Museo Arocena. Degusta 4 etiquetas seleccionadas del Valle de Parras guiadas por un sommelier regional, acompañadas por un ensamble de jazz en vivo y tapas de autor.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    date: "Viernes, 28 de Noviembre, 2026",
    time: "20:00 - 23:00 hrs",
    location: "Patio Central Arocena",
    price: "$480 MXN",
    priceNumber: 480,
    spotsTotal: 35,
    spotsAvailable: 4,
    host: "Sommelier Rodrigo Valdés & Cuarteto Lagunero Jazz",
    interests: ["vino", "musica", "gastronomia", "eventos_culturales"],
    featured: true
  },
  {
    id: "exp-2",
    title: "Cena-Galería: Maestros del Virreinato & Alta Cocina",
    category: "gastronomia",
    categoryLabel: "Gastronomía Regional",
    tagline: "Menú degustación de 5 tiempos inspirado en la colección virreinal",
    description: "Un viaje sensorial que fusiona el arte sacro y virreinal con la gastronomía de vanguardia. La Chef invitada Mariana Sotomayor interpreta cinco obras maestras de la colección Arocena a través de platillos con ingredientes autóctonos del norte de México.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    date: "Sábado, 29 de Noviembre, 2026",
    time: "19:30 - 22:30 hrs",
    location: "Terraza Mirador del Arocena",
    price: "$750 MXN",
    priceNumber: 750,
    spotsTotal: 25,
    spotsAvailable: 6,
    host: "Chef Mariana Sotomayor & Curaduría de Arte Virreinal",
    interests: ["gastronomia", "arte", "historia"],
    featured: true
  },
  {
    id: "exp-3",
    title: "Recorrido Nocturno a la Luz de las Velas",
    category: "arte",
    categoryLabel: "Arte & Exposiciones",
    tagline: "Secretos, historias y arquitectura del Centro Histórico",
    description: "Descubre los rincones menos conocidos del Museo Arocena y el Casino de La Laguna en una atmósfera íntima y misteriosa. Conoce los detalles de la cantera, las salas históricas y las anécdotas de la época de oro de Torreón.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    date: "Jueves, 3 de Diciembre, 2026",
    time: "20:30 - 22:00 hrs",
    location: "Acceso Principal por Calle Cepeda",
    price: "Acceso Libre (con registro)",
    priceNumber: 0,
    spotsTotal: 40,
    spotsAvailable: 8,
    host: "Mtro. Carlos González (Historiador del Arocena)",
    interests: ["historia", "arte", "eventos_culturales"],
    featured: true
  },
  {
    id: "exp-4",
    title: "Taller de Fotografía Arquitectónica Lagunera",
    category: "talleres",
    categoryLabel: "Talleres Creativos",
    tagline: "Aprende a capturar luces, sombras y cantera histórica con tu cámara o móvil",
    description: "Taller teórico-práctico enfocado en la apreciación de la arquitectura porfiriana y contemporánea de Torreón. Incluye sesión práctica en las galerías, patio interior y fachada de la Casa Russek.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    date: "Sábado, 5 de Diciembre, 2026",
    time: "10:30 - 13:30 hrs",
    location: "Aula Taller & Patios Exteriores",
    price: "$320 MXN (Material incluido)",
    priceNumber: 320,
    spotsTotal: 20,
    spotsAvailable: 11,
    host: "Laura Villalobos (Fotógrafa Documental)",
    interests: ["fotografia", "talleres", "arte", "historia"],
    featured: false
  },
  {
    id: "exp-5",
    title: "Tarde de Vermut, Botanas Norteñas & Arte Moderno",
    category: "social",
    categoryLabel: "Música & Veladas Sociales",
    tagline: "El aperitivo perfecto de fin de semana con amigos",
    description: "Revivimos la tradición europea del vermut al aire libre con un toque lagunero: coctelería botánica artesanal, bocadillos regionales y recorrido libre por las salas de arte moderno en un ambiente relajado y casual.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    date: "Domingo, 6 de Diciembre, 2026",
    time: "14:00 - 18:00 hrs",
    location: "Café Bistro & Jardín Interior",
    price: "$290 MXN",
    priceNumber: 290,
    spotsTotal: 50,
    spotsAvailable: 18,
    host: "Mixología de Autor Arocena",
    interests: ["gastronomia", "musica", "eventos_culturales"],
    featured: false
  },
  {
    id: "exp-6",
    title: "Cata a Ciegas: El Renacer del Desierto de Coahuila",
    category: "vino",
    categoryLabel: "Cultura del Vino",
    tagline: "Atrévete a descubrir notas de roble, frutos rojos y terruño norteño",
    description: "Una experiencia inmersiva guiada con antifaz en donde pondrás a prueba tus sentidos. Identifica las cualidades de cepas insignia como Syrah, Cabernet Sauvignon y Malbec producidas en Coahuila.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    date: "Miércoles, 9 de Diciembre, 2026",
    time: "19:00 - 21:00 hrs",
    location: "Cava de Catas del Museo",
    price: "$520 MXN",
    priceNumber: 520,
    spotsTotal: 18,
    spotsAvailable: 2,
    host: "Enóloga Andrea Monroy",
    interests: ["vino", "gastronomia"],
    featured: false
  },
  {
    id: "exp-7",
    title: "Taller Creativo: Grabado en Linóleo & Estampado",
    category: "talleres",
    categoryLabel: "Talleres Creativos",
    tagline: "Crea tu propia obra inspirada en motivos de la Comarca Lagunera",
    description: "Aprende las técnicas tradicionales de grabado, gubias y tinta con artistas visuales locales. Te llevarás a casa tu propia serie de impresiones en papel artesanal.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    date: "Sábado, 12 de Diciembre, 2026",
    time: "11:00 - 14:00 hrs",
    location: "Laboratorio Creativo",
    price: "$350 MXN (Incluye gubias y papel)",
    priceNumber: 350,
    spotsTotal: 16,
    spotsAvailable: 7,
    host: "Taller Gráfico El Mezquite",
    interests: ["talleres", "arte"],
    featured: false
  },
  {
    id: "exp-8",
    title: "Concierto Acústico de Cuerdas en Sala Mayor",
    category: "social",
    categoryLabel: "Música & Veladas Sociales",
    tagline: "Música de cámara en acústica natural rodeado de grandes lienzos",
    description: "Un concierto íntimo de cuerdas interpretando desde piezas barrocas hasta adaptaciones de música cinematográfica contemporánea en el marco de la Sala de Arte Virreinal.",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    date: "Jueves, 17 de Diciembre, 2026",
    time: "20:00 - 21:30 hrs",
    location: "Sala Mayor de Exposiciones",
    price: "$250 MXN",
    priceNumber: 250,
    spotsTotal: 60,
    spotsAvailable: 15,
    host: "Orquesta Sinfónica Juvenil de Torreón (Camerata)",
    interests: ["musica", "arte", "eventos_culturales"],
    featured: true
  }
];

const COMMUNITY_STORIES = [
  {
    id: "com-1",
    author: "Sofía & Daniel M.",
    role: "Visitantes de Torreón Jardín",
    quote: "Distrito Arocena cambió por completo la forma en que pasamos los viernes. La cata en el patio con jazz fue una experiencia sofisticada que no encontrábamos en otra parte de la ciudad.",
    experience: "Noche de Jazz & Vinos de Coahuila",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "com-2",
    author: "Chef Mariana Sotomayor",
    role: "Colaboradora gastronómica local",
    quote: "Poder diseñar un menú de cinco tiempos dialogando con piezas virreinales del Arocena es un sueño para cualquier chef lagunera. El público conecta desde otra sensibilidad.",
    experience: "Cena-Galería de Maestros",
    avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "com-3",
    author: "Alejandro Garza",
    role: "Aficionado a la fotografía",
    quote: "El taller de fotografía me abrió los ojos a la cantera y la historia del centro de Torreón. Recomiendo reservar con anticipación porque los cupos realmente vuelan.",
    experience: "Taller de Fotografía Arquitectónica",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

const INTERESTS_LIST = [
  { id: "arte", label: "Arte & Pintura", icon: "palette" },
  { id: "historia", label: "Historia & Patrimonio", icon: "landmark" },
  { id: "gastronomia", label: "Gastronomía", icon: "utensils" },
  { id: "vino", label: "Cultura del Vino", icon: "wine" },
  { id: "musica", label: "Música en Vivo", icon: "music" },
  { id: "fotografia", label: "Fotografía", icon: "camera" },
  { id: "talleres", label: "Talleres Prácticos", icon: "scissors" },
  { id: "eventos_culturales", label: "Eventos Sociales", icon: "sparkles" }
];

const INITIAL_ADMIN_DATA = {
  totalVisitors: 1482,
  activeBookings: 324,
  popularCategory: "Cultura del Vino & Gastronomía",
  retentionRate: "42.8%",
  monthlyGrowth: [
    { month: "Jun", count: 180 },
    { month: "Jul", count: 240 },
    { month: "Ago", count: 310 },
    { month: "Sep", count: 420 },
    { month: "Oct", count: 590 },
    { month: "Nov", count: 750 }
  ],
  interestDistribution: [
    { name: "Cultura del Vino", percentage: 32 },
    { name: "Gastronomía", percentage: 26 },
    { name: "Arte & Exposiciones", percentage: 20 },
    { name: "Música en Vivo", percentage: 14 },
    { name: "Talleres", percentage: 8 }
  ]
};
