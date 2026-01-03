import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { favorites } from '../data/content';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentTrack = favorites.music[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % favorites.music.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + favorites.music.length) % favorites.music.length);
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 z-50 flex items-center gap-4"
    >
      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Music className="w-6 h-6 text-zinc-400" />
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
          onClick={() => setIsPlaying(!isPlaying)} 
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
