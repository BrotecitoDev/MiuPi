const esToBrRaw = {
  "hola":"mi--mi", "adios":"bai-mi", "gracias":"mimi-mimu", "por":"mii",
  "favor":"xixi", "perdón":"ni-nimii", "te":"mi-mi", "amo":"mi",
  "quiero":"mi", "amor":"mimi", "feliz":"vivi", "triste":"nini",
  "miedo":"ru-ni", "secreto":"xixi", "risa":"miji", "juego":"miji",
  "magia":"yii-mei", "queso":"miupi", "pequeño":"mimi", "grande":"miimii",
  "rápido":"vivity", "lento":"timu", "suave":"mimimu", "duro":"meiru",
  "meica":"mei", "luis":"mei", "diego":"mie", "ir":"miuti", "venir":"tini",
  "mirar":"yiiti", "hablar":"mijini", "dormir":"mumu", "comer":"pipi",
  "beber":"mupi", "cansado":"munini", "emocionado":"kikivivi",
  "sorprendido":"yiiwu", "hoy":"mi-miti", "mañana":"miini", "ayer":"runi",
  "siempre":"wuwu", "nunca":"nininini", "culona":"muku", "pene":"mupi",
  "muslo":"miwu", "tetona":"misi", "hermosa":"miyi", "princesa":"muki",
  "pinchechota":"muzi"
};

const brToEs = {
  // saludos
  "mi--mi": "hola",
  // pronombres
  "mi-mi": "te",
  // vocabulario general
  "bai-mi": "adios",
  "mimi-mimu": "gracias",
  "mii": "por",
  "xixi": "favor",
  "ni-nimii": "perdón",
  "mi": "amo",
  "mimi": "amor",
  "vivi": "feliz",
  "nini": "triste",
  "ru-ni": "miedo",
  "miji": "juego",
  "yii-mei": "magia",
  "miupi": "queso",
  "mimi": "pequeño",
  "miimii": "grande",
  "vivity": "rápido",
  "timu": "lento",
  "mimimu": "suave",
  "meiru": "duro",
  "mei": "meica",
  "mie": "diego",
  "miuti": "ir",
  "tini": "venir",
  "yiiti": "mirar",
  "mijini": "hablar",
  "mumu": "dormir",
  "pipi": "comer",
  "mupi": "beber",
  "munini": "cansado",
  "kikivivi": "emocionado",
  "yiiwu": "sorprendido",
  "mi-miti": "hoy",
  "miini": "mañana",
  "runi": "ayer",
  "wuwu": "siempre",
  "nininini": "nunca",
  "muku": "culona",
  "mupi": "pene",
  "miwu": "muslo",
  "misi": "tetona",
  "miyi": "hermosa",
  "muki": "princesa",
  "muzi": "pinchechota",
};

const esAlphabet = {
  a:"mi", b:"mimi", c:"mii", d:"mei", e:"ni", f:"mu", g:"pii", h:"miji",
  i:"mu", j:"mei", k:"miu", l:"mimi", m:"mii", n:"nui", o:"mu", p:"pi",
  q:"ku", r:"ru", s:"si", t:"ti", u:"mu", v:"vivi", w:"wu", x:"xixi",
  y:"yii", z:"zizi"
};

const brAlphabet = {};
for (const [letter, token] of Object.entries(esAlphabet)) {
  if (!brAlphabet[token]) brAlphabet[token] = letter;
}

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const esToBr = {};
for (const [k,v] of Object.entries(esToBrRaw)) {
  esToBr[normalize(k)] = v;
}

function translateEsToBr(text) {
  const words = text.trim().split(/\s+/);
  const result = [];
  const detail = [];
  for (const w of words) {
    const key = normalize(w);
    if (esToBr[key]) {
      result.push(esToBr[key]);
      detail.push(`${w}→${esToBr[key]}`);
    } else {
      const tokens = [];
      for (const ch of key) {
        tokens.push(esAlphabet[ch] || ch);
      }
      const tr = tokens.join(' ');
      result.push(tr);
      detail.push(`${w}→${tr}`);
    }
  }
  return {text: result.join(' '), breakdown: detail.join(' | ') + ' |'};
}

function translateBrToEs(text) {
  const tokens = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return { text: '', breakdown: '' };

  const words = [];
  let letterBuffer = '';
  const detail = [];

  tokens.forEach(t => {
    if (brToEs[t]) {
      if (letterBuffer) {
        words.push(letterBuffer);
        letterBuffer = '';
      }
      words.push(brToEs[t]);
      detail.push(`${t}→${brToEs[t]}`);
    } else {
      const ch = brAlphabet[t] || '';
      letterBuffer += ch;
      detail.push(`${t}→${ch}`);
    }
  });

  if (letterBuffer) words.push(letterBuffer);

  return { text: words.join(' '), breakdown: detail.join(' | ') + ' |' };
}

function clearResult() {
  document.getElementById('result').innerHTML = '';
}

function showResult(res) {
  const div = document.getElementById('result');
  div.innerHTML = `${res.text}<br>🌱 Desglose: ${res.breakdown}`;
}

function handleToBro() {
  const text = document.getElementById('text-input').value;
  if (!text.trim()) return;
  clearResult();
  const res = translateEsToBr(text);
  showResult(res);
}

function handleToEs() {
  const text = document.getElementById('text-input').value;
  if (!text.trim()) return;
  clearResult();
  const res = translateBrToEs(text.toLowerCase());
  showResult(res);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('to-bro').addEventListener('click', handleToBro);
  document.getElementById('to-es').addEventListener('click', handleToEs);
});
