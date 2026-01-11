// importa o motion pra dar animação nos itens da lista
import { motion } from 'framer-motion';

// propriedades. só um array de textos que vão aparecer na tela
interface ListProps {
  itens: string[];
}

// componente que mostra uma lista com animações leves
export const MinimalList = ({ itens }: ListProps) => {
  return (
    
    <ul className="space-y-4">
      {/* percorre a lista e transforma cada item em um <li> animado */}
      {itens.map((item, index) => (
        <motion.li 
          // key serve pra identificar cada item da lista. (eu to usando isso pq não tem item repetido)
          key={item}
          // começa invisível e um pouco pra esquerda
          initial={{ opacity: 0, x: -10 }}
          // quando entra na tela, aparece e vai pra posição normal
          whileInView={{ opacity: 1, x: 0 }}
          // garante que a animação aconteça só uma vez
          viewport={{ once: true }}
          // é um delay para que cada item anime um pouqo depois do outro, só pra ficar mais bonito. tipo um efeito Cascata em sequência
          transition={{ delay: index * 0.08 }}
          // no hover, o item dá uma leve deslizada pra direita
          whileHover={{ x: 4 }}
          // estilos do texto
          className="text-xl font-light text-zinc-600 hover:text-zinc-900 transition-colors border-b border-zinc-100 pb-2 last:border-0 cursor-default"
        >
          {/* texto do item */}
          <span className="inline-block">{item}</span>

          {/* linha decorativa que cresce quando passa o mouse */}
          <motion.span 
            className="block h-px bg-zinc-900/60"
            // começa escondida
            initial={{ width: 0, opacity: 0 }}
            // no hover, aparece e cresce um pouco
            whileHover={{ width: '20%', opacity: 1 }}
            // controla a velocidade da animação da linha
            transition={{ duration: 0.25 }}
          />
        </motion.li>
      ))}
    </ul>
  );
};
