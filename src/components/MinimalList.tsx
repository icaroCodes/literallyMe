import { motion } from 'framer-motion';

interface ListProps {
  items: string[];
}

export const MinimalList = ({ items }: ListProps) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <motion.li 
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ x: 4 }}
          className="text-xl font-light text-zinc-600 hover:text-zinc-900 transition-colors border-b border-zinc-100 pb-2 last:border-0 cursor-default"
        >
          <span className="inline-block">{item}</span>
          <motion.span 
            className="block h-px bg-zinc-900/60"
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: '20%', opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </motion.li>
      ))}
    </ul>
  );
};
