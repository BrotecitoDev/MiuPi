const dictionary = {
  "hola": "mu mimi",
  "te amo": "mi-mi mi",
  "gracias": "mimi-mi mu",
  "queso": "miu pi",
  "i love you": "mi-mi mi",
  "thank you": "mimi-mi mu",
  "cheese": "miu pi",
  "愛してる": "mi-mi mi",
  "ありがとう": "mimi-mi mu",
  "チーズ": "miu pi",
  "こんにちは": "mu mimi"
};

function traducir() {
  const text = document.getElementById("inputText").value.toLowerCase().trim();
  const result = dictionary[text] || "🌱 (miu? no entiendo eso)";
  document.getElementById("outputText").innerText = result;
}
