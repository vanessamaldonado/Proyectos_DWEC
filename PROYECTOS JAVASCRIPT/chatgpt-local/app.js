// Importamos el motor de IA de MLC
import { CreateWebWorkerMLCEngine } from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm";

// --- Referencias a elementos del HTML ---
const form = document.querySelector('form');
const input = document.querySelector('input');
const messagesList = document.querySelector('ul');
const info = document.querySelector('small');
const button = document.querySelector('button');
const loading = document.querySelector('.loading');
const container = document.querySelector('main');

let messages = []; // Aquí guardamos la conversación

// Nombre del modelo que se usará
const MODEL_NAME = 'TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC-1k'


// --- Inicializamos el modelo dentro de un "Web Worker" ---
const engine = await CreateWebWorkerMLCEngine(
  new Worker('./worker.js', { type: 'module' }),
  MODEL_NAME,
  {
    initProgressCallback: (infoStatus) => {
      info.textContent = infoStatus.text;

      // Cuando el modelo termina de cargar
      if (infoStatus.progress === 1) {
        loading.remove(); // Quitamos el mensaje "Cargando..."
        button.disabled = false;
        addMessage("¡Hola! Soy tu asistente IA y funciono dentro del navegador 😄", "bot");
        input.focus();
      }
    }
  }
);

// --- Al enviar el formulario ---
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita recargar la página

  const text = input.value.trim();
  if (text === "") return;

  // Mostramos el mensaje del usuario
  /**************************COMPLETAR************/
 
  addMessage(text,"user");
  input.value="";
  button.disabled=true;

  // Guardamos el mensaje
  messages.push({ role: "user", content: text });

  // Pedimos respuesta al modelo (en streaming)
  const stream = await engine.chat.completions.create({ messages, stream: true });

  let reply = "";
  const messageBox = addMessage("", "bot");
 
  // Recibimos la respuesta poco a poco
  for await (const chunk of stream) {
    const part = chunk.choices[0]?.delta?.content || "";
    reply += part;
    messageBox.textContent = reply;
    messageBox.innerHTML = `<strong>GPT:</strong> ${reply}`;
  }

  // Guardamos la respuesta completa
  messages.push({ role: "assistant", content: reply });
  button.disabled = false;
  container.scrollTop = container.scrollHeight;
});

// --- Función auxiliar para mostrar mensajes en pantalla ---
function addMessage(text, sender) {
 /**************************COMPLETAR************/
 const item = document.createElement('Li');
 item.className = `message ${sender}`;

 const name = sender === 'bot' ? 'GPT' : 'Tú';
 item.innerHTML = `<strong>${name}:</strong> ${text}`;

 messagesList.appendChild(item);
 container.scrollTop = container.scrollHeight;
 return item;

}
