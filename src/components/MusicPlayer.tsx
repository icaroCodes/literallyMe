import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      title: 'Nuts',
      artist: 'Lil Peep',
      src: new URL('../../audio/Nuts.mp3', import.meta.url).href,
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

  const currentTrack = tracks[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 1;
    a.play().catch(() => {});
    setIsPlaying(true);
  };

  const fadeOutPause = () => {
    const a = audioRef.current;
    if (!a) return;
    const duration = 600;
    const steps = 12;
    const stepTime = duration / steps;
    const volStep = a.volume / steps;
    let i = 0;
    const interval = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(interval);
        return;
      }
      a.volume = Math.max(0, a.volume - volStep);
      i++;
      if (i >= steps) {
        clearInterval(interval);
        a.pause();
        a.volume = 1;
        setIsPlaying(false);
      }
    }, stepTime);
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = currentTrack.src;
    a.currentTime = 0;
    if (isPlaying) {
      play();
    }
  }, [currentTrackIndex]);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 z-50 flex items-center gap-4"
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleEnded}
      />
      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
        {currentTrack.cover ? (
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <Music className="w-6 h-6 text-zinc-400" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{currentTrack.title}</h3>
        <p className="text-xs text-zinc-500 truncate">{currentTrack.artist}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handlePrev} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={() => {
            if (isPlaying) {
              fadeOutPause();
            } else {
              play();
            }
          }} 
          className="p-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors shadow-lg active:scale-95"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current pl-0.5" />}
        </button>
        <button onClick={handleNext} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
