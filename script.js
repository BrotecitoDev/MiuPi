let model;
const spanish = ['hola','adios','gracias','queso','amor'];
const brote = ['mi-mi','bai-mi','mimi-mi mu','miu pi','mi mi'];
const wordToId = {};
spanish.forEach((w,i)=>{wordToId[w]=i;});

async function loadModel() {
  model = await tf.loadLayersModel('model.json');
}

async function translate() {
  const text = document.getElementById('inputText').value.trim().toLowerCase();
  if(!text || !model) return;
  const words = text.split(/\s+/);
  const out = [];
  for(const w of words) {
    const id = wordToId[w];
    if(id === undefined) {
      out.push('[desconocido]');
      continue;
    }
    const input = tf.tensor2d([[id]]);
    const pred = model.predict(input);
    const idx = (await pred.argMax(-1).data())[0];
    out.push(brote[idx]);
    tf.dispose([input,pred]);
  }
  document.getElementById('outputText').innerText = out.join(' ');
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadModel();
  document.getElementById('translateBtn').addEventListener('click', translate);
});
