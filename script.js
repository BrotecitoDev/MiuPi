const dictionary = {
  'hola': 'mi-mi',
  'adios': 'bai-mi',
  'gracias': 'mimi-mi mu',
  'queso': 'miu pi',
  'amor': 'mi mi',
  'meica': 'mei'
};

// Mapping from characters to indices expected by the model
const charToIndex = { m: 0, e: 1, i: 2, c: 3, a: 4 };
// Mapping from model output indices to brote\u00f1ol tokens
const indexToToken = ['mii', 'ni', 'mu', 'mii', 'mi'];

let modelPromise;

function loadModel() {
  if (!modelPromise) {
    modelPromise = tf.loadLayersModel('model.json');
  }
  return modelPromise;
}

async function translateWord(word) {
  if (dictionary[word]) {
    return { text: dictionary[word], details: [`${word}: ${dictionary[word]}`] };
  }
  const model = await loadModel();
  const letters = word.split('');
  const tokens = [];
  const details = [`${word}:`];

  for (const l of letters) {
    const idx = charToIndex[l] !== undefined ? charToIndex[l] : 0;
    const input = tf.tensor2d([[idx]]);
    const result = model.predict(input);
    const outIdx = result.argMax(-1).dataSync()[0];
    const token = indexToToken[outIdx] || '?';
    tokens.push(token);
    details.push(`  ${l}\u2192${token}`);
    input.dispose();
    result.dispose();
  }

  return { text: tokens.join(' '), details };
}

async function translate() {
  const text = document.getElementById('inputText').value.trim().toLowerCase();
  if (!text) return;

  const words = text.split(/\s+/);
  const translated = [];
  const breakdown = [];

  for (const w of words) {
    const res = await translateWord(w);
    translated.push(res.text);
    breakdown.push(...res.details);
  }

  document.getElementById('outputText').innerText = translated.join(' ') + '\n\n' + breakdown.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('translateBtn').addEventListener('click', translate);
});
