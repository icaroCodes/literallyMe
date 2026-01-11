// Importa hooks: eu usei useState pra guardar dados que mudam (ex: loading) e useEffect pra rodar tarefas quando o componente entra, muda ou sai da tela (ex: timers)
import { useState, useEffect } from 'react';

// importa componentes do Framer Motion pra animações
// AnimatePresence cuida da transição entre componentes
// motion permite animar div, h1, etc
import { AnimatePresence, motion } from 'framer-motion';

// importa o componente de seção
import { Section } from './components/Section';

// importa uma lista
import { MinimalList } from './components/MinimalList';

// importa o grid dos personagens separado da lógica principal
import { GridDePersonagens } from './components/CharacterGrid'

// importa o player de música
import { MusicPlayer } from './components/MusicPlayer';

// importa os dados prontos (conteúdo separado do visual) Bom para testes
import { favorites } from './data/content';

// importa um virtualScroll(FakeScroll)
import { VirtualScroll } from './components/VirtualScroll';


// função principal do app
function App() {

  // cria o estado loading
  // começa como true pra mostrar o loader primeiro
  const [loading, setLoading] = useState(true);

  // useEffect roda quando o componente aparece
  useEffect(() => {

    // cria um timer pra simular carregamento
    const timer = setTimeout(() => {

      // depois do tempo, desliga o loading
      setLoading(false);

    }, 1000); 
    // 1 segundo, tomei essa decisão porque não é muito, tambem não é pouco.

    // se o componente sumir antes do tempo acabar
    return () => clearTimeout(timer);  
    // limpa o timer pra evitar erro

  }, []); 
  // array vazio faz isso rodar só uma vez


  
  return (

    // div principal que segura tudo
    <div className="min-h-screen w-full relative overflow-hidden bg-zinc-50 selection:bg-zinc-900 selection:text-white pb-32">

      {/* controla a animação de entrada e saída. O modo wait serve para esperar, literalmente kkkkkkk*/}
      <AnimatePresence mode="wait">

        {/* se loading for true */}
        {loading ? (

          // tela de loading ocupando a tela inteira
          <motion.div
            key="loader" // chave pra animação funcionar
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50"
            exit={{ opacity: 0 }} // quando sair, some devagar
            transition={{ duration: 0.5, ease: "easeInOut" }} // controla suavidade
          >

            {/* texto central animado */}
            <motion.h1
              layoutId="logo" // conecta com o texto do header
              className="text-4xl font-medium tracking-tight text-zinc-900"
              initial={{ opacity: 0, y: 20 }} // começa invisível e deslocado
              animate={{ opacity: 1, y: 0 }} // aparece e vai pro lugar
              transition={{ duration: 0.8, ease: "easeOut" }} // tempo da animação
            >
              {/* texto que aparece */}
              IcaroCodes
            </motion.h1>

          </motion.div>

        ) : (
          // se loading for false, entra o site

          <>
            {/* header fixo no topo */}
            <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex items-center justify-between mix-blend-difference text-zinc-50">

              {/* mesmo texto do loader pra manter a animação */}
              <motion.div
                layoutId="logo" // liga com o loader
                className="text-lg font-medium tracking-tight"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // suavidade
              >
                {/* meu nome */}
                IcaroCodes
              </motion.div>

              {/* menu de navegação */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {/* link pra seção sobre */}
                <a href="#about" className="hover:opacity-70 transition-opacity">
                  Sobre
                </a>

                {/* link pra personagens */}
                <a href="#characters" className="hover:opacity-70 transition-opacity">
                  Personagens
                </a>
              </nav>

            </header>

            {/* scroll que controla a rolagem */}
            <VirtualScroll>

              {/* área principal do conteúdo */}
              <main className="pt-32 px-6 max-w-4xl mx-auto">

                {/* círculo decorativo no fundo */}
                <motion.div
                  className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full"
                  style={{
                    background: 'radial-gradient(closest-side, rgba(24,24,27,0.06), transparent 70%)'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }} // começa menor
                  animate={{ opacity: 1, scale: 1 }} // cresce e aparece
                  transition={{ duration: 1.2, ease: 'easeOut' }} // suavidade
                />

                {/* bloco inicial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // começa escondido
                  animate={{ opacity: 1, y: 0 }} // aparece
                  transition={{ delay: 0.4, duration: 0.8 }} // atraso leve
                  className="max-w-3xl mb-32"
                >

                  {/* título grande */}
                  <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8 text-zinc-900">
                    As coisas que eu mais gosto.
                  </h1>

                  {/* descrição do site */}
                  <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                    Minhas Séries Favoritas, Filmes, Jogos, Músicas e Personagens.
                  </p>

                </motion.div>

                {/* seção sobre mim */}
                <Section title="Sobre Mim" id="about">

                  {/* texto de apresentação */}
                  <p className="text-xl leading-relaxed text-zinc-600 font-light max-w-2xl">
                    Meu nome é Ícaro, tenho 12 anos e estudo programação. Atualmente, estou me preparando para me tornar um desenvolvedor Web Full Stack. Este projeto tem como objetivo testar, pela primeira vez, o uso do Framer Motion e do TypeScript.
                  </p>

                  {/* hobby */}
                  <div className="mt-8 pt-8 border-t border-zinc-200">

                    {/* título pequeno */}
                    <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-4">
                      Hobby
                    </h3>

                    {/* hobby vindo dos dados */}
                    <p className="text-xl font-light">
                      {favorites.hobby}
                    </p>

                  </div>
                </Section>

                {/* seção de séries */}
                <Section title="Séries Favoritas" id="favorites">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>

                      {/* subtítulo */}
                      <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-6">
                        Bons pra assistir
                      </h3>

                      {/* lista de séries */}
                      <MinimalList itens={favorites.series} />

                    </div>
                  </div>
                </Section>

                {/* seção de filmes */}
                <Section title="Filmes Favoritos">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <MinimalList itens={favorites.filmes} />
                    </div>
                  </div>
                </Section>

                {/* seção de jogos */}
                <Section title="Jogos Favoritos">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <MinimalList itens={favorites.jogos} />
                    </div>
                  </div>
                </Section>

                {/* seção de personagens */}
                <Section title="Personagens" id="characters">

                  {/* texto introdutório */}
                  <p className="text-zinc-500 mb-8 font-light">
                    Personagens extremamente interessantes.
                  </p>

                  {/* grid de personagens */}
                  <GridDePersonagens />

                </Section>

              </main>
            </VirtualScroll>

            {/* player de música */}
            <MusicPlayer />

          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// exporta o App pra ser usado no projeto
export default App;
