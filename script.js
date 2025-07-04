const loveWords = ["love", "amo", "愛", "愛してる"];
const thanksWords = ["thanks", "thank you", "gracias", "ありがとう"];
const cheeseWords = ["cheese", "queso", "チーズ"];
const helloWords = ["hello", "hola", "こんにちは"];

function traducirNormal(text) {
  text = text.toLowerCase();

  if (loveWords.some(word => text.includes(word))) {
    return "mi-mi mi";
  }
  if (thanksWords.some(word => text.includes(word))) {
    return "mimi-mi mu";
  }
  if (cheeseWords.some(word => text.includes(word))) {
    return "miu pi";
  }
  if (helloWords.some(word => text.includes(word))) {
    return "mu mimi";
  }
  return "\uD83C\uDF31 (miu? no entiendo eso)";
}

function traducirInverso(brote) {
  let desglose = "";
  let traduccion = "";

  if (brote.includes("mi-mi")) {
    desglose += "- mi-mi = tú\n";
    traduccion += "te ";
  }
  if (brote.includes("mi")) {
    desglose += "- mi = amo / amor\n";
    traduccion += "amo ";
  }
  if (brote.includes("mei-mi")) {
    desglose += "- mei-mi = Meica\n";
    traduccion += "Meica ";
  }
  if (brote.includes("ni")) {
    desglose += "- ni = cariño peque\n";
    traduccion += "(peque) ";
  }
  if (brote.includes("mimi-mi")) {
    desglose += "- mimi-mi = gracias\n";
    traduccion += "gracias ";
  }
  if (brote.includes("miu pi")) {
    desglose += "- miu pi = queso\n";
    traduccion += "queso ";
  }
  if (brote.includes("mu mimi")) {
    desglose += "- mu mimi = hola\n";
    traduccion += "hola ";
  }

  return `Traducción: ${traduccion.trim()}\n\n\uD83C\uDF31 Desglose broteñol:\n${desglose.trim()}`;
}

function traducir() {
  const input = document.getElementById("inputText").value.trim();
  let output = "";

  if (/mi|mii|mimi|mei|ni|mu|miu/.test(input)) {
    output = traducirInverso(input.toLowerCase());
  } else {
    output = traducirNormal(input);
  }

  document.getElementById("outputText").innerText = output;
}
