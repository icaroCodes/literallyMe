// Importa o motion para animações de entrada suave nos elementos
import { motion } from 'framer-motion';
// Importa tipo ReactNode para tipar corretamente os filhos do componente
import { type ReactNode } from 'react';

// Props do componente: título, conteúdo, id opcional e classe extra para flexibilidade
interface SectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

// Componente Section: encapsula título, separador e conteúdo com animações padrão
export const Section = ({ title, children, id, className = "" }: SectionProps) => {
  return (
    // Seção com padding vertical e possibilidade de classes adicionais
    <section id={id} className={`py-24 ${className}`}>
      {/* Cabeçalho animado: slide da esquerda com fade-in para chamar atenção ao entrar na viewport */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mb-12 tracking-tight"
      >
        {title}
      </motion.h2>
      {/* Linha decorativa com animação de largura para separar visualmente as seções */}
      <motion.div 
        className="h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 mb-10"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '100%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      {/* Conteúdo da seção com leve animação de aparição para fluidez */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
};
