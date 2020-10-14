window.onload = function() {

    var botonEmpezar = document.getElementById('boton-inicio')
    var botonSiguiente = document.getElementById('boton-siguiente')
    var preguntaContainer = document.getElementById('pregunta-container')
    var elementoPregunta = document.getElementById('pregunta')
    var botonRespuesta = document.getElementById('respuestas')
    
    let preguntasAleatorias, posicionPreguntaActual
    
    botonEmpezar.addEventListener('click', empezarJuego)
    botonSiguiente.addEventListener('click', function(){
        posicionPreguntaActual++;
        proximaPregunta();
    })

    function empezarJuego() {
      botonEmpezar.classList.add('ocultar')
      preguntasAleatorias = listaPreguntas.sort(function(){
        Math.random() - 0.5
      })
      posicionPreguntaActual = 0
      preguntaContainer.classList.remove('ocultar')
      proximaPregunta()
    }
    
    function proximaPregunta() {
      reiniciarEstado()
      mostrarPregunta(preguntasAleatorias[posicionPreguntaActual])
    }
    
    function mostrarPregunta(pregunta) {
      elementoPregunta.innerText = pregunta.titulo
      pregunta.respuestas.forEach(function(respuesta) {
        var button = document.createElement('button')
        button.innerText = respuesta.texto
        button.classList.add('btn')
        if (respuesta.correcto) {
          
          button.dataset.correct = respuesta.correcto
        }
        button.addEventListener('click', elegirRespuesta)
        botonRespuesta.appendChild(button)
      })
    }
    
    function reiniciarEstado() {
      botonSiguiente.classList.add('ocultar')
      while (botonRespuesta.firstChild) {
        botonRespuesta.removeChild(botonRespuesta.firstChild)
      }
    }
    
    function elegirRespuesta() {
      Array.from(botonRespuesta.children).forEach(button => {
        cambiarEstado(button, button.dataset.correct)
      })
      if (preguntasAleatorias.length > posicionPreguntaActual + 1) {
        botonSiguiente.classList.remove('ocultar')
      } else {
        botonEmpezar.innerText = 'Empezar de Nuevo'
        botonEmpezar.classList.remove('ocultar')
      }
    }
    
    function cambiarEstado(element, correct) {
      limpiarEstado(element)
      if (correct) {
        element.classList.add('correcto')
      } else {
        element.classList.add('error')
      }
    }
    
    function limpiarEstado(element) {
      element.classList.remove('correcto')
      element.classList.remove('error')
    }
    
    var listaPreguntas = [
      {
        titulo: 'Que color son las manzanas?',
        respuestas: [
          { texto: 'Rojo', correcto: true },
          { texto: 'Blanco', correcto: false },
          { texto: 'Negro', correcto: false },
          { texto: 'Amarillo', correcto: false }
        ]
      },
     
      {
        titulo: 'Cuantos días tiene el año?',
        respuestas: [
          { texto: '200', correcto: false },
          { texto: '365', correcto: true },
          { texto: '100', correcto: false },
          { texto: '400', correcto: false }
        ]
      },
      {
        titulo: 'Cuántos segundos tiene una hora?',
        respuestas: [
          { texto: '3600', correcto: true },
          { texto: '2600', correcto: false }
        ]
      },
      {
        titulo: 'Que le pareció el Curso de Javascript?',
        respuestas: [
          { texto: 'Malo', correcto: false },
          { texto: 'Excelente!', correcto: true },
          { texto: 'Bueno', correcto: false },
          { texto: 'Regular', correcto: false }
        ]
      }

    ]
}