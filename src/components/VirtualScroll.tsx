// Hooks do React: useState pra guardar estado que muda, useRef pra referência que não causa re-render e useEffect pra efeitos colaterais
import { useEffect, useRef, useState } from 'react';
// Motion do Framer Motion pra animar a barra de progresso lateral
import { motion } from 'framer-motion';

// tipo das props: filhos que o VirtualScroll vai renderizar
type Props = {
  children: React.ReactNode; // qualquer coisa que você colocar dentro do VirtualScroll
};

// Componente VirtualScroll: faz um scroll suave "fake" usando transform, não o scroll nativo
export const VirtualScroll = ({ children }: Props) => {

  // referência do container que vai receber o translate3d
  const conteudoRef = useRef<HTMLDivElement | null>(null);

  // posição atual animada (interpolada)
  const posRef = useRef(0);

  // posição alvo que queremos chegar
  const alvoRef = useRef(0);

  // guarda o id do requestAnimationFrame pra poder parar o loop
  const rafRef = useRef<number | null>(null);

  // progresso do scroll 0..1, usado na barra lateral
  const [progresso, setProgresso] = useState(0);

  // altura máxima que podemos rolar
  const [maxScroll, setMaxScroll] = useState(0);

  // flag que indica se estamos em tela pequena (mobile)
  const ehTelaPequenaRef = useRef(false);

  // estado reativo espelho da ref pra forçar re-render
  const [ehTelaPequena, setEhTelaPequena] = useState(false);

  // função utilitária pra limitar um valor entre min e max
  const limita = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  // mede o conteúdo e calcula o máximo de scroll
  const mede = () => {
    const alturaConteudo = conteudoRef.current?.scrollHeight || 0;
    const alturaJanela = window.innerHeight;
    setMaxScroll(Math.max(0, alturaConteudo - alturaJanela)); // nunca negativo
  };

  // aplica o translate3d no container
  const aplicaTransform = () => {
    if (!conteudoRef.current) return; // se não tiver container, sai
    if (ehTelaPequenaRef.current) return; // em mobile não aplicamos
    conteudoRef.current.style.transform = `translate3d(0,${-posRef.current}px,0)`; // GPU friendly
  };

  // detecta mudança de breakpoint (mobile)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const atualiza = () => {
      setEhTelaPequena(mq.matches); // atualiza estado pra re-render
      ehTelaPequenaRef.current = mq.matches; // atualiza ref pro loop
    };
    atualiza(); // inicializa valor
    mq.addEventListener('change', atualiza);
    return () => mq.removeEventListener('change', atualiza); // limpa listener
  }, []);

  // efeito principal que roda o loop, listeners e cleanup
  useEffect(() => {

    // se for tela pequena, desliga tudo e volta scroll nativo
    if (ehTelaPequena) {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return () => {};
    }

    // força scrollBehavior pra auto pra não dar suavização de âncora do browser
    document.documentElement.style.scrollBehavior = 'auto';

    // esconde scroll nativo do body
    document.body.style.overflow = 'hidden';

    // mede o conteúdo na próxima frame
    requestAnimationFrame(mede);

    // loop de animação que faz easing entre alvo e pos
    const frame = () => {
      posRef.current += (alvoRef.current - posRef.current) * 0.12; // easing simples
      if (Math.abs(alvoRef.current - posRef.current) < 0.5) posRef.current = alvoRef.current; // trava quando perto
      aplicaTransform(); // aplica no container
      setProgresso(maxScroll ? posRef.current / maxScroll : 0); // atualiza barra
      rafRef.current = requestAnimationFrame(frame); // agenda próximo frame
    };
    rafRef.current = requestAnimationFrame(frame); // inicia loop

    // recalcula dimensões no resize
    const onResize = () => requestAnimationFrame(mede);
    window.addEventListener('resize', onResize);

    // roda quando roda o mouse
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      alvoRef.current = limita(alvoRef.current + e.deltaY, 0, maxScroll);
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    // touch: captura start e move pra simular scroll
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const dy = touchStartY - y;
      alvoRef.current = limita(alvoRef.current + dy, 0, maxScroll);
      touchStartY = y;
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // teclado: seta pra cima/baixo e page up/down
    const onKey = (e: KeyboardEvent) => {
      const passo = 80; // tamanho do salto
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        alvoRef.current = limita(alvoRef.current + passo, 0, maxScroll);
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        alvoRef.current = limita(alvoRef.current - passo, 0, maxScroll);
      }
    };
    window.addEventListener('keydown', onKey);

    // links de âncora: anima scroll até o alvo
    const onAnchor = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const para = rect.top + posRef.current;
      alvoRef.current = limita(para - 80, 0, maxScroll); // -80 pra compensar header fixo
    };
    document.addEventListener('click', onAnchor);

    // observa mudanças no conteúdo pra recalcular maxScroll
    const ro = new ResizeObserver(() => requestAnimationFrame(mede));
    if (conteudoRef.current) ro.observe(conteudoRef.current);

    // cleanup: remove tudo e reverte estilos
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onAnchor);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

  }, [ehTelaPequena, maxScroll]); // roda de novo se mudar o tamanho da tela ou maxScroll

  // Renderiza o conteúdo e, se não for mobile, a barra de progresso lateral
  return (
    <>
      {/* container do conteúdo que vai receber o transform */}
      <div ref={conteudoRef} className="will-change-transform">
        {children} {/* filhos do VirtualScroll */}
      </div>

      {/* barra lateral de progresso */}
      {!ehTelaPequena && (
        <div className="fixed right-0 top-0 z-50 h-screen w-2.5 bg-black/5">
          <motion.div
            className="w-full rounded-full"
            style={{ backgroundColor: '#b7d5e5' }}
            initial={{ height: 0 }}
            animate={{ height: `${Math.round(progresso * 100)}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
      )}
    </>
  );
};
