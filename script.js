// Traductor bidireccional Español/Broteñol

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

const reservedWords = {
  "mi": "yo / amor",
  "mi-mi": "tú",
  "mii": "muy / mucho",
  "mimi": "pequeño / lindo",
  "mei": "Meica",
  "mei-mi": "Meica",
  "mei-mimi": "Meica",
  "miu pi": "queso",
  "mimi-mi": "súper ternura",
  "nini": "tristeza",
  "miji": "juego",
  "ti": "acción",
  "xixi": "secreto",
  "kiki": "emoción intensa",
  "ru": "advertencia",
  "wu": "risa",
  "vivi": "energía alegre",
  "mñi": "timidez"
};

const inverseAlphabet = {};
for (const [letter, brote] of Object.entries(alphabet)) {
  if (!inverseAlphabet[brote]) {
    inverseAlphabet[brote] = letter;
  }
}

function containsBrote(text) {
  const lower = text.toLowerCase();
  return Object.keys(reservedWords).some(w => lower.includes(w));
}

function toBrote(text) {
  const lower = text.toLowerCase();
  let translation = "";
  const breakdown = [];

  for (const ch of lower) {
    if (alphabet[ch]) {
      if (translation && !translation.endsWith(" ")) translation += " ";
      translation += alphabet[ch];
      breakdown.push(`${ch}→${alphabet[ch]}`);
    } else {
      translation += ch;
      if (ch.trim()) {
        breakdown.push(`${ch}→${ch}`);
      }
    }
  }

  return { text: translation.trim(), breakdown: breakdown.join(", ") };
}

function fromBrote(text) {
  const words = text.toLowerCase().trim().split(/\s+/);
  let i = 0;
  let translation = "";
  const breakdown = [];

  while (i < words.length) {
    const current = words[i];
    const next = words[i + 1];

    if (next && reservedWords[`${current} ${next}`]) {
      const key = `${current} ${next}`;
      translation += reservedWords[key] + " ";
      breakdown.push(`${key}→${reservedWords[key]}`);
      i += 2;
      continue;
    }

    if (reservedWords[current]) {
      translation += reservedWords[current] + " ";
      breakdown.push(`${current}→${reservedWords[current]}`);
    } else if (inverseAlphabet[current]) {
      translation += inverseAlphabet[current];
      breakdown.push(`${current}→${inverseAlphabet[current]}`);
    } else {
      translation += current;
      breakdown.push(`${current}→${current}`);
    }
    i += 1;
  }

  return { text: translation.trim(), breakdown: breakdown.join(", ") };
}

function traducir() {
  const input = document.getElementById("inputText").value.trim();
  if (!input) {
    document.getElementById("outputText").innerText = "";
    return;
  }

  const isBrote = containsBrote(input);
  const result = isBrote ? fromBrote(input) : toBrote(input);
  const output = `Traducción: ${result.text}\n\n🌱 Desglose:\n${result.breakdown}`;
  document.getElementById("outputText").innerText = output;
}
