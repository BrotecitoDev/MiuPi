const dictionary = {
  'hola': 'mi-mi',
  'adios': 'bai-mi',
  'gracias': 'mimi-mi mu',
  'queso': 'miu pi',
  'amor': 'mi mi'
};

function translate() {
  const text = document.getElementById('inputText').value.trim().toLowerCase();
  if (!text) return;
  const words = text.split(/\s+/);
  const out = words.map(w => dictionary[w] || '[desconocido]');
  document.getElementById('outputText').innerText = out.join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('translateBtn').addEventListener('click', translate);
});
