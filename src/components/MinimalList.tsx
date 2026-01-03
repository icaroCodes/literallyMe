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
          transition={{ delay: index * 0.1 }}
          className="text-xl font-light text-zinc-600 hover:text-zinc-900 transition-colors border-b border-zinc-100 pb-2 last:border-0 cursor-default"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
};
