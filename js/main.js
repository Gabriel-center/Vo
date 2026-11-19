/*
 * O MOTOR
 *
 * Regras da experiência:
 *  - Cada "manhã" substitui a anterior. Não existe voltar.
 *  - O progresso fica salvo no navegador (localStorage): fechar e abrir
 *    de novo continua na mesma manhã.
 *  - As datas partem do dia real em que o leitor abriu a página.
 *  - O que o leitor escreve no caderno volta mais tarde na história.
 *
 * Atalhos para quem está testando:
 *    index.html?recomecar   apaga tudo e começa do zero
 *    index.html?dia=6       pula para o dia 6
 */

(function () {
  const S = window.STORY;
  const { fmt, plain, quote, esc } = window.Txt;
  const KEY = "leia-isto-todas-as-manhas:v1";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───────────── estado ───────────── */

  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function load() {
    let st = null;
    try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (!st || typeof st.day !== "number") {
      st = { day: 0, notes: {}, start: todayISO(), readMs: 0, final: null, tip: false };
    }
    return st;
  }
  let state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  // atalhos de URL
  const params = new URLSearchParams(location.search);
  if (params.has("recomecar")) {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.replace(location.pathname);
    return;
  }
  if (params.has("dia")) {
    const n = Math.min(S.days.length, Math.max(1, parseInt(params.get("dia"), 10) || 1));
    state.day = n - 1;
    if (n < S.days.length) state.final = null;
    save();
    history.replaceState(null, "", location.pathname);
  }

  /* ───────────── datas ───────────── */

  function dateFor(offset) {
    const [y, m, d] = state.start.split("-").map(Number);
    return new Date(y, m - 1, d + offset, 12);
  }
  function longDate(dt, withYear) {
    const o = { weekday: "long", day: "numeric", month: "long" };
    if (withYear) o.year = "numeric";
    return dt.toLocaleDateString("pt-BR", o);
  }
  function deathPhrase(finalOffset) {
    const dt = dateFor(finalOffset - 12);
    const wd = dt.toLocaleDateString("pt-BR", { weekday: "long" });
    const art = /s[áa]bado|domingo/.test(wd) ? "num" : "numa";
    const rest = dt.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
    return `${art} ${wd}, ${rest}`;
  }

  /* ───────────── elementos ───────────── */

  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  const header = $("#topo");
  const main = $("#pagina");
  const foot = $("#rodape");
  const night = $("#noite");

  /* ───────────── blocos ───────────── */

  function notesFor(from) {
    if (from === "first") {
      for (let i = 0; i < S.days.length; i++) {
        const n = (state.notes[i] || "").trim();
        if (n) return n;
      }
      return "";
    }
    return (state.notes[from] || "").trim();
  }

  function echoHTML(spec) {
    const n = notesFor(spec.from != null ? spec.from : spec.echo);
    const tpl = n ? spec.yes : spec.no;
    if (!tpl) return "";
    return fmt(tpl).replace("{note}", `<span class="eco">${quote(n, 170)}</span>`);
  }

  function clockHTML() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "";
    const quando = h < 18 ? "de tarde" : "de noite";
    return `<p class="aside">(Eu sei que agora talvez seja ${quando}. Escrevi “bom dia” porque é de manhã que a senhora costuma abrir isto. Mas, se abriu agora, tudo bem. Bom dia do mesmo jeito.)</p>`;
  }

  function musicWidget(bars, label) {
    const w = el("div", "musica");
    const total = window.Valsa.total;
    let dots = "";
    for (let i = 0; i < total; i++) {
      if (i % 4 === 0) dots += '<span class="frase">';
      dots += `<i class="${i < bars ? "sei" : "nao"}" data-i="${i}"></i>`;
      if (i % 4 === 3) dots += "</span>";
    }
    const lab = label || (bars >= total ? "A valsa" : "A valsa, até onde eu lembro");
    w.innerHTML =
      `<button class="tocar" aria-label="Tocar a valsa"><span class="ic">▶</span></button>` +
      `<div class="mus-info"><div class="mus-nome">${esc(lab)}</div>` +
      `<div class="compassos" aria-hidden="true">${dots}</div>` +
      `<div class="mus-legenda">${bars} de ${total} compassos</div></div>`;

    const btn = $(".tocar", w);
    const dotEls = [...w.querySelectorAll("i")];
    btn.addEventListener("click", () => {
      if (w.classList.contains("tocando")) {
        window.Valsa.stop();
        w.classList.remove("tocando");
        dotEls.forEach(d => d.classList.remove("agora", "foi"));
        $(".ic", btn).textContent = "▶";
        return;
      }
      document.querySelectorAll(".musica.tocando .tocar").forEach(b => b.click());
      w.classList.add("tocando");
      $(".ic", btn).textContent = "■";
      dotEls.forEach(d => d.classList.remove("agora", "foi"));
      window.Valsa.play(bars, i => {
        dotEls.forEach((d, j) => {
          d.classList.toggle("agora", j === i);
          d.classList.toggle("foi", j < i);
        });
      }, complete => {
        w.classList.remove("tocando");
        $(".ic", btn).textContent = "▶";
        dotEls.forEach(d => d.classList.remove("agora"));
        if (!complete) {
          // a música para onde a memória para
          const next = dotEls[bars];
          if (next) { next.classList.add("procura"); setTimeout(() => next.classList.remove("procura"), 2200); }
        }
        setTimeout(() => dotEls.forEach(d => d.classList.remove("foi")), 1500);
      });
    });
    return w;
  }

  function notesWidget(dayIndex) {
    const w = el("div", "caderno");
    w.innerHTML =
      `<textarea rows="5" spellcheck="false" placeholder="Escreva aqui o que quiser guardar de hoje."></textarea>` +
      `<div class="caderno-status" aria-live="polite"></div>`;
    const ta = $("textarea", w);
    const status = $(".caderno-status", w);
    ta.value = state.notes[dayIndex] || "";
    let t;
    ta.addEventListener("input", () => {
      clearTimeout(t);
      status.textContent = "";
      t = setTimeout(() => {
        state.notes[dayIndex] = ta.value;
        save();
        status.textContent = ta.value.trim() ? "guardado" : "";
      }, 450);
    });
    return w;
  }

  function cardsWidget(items) {
    const w = el("div", "cartoes");
    items.forEach(c => {
      const card = el("div", "cartao");
      const ini = plain(c.n).trim().charAt(0);
      card.innerHTML =
        `<div class="avatar" style="--cor:${c.c}">${esc(ini)}</div>` +
        `<div class="cartao-txt"><div class="cartao-nome">${fmt(c.n)}</div><div>${fmt(c.x)}</div></div>`;
      w.appendChild(card);
    });
    return w;
  }

  function letterWidget(b) {
    const w = el("div", "carta");
    let h = "";
    b.parts.forEach(p => {
      const html = typeof p === "string" ? fmt(p) : echoHTML(p);
      if (html) h += `<p>${html}</p>`;
    });
    h += `<p class="assinatura">${esc(b.sign)}</p>`;
    w.innerHTML = h;
    return w;
  }

  function renderBlock(b, dayIndex, vars) {
    switch (b.t) {
      case "h1": return el("h1", null, fmt(b.x, vars));
      case "h2": return el("h2", null, fmt(b.x, vars));
      case "p": return el("p", null, fmt(b.x, vars));
      case "hint": return el("p", "dica", fmt(b.x, vars));
      case "clock": { const h = clockHTML(); return h ? el("div", null, h) : null; }
      case "echo": { const h = echoHTML(b); return h ? el("p", "eco-p", h) : null; }
      case "list": {
        const ul = el("ul", "lista");
        b.items.forEach(i => ul.appendChild(el("li", null, fmt(i, vars))));
        return ul;
      }
      case "cards": return cardsWidget(b.items);
      case "music": return musicWidget(b.bars, b.label);
      case "notes": return notesWidget(dayIndex);
      case "letter": return letterWidget(b);
      case "big": {
        const d = el("div", "grande");
        b.lines.forEach((l, i) => {
          const line = el("p", "linha", fmt(l, vars));
          line.style.setProperty("--i", i);
          d.appendChild(line);
        });
        return d;
      }
      case "small": {
        const d = el("div", "pequeno" + (b.spacer ? " longe" : ""));
        b.x.split(/\n\n/).forEach(par => d.appendChild(el("p", null, fmt(par, vars))));
        return d;
      }
      case "final": return finalWidget();
    }
    return null;
  }

  /* ───────────── o fim ───────────── */

  function finalWidget() {
    const w = el("div", "ultima");
    w.innerHTML =
      `<label for="lembranca" class="pergunta">O que você lembra dela?</label>` +
      `<textarea id="lembranca" rows="6" spellcheck="false" placeholder="Qualquer coisa. Uma frase, uma cena, uma palavra."></textarea>` +
      `<button class="guardar">Guardar</button>`;
    $(".guardar", w).addEventListener("click", () => {
      const text = $("textarea", w).value.trim();
      state.final = { text, at: Date.now() };
      save();
      renderEpitaph(true);
    });
    return w;
  }

  function renderEpitaph(playNow) {
    const day = S.days[S.days.length - 1];
    document.body.className = `stage-${day.stage} epitafio`;
    document.title = S.title;
    header.innerHTML = "";
    foot.innerHTML = "";
    main.innerHTML = "";

    const f = state.final || { text: "", at: Date.now() };
    const mins = Math.max(1, Math.round(state.readMs / 60000));
    const quando = new Date(f.at).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

    const box = el("div", "lapide");
    box.innerHTML =
      (f.text
        ? `<blockquote>${esc(f.text).replace(/\n/g, "<br>")}</blockquote><p class="assin">lembrado por você · ${esc(quando)}</p>`
        : `<blockquote class="vazio">Tudo bem. Às vezes a gente lembra sem palavras.</blockquote><p class="assin">${esc(quando)}</p>`) +
      `<p class="tempo">Você passou ${mins} ${mins === 1 ? "minuto" : "minutos"} com a Lúcia, em ${S.days.length - 1} manhãs.</p>`;
    main.appendChild(box);

    const m = musicWidget(window.Valsa.total, "Lúcia Aparecida Moraes · valsa sem nome");
    m.classList.add("mus-final");
    main.appendChild(m);

    const fim = el("p", "fim", "Esta página não será mais atualizada.");
    main.appendChild(fim);

    const again = el("p", "recomecar", `<a href="?recomecar">recomeçar</a>`);
    main.appendChild(again);

    requestAnimationFrame(() => document.body.classList.add("mostrar"));
    if (playNow) setTimeout(() => $(".tocar", m).click(), reduceMotion ? 200 : 2200);
    setTimeout(() => fim.classList.add("visivel"), playNow ? 30000 : 600);
    window.scrollTo(0, 0);
  }

  /* ───────────── esquecer e lembrar ───────────── */

  function wireForgetting(root) {
    const words = [...root.querySelectorAll(".f")];
    if (!state.tip && state.day === 0) {
      const first = words.find(w => !w.classList.contains("lost"));
      if (first) {
        first.classList.add("tip");
        const wrap = el("span", "f-wrap");
        first.parentNode.insertBefore(wrap, first);
        wrap.appendChild(first);
        wrap.appendChild(el("span", "dica-flutuante", "segure para lembrar"));
      }
    }
    words.forEach(w => {
      let t1, t2;
      const begin = e => {
        if (e && e.type === "pointerdown") e.preventDefault();
        clearTimeout(t1); clearTimeout(t2);
        if (w.classList.contains("lost")) {
          w.classList.add("forca");
          t1 = setTimeout(() => w.classList.remove("forca"), 1600);
          return;
        }
        w.classList.add("lembrando");
        t1 = setTimeout(() => {
          w.classList.add("lembrou");
          if (w.classList.contains("tip")) {
            document.querySelectorAll(".f.tip").forEach(x => x.classList.remove("tip"));
            document.querySelectorAll(".dica-flutuante").forEach(x => x.remove());
            state.tip = true; save();
          }
          // a lembrança não dura
          t2 = setTimeout(() => w.classList.remove("lembrando", "lembrou"), 7000);
        }, 1400);
      };
      const end = () => {
        if (w.classList.contains("lembrou")) return;
        clearTimeout(t1);
        w.classList.remove("lembrando", "forca");
      };
      w.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") begin(e); });
      w.addEventListener("pointerleave", end);
      w.addEventListener("pointerdown", begin);
      w.addEventListener("pointerup", end);
      w.addEventListener("pointercancel", end);
      w.addEventListener("focus", begin);
      w.addEventListener("blur", end);
      w.addEventListener("contextmenu", e => e.preventDefault());
    });
  }

  /* ───────────── uma manhã ───────────── */

  function renderDay(waking) {
    if (state.final && state.day === S.days.length - 1) { renderEpitaph(false); return; }

    const i = state.day;
    const day = S.days[i];
    const vars = { morte: deathPhrase(day.offset) };

    document.body.className = `stage-${day.stage}` + (day.final ? " ultimo" : "");
    document.title = day.title;

    const dt = dateFor(day.offset);
    header.innerHTML =
      `<div class="marca">${esc(S.title)}</div>` +
      `<div class="meta"><span>${esc(longDate(dt, day.final))}</span><span class="sep">·</span><span>atualizado por Bia às ${esc(day.at)}</span></div>`;

    main.innerHTML = "";
    day.blocks.forEach(b => {
      const node = renderBlock(b, i, vars);
      if (node) main.appendChild(node);
    });
    wireForgetting(main);

    foot.innerHTML = "";
    if (!day.final) {
      const btn = el("button", "dormir", "Dormir");
      btn.addEventListener("click", sleep);
      foot.appendChild(btn);
    }

    window.scrollTo(0, 0);
    if (waking && !reduceMotion) {
      document.body.classList.add("acordando");
      requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("acordando")));
    }
  }

  /* ───────────── a noite ───────────── */

  let sleeping = false;
  function sleep() {
    if (sleeping || state.day >= S.days.length - 1) return;
    sleeping = true;
    window.Valsa.stop();
    const next = S.days[state.day + 1];
    const slow = reduceMotion ? 0.3 : 1;

    night.innerHTML = `<p class="n1">A Bia está reescrevendo a página<span class="cursor">|</span></p><p class="n2">${esc(next.skip || "")}</p>`;
    night.classList.add("on");

    setTimeout(() => night.classList.add("fase2"), 3200 * slow);
    setTimeout(() => {
      // a manhã anterior deixa de existir
      state.day += 1;
      save();
      renderDay(true);
      night.classList.remove("on", "fase2");
      sleeping = false;
    }, 5600 * slow);
  }

  /* ───────────── aba e tempo de leitura ───────────── */

  document.addEventListener("visibilitychange", () => {
    const day = S.days[state.day];
    if (state.final && state.day === S.days.length - 1) { document.title = S.title; return; }
    document.title = document.hidden ? day.away : day.title;
  });

  let tick = 0;
  setInterval(() => {
    if (document.hidden || state.final) return;
    state.readMs += 1000;
    if (++tick % 5 === 0) save();
  }, 1000);
  window.addEventListener("pagehide", save);

  // não existe "voltar" para a manhã de ontem
  history.replaceState(null, "", location.pathname);

  renderDay(true);
})();
