// exporta o objeto `favorites`, onde ficam todos os dados usados no site
export const favorites = {
  // Lista de séries favoritas
  series: [
    // cada item daqui aparece na tela usando o componente MinimalList
    "Breaking Bad",
    "Dexter",
    "Better Call Saul",
    "YOU",
    "La Casa de Papel",
    "Mr. Robot"
  ],
  // Lista de filmes favoritos. manter em array permite leitura mais simples e manutenção mais fácil
  filmes: [
    "El Camino",
    "Tropa de Elite 1",
    "Tropa de Elite 2",
    "Zootopia 1",
    "Zootopia 2"
  ],
  // Lista de jogos
  jogos: [
    "Red Dead Redemption 2",
    "GTA V",
    "The Last of Us Part I",
    "The Last of Us Part II",
    "EA FC 26",
    "Skate 4",
    "Little Nightmares II"
  ],
  // Músicas
  musicas: [
    { title: "Nuts", artist: "Lil Peep" },
    { title: "Ghousting", artist: "azaakuma" },
    { title: "Telhado da Escola", artist: "Linu" },
    { title: "I’m So Fucked Up Please Help Me", artist: "Rebzyyx" }
  ],
  // Personagens são objetos com nome, descrição e URL de vídeo
  personagens: [
    { name: "Dexter", description: "O açogueiro de Bay Harbor", videoUrl: "https://www.tiktok.com/@marcoas._/video/7589356976560213260" }, // link de referência; marcar como placeholder ajuda lembrar de validar links
    { name: "Brian Moser", description: "The Ice Truck Killer", videoUrl: "https://www.tiktok.com/@xbineyz/video/7546520539628670263?q=brian%20moser%20edit&t=1767555627829" },
    { name: "Joe Goldberg", description: "Gerente de Livraria", videoUrl: "https://www.tiktok.com/@f13.ae/video/7568541911825403157" },
    { name: "Jesse Pinkman", description: "Ele é um Baiacu", videoUrl: "https://www.tiktok.com/@dutchstuff123/video/7578525028673719585" },
    { name: "Elliot", description: "Hacker", videoUrl: "https://www.tiktok.com/@vxbyjoe/video/7582036112449801494" },
    { name: "David MacCall", description: "Obsessivo", videoUrl: "https://www.tiktok.com/@roxztp/video/7583126204144717086" },
    { name: "Ellie", description: "Imune", videoUrl: "https://www.tiktok.com/@sukunas17/video/7583811540999015688" },
    { name: "Joel", description: "Sobrevivente", videoUrl: "https://www.tiktok.com/@xbvnito/video/7504120560847179038?q=joel%20edit&t=1767994237631" },
    { name: "Arthur Morgan", description: "Leal", videoUrl: "https://www.tiktok.com/@spflyy/video/7532922797073485064?q=edit%20arthur%20morgan&t=1767995283569"}
  ],
  // Hobby
  hobby: "Programar"
};
