/*
 * Pequeno conversor de marcações da história para HTML.
 * Ver o topo de story.js para a lista de marcações.
 */

(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmt(s, vars) {
    let h = esc(s);
    if (vars) {
      h = h.replace(/\{(morte|hoje)\}/g, (_, k) => esc(vars[k] || ""));
    }
    h = h.replace(/\{f:([^}]+)\}/g, '<span class="f" tabindex="0">$1</span>');
    h = h.replace(/\{x:([^}]+)\}/g, '<span class="f lost" tabindex="0">$1</span>');
    h = h.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return h;
  }

  // texto puro, sem marcações (para iniciais dos cartões etc.)
  function plain(s) {
    return String(s)
      .replace(/\{[fx]:([^}]+)\}/g, "$1")
      .replace(/~~|\*\*/g, "");
  }

  // texto que o leitor escreveu: escapado e encurtado
  function quote(s, max) {
    const t = String(s).replace(/\s+/g, " ").trim().replace(/[.;,]+$/, "");
    const cut = t.length > max ? t.slice(0, max).replace(/\s\S*$/, "") + "…" : t;
    return esc(cut);
  }

  window.Txt = { esc, fmt, plain, quote };
})();
