//CREACION DE ELEMENTOS

const instrucciones = document.getElementById("contenedorItems");
const contenedor = document.getElementById("contenedorItems");
const botonComenzar = document.getElementById("comenzar");
const video = document.getElementById("video");
const contenedorBoton = document.getElementById("contenedorBotones");
const botonCaptura = document.getElementById("boton_captura");
const contenedorCrearGif = document.getElementById("contenedorCrearGif");

botonComenzar.addEventListener("click", function (e) {
  console.log("dale bolo");
  e.preventDefault();
  instrucciones.remove();
  video.style.display = "unset";
  contenedorBoton.innerHTML = "";
  botonCaptura.style.visibility = "visible";
  contenedorCrearGif.style.height = "460px";
});

/////////////////// VIDEO /////////////////
botonCaptura.addEventListener("click", function(ev){
  
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
    
  })
  .then(record)
  .catch (err => console.log(err)) 
 
});

  function record(stream){
    video.srcObject = stream;
    let recorder = new GifRecorder(stream, {
       type: gif,
       frameRate: 500,
       quality: 50,
    })

    }






// async (e) => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//     })
//   }
// })
// video.style.display = "unset";
// video.getAttribute('src', stream);

//ejectue una funcion que cambie el boton
//});
