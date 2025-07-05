const esToBr = {
  "hola":"mimi", "culona":"muku", "queso":"miupi", "yo":"mi", "tu":"ti",
  "usted":"usti", "el":"mu", "ella":"mimiu", "nosotros":"nosi",
  "ellos":"lomu", "ellas":"momi", "de":"miu", "la":"my", "en":"nui",
  "y":"yii", "a":"mi", "los":"lisi", "las":"lasi", "un":"numi",
  "una":"nami", "por":"mii", "con":"muku", "para":"paru", "sin":"suni",
  "del":"miku", "al":"mila", "soy":"soi", "eres":"ersi", "es":"esi",
  "somos":"somi", "son":"suni", "que":"ku", "como":"miomu",
  "cuando":"kuni", "donde":"doni", "quien":"quin", "cual":"kuli",
  "porque":"poku", "pero":"peru", "mas":"masi", "menos":"menoi",
  "muy":"muyi", "todo":"todu", "nada":"nami", "algo":"alpi", "si":"sii",
  "no":"nuimu", "ya":"ya", "ahora":"auri", "despues":"desu",
  "antes":"anti", "mi":"mui", "mis":"misi", "tu":"tiu", "tus":"tusi",
  "su":"sumi", "sus":"susi", "nuestro":"nusu", "nuestros":"nusis",
  "hoy":"mimiti", "mañana":"miini", "ayer":"runi", "siempre":"wuwu",
  "nunca":"ninin", "amor":"mimiu", "amigo":"mimo", "familia":"fami",
  "casa":"cami", "trabajo":"tamu", "escuela":"escu", "dinero":"dini",
  "tiempo":"temu", "mano":"mumi", "ojo":"omu", "boca":"bomi",
  "cabeza":"kabi", "corazon":"kori", "feliz":"vify", "triste":"nini",
  "miedo":"runi", "enojo":"noku", "risa":"miji", "sueño":"sumi",
  "hambre":"hami", "sed":"semi", "agua":"agu", "comida":"codi",
  "coche":"cochi", "calle":"kali", "luz":"luzi", "puerta":"puti",
  "ventana":"veni", "mesa":"mesi", "silla":"sili", "juego":"miji",
  "musica":"musi", "baile":"bai", "fiesta":"fesi", "hermosa":"miyi",
  "princesa":"muki", "pene":"mupi", "muslo":"miwu", "tetona":"misi",
  "pinchechota":"muzi"
};

const brToEs = {
  "mimi":"hola", "muku":"culona", "miupi":"queso", "mi":"yo", "ti":"tu",
  "usti":"usted", "mu":"el", "mimiu":"ella", "nosi":"nosotros",
  "lomu":"ellos", "momi":"ellas", "miu":"de", "my":"la", "nui":"en",
  "yii":"y", "mi":"a", "lisi":"los", "lasi":"las", "numi":"un",
  "nami":"una", "mii":"por", "muku":"con", "paru":"para", "suni":"sin",
  "miku":"del", "mila":"al", "soi":"soy", "ersi":"eres", "esi":"es",
  "somi":"somos", "suni":"son", "ku":"que", "miomu":"como", "kuni":"cuando",
  "doni":"donde", "quin":"quien", "kuli":"cual", "poku":"porque",
  "peru":"pero", "masi":"mas", "menoi":"menos", "muyi":"muy",
  "todu":"todo", "nami":"nada", "alpi":"algo", "sii":"si", "nuimu":"no",
  "ya":"ya", "auri":"ahora", "desu":"despues", "anti":"antes", "mui":"mi",
  "misi":"mis", "tiu":"tu", "tusi":"tus", "sumi":"su", "susi":"sus",
  "nusu":"nuestro", "nusis":"nuestros", "mimiti":"hoy", "miini":"mañana",
  "runi":"ayer", "wuwu":"siempre", "ninin":"nunca", "mimiu":"amor",
  "mimo":"amigo", "fami":"familia", "cami":"casa", "tamu":"trabajo",
  "escu":"escuela", "dini":"dinero", "temu":"tiempo", "mumi":"mano",
  "omu":"ojo", "bomi":"boca", "kabi":"cabeza", "kori":"corazon",
  "vify":"feliz", "nini":"triste", "runi":"miedo", "noku":"enojo",
  "miji":"risa", "sumi":"sueño", "hami":"hambre", "semi":"sed",
  "agu":"agua", "codi":"comida", "cochi":"coche", "kali":"calle",
  "luzi":"luz", "puti":"puerta", "veni":"ventana", "mesi":"mesa",
  "sili":"silla", "miji":"juego", "musi":"musica", "bai":"baile",
  "fesi":"fiesta", "miyi":"hermosa", "muki":"princesa", "mupi":"pene",
  "miwu":"muslo", "misi":"tetona", "muzi":"pinchechota"
};

const esAlphabet = {
  a:"mi", b:"mimi", c:"mii", d:"mei", e:"ni", f:"mu", g:"pii", h:"miji",
  i:"mu", j:"mei", k:"miu", l:"miimi", m:"mii", n:"nui", o:"mu", p:"pi",
  q:"ku", r:"ru", s:"si", t:"ti", u:"mu", v:"vivi", w:"wu", x:"xixi",
  y:"yii", z:"zizi"
};

const brAlphabet = {};
for (const [letter, token] of Object.entries(esAlphabet)) {
  if (!brAlphabet[token]) brAlphabet[token] = letter;
}
const brTokens = Object.keys(brAlphabet).sort((a,b) => b.length - a.length);

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function parseBrWord(word) {
  let i = 0;
  let letters = '';
  while (i < word.length) {
    let found = false;
    for (const tok of brTokens) {
      if (word.startsWith(tok, i)) {
        letters += brAlphabet[tok] || '';
        i += tok.length;
        found = true;
        break;
      }
    }
    if (!found) {
      letters += word[i];
      i++;
    }
  }
  return letters;
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
  const detail = [];

  tokens.forEach(t => {
    if (brToEs[t]) {
      words.push(brToEs[t]);
      detail.push(`${t}→${brToEs[t]}`);
    } else {
      const letters = parseBrWord(t);
      words.push(letters);
      detail.push(`${t}→${letters}`);
    }
  });

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
