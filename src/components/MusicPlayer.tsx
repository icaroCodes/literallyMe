// hooks do React pra player: guardar se tá tocando, controlar música atual e pegar o <audio> pra mandar play/pause
import { useEffect, useRef, useState } from 'react';

// motion é só pra fazer a animação do player entrando bonito na tela
import { motion } from 'framer-motion';

// ícones
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

// componente do player de música em si
export const MusicPlayer = () => {

  // guarda se a música tá tocando ou não (true = tocando, false = pausada)
  const [taTocando, setTaTocando] = useState(false);

  // guarda qual música do array tá selecionada agora
  const [indiceDaMusicaAtual, setIndiceDaMusicaAtual] = useState(0);

  // ref direta no <audio> pra eu mandar play, pause, trocar src, tudo por aqui
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // lista das músicas que o player conhece
  // basicamente é a playlist fixa do player
  const musicas = [
    {
      // nome da música
      title: 'Nuts',

      // artista
      artist: 'Lil Peep',

      // caminho do áudio (new URL evita dor de cabeça no build)
      src: new URL('../../audio/Nuts.mp3', import.meta.url).href,

      // capa que aparece no player
      cover: '/nuts.png',
    },
    {
      title: 'Ghousting',
      artist: 'azaakuma',
      src: new URL('../../audio/Ghousting.mp3', import.meta.url).href,
      cover: '/Ghousting.png',
    },
    {
      title: 'Telhado da Escola',
      artist: 'Linu',
      src: new URL('../../audio/telhadodaescola.mp3', import.meta.url).href,
      cover: '/telhadodaescola.png',
    },
    {
      title: "I'm So Fucked Up Please Help Me",
      artist: 'Rebzyyx',
      src: new URL('../../audio/ImSoFuckedUp.mp3', import.meta.url).href,
      cover: '/imsofuckedup.png',
    },
  ];

  // pega a música atual usando o índice salvo no estado
  const musicaAtual = musicas[indiceDaMusicaAtual];

  // vai pra próxima música da lista
  const vaiPraProximaCarai = () => {
    // atualiza o índice baseado no valor anterior
    setIndiceDaMusicaAtual((antes) =>
      // soma 1 e usa % pra quando chegar no fim voltar pro começo
      (antes + 1) % musicas.length
    );
  };

  // volta pra música anterior
  const voltaUmaMusicaAi = () => {
    // mexe no índice anterior
    setIndiceDaMusicaAtual((antes) =>
      // tira 1 e soma o tamanho do array pra nunca ficar negativo
      (antes - 1 + musicas.length) % musicas.length
    );
  };

  // função que realmente solta o som
  const soltaOSom = () => {
    // pego o elemento <audio> pelo ref
    const audio = audioRef.current;

    // se por algum motivo não existir, nem tenta
    if (!audio) return;

    // garanto que o volume tá normal
    audio.volume = 1;

    // mando tocar
    // catch vazio evita erro chato de autoplay bloqueado
    audio.play().catch(() => {});

    // atualizo o estado dizendo que agora tá tocando
    setTaTocando(true);
  };

  // pausa a música com fade (volume descendo suave)
  const pausaDeBoa = () => {
    // acesso o áudio pelo ref
    const audio = audioRef.current;

    // se não existir, já era
    if (!audio) return;

    // tempo total do fade (em ms)
    const duracaoDoFade = 600;

    // quantos passos o volume vai diminuir
    const quantidadeDePassos = 12;

    // tempo entre cada passo
    const tempoEntrePassos = duracaoDoFade / quantidadeDePassos;

    // quanto o volume diminui por passo
    const quantoBaixaPorVez = audio.volume / quantidadeDePassos;

    // contador pra saber quantos passos já rodaram
    let passoAtual = 0;

    // intervalo que vai rodar o fade
    const intervalo = setInterval(() => {

      // se o áudio sumir no meio, cancela tudo
      if (!audioRef.current) {
        clearInterval(intervalo);
        return;
      }

      // abaixa o volume sem deixar negativo
      audio.volume = Math.max(0, audio.volume - quantoBaixaPorVez);

      // soma mais um passo
      passoAtual++;

      // se já fez todos os passos
      if (passoAtual >= quantidadeDePassos) {

        // para o intervalo
        clearInterval(intervalo);

        // pausa o áudio de vez
        audio.pause();

        // reseta o volume pra próxima vez
        audio.volume = 1;

        // atualiza o estado dizendo que parou
        setTaTocando(false);
      }
    }, tempoEntrePassos);
  };

  // quando a música acaba sozinha
  const acabouAMusica = () => {
    // já manda pra próxima
    setIndiceDaMusicaAtual((antes) =>
      (antes + 1) % musicas.length
    );

    // mantém o estado como tocando
    setTaTocando(true);
  };

  // effect que roda sempre que troca a música
  useEffect(() => {

    // pego o áudio atual
    const audio = audioRef.current;

    // se não existir, ignora
    if (!audio) return;

    // troca a música
    audio.src = musicaAtual.src;

    // volta pro começo da faixa
    audio.currentTime = 0;

    // se antes já tava tocando, continua tocando
    if (taTocando) {
      soltaOSom();
    }

  // roda sempre que o índice mudar
  }, [indiceDaMusicaAtual]);

  // aqui começa o que aparece na tela de verdade
  return (
    <motion.div
      // começa fora da tela
      initial={{ y: 100 }}

      // anima subindo
      animate={{ y: 0 }}

      // animação com delay e efeito de mola
      transition={{ delay: 1, type: 'spring', stiffness: 100 }}

      // estilos do player fixo no rodapé
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 z-50 flex items-center gap-4"
    >

      {/* áudio invisível que realmente toca a música */}
      <audio
        // conecta o ref
        ref={audioRef}

        // define a música atual
        src={musicaAtual.src}

        // quando acabar, chama a função
        onEnded={acabouAMusica}
      />

      {/* capa da música */}
      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
        {musicaAtual.cover ? (
          // se tiver capa, mostra ela
          <img
            src={musicaAtual.cover}
            alt={musicaAtual.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          // se não tiver, mostra ícone genérico
          <Music className="w-6 h-6 text-zinc-400" />
        )}
      </div>

      {/* nome da música e artista */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">
          {musicaAtual.title}
        </h3>

        <p className="text-xs text-zinc-500 truncate">
          {musicaAtual.artist}
        </p>
      </div>

      {/* botões do player */}
      <div className="flex items-center gap-2">

        {/* voltar música */}
        <button
          onClick={voltaUmaMusicaAi}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        {/* play / pause */}
        <button
          onClick={() => {
            // se tá tocando, pausa suave
            if (taTocando) {
              pausaDeBoa();
            } else {
              // senão, solta o som
              soltaOSom();
            }
          }}
          className="p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors shadow-lg active:scale-95"
        >
          {taTocando
            ? <Pause className="w-5 h-5 fill-current" />
            : <Play className="w-5 h-5 fill-current pl-0.5" />
          }
        </button>

        {/* próxima música */}
        <button
          onClick={vaiPraProximaCarai}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>

      </div>
    </motion.div>
  );
};
