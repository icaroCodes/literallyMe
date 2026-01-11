// hooks do React pra guardar estado, tipo quem tá clicado e tal
import { useState } from 'react';

// pra jogar o modal direto no body e ficar por cima de tudo
import { createPortal } from 'react-dom';

// animação do Framer Motion pra entrada/saída e transições suaves
import { motion, AnimatePresence } from 'framer-motion';

// ícones que vamos usar no card e no botão de fechar
import { X, Play } from 'lucide-react';

// dados dos personagens que vamos mostrar
import { favorites } from '../data/content';

// componente que renderiza vídeo (YouTube, TikTok)
import { VideoEmbed } from './VideoEmbed';

export const GridDePersonagens = () => {

  // guarda qual personagem tá selecionado, null significa nenhum modal aberto
  const [personagemSelecionado, setPersonagemSelecionado] =
    useState<typeof favorites.personagens[0] | null>(null);

  return (
    <>
      {/* grid com os cards de todos os personagens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {/* percorre todos os personagens pra criar os cards */}
        {favorites.personagens.map((personagem) => (

          <motion.div
            key={personagem.name} // key única, usando o nome do personagem
            layoutId={`card-${personagem.name}`} // conecta animação do card com o modal
            onClick={() => setPersonagemSelecionado(personagem)} // abre o modal ao clicar
            className="group relative aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }} // zoom leve no hover
            transition={{ type: 'spring', stiffness: 200, damping: 18 }} // animação suave
          >

            {/* preview do vídeo que fica no card */}
            <div className="absolute inset-0">
              <VideoEmbed url={personagem.videoUrl} preview />
            </div>

            {/* rodapé do card com nome e descrição */}
            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/50 to-transparent text-white">
              <h3 className="font-medium text-lg">{personagem.name}</h3>
              <p className="text-sm opacity-80">{personagem.description}</p>
            </div>

            {/* overlay com ícone de play que aparece só no hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* portal que vai jogar o modal direto no body */}
      {createPortal(

        <AnimatePresence>
          {/* só mostra o modal se tiver personagem selecionado */}
          {personagemSelecionado && (

            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center px-4"
              initial={{ opacity: 0 }} // começa invisível
              animate={{ opacity: 1 }} // aparece
              exit={{ opacity: 0 }} // some quando fecha
            >

              {/* fundo escuro atrás do modal */}
              <motion.div
                onClick={() => setPersonagemSelecionado(null)} // clicar fora fecha o modal
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* card do modal com animação ligada ao card */}
              <motion.div
                layoutId={`card-${personagemSelecionado.name}`} // anima do card pro modal
                initial={{ y: 24, opacity: 0, scale: 0.98 }} // começa menor e deslocado
                animate={{ y: 0, opacity: 1, scale: 1 }} // entra no lugar certinho
                exit={{ y: 24, opacity: 0, scale: 0.98 }} // sai suave
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl"
              >

                {/* botão pra fechar o modal */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // impede de fechar clicando no fundo por acidente
                    setPersonagemSelecionado(null); // fecha o modal
                  }}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* vídeo do personagem em tamanho real */}
                <VideoEmbed url={personagemSelecionado.videoUrl} />

                {/* informações do personagem no rodapé do modal */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-2xl font-bold text-white">
                    {personagemSelecionado.name}
                  </h2>
                  <p className="text-white/80">
                    {personagemSelecionado.description}
                  </p>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,

        // joga tudo direto no body
        document.body
      )}
    </>
  );
};
