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

  startCamera();
});

/////////////////// VIDEO /////////////////

function startCamera(){

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
    
  })
  .then(record)
  .catch (err => console.log(err)) 
 
}

  function record(stream){
    video.srcObject = stream;
    
    let mediaRecorder = new MediaRecorder(stream, {
       mimeType: 'video/webm;codecs=h264'
    });

  mediaRecorder.start();

  mediaRecorder.ondataavailable = function(e){
 
    arr.push(e.data);

  }

  mediaRecorder.onstop = function(){
    alert('fin grabacion');

    let blob = new Blob(arr, {type:"video/webm"});
    arr = [];
    download(blob);
    console.log('blobbb', blob);
    console.log('arreglo', arr);

  }

  setTimeout(()=> mediaRecorder.stop(),5000)
}
 
///arreglo en donde se guardan los datos
 let arr = [];

 function download(blob){

  let link =document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "video_recorded.webm")
  link.style.display = 'none';

  document.body.appendChild(link);

  link.click();
  link.remove();
  
 }


///////////// CAMBIO DE BOTON //////////////////////

botonCaptura.addEventListener("click", function(ev){
  ev.preventDefault();
  
  let divCamara = document.getElementById('divCamara');
  let imagenDivCamara = document.getElementById('img-boton-captura')
  let botonCamara = document.getElementById('cambtn');

  divCamara.style.backgroundColor = '#FF6161' ;
  botonCamara.style.backgroundColor = '#FF6161';
  botonCamara.textContent = 'Listo'
  imagenDivCamara.getAttribute('src', '/assets/recording.svg')



 
  
  });






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
