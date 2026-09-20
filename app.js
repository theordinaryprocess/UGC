/* The Ordinary Process — portfolio app. No build step, no dependencies. */
(function () {
  "use strict";
  const S = window.SITE, P = window.PROJECTS;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const INDUSTRIES = [["all", "All"], ["tech", "Tech"], ["beauty", "Beauty"], ["hospitality", "Hospitality"], ["lifestyle", "Lifestyle"]];

  /* ---------- Nav ---------- */
  const toggle = $("#navToggle"), menu = $("#navMenu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); } });

  /* ---------- Video player component ----------
     createPlayer({video, driveId, poster, title}) -> element
     One video plays at a time; pauses when leaving the viewport. */
  let current = null;
  function createPlayer(src) {
    const el = document.createElement("div");
    el.className = "player";
    if (src.driveId) {
      el.innerHTML = `<iframe src="https://drive.google.com/file/d/${encodeURIComponent(src.driveId)}/preview" allow="autoplay; fullscreen" loading="lazy" title="${esc(src.title)}"></iframe>`;
      el.classList.add("is-playing");
      return el;
    }
    if (!src.video) {
      el.innerHTML = `<img class="player__poster" src="${esc(src.poster)}" alt="" loading="lazy" onerror="this.style.display='none'"><div class="player__empty">Video coming soon</div>`;
      return el;
    }
    el.innerHTML = `
      <video preload="none" playsinline webkit-playsinline poster="${esc(src.poster)}" aria-label="${esc(src.title)}"></video>
      <img class="player__poster" src="${esc(src.poster)}" alt="" loading="lazy" onerror="this.style.display='none'">
      <button class="player__btn" type="button" aria-label="Play ${esc(src.title)}"><span>Play</span></button>
      <button class="player__sound" type="button" aria-pressed="false">Sound off</button>`;
    const v = $("video", el), btn = $(".player__btn", el), snd = $(".player__sound", el);
    v.muted = true; v.loop = true;
    const play = () => {
      if (current && current !== v) { current.pause(); current.closest(".player").classList.remove("is-playing"); }
      if (!v.src) v.src = src.video;
      v.play().then(() => { current = v; el.classList.add("is-playing"); }).catch(() => {});
    };
    btn.addEventListener("click", play);
    v.addEventListener("click", () => { v.paused ? play() : v.pause(); });
    v.addEventListener("pause", () => { if (!v.ended) el.classList.remove("is-playing"); });
    v.addEventListener("play", () => el.classList.add("is-playing"));
    snd.addEventListener("click", () => {
      v.muted = !v.muted;
      snd.textContent = v.muted ? "Sound off" : "Sound on";
      snd.setAttribute("aria-pressed", String(!v.muted));
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(entries => entries.forEach(en => { if (!en.isIntersecting && !v.paused) v.pause(); }), { threshold: 0.2 }).observe(el);
    }
    return el;
  }
  function stopAll() { if (current) { current.pause(); current = null; } }

  /* ---------- Hero ---------- */
  $("#heroLine1").textContent = S.hero.line1;
  $("#heroLine2").textContent = S.hero.line2;
  $("#heroPositioning").textContent = S.hero.positioning;
  const hm = $("#heroMedia");
  if (S.hero.video) {
    hm.innerHTML = `<video autoplay muted loop playsinline preload="metadata" poster="${esc(S.hero.poster)}" src="${esc(S.hero.video)}" aria-hidden="true"></video>`;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { const v = $("video", hm); v.removeAttribute("autoplay"); v.pause(); }
  } else {
    hm.innerHTML = `<img src="${esc(S.hero.poster)}" alt="${esc(S.name)}, portrait" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'placeholder',textContent:'Hero image or silent video loop — assets/posters/placeholder-hero.jpg'}))">`;
  }

  /* ---------- Work grid + filters ---------- */
  const grid = $("#workGrid"), filters = $("#filters");
  filters.innerHTML = INDUSTRIES.map(([k, l], i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join("");
  grid.innerHTML = P.map((p, i) => `
    <button type="button" class="tile${p.featured ? " tile--featured" : ""}" data-industry="${esc(p.industry)}" data-index="${i}" aria-label="Open project: ${esc(p.title)}, ${esc(p.brand)}">
      <span class="tile__media"><img src="${esc(p.poster)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span class="tile__play" aria-hidden="true">Play</span></span>
      <span class="tile__meta"><span class="tile__brand">${esc(p.brand)}</span><span class="tile__type">${esc(p.type)}</span></span>
      <span class="tile__title">${esc(p.title)}</span>
    </button>`).join("");
  filters.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    [...filters.children].forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    const f = b.dataset.f; let shown = 0;
    grid.querySelectorAll(".tile").forEach(t => { const on = f === "all" || t.dataset.industry === f; t.hidden = !on; if (on) shown++; });
    let empty = $(".work__empty", grid);
    if (!shown && !empty) { empty = document.createElement("p"); empty.className = "work__empty"; empty.textContent = "Nothing here yet — soon."; grid.appendChild(empty); }
    if (shown && empty) empty.remove();
  });

  /* ---------- Project modal (case study) ---------- */
  const modal = $("#modal"), media = $("#modalMedia");
  let idx = 0, lastFocus = null;
  function visibleIndexes() { return [...grid.querySelectorAll(".tile")].filter(t => !t.hidden).map(t => +t.dataset.index); }
  function openProject(i) {
    idx = i; const p = P[i];
    stopAll();
    media.innerHTML = ""; media.appendChild(createPlayer(p));
    $("#modalBrand").textContent = `${p.brand} · ${p.year}`;
    $("#modalTitle").textContent = p.title;
    $("#caseObjective").textContent = p.objective;
    $("#caseFormat").textContent = p.format;
    $("#caseDeliverables").innerHTML = p.deliverables.map(d => `<li>${esc(d)}</li>`).join("");
    if (modal.hidden) { lastFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = "hidden"; }
    $(".modal__close").focus();
    const btn = $(".player__btn", media); if (btn) btn.click();
  }
  function closeModal() { stopAll(); media.innerHTML = ""; modal.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  function step(d) { const v = visibleIndexes(); const pos = v.indexOf(idx); openProject(v[(pos + d + v.length) % v.length]); }
  grid.addEventListener("click", e => { const t = e.target.closest(".tile"); if (t) openProject(+t.dataset.index); });
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
  $("#prevProject").addEventListener("click", () => step(-1));
  $("#nextProject").addEventListener("click", () => step(1));
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Tab") { // simple focus trap
      const f = [...modal.querySelectorAll("button, [href], video, iframe")].filter(x => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // swipe between projects on touch
  let tx = null;
  modal.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener("touchend", e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 70) step(dx < 0 ? 1 : -1); tx = null; });

  /* ---------- About, proof, services, contact ---------- */
  $("#aboutText").innerHTML = S.about.map(t => `<p>${esc(t)}</p>`).join("");
  $("#proofList").innerHTML = S.proof.map(r => `<li><span>${esc(r.item)}</span><b>${esc(r.qty)}</b></li>`).join("");
  $("#servicesList").innerHTML = S.services.map(([n, d]) => `<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join("");
  $("#contactLinks").innerHTML = [`<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`]
    .concat(S.instagram.map(i => `<a href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.label)} — ${esc(i.handle)}</a>`)).join("");
  $("#footerName").textContent = `© ${new Date().getFullYear()} ${S.name} — ${S.studio}`;

  /* ---------- Inquiry form ---------- */
  const form = $("#inquiryForm"), status = $("#formStatus");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (S.formEndpoint) {
      status.textContent = "Sending…";
      try {
        const r = await fetch(S.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
        status.textContent = r.ok ? "Sent. I'll reply within a day." : "Couldn't send. Please email me directly.";
        if (r.ok) form.reset();
      } catch { status.textContent = "Couldn't send. Please email me directly."; }
    } else {
      const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${S.email}?subject=${encodeURIComponent(`Project inquiry — ${data.company || data.name}`)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app…";
    }
  });
})();
