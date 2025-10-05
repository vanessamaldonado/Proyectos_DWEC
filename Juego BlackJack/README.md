# 🃏 Proyecto: Blackjack

## 🎯 Objetivo
Desarrollar un juego de **Blackjack (21)** usando **HTML, CSS y JavaScript**, aplicando estructuras de control, arrays, funciones, eventos y manipulación del DOM...

---

## 📋 Descripción del juego
El **Blackjack** es un juego de cartas entre el jugador y la banca (dealer).  
El objetivo es conseguir una suma de puntos **lo más cercana posible a 21 sin pasarse**.

- Las **cartas numéricas** valen su número.  
- Las **figuras (J, Q, K)** valen 10.  
- El **As (A)** vale 1 u 11, según convenga.  
- Si te pasas de 21 → pierdes automáticamente.  
- Si el jugador se planta, la banca roba hasta llegar a 17 o más.

---

## 🧠 Requisitos funcionales

### 1. Interfaz básica (HTML)
Crea un archivo `index.html` con:

- Un título del juego (“Blackjack”).  
- Una sección donde se muestren las cartas del **jugador** y del **dealer**.  
- Un marcador de puntos de ambos.  
- Botones:
  - `Nuevo Juego`
  - `Pedir Carta`
  - `Plantarse`
- Un área de mensajes para mostrar resultados (“Has ganado”, “Te pasaste”, etc.).

### 2. Estilos (CSS)
Archivo `style.css` con:
- Fondo verde tipo mesa de casino.    
- Estilo para las cartas (pueden ser imágenes o texto tipo `🂡 🂢 🂣`).  

### 3. Lógica del juego (JavaScript)
Archivo `script.js` o `blackjack.js`:

#### a) Generación de baraja
- Crea un array con los palos (`['C', 'D', 'H', 'S']`)  
- Crea otro con los valores (`['2',...,'10','J','Q','K','A']`)  
- Combínalos para formar una baraja de 52 cartas.  
- Usa `_.shuffle()` (de lodash) o una función propia para mezclarla.

#### b) Robar carta
Función `drawCard()` que:
- Devuelva una carta del final de la baraja.
- En caso de quedarse sin cartas, muestre error.

#### c) Calcular valor de carta
Función `getCardValue(card)` que:
- Devuelva su valor numérico según las reglas del Blackjack.

#### d) Turno del jugador
- Al pulsar “Pedir Carta”:
  - Añadir carta visualmente.
  - Actualizar puntaje.
  - Comprobar si pasa de 21 o llega exactamente a 21.

#### e) Turno del dealer
- El dealer roba cartas **automáticamente** hasta tener ≥ 17 puntos o superar al jugador.

#### f) Determinar ganador
Función `determineWinner()` que:
- Compare puntuaciones.
- Muestre mensaje: “Jugador gana”, “Dealer gana” o “Empate”.

#### g) Reiniciar juego
- Botón “Nuevo Juego” debe limpiar todo y crear una nueva baraja mezclada.

---

