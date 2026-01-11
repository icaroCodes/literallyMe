// tipo das props que o componente recebe
// url é do vídeo mesmo, preview é se é só pra mostrar de leve (thumbnail) ou normal
type Props = {
  url: string; // link do vídeo (YouTube ou TikTok)
  preview?: boolean; // se for preview, escala maior e sem interagir
};

// função que recebe uma URL e tenta transformar no src de embed
const pegaSrcDoEmbed = (url: string) => {

  // transforma tudo em lowercase pra facilitar regex e checks
  const lower = url.toLowerCase();

  // se for YouTube
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {

    // tenta pegar o ID do vídeo com vários jeitos de escrever
    const idDoVideo =
      lower.match(/[?&]v=([^&]+)/)?.[1] || // padrão watch?v=
      lower.match(/youtu\.be\/([^?&]+)/)?.[1] || // link curto youtu.be
      lower.match(/embed\/([^?&]+)/)?.[1]; // embed

    // se conseguiu pegar o ID
    if (idDoVideo) {
      // monta o link de embed padrão do YouTube
      return `https://www.youtube.com/embed/${idDoVideo}`;
    }
  }

  // se for TikTok
  if (lower.includes('tiktok.com')) {

    // pega o ID numérico do vídeo
    const idDoVideo = lower.match(/\/video\/(\d+)/)?.[1];

    // se achou o ID
    if (idDoVideo) {
      // link de embed do TikTok
      return `https://www.tiktok.com/embed/v2/${idDoVideo}`;
    }
  }

  // se não reconheceu nada, retorna null pra abrir link normal depois
  return null;
};

// componente que vai mostrar o vídeo (iframe) ou fallback
export const VideoEmbed = ({ url, preview = false }: Props) => {

  // tenta gerar o src do embed
  const srcDoEmbed = pegaSrcDoEmbed(url);

  // se não tem src válido, mostra um bloco que abre o link em nova aba
  if (!srcDoEmbed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-400">
        <a
          href={url} // link original
          target="_blank" // abre em nova aba
          rel="noreferrer" // segurança
          className="underline hover:text-white transition-colors"
        >
          Abrir edit
        </a>
      </div>
    );
  }

  // detecta se é TikTok (pra ajustar escala e posicionamento)
  const ehTikTok = url.toLowerCase().includes('tiktok.com');

  // retorna o iframe do vídeo
  return (
    <div className="overflow-hidden relative w-full h-full">
      <iframe
        title="edit-player" // título do iframe
        src={srcDoEmbed} // src do embed
        className="w-full h-full" // ocupa tudo do container
        frameBorder="0" // sem borda
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // permissões do player
        allowFullScreen // fullscreen liberado
        referrerPolicy="strict-origin-when-cross-origin" // segurança de referrer
        style={{
          // centraliza o iframe
          position: 'absolute',
          top: '50%',
          left: '50%',

          // aplica escala dependendo se é preview e TikTok
          transform:
            ehTikTok
              ? `translate(-50%, -50%) scale(${preview ? 1.35 : 1.15})`
              : `translate(-50%, -50%) scale(${preview ? 1.25 : 1.0})`,

          // ajusta tamanho no preview
          width: preview ? '140%' : '100%',
          height: preview ? '140%' : '100%',

          // ponto de origem da escala
          transformOrigin: 'center',

          // se for preview, desativa interação (clicks etc)
          pointerEvents: preview ? 'none' : 'auto',
        }}
      />
    </div>
  );
};
