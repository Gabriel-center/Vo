# Leia isto todas as manhãs

Uma história em oito manhãs.

A Bia, de 27 anos, mora com a avó, Lúcia, que está perdendo a memória. Toda noite ela reescreve uma página web para a avó ler quando acordar. **O site é essa página**, e quem lê é você, no lugar da Lúcia.

## Como abrir

Dê dois cliques em `index.html`. Não precisa de servidor nem de internet: as fontes estão na pasta e a música é sintetizada pelo próprio navegador. Ligue o som.

Para publicar, é só subir a pasta inteira em qualquer hospedagem estática (Netlify, GitHub Pages, Vercel, Cloudflare Pages…).

## O que a forma faz

| Mecânica | O que ela conta |
|---|---|
| **Dormir** substitui a página. Não existe voltar. | A Bia apaga cada versão ao escrever a seguinte. No fim, o leitor descobre que é a única pessoa que viu todas. |
| **Palavras embaçadas.** Segurando em cima, elas voltam devagar e depois somem de novo. Algumas não voltam nunca. | O esforço de lembrar. Você sabe o nome do filho, mas a página não deixa você ver. |
| **A tipografia muda a cada estágio.** Serifada e caprichada, depois Atkinson Hyperlegible (fonte criada para baixa visão), depois letreiro em caixa alta. | A doença avança e o cuidado da Bia se adapta. No último dia a letra volta ao tamanho normal, porque não é mais pra ela. |
| **Texto grande pra vó, texto pequeno pra Bia.** | Dois leitores na mesma página. A vó leu a parte que "não precisava ler". |
| **A valsa cresce enquanto as palavras somem.** 4, 8, 12 e 16 compassos. | A memória musical resiste. Os pontinhos mostram o que se sabe e o que falta. |
| **O caderno.** O que você escreve volta depois: na voz da Bia e, mais tarde, numa carta da Lúcia, que não reconhece a própria letra. | As suas palavras viram memórias dela. |
| **Datas reais.** A história começa no dia em que você abre o site e termina mais de um ano no seu futuro. | A ficção entra no seu calendário. |
| **Relógio real.** Se você abrir de noite, a Bia comenta. | |
| **Aba do navegador.** Se você trocar de aba, o título vira "Vó? Volta aqui.", e o texto muda conforme o dia. | |
| **Final.** A última atualização é sua: o que você lembra dela vira a página definitiva, com o tempo que você passou lendo. | |

Duração: cerca de 20 a 30 minutos. O progresso fica salvo no navegador: dá pra fechar e continuar outro dia.

## Atalhos (para testar)

- `index.html?recomecar` apaga tudo e começa do zero (também tem um link discreto no final)
- `index.html?dia=6` pula direto para o dia 6

## Estrutura

```
index.html
css/
  fonts.css      fontes locais
  style.css      layout + os 6 estágios visuais
js/
  story.js       TODO o texto da história e a estrutura de cada dia (edite aqui)
  text.js        conversor das marcações {f:...}, {x:...}, ~~...~~, **...**
  music.js       a valsa (composição original, Web Audio, sem arquivos de som)
  main.js        motor: dias, salvamento, esquecimento, noite, final
fonts/           Lora, Atkinson Hyperlegible, Caveat (licença SIL OFL)
```

O texto fica em `story.js` (e não em `.json`) para o site abrir direto do arquivo, sem servidor. As marcações estão explicadas no topo desse arquivo.
