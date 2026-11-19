/*
 * LEIA ISTO TODAS AS MANHÃS
 * Todo o texto da história fica aqui.
 *
 * Marcações dentro dos textos:
 *   {f:palavra}   palavra embaçada; o leitor segura em cima dela pra lembrar
 *   {x:palavra}   palavra perdida; ela não volta
 *   ~~texto~~     texto riscado (a Bia apagou, mas dá pra ver)
 *   **texto**     negrito
 *   {morte}       data da morte (calculada a partir da data real do leitor)
 *
 * Tipos de bloco: h1, h2, p, small, big, list, cards, music, notes, echo,
 * clock, letter, final, hint.
 *
 * É um arquivo .js (e não .json) de propósito: assim o site abre com dois
 * cliques no index.html, sem precisar de servidor.
 */

window.STORY = {
  title: "Leia isto todas as manhãs",

  days: [
    /* ───────────────────────── DIA 1 ───────────────────────── */
    {
      offset: 0, at: "22:40", stage: 1,
      title: "Bom dia, vó", away: "Vó? Volta aqui.",
      blocks: [
        { t: "h1", x: "Bom dia, vó." },
        { t: "clock" },
        { t: "p", x: "Se a senhora está lendo isso, está tudo bem. Está em casa, no apartamento da Vila Mariana, o mesmo de sempre. A janela do quarto está aberta, do jeito que a senhora gosta." },
        { t: "p", x: "Eu fiz esta página pra senhora ler quando acordar. A médica disse que ajuda ter tudo num lugar só, sempre igual. Então é isso: um lugar só. Eu atualizo toda noite, depois que a senhora dorme." },

        { t: "h2", x: "Quem é a senhora" },
        { t: "p", x: "A senhora se chama **Lúcia Aparecida Moraes**. Tem 81 anos. Deu aula de piano por {f:quarenta} anos, primeiro no conservatório e depois ali na sala, pra metade das crianças do bairro. Metade não, exagero. Pra muitas." },
        { t: "p", x: "Gosta de café sem açúcar, de janela aberta mesmo no frio e de reclamar da novela sem desligar a televisão." },

        { t: "h2", x: "Quem é quem" },
        { t: "cards", items: [
          { n: "Bia", c: "#c2603f", x: "Sou eu. Sua neta. Tenho 27 anos e moro aqui com a senhora desde {f:março}. Às vezes a senhora me chama de Helena. A Helena era sua irmã. Dizem que eu tenho o nariz dela." },
          { n: "Marcos", c: "#4f7a8a", x: "Seu filho. Meu pai. Mora em Curitiba e liga todo domingo, às sete. Ele fala alto no telefone. Não é briga, é o jeito dele." },
          { n: "Antônio", c: "#8a7a52", x: "Seu marido. Meu avô. ~~Está viajando, volta logo.~~ Ele morreu em agosto de 2019, dormindo. Eu tentei escrever do outro jeito. Não deu. A senhora procurava por ele na casa inteira." },
          { n: "Pitanga", c: "#e08a2c", x: "A gata. Laranja, gorda, sem educação. Não precisa dar comida pra ela, mesmo que ela jure que precisa." },
          { n: "Seu Jair", c: "#6b8a4f", x: "O porteiro. Bigode, rádio ligado no futebol. Se precisar de qualquer coisa e eu não estiver, é com ele." }
        ]},

        { t: "h2", x: "O seu dia" },
        { t: "list", items: [
          "Remédios às 8h: estão na caixinha azul, separados por dia.",
          "O café já está na garrafa térmica.",
          "Eu trabalho até as 18h. Volto sempre.",
          "A chave da porta fica comigo. Não é castigo, vó. É só por enquanto."
        ]},

        { t: "h2", x: "A nossa música" },
        { t: "p", x: "Quando eu era pequena, a senhora tocava uma valsa pra mim, sempre a mesma, e nunca me disse o nome. Eu só lembro o começo. Coloquei aqui do jeito que eu lembro. A senhora sabe o resto. Se lembrar, toca pra mim?" },
        { t: "music", bars: 4 },

        { t: "h2", x: "Caderno" },
        { t: "p", x: "Escreva aqui o que quiser guardar de hoje. Eu leio à noite, quando atualizo a página." },
        { t: "notes" },

        { t: "hint", x: "Quando terminar, aperte o botão aqui embaixo. Amanhã esta página vai estar diferente: eu reescrevo tudo, toda noite." }
      ]
    },

    /* ───────────────────────── DIA 2 ───────────────────────── */
    {
      offset: 1, at: "23:15", stage: 1, skip: "No dia seguinte",
      title: "Bom dia, vó", away: "Vó? Volta aqui.",
      blocks: [
        { t: "h1", x: "Bom dia, vó." },
        { t: "p", x: "Ontem foi um dia bom. A senhora riu da Pitanga tentando pegar uma mosca e lembrou o nome do Seu Jair sozinha. Eu anoto essas coisas agora. Anoto tudo." },
        { t: "echo", from: 0,
          yes: "No caderno, a senhora escreveu: “{note}”. Li três vezes antes de dormir.",
          no: "O caderno ficou em branco ontem. Tudo bem, ele espera a senhora." },

        { t: "h2", x: "A música" },
        { t: "p", x: "Aconteceu uma coisa. Ontem, depois do jantar, a senhora sentou no piano sem ninguém pedir e tocou a valsa. Foi mais longe do que eu lembrava. Fiquei quietinha na porta pra não atrapalhar. Coloquei aqui o pedaço novo." },
        { t: "music", bars: 8 },
        { t: "p", x: "Ainda não acaba. Eu perguntei como acabava e a senhora disse: “Acaba quando acaba.” Muito obrigada, vó. Muito esclarecedor." },

        { t: "h2", x: "Quem é a senhora" },
        { t: "p", x: "Igual a ontem. Vou repetir todo dia, não se incomode." },
        { t: "p", x: "**Lúcia Aparecida Moraes.** 81 anos. Professora de piano. Café sem açúcar. Janela aberta." },

        { t: "h2", x: "Quem é quem" },
        { t: "cards", items: [
          { n: "Bia", c: "#c2603f", x: "Sua neta. Sou eu. Moro aqui com a senhora." },
          { n: "Marcos", c: "#4f7a8a", x: "Seu filho. Liga domingo, às sete. Fala alto." },
          { n: "Antônio", c: "#8a7a52", x: "Seu marido. Morreu em agosto de 2019. A senhora não perguntou por ele ontem. Achei que a senhora ia gostar de saber que não perguntou." },
          { n: "Pitanga", c: "#e08a2c", x: "A gata. Já comeu. Está mentindo." },
          { n: "Seu Jair", c: "#6b8a4f", x: "O porteiro. A senhora lembrou o nome dele sozinha, viu?" }
        ]},

        { t: "h2", x: "O seu dia" },
        { t: "list", items: [
          "Remédios às 8h, caixinha azul.",
          "Café na garrafa térmica.",
          "Eu volto às 18h."
        ]},

        { t: "h2", x: "Caderno" },
        { t: "notes" }
      ]
    },

    /* ───────────────────────── DIA 3 ───────────────────────── */
    {
      offset: 9, at: "03:02", stage: 2, skip: "Oito dias depois",
      title: "Bom dia, vó", away: "Vó, cadê a senhora?",
      blocks: [
        { t: "h1", x: "Bom dia, vó." },
        { t: "p", x: "Está tudo bem. A senhora está em casa." },
        { t: "p", x: "Eu sei que tem uma coisa diferente na porta. É uma tranca nova, lá em cima. Coloquei {f:terça}. Não é castigo." },
        { t: "p", x: "Na segunda, de madrugada, a senhora saiu pra comprar pão {f:pro vô}. De camisola. O Seu Jair achou a senhora na esquina da padaria, que estava fechada, porque eram três da manhã. A senhora disse pra ele que o Antônio gostava do pão {f:quentinho} e que já estava atrasada." },
        { t: "p", x: "Não estou brava. Juro. Estou escrevendo isso às três da manhã também, então quem sou eu." },
        { t: "echo", from: 1,
          yes: "Li o caderno: “{note}”. Guardei junto com o resto.",
          no: "" },

        { t: "h2", x: "Se acordar e eu não estiver aqui" },
        { t: "list", items: [
          "Eu estou no trabalho. Volto às 18h.",
          "O Seu Jair está lá embaixo. Interfone, botão 0.",
          "Não precisa comprar pão. Tem pão.",
          "~~Remédios às 8h, caixinha azul.~~ ~~Remédios às 8h, caixinha azul.~~ Remédios às 8h, caixinha azul."
        ]},

        { t: "h2", x: "Quem é quem" },
        { t: "cards", items: [
          { n: "Bia", c: "#c2603f", x: "Sua neta. Sou eu." },
          { n: "Marcos", c: "#4f7a8a", x: "Seu filho. Meu pai. Disse que vem no {f:mês que vem}." },
          { n: "Antônio", c: "#8a7a52", x: "Seu marido. Meu avô. Morreu em agosto de 2019. Não precisa comprar pão pra ele. Desculpa, vó." },
          { n: "Pitanga", c: "#e08a2c", x: "A gata. Agora dorme no seu pé." }
        ]},

        { t: "h2", x: "A música" },
        { t: "music", bars: 8 },
        { t: "p", x: "Nada de novo essa semana. Eu toquei o começo pra senhora e a senhora disse que eu estava correndo demais. Estava mesmo." },

        { t: "small", x: "Eu reescrevo esta página toda noite e toda noite tenho medo de errar alguma coisa. Uma palavra errada e a senhora passa o dia achando que é 1987." },

        { t: "h2", x: "Caderno" },
        { t: "notes" }
      ]
    },

    /* ───────────────────────── DIA 4 ───────────────────────── */
    {
      offset: 34, at: "01:47", stage: 3, skip: "Quase um mês depois",
      title: "Bom dia", away: "Vó?",
      blocks: [
        { t: "small", x: "Mudei a página. Letra maior, menos coisa. A médica disse que é melhor assim." },
        { t: "h1", x: "Bom dia, vó. A senhora está em casa." },
        { t: "p", x: "Eu sou a Bia. Sua neta." },
        { t: "p", x: "Domingo o {x:Marcos} veio de Curitiba. Seu filho. Meu pai. A senhora chamou ele de Antônio a tarde inteira, e ele deixou. Depois ele chorou no carro. A senhora não viu. Tudo bem a senhora não ter visto." },
        { t: "p", x: "Mas antes de ele ir embora, a senhora tocou a valsa. E foi mais longe. Ele ficou parado no meio da sala com a chave do carro na mão e disse: “Essa ela tocava quando eu era pequeno.”" },
        { t: "p", x: "Então a música é mais velha que eu. Eu achava que era minha." },
        { t: "music", bars: 12 },
        { t: "echo", from: 2,
          yes: "No caderno: “{note}”. Eu guardo tudo numa pasta. A senhora não sabe, mas tem uma pasta.",
          no: "" },

        { t: "h2", x: "Quem é quem" },
        { t: "cards", items: [
          { n: "Bia", c: "#c2603f", x: "Sua neta. Eu." },
          { n: "{f:Marcos}", c: "#4f7a8a", x: "Seu filho." },
          { n: "Pitanga", c: "#e08a2c", x: "A gata." }
        ]},
        { t: "p", x: "Tirei o cartão do vô. A senhora parou de procurar por ele. Não sei se isso é bom." },

        { t: "list", items: [
          "Remédios às 8h.",
          "Eu volto às 18h.",
          "Seu Jair: interfone, botão 0."
        ]},

        { t: "h2", x: "Caderno" },
        { t: "notes" }
      ]
    },

    /* ───────────────────────── DIA 5 ───────────────────────── */
    {
      offset: 96, at: "04:20", stage: 4, skip: "Dois meses depois",
      title: "Bom dia.", away: "A Bia volta às 18h.",
      blocks: [
        { t: "big", lines: [
          "Bom dia.",
          "A senhora está em casa.",
          "A senhora está segura.",
          "Eu sou a Bia.",
          "Eu volto às 18h."
        ]},
        { t: "music", bars: 12, label: "A sua música" },
        { t: "small", spacer: true, x: "(Esta parte é pra mim. A senhora não precisa ler.)\n\nFaz três meses que eu escrevo isto. Antes eu escrevia páginas. Agora são cinco frases e eu demoro mais pra escrever do que demorava antes. Tranquei a matrícula do mestrado. Não contei pro pai.\n\nA senhora ainda tem dias bons. Terça passada me chamou de Bia o dia inteiro, e eu fiquei tão feliz que fui chorar no banheiro, que é o que eu faço agora com qualquer sentimento.\n\nA Pitanga dorme no seu pé toda noite. Ela sabe de alguma coisa.\n\nTirei o caderno da página. Agora ele fica em cima do piano, de papel, do lado das partituras." }
      ]
    },

    /* ───────────────────────── DIA 6 ───────────────────────── */
    {
      offset: 151, at: "05:58", stage: 4, skip: "Quase dois meses depois",
      title: "Bom dia, vó", away: "Lúcia",
      blocks: [
        { t: "big", lines: [
          "Bom dia, vó.",
          "A senhora está em casa.",
          "Eu sou a Bia."
        ]},
        { t: "small", x: "Vó, eu achei uma coisa hoje de madrugada. No seu caderno de partituras, escrito a lápis, com a sua letra de antes. Copiei aqui igualzinho, com os erros. Não mudei nada." },
        { t: "letter",
          parts: [
            "Bia.",
            "Hoje acordei sabendo. Não sei quanto tempo dura, então vou escrever rápido, que a mão já não obedece direito.",
            "Eu leio a sua página todo dia. Tem dia que eu entendo e tem dia que eu só olho as letras, que estão ficando grandes como as de cartilha. Eu sei porque estão grandes. Obrigada. Não era você que tinha que fazer isso, e você fez.",
            "Tem dia que eu finjo que lembro, pra você ficar contente. Me desculpe. Tem dia que eu finjo que esqueci, pra você não ficar triste porque eu lembrei do Antônio. Desses eu não peço desculpa.",
            { echo: "first",
              yes: "Achei no caderno umas palavras que dizem que são minhas: “{note}”. Não lembro de ter escrito. Não parece a minha letra. Mas é bonito. Deve ser meu.",
              no: "Achei o caderno em branco. Sempre gostei de página em branco. É onde a música começa." },
            "A valsa não tem nome porque nunca teve fim. Comecei quando o seu ~~avô~~ pai nasceu e nunca terminei. Sempre achei que tinha tempo. Terminei agora, está aqui embaixo. Toca devagar. Você sempre corre.",
            "E pode trancar a porta, se precisar. Mas volta pro seu mestrado. Isso não é pedido, é ordem de professora."
          ],
          sign: "Lúcia"
        },
        { t: "music", bars: 16, label: "A valsa, inteira" },
        { t: "small", x: "A senhora estava dormindo quando eu achei. Hoje de manhã me chamou de Helena. Tudo bem. Agora eu sei que a senhora ainda está aí dentro." }
      ]
    },

    /* ───────────────────────── DIA 7 ───────────────────────── */
    {
      offset: 243, at: "21:10", stage: 5, skip: "Três meses depois",
      title: "BOM DIA", away: "…",
      blocks: [
        { t: "big", lines: [
          "Bom dia, vó.",
          "A senhora está na Casa Girassol.",
          "Aqui é seguro.",
          "A Bia vem domingo."
        ]},
        { t: "music", bars: 16, label: "A sua valsa" },
        { t: "small", spacer: true, x: "Eu ainda atualizo a página. A senhora não lê mais. A Rose, a enfermeira, me contou que a senhora olha a tela, sorri e devolve o tablet. Mas eu atualizo toda noite. É a hora em que eu lembro da senhora com mais força.\n\nTem um piano velho na sala de visitas da Casa Girassol, desafinado. A Rose disse que a senhora toca toda tarde. A valsa. Inteira, até o fim, devagar.\n\nVoltei pro mestrado.\n\nA tranca da porta lá de casa eu nunca tirei. Às vezes eu acordo de madrugada e vou ver se a senhora saiu." }
      ]
    },

    /* ───────────────────────── DIA 8 (FINAL) ───────────────────────── */
    {
      offset: 401, at: "07:12", stage: 6, skip: "Cinco meses depois", final: true,
      title: "Leia isto todas as manhãs", away: "Leia isto todas as manhãs",
      blocks: [
        { t: "p", x: "Ela morreu {morte}, de tarde, na Casa Girassol. A Rose disse que ela tinha acabado de tocar." },
        { t: "p", x: "Faz doze dias. Eu continuo abrindo esta página toda manhã. Não sei mais pra quem." },
        { t: "p", x: "Tem uma coisa que eu nunca contei. Toda noite, quando eu atualizava, eu apagava a versão anterior. Achava que guardar seria pior: ela podia abrir a página velha sem querer e achar que era 2019 de novo. Então não sobrou nenhuma. Nem eu tenho." },
        { t: "p", x: "Mas se você está lendo isto, você leu todas. Você estava lá em cada manhã. Você viu a letra crescer. Você sabe como a valsa começa e como ela termina." },
        { t: "p", x: "Você é a única pessoa que lembra de todas as versões dela." },
        { t: "p", x: "Então eu queria te pedir uma coisa. A última atualização desta página não vai ser minha." },
        { t: "final" }
      ]
    }
  ]
};
