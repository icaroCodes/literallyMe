import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { favorites } from '../data/content';
import { VideoEmbed } from './VideoEmbed';

export const CharacterGrid = () => {
  const [selectedChar, setSelectedChar] = useState<typeof favorites.characters[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.characters.map((char) => (
          <motion.div
            key={char.name}
            layoutId={`card-${char.name}`}
            onClick={() => setSelectedChar(char)}
            className="group relative aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <div className="absolute inset-0">
              <VideoEmbed url={char.videoUrl} preview />
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/50 to-transparent text-white">
              <h3 className="font-medium text-lg">{char.name}</h3>
              <p className="text-sm opacity-80">{char.role}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <Play className="w-6 h-6 text-white fill-current" />
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedChar && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChar(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`card-${selectedChar.name}`}
              className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedChar(null); }}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <VideoEmbed url={selectedChar.videoUrl} />

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                 <h2 className="text-2xl font-bold text-white">{selectedChar.name}</h2>
                 <p className="text-white/80">{selectedChar.role}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
