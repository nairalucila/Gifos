//CREACION DE ELEMENTOS

const instrucciones = document.getElementById("contenedorItems");
const contenedor = document.getElementById("contenedorItems");
const botonComenzar = document.getElementById("comenzar");
const video = document.getElementById("video");
const contenedorBoton = document.getElementById("contenedorBotones");
const botonCaptura = document.getElementById("boton_captura");
const contenedorCrearGif = document.getElementById("contenedorCrearGif");

botonComenzar.addEventListener("click", function (e) {
  e.preventDefault();
  instrucciones.remove();
  video.style.display = "unset";
  contenedorBoton.innerHTML = "";
  botonCaptura.style.visibility = "visible";
  contenedorCrearGif.style.height = "460px";

  startCamera();
});

/////////////////// VIDEO /////////////////

let botonCamara = document.getElementById("cambtn");

let mediaRecorder; //variable del media recorder

function startCamera() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then(record)
    .catch((err) => console.log(err));
}

function record(stream) {
  video.srcObject = stream; //lo q tome de la camara lo pasa como string
  video.play();

  botonCaptura.addEventListener("click", function (ev) {
    ev.preventDefault();
    // aca hay una var definida como falso. Cuando isRecoding es true, graba
    isRecording = !isRecording;
    if (isRecording === true) {
      mediaRecorder = new RecordRTC(stream, {
        type: "gif",
        frameRate: 30,
        width: 700,
        onGifRecordingStarted: function () {
          console.log("esta grabando");
        },
      });
      mediaRecorder.startRecording();
      mediaRecorder.camera = stream;

      let divCamara = document.getElementById("divCamara");
      let imagenDivCamara = document.getElementById("img-boton-captura");
      

      divCamara.style.backgroundColor = "#FF6161";
      botonCamara.style.backgroundColor = "#FF6161";
      botonCamara.textContent = "Listo";
      imagenDivCamara.getAttribute("src", "/assets/recording.svg");
    } else {
      mediaRecorder.stopRecording(stopRecordingCallback);
     
    }
  });
}

let isRecording = false;

let botonSubir = document.getElementById("boton_subir");

function stopRecordingCallback() {
  mediaRecorder.camera.stop();
  quitarBotonListo();
   
  //detiene la camara y se crea un formdata que es una funcion--
  let form = new FormData();
  form.append("file", mediaRecorder.getBlob(), "miGif.gif"); //a esta funcion se le pasan datos y el get blob contiene el gif
  
  console.log(mediaRecorder.getBlob());

  botonSubir.addEventListener("click", function () {
    enviarGiphy(form) //cuando se hace click en boton subir - se ejcuta la funcion async que trae los datos del fetch con method post y body
      .then((rep) => traerGifGuardarGaleria(rep.data.id)); //aca accedemos al id del gif y se lo pasamos a la fun que guarda ls
    //.then((rep) =>{console.log('a', rep);})

    // ocultar boton subir
  });

  botonSubir.classList.remove("up");
  mediaRecorder.destroy();
  mediaRecorder = null;
}

function quitarBotonListo(){
  botonCaptura.style.display = 'none';

  //aca deberia aparecer el boton de repetir captura

};

const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_UPLOAD = "http://upload.giphy.com/v1/gifs";

//enviar gify es una funcion  asincronica, q dice asegura que se tengan todos los datos del fetch
//se le pasa un parametro que contiene el blob, que viene de FormData - ver linea 83
async function enviarGiphy(form) {
  let response = await fetch(API_URL_UPLOAD + "?api_key=" + API_KEY, {
    method: "POST",
    body: form,
  });
  let rep = await response.json();

  return rep;
 }

const API_URL_ENDPOINT = "http://api.giphy.com/v1/gifs/";

function traerGifGuardarGaleria(gif) {
  fetch(API_URL_ENDPOINT + gif + "?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })

    // utilizar url - datos de rep para mostrar preview - modal -
    //guardo ls -
    /**
     * Tip: Para mostrar previews de nuestro archivo podemos utilizar el método getBlob combinado con createObjectURLpara crear una url que puede ser usada como atributo src de una etiqueta
     */
    //evento - del ls sacar g y mosrtar, grilla

    .then((rep) => {
      // como tomar del localstoragwe o agregar como array un consj de items
      // 
      // var = localStorage.getItem('gifs')
      // var2 = JSON.parse(var)
      // var2.push(rep)
      localStorage.setItem('gifs', JSON.stringify(rep));
      console.log("e", rep);
    })

    .catch();
}
