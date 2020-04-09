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

    getTimer();
    // aca hay una var definida como falso. Cuando isRecoding es true, graba
    isRecording = !isRecording;
    if (isRecording === true) {
      mediaRecorder = new RecordRTC(stream, {
        type: "gif",
        frameRate: 500,
        width: 700,
        height: 700,
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
      imagenDivCamara.getAttribute(src, "/assets/recording.svg");
    } else {
      mediaRecorder.stopRecording(stopRecordingCallback);

      stopedInterval = true;
    }
  });
}

let isRecording = false;

let botonSubir = document.getElementById("boton_subir");
let botonRepetir = document.getElementById("repetir");

function stopRecordingCallback() {
  mediaRecorder.camera.stop();
  quitarBotonListo();

  //detiene la camara y se crea un formdata que es una funcion--
  let form = new FormData();
  form.append("file", mediaRecorder.getBlob(), "miGif.gif"); //a esta funcion se le pasan datos y el get blob contiene el gif

  console.log(form, "FORM");

  botonSubir.addEventListener("click", function () {
    enviarGiphy(form) //cuando se hace click en boton subir - se ejcuta la funcion async que trae los datos del fetch con method post y body
      .then((rep) => traerGifGuardarGaleria(rep.data.id)); //aca accedemos al id del gif y se lo pasamos a la fun que guarda ls
    //.then((rep) =>{console.log('a', rep);})

    // ocultar boton subir
  });

  botonSubir.classList.remove("up");
  botonRepetir.classList.remove("back");
  mediaRecorder.destroy();
  mediaRecorder = null;
}

function quitarBotonListo() {
  botonCaptura.style.display = "none";

  //aca deberia aparecer el boton de repetir captura
}

const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_UPLOAD = "http://upload.giphy.com/v1/gifs";

//enviar gify es una funcion  asincronica, q dice asegura que se tengan todos los datos del fetch
//se le pasa un parametro que contiene el blob, que viene de FormData - ver linea 83
async function enviarGiphy(form) {
  let response = await fetch(API_URL_UPLOAD + "?api_key=" + API_KEY, {
    method: "POST",
    body: form,
    headers: {
      mode: "no-cors",
    },
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
    .then((rep) => {
      let gifs = obtenerGifsLS();
      gifs.push(rep);

      localStorage.setItem("gifs", JSON.stringify(gifs));

      // se generan de nuevo los gifs
      iterarYAgregarEl();
    })
    .catch((e) => console.error(e));
}

function obtenerGifsLS() {
  let gifsLS;

  if (localStorage.getItem("gifs") === null) {
    gifsLS = [];
  } else {
    gifsLS = JSON.parse(localStorage.getItem("gifs"));
  }
  return gifsLS;
}

function iterarYAgregarEl() {
  const gifs = obtenerGifsLS();
  let grillaMisGifos = document.getElementById("grillaMisGifos");

  if (grillaMisGifos.children.length > 0) {
    grillaMisGifos.innerHTML = "";
  }

  console.log("ver", gifs);

  gifs.forEach((gif) => {
    let div = document.createElement("div");
    div.classList.add("card_t");
    div.style.backgroundImage = "url(" + gif.data.images.downsized.url + ")";
    div.style.backgroundSize = "cover";
    grillaMisGifos.appendChild(div);
  });
}

iterarYAgregarEl();

///// Timer

let timer = document.getElementById("timer");
let stopedInterval = false;

function getTimer() {
  timer.classList.remove("timerDisplay");

  let incioContador = 0;
  console.log("get timer ");

  let interval = setInterval(() => {
    incioContador++;

    let minutes = Math.floor(incioContador / 60);
    let seconds = incioContador % 60;
    let formato = seconds < 10 ? `0${seconds}` : seconds;

    timer.textContent = `00:00:0${minutes}:${formato}`;

    if (stopedInterval) {
      clearInterval(interval);
      timer.textContent = "00:00:00:00";
    }
  }, 1000);
}
