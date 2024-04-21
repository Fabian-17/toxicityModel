const threshold = 0.55; // Umbral de confianza para la clasificación de toxicidad

async function init() {
  const model = await toxicity.load(threshold); // Carga el modelo de toxicidad

  // Muestra el botón de clasificación
  document.getElementById('classifyButton').addEventListener('click', classify.bind(null, model));
}

function classify(model) {
  const userInput = document.getElementById('userInput').value; // Obtiene la frase ingresada por el usuario
  const appElement = document.getElementById('app'); // Obtiene el elemento donde se mostrarán los resultados

  if (!userInput) {
    alert('Por favor ingrese una frase.');
    return;
  }

    // Clasifica la frase ingresada por el usuario
  model.classify([userInput]).then((predictions) => {
    const sentenceDiv = document.createElement('div'); // Crea un elemento div para mostrar la frase y los resultados
    sentenceDiv.textContent = userInput; // Muestra la frase ingresada por el usuario

    const resultsList = document.createElement('ul'); // Crea una lista para mostrar los resultados

    // Muestra los resultados de la clasificación
    predictions.forEach((prediction) => {
      const listItem = document.createElement('li'); // Crea un elemento li para mostrar el resultado
      listItem.textContent = `${prediction.label}: ${prediction.results[0].match}`; // Muestra la etiqueta y el resultado
      resultsList.appendChild(listItem); // Agrega el elemento li a la lista
    });

    sentenceDiv.appendChild(resultsList); // Agrega la lista de resultados al elemento div
    appElement.appendChild(sentenceDiv); // Agrega el elemento div al elemento app
  }).catch((error) => {
    console.error("Error al clasificar la frase:", error); // Muestra un mensaje de error en la consola
  });
}

// Llama a la función init() al cargar la página
init();