const esToBrRaw = {
  "hola":"mi--mi", "adios":"bai-mi", "gracias":"mimi-mi mu", "por":"mii",
  "favor":"xixi", "perdón":"ni-ni mii", "te":"mi-mi", "amo":"mi",
  "quiero":"mi", "amor":"mi mi", "feliz":"vivi", "triste":"nini",
  "miedo":"ru-ni", "secreto":"xixi", "risa":"miji", "juego":"miji",
  "magia":"yii-mei", "queso":"miu pi", "pequeño":"mimi", "grande":"mii mii",
  "rápido":"vivi ti", "lento":"ti mu", "suave":"mimi mu", "duro":"mei ru",
  "meica":"mei", "luis":"mei", "diego":"mie", "ir":"miu ti", "venir":"ti ni",
  "mirar":"yii ti", "hablar":"miji ni", "dormir":"mu mu", "comer":"pi pi",
  "beber":"mu pi", "cansado":"mu nini", "emocionado":"kiki vivi",
  "sorprendido":"yii wu", "hoy":"mi-mi ti", "mañana":"mii ni", "ayer":"ru ni",
  "siempre":"wu wu", "nunca":"nini nini"
};

const brToEs = {
  // saludos
  "mi--mi": "hola",
  // pronombres
  "mi-mi": "te",
  // vocabulario general
  "bai-mi": "adios",
  "mimi-mi mu": "gracias",
  "mii": "por",
  "xixi": "favor",
  "ni-ni mii": "perdón",
  "mi": "amo",
  "mi mi": "amor",
  "vivi": "feliz",
  "nini": "triste",
  "ru-ni": "miedo",
  "miji": "juego",
  "yii-mei": "magia",
  "miu pi": "queso",
  "mimi": "pequeño",
  "mii mii": "grande",
  "vivi ti": "rápido",
  "ti mu": "lento",
  "mimi mu": "suave",
  "mei ru": "duro",
  "mei": "meica",
  "mie": "diego",
  "miu ti": "ir",
  "ti ni": "venir",
  "yii ti": "mirar",
  "miji ni": "hablar",
  "mu mu": "dormir",
  "pi pi": "comer",
  "mu pi": "beber",
  "mu nini": "cansado",
  "kiki vivi": "emocionado",
  "yii wu": "sorprendido",
  "mi-mi ti": "hoy",
  "mii ni": "mañana",
  "ru ni": "ayer",
  "wu wu": "siempre",
  "nini nini": "nunca",
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
  const cleaned = text.trim().toLowerCase();
  if (!cleaned) return { text: '', breakdown: '' };

  if (brToEs[cleaned]) {
    return { text: brToEs[cleaned], breakdown: `${cleaned}→${brToEs[cleaned]} |` };
  }

  const tokens = cleaned.split(/\s+/);
  const letters = [];
  const detail = [];
  for (const t of tokens) {
    const ch = brAlphabet[t] || '';
    letters.push(ch);
    detail.push(`${t}→${ch}`);
  }
  return { text: letters.join(''), breakdown: detail.join(' | ') + ' |' };
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
