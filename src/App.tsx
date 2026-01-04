import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from './components/Section';
import { MinimalList } from './components/MinimalList';
import { CharacterGrid } from './components/CharacterGrid';
import { MusicPlayer } from './components/MusicPlayer';
import { favorites } from './data/content';
import { VirtualScroll } from './components/VirtualScroll';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-zinc-50 selection:bg-zinc-900 selection:text-white pb-32">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.h1
              layoutId="logo"
              className="text-4xl font-medium tracking-tight text-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              IcaroDev
            </motion.h1>
          </motion.div>
        ) : (
          <>
            <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex items-center justify-between mix-blend-difference text-zinc-50">
               <motion.div
                 layoutId="logo"
                 className="text-lg font-medium tracking-tight"
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               >
                 IcaroDev
               </motion.div>
               
               <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                 <a href="#about" className="hover:opacity-70 transition-opacity">Sobre</a>
                 <a href="#characters" className="hover:opacity-70 transition-opacity">Personagens</a>
               </nav>
            </header>

            <VirtualScroll>
            <main className="pt-32 px-6 max-w-4xl mx-auto">
              <motion.div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full"
                style={{ background: 'radial-gradient(closest-side, rgba(24,24,27,0.06), transparent 70%)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl mb-32"
              >
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8 text-zinc-900">
                  As coisas que eu mais gosto.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                  Minhas Séries Favoritas, Filmes, Jogos, Músicas e Personagens.
                </p>
              </motion.div>

              <Section title="Sobre Mim" id="about">
                <p className="text-xl leading-relaxed text-zinc-600 font-light max-w-2xl">
                  Meu nome é Ícaro, tenho 12 anos e estudo programação. Atualmente, estou me preparando para me tornar um desenvolvedor Web Full Stack. Este projeto tem como objetivo testar, pela primeira vez, o uso do Framer Motion e do TypeScript.
                </p>
                <div className="mt-8 pt-8 border-t border-zinc-200">
                    <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-4">Hobby</h3>
                    <p className="text-xl font-light">{favorites.hobby}</p>
                </div>
              </Section>

              <Section title="Séries Favoritas" id="favorites">
                <div className="grid md:grid-cols-2 gap-12">
                   <div>
                       <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-6">Bons para assitir</h3>
                       <MinimalList items={favorites.series} />
                   </div>
                </div>
              </Section>

              <Section title="Filmes Favoritos">
                 <div className="grid md:grid-cols-2 gap-12">
                   <div>
                       <MinimalList items={favorites.movies} />
                   </div>
                </div>
              </Section>

               <Section title="Jogos Favoritos">
                 <div className="grid md:grid-cols-2 gap-12">
                   <div>
                       <MinimalList items={favorites.games} />
                   </div>
                </div>
              </Section>

              <Section title="Personagens" id="characters">
                <p className="text-zinc-500 mb-8 font-light">
                  Personagens extremamente interessantes.
                </p>
                <CharacterGrid />
              </Section>

            </main>
            </VirtualScroll>
            
            <MusicPlayer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
