# literallyme

Esse é um projeto pessoal que eu fiz pra me representar. A ideia foi criar uma página simples, bonita e fluida, com bastante atenção aos detalhes, microinterações e aquela estética minimalista inspirada no design da Apple.

O site junta coisas que eu gosto: séries, filmes, jogos, músicas e personagens. Alguns personagens têm vídeos que abrem em um modal. Também criei um player de música próprio usando arquivos locais, além de uma rolagem virtual suave.

Usei esse projeto principalmente para estudar e testar React, TypeScript e animações.

## Stack
- Vite + React + TypeScript  
- Tailwind CSS  
- Framer Motion  

## O que tem aqui
- Rolagem virtual (fake scroll) com barra lateral customizada  
- Cards de personagens com preview em vídeo e modal  
- Player de música com:
  - Arquivos locais na pasta `/audio`
  - Capas das músicas no `/public`
  - Avanço automático quando a música termina
  - Fade-out suave ao pausar
- Seções e listas com microinterações leves e discretas

## Estrutura do projeto
- Séries, filmes, personagens, jogos, musica e hobby em `content.ts`
- Músicas locais em `/audio`  
- Capas das músicas em `/public`  

## Músicas

- Coloquei os arquivos de áudio em /audio
- As capas ficam no /public (PNG ou JPG)

## Personagens

- A lista está em content.ts

- Dá pra usar vídeos do YouTube ou TikTok

- Os cards mostram um preview e o modal abre o vídeo completo

- Visual

- Animações e microinterações.

- Rolagem virtual

- A rolagem nativa é desativada

- O scroll é simulado via JavaScript


## Player de música

- Faz fade-out ao pausar

- Avança automaticamente ao final da faixa

- Mostra a capa com uma animação leve

## Vídeos

O modal abre o player completo

Acessibilidade e performance

Animações feitas com Framer Motion.

## Créditos

- Projeto, design e conteúdo feito por mim.
- Feito com React, TypeScript, Tailwind CSS, Vite e Framer Motion.