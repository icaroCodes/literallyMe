type Props = {
  url: string;
  preview?: boolean;
};

const getEmbedSrc = (url: string) => {
  const lower = url.toLowerCase();

  // YouTube
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    const idMatch =
      lower.match(/[?&]v=([^&]+)/)?.[1] ||
      lower.match(/youtu\.be\/([^?&]+)/)?.[1] ||
      lower.match(/embed\/([^?&]+)/)?.[1];
    if (idMatch) {
      return `https://www.youtube.com/embed/${idMatch}`;
    }
  }

  // TikTok
  if (lower.includes('tiktok.com')) {
    const idMatch = lower.match(/\/video\/(\d+)/)?.[1];
    if (idMatch) {
      // TikTok embed endpoint
      return `https://www.tiktok.com/embed/v2/${idMatch}`;
    }
  }

  return null;
};

export const VideoEmbed = ({ url, preview = false }: Props) => {
  const src = getEmbedSrc(url);

  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-400">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-white transition-colors"
        >
          Abrir edit
        </a>
      </div>
    );
  }

  const isTikTok = url.toLowerCase().includes('tiktok.com');

  return (
    <div className="overflow-hidden relative w-full h-full">
      <iframe
        title="edit-player"
        src={src}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform:
            isTikTok
              ? `translate(-50%, -50%) scale(${preview ? 1.35 : 1.15})`
              : `translate(-50%, -50%) scale(${preview ? 1.25 : 1.0})`,
          width: preview ? '140%' : '100%',
          height: preview ? '140%' : '100%',
          transformOrigin: 'center',
          pointerEvents: preview ? 'none' : 'auto',
        }}
      />
    </div>
  );
};
