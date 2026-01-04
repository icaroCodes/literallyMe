import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ title, children, id, className = "" }: SectionProps) => {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mb-12 tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        className="h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 mb-10"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '100%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
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
