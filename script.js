const dictionary = {
  'hola': 'mi-mi',
  'adios': 'bai-mi',
  'gracias': 'mimi-mi mu',
  'queso': 'miu pi',
  'amor': 'mi mi',
  'meica': 'mei'
};

// Simple letter-to-token mapping used when a word is not in the dictionary
const letterRules = {
  a: 'mi',
  b: 'ba',
  c: 'ci',
  d: 'di',
  e: 'ni',
  f: 'fi',
  g: 'gi',
  h: 'ha',
  i: 'mu',
  j: 'ji',
  k: 'ki',
  l: 'li',
  m: 'mii',
  n: 'na',
  o: 'oi',
  p: 'pi',
  q: 'ku',
  r: 'ri',
  s: 'si',
  t: 'ti',
  u: 'u',
  v: 'vi',
  w: 'wa',
  x: 'xi',
  y: 'yi',
  z: 'zi',
  'ñ': 'niu'
};

function translateWord(word) {
  if (dictionary[word]) {
    return { text: dictionary[word], details: [`${word}: ${dictionary[word]}`] };
  }

  const letters = word.split('');
  const tokens = [];
  const details = [`${word}:`];

  for (const l of letters) {
    const token = letterRules[l] || l;
    tokens.push(token);
    details.push(`  ${l}\u2192${token}`);
  }

  return { text: tokens.join(' '), details };
}

function translate() {
  const text = document.getElementById('inputText').value.trim().toLowerCase();
  if (!text) return;

  const words = text.split(/\s+/);
  const translated = [];
  const breakdown = [];

  for (const w of words) {
    const res = translateWord(w);
    translated.push(res.text);
    breakdown.push(...res.details);
  }

  document.getElementById('outputText').innerText =
    translated.join(' ') + '\n\n' + breakdown.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('translateBtn').addEventListener('click', translate);
});
