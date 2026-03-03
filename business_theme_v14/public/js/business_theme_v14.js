(function () {
  "use strict";

  var ACCENT_PRESETS = [
    { id: "indigo",  hex: "#4f46e5", hover: "#4338ca", light: "rgba(79,70,229,0.12)",  gradient: "linear-gradient(135deg,#4f46e5,#7c3aed)", text: "#818cf8",  glow: "rgba(79,70,229,0.3)" },
    { id: "teal",    hex: "#0d9488", hover: "#0f766e", light: "rgba(13,148,136,0.12)",  gradient: "linear-gradient(135deg,#0d9488,#14b8a6)", text: "#5eead4",  glow: "rgba(13,148,136,0.3)" },
    { id: "rose",    hex: "#e11d48", hover: "#be123c", light: "rgba(225,29,72,0.12)",   gradient: "linear-gradient(135deg,#e11d48,#f43f5e)", text: "#fb7185",  glow: "rgba(225,29,72,0.3)" },
    { id: "amber",   hex: "#d97706", hover: "#b45309", light: "rgba(217,119,6,0.12)",   gradient: "linear-gradient(135deg,#d97706,#f59e0b)", text: "#fbbf24",  glow: "rgba(217,119,6,0.3)" },
    { id: "emerald", hex: "#059669", hover: "#047857", light: "rgba(5,150,105,0.12)",   gradient: "linear-gradient(135deg,#059669,#10b981)", text: "#34d399",  glow: "rgba(5,150,105,0.3)" },
    { id: "sky",     hex: "#0284c7", hover: "#0369a1", light: "rgba(2,132,199,0.12)",   gradient: "linear-gradient(135deg,#0284c7,#0ea5e9)", text: "#38bdf8",  glow: "rgba(2,132,199,0.3)" },
    { id: "violet",  hex: "#7c3aed", hover: "#6d28d9", light: "rgba(124,58,237,0.12)",  gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", text: "#a78bfa",  glow: "rgba(124,58,237,0.3)" },
    { id: "pink",    hex: "#db2777", hover: "#be185d", light: "rgba(219,39,119,0.12)",  gradient: "linear-gradient(135deg,#db2777,#ec4899)", text: "#f472b6",  glow: "rgba(219,39,119,0.3)" },
    { id: "orange",  hex: "#ea580c", hover: "#c2410c", light: "rgba(234,88,12,0.12)",   gradient: "linear-gradient(135deg,#ea580c,#f97316)", text: "#fb923c",  glow: "rgba(234,88,12,0.3)" },
    { id: "cyan",    hex: "#0891b2", hover: "#0e7490", light: "rgba(8,145,178,0.12)",   gradient: "linear-gradient(135deg,#0891b2,#06b6d4)", text: "#22d3ee",  glow: "rgba(8,145,178,0.3)" },
    { id: "lime",    hex: "#65a30d", hover: "#4d7c0f", light: "rgba(101,163,13,0.12)",  gradient: "linear-gradient(135deg,#65a30d,#84cc16)", text: "#a3e635",  glow: "rgba(101,163,13,0.3)" },
    { id: "slate",   hex: "#475569", hover: "#334155", light: "rgba(71,85,105,0.12)",   gradient: "linear-gradient(135deg,#475569,#64748b)", text: "#94a3b8",  glow: "rgba(71,85,105,0.3)" },
  ];

  var STORAGE_MODE = "alihsan_theme_mode";
  var STORAGE_ACCENT = "alihsan_theme_accent";

  function getStoredMode() {
    return localStorage.getItem(STORAGE_MODE) || "light";
  }

  function getStoredAccent() {
    return localStorage.getItem(STORAGE_ACCENT) || "indigo";
  }

  function findPreset(id) {
    for (var i = 0; i < ACCENT_PRESETS.length; i++) {
      if (ACCENT_PRESETS[i].id === id) return ACCENT_PRESETS[i];
    }
    return ACCENT_PRESETS[0];
  }

  function applyMode(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(STORAGE_MODE, mode);
  }

  function applyAccent(accentId) {
    var p = findPreset(accentId);
    var root = document.documentElement;
    root.style.setProperty("--st-accent", p.hex);
    root.style.setProperty("--st-accent-hover", p.hover);
    root.style.setProperty("--st-accent-light", p.light);
    root.style.setProperty("--st-accent-gradient", p.gradient);
    root.style.setProperty("--st-accent-text", p.text);
    root.style.setProperty("--st-accent-glow", p.glow);
    localStorage.setItem(STORAGE_ACCENT, accentId);
  }

  function buildPicker() {
    if (document.getElementById("st-theme-picker")) return;

    var wrapper = document.createElement("div");
    wrapper.id = "st-theme-picker";

    var btn = document.createElement("button");
    btn.id = "st-theme-toggle";
    btn.innerHTML = "&#x1F3A8;";
    btn.title = "Theme Settings";

    var panel = document.createElement("div");
    panel.id = "st-theme-panel";

    var modeTitle = document.createElement("h4");
    modeTitle.textContent = "Appearance";
    panel.appendChild(modeTitle);

    var modeRow = document.createElement("div");
    modeRow.className = "st-mode-btns";

    var modes = [
      { id: "light", label: "Light", icon: "&#x2600;" },
      { id: "dark",  label: "Dark",  icon: "&#x1F319;" },
    ];

    var currentMode = getStoredMode();

    modes.forEach(function (m) {
      var b = document.createElement("button");
      b.className = "st-mode-btn" + (m.id === currentMode ? " active" : "");
      b.innerHTML = m.icon + " " + m.label;
      b.setAttribute("data-mode", m.id);
      b.addEventListener("click", function () {
        applyMode(m.id);
        modeRow.querySelectorAll(".st-mode-btn").forEach(function (el) {
          el.classList.toggle("active", el.getAttribute("data-mode") === m.id);
        });
      });
      modeRow.appendChild(b);
    });
    panel.appendChild(modeRow);

    var colorTitle = document.createElement("h4");
    colorTitle.textContent = "Accent Color";
    panel.appendChild(colorTitle);

    var grid = document.createElement("div");
    grid.className = "st-color-grid";

    var currentAccent = getStoredAccent();

    ACCENT_PRESETS.forEach(function (preset) {
      var swatch = document.createElement("div");
      swatch.className = "st-color-swatch" + (preset.id === currentAccent ? " active" : "");
      swatch.style.background = preset.gradient;
      swatch.title = preset.id.charAt(0).toUpperCase() + preset.id.slice(1);
      swatch.setAttribute("data-accent", preset.id);
      swatch.addEventListener("click", function () {
        applyAccent(preset.id);
        grid.querySelectorAll(".st-color-swatch").forEach(function (el) {
          el.classList.toggle("active", el.getAttribute("data-accent") === preset.id);
        });
      });
      grid.appendChild(swatch);
    });
    panel.appendChild(grid);

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      panel.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) {
        panel.classList.remove("open");
      }
    });

    wrapper.appendChild(panel);
    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);
  }

  function init() {
    applyMode(getStoredMode());
    applyAccent(getStoredAccent());

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", buildPicker);
    } else {
      buildPicker();
    }
  }

  init();
})();
