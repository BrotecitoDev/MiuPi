// Traductor bidireccional a Broteñol

// Diccionario de palabras completas
const dictionary = {
  "hola": "mi-mi",
  "lindo": "mimi",
  "queso": "miu pi",
  "gracias": "mimi-mi mu",
  "amo": "mi",
  "te": "mi-mi",
  "secreto": "xixi",
  "juego": "miji",
  "feliz": "vivi",
  "triste": "nini",
  "meica": "mei"
};

// Palabras reservadas de Broteñol
const broteReserved = {
  "mi-mi": "hola",
  "mimi": "lindo",
  "miu pi": "queso",
  "mei": "Meica",
  "mei-mi": "Meica",
  "mimi-mi": "súper ternura",
  "mimi-mi mu": "gracias",
  "xixi": "secreto",
  "miji": "juego",
  "vivi": "feliz",
  "nini": "triste"
};

// Abecedario letra a broteñol
const alphabet = {
  a: "mi",
  b: "mimi",
  c: "mii",
  d: "mei",
  e: "ni",
  f: "mu",
  g: "pi",
  h: "miji",
  i: "mu",
  j: "mei",
  k: "miu",
  l: "mimi",
  m: "mii",
  n: "ni",
  o: "mu",
  p: "pi",
  q: "ku",
  r: "ru",
  s: "si",
  t: "ti",
  u: "mu",
  v: "vivi",
  w: "wu",
  x: "xixi",
  y: "yii",
  z: "zizi"
};

const inverseAlphabet = {};
for (const [letter, brote] of Object.entries(alphabet)) {
  inverseAlphabet[brote] = letter;
}

function limpiarYTraducir() {
  document.getElementById('outputText').innerText = '';
  traducir();
}

function detectBrote(text) {
  const lower = text.toLowerCase();
  return Object.keys(broteReserved).some(w => lower.includes(w));
}

function wordToBroteByLetters(word) {
  const parts = [];
  const detail = [];
  for (const ch of word) {
    if (alphabet[ch]) {
      parts.push(alphabet[ch]);
      detail.push(`${ch}→${alphabet[ch]}`);
    } else {
      parts.push(ch);
      detail.push(`${ch}→${ch}`);
    }
  }
  return { text: parts.join(' '), breakdown: detail };
}

function toBrote(text) {
  const words = text.toLowerCase().trim().split(/\s+/);
  const result = [];
  const breakdown = [];
  for (const w of words) {
    if (dictionary[w]) {
      result.push(dictionary[w]);
      breakdown.push(`${w}→${dictionary[w]}`);
    } else {
      const byLetters = wordToBroteByLetters(w);
      result.push(byLetters.text);
      breakdown.push(`${w}→${byLetters.text}`);
    }
  }
  return { text: result.join(' '), breakdown: breakdown.join('\n') };
}

function broteWordToLetters(word) {
  const syllables = word.split(/-+/);
  const letters = [];
  const detail = [];
  for (const s of syllables) {
    if (inverseAlphabet[s]) {
      letters.push(inverseAlphabet[s]);
      detail.push(`${s}→${inverseAlphabet[s]}`);
    } else {
      letters.push(s);
      detail.push(`${s}→${s}`);
    }
  }
  return { text: letters.join(''), breakdown: detail };
}

function fromBrote(text) {
  const words = text.toLowerCase().trim().split(/\s+/);
  const result = [];
  const breakdown = [];
  let i = 0;
  while (i < words.length) {
    const current = words[i];
    const next = words[i + 1];
    const pair = next ? `${current} ${next}` : null;
    if (pair && broteReserved[pair]) {
      result.push(broteReserved[pair]);
      breakdown.push(`${pair}→${broteReserved[pair]}`);
      i += 2;
      continue;
    }
    if (broteReserved[current]) {
      result.push(broteReserved[current]);
      breakdown.push(`${current}→${broteReserved[current]}`);
    } else {
      const byLetters = broteWordToLetters(current);
      result.push(byLetters.text);
      breakdown.push(`${current}→${byLetters.text}`);
    }
    i += 1;
  }
  return { text: result.join(' '), breakdown: breakdown.join('\n') };
}

function traducir() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('outputText').innerText = '';
    return;
  }
  const isBrote = detectBrote(input);
  const result = isBrote ? fromBrote(input) : toBrote(input);
  const output = `${result.text}\n\n🌱 Desglose:\n${result.breakdown}`;
  document.getElementById('outputText').innerText = output;
}
