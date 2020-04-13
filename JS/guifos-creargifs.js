///////////////// TEMAS  /////////////////////

const LINK_DIA = "../CSS/vista-crear-g-light.css";
let LINK_NOCHE = "../CSS/vista-crear-g-dark.css";
const link_logo_dark = "/assets/gifOF_logo_dark.png";
const link_logo_light = "/assets/gifOF_logo.png";
let logoTag = document.getElementById("logoTag");

//desplegar botonera
let desplegable = document.getElementById("temas");
let botonTema = document.getElementById("temabtn");

const btnSDay = document.getElementById("sailorD");
const btnSNight = document.getElementById("sailorN");

const DIA_THEME_NAME = "DIAS";
const NOCHE_THEME_NAME = "NOCHE";

let hojaEstilo = document.getElementById("themeId");

botonTema.addEventListener("click", function () {
  desplegable.style.display = "flex";
});

function traerTemaLocalStorage() {
  let temaAhora = localStorage.getItem("tema");

  if (temaAhora === "NIGHT") {
    eventoTemaNoche();
  } else {
    eventoTemaDia();
  }
}
traerTemaLocalStorage();

let temaActual = DIA_THEME_NAME;

function eventoTemaNoche() {
  hojaEstilo.setAttribute("href", LINK_NOCHE);
  logoTag.setAttribute("src", link_logo_dark);
}

function eventoTemaDia() {
  hojaEstilo.setAttribute("href", LINK_DIA);
  logoTag.setAttribute("src", link_logo_light);
}

btnSNight.addEventListener("click", function () {
  eventoTemaNoche();
  desplegable.style.display = "none";

  localStorage.setItem("tema", "NIGHT");
});

btnSDay.addEventListener("click", function () {
  eventoTemaDia();
  desplegable.style.display = "none";

  localStorage.setItem("tema", "DEFAULT");
});

botonTema.addEventListener("focusout", function (ev) {
  if (ev.relatedTarget === null) {
    desplegable.style.display = "none";
  } else {
    return;
  }
});

/////////////////// VIDEO /////////////////
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
  video.style.display = "block";
  contenedorBoton.style.display = "none";
  botonCaptura.style.visibility = "visible";

  startCamera();
});

let botonCamara = document.getElementById("contenedorBtnCaptura");
let botonListo = document.getElementById("boton_listo");
let divListo = document.getElementById("divListo");

let mediaRecorder; 

function startCamera() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: { width: 832, height: 434 },
    })
    .then((rec) => record(rec))
    .catch((err) => console.log(err));
}
let videoData = [];
let isRecording = false;

////////////// REPETIR CAPTURA ////////////////////

let repetirCaptura = document.getElementById("repetir");

repetirCaptura.addEventListener("click", function (e) {
  window.location.reload()
 
});

function record(stream) {
  video.srcObject = stream; 
  video.play();

  botonCaptura.addEventListener("click", function (ev) {
    ev.preventDefault();

    getTimer();

    // var definida como falso. Cuando isRecoding es true, graba.
    isRecording = !isRecording;

    mediaRecorder = new RecordRTC(stream, {
      type: "gif",
      frameRate: 300,
      width: 832,
      height: 434,
      onGifRecordingStarted: function (e) {
        console.log("esta grabando");
      },
    });

    mediaRecorder.startRecording();
    mediaRecorder.camera = stream;

    botonCamara.style.display = "none";
    botonListo.style.display = "block";
    botonListo.style.position = "relative";
    botonListo.classList.add("boton_cam");
    botonListo.style.backgroundColor = "#FF6161";
    divListo.style.display = "block";
  });
}

////////////////////// LISTO ////////////////////////////
let seccionCargaGif = document.getElementById("seccion_carga_gif");

botonListo.addEventListener("click", function () {
  timerBar.style.display = "flex";

  let barra = document.getElementById("barra");
  arrancarBarraDeCarga(barra);

  console.log("listoo");

  mediaRecorder.stopRecording(stopRecordingCallback);

  
  stopedInterval = true;
});

/////////////// SECCION SUBIR Y REPETIR ////////////////////////

let botonSubir = document.getElementById("boton_subir");
let botonRepetir = document.getElementById("repetir");
const contenedorPreview = document.createElement("div");

function stopRecordingCallback(e) {
  mediaRecorder.camera.stop();

  quitarBotonListo();
 
  // ocultar video del Dom
  video.style.display = "none";

  // crear contenedor para el preview

  const contenedorPreviewUltimo = document.getElementById("video_preview");

  // agregar como hijo al contenedorPreview
  contenedorPreview.classList.add("preview-video");
  contenedorPreview.style.backgroundImage =
    "url(" + mediaRecorder.toURL() + ")";

  contenedorPreviewUltimo.classList.add("video_preview");
  contenedorPreviewUltimo.style.backgroundImage =
    "url(" + mediaRecorder.toURL() + ")";

  gifCreadoBlob = this.getBlob();

  document.getElementById("contenedorCrearGif").appendChild(contenedorPreview);

  ////formData
  let form = new FormData();
  form.append("file", mediaRecorder.getBlob(), "miGif.gif"); //a esta funcion se le pasan datos y el get blob contiene el gif

  console.log(form, "FORM");

  let divPlay = document.getElementById("play");

  botonSubir.addEventListener("click", function () {
    esconderBarraDeCarga();
    seccionCargaGif.style.display = "block";
    divPlay.style.display = "none";

    let previewContenedor = document.getElementById("preview_contenedor");
    contenedorPreview.classList.remove("preview-video");

    let barraDos = document.getElementById("barraSubiendo");
    arrancarBarraDeCarga(barraDos);
    enviarGiphy(form) 
      .then((rep) => {
        traerGifGuardarGaleria(rep.data.id);
        previewContenedor.style.display = "block";
        seccionCargaGif.style.display = "none";
        contenedorCrearGif.style.display = "none";
      }); 

    // ocultar boton subir
  });

  botonSubir.classList.remove("up");
  botonRepetir.classList.remove("back");
  mediaRecorder.destroy();
  mediaRecorder = null;
}

function quitarBotonListo() {
  botonCaptura.style.display = "none";
  contenedor.classList.add("contenedorCargaGif");
  contenedor.classList.remove("contenedorItems");
}

////////////////// FETCH /////////////////////////////

const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_UPLOAD = "http://upload.giphy.com/v1/gifs";

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

let embedUrl;
let gifCreadoBlob;

const API_URL_ENDPOINT = "http://api.giphy.com/v1/gifs/";

function traerGifGuardarGaleria(gif) {
  fetch(API_URL_ENDPOINT + gif + "?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })

    .then((rep) => {
      let gifs = obtenerGifsLS();
      gifs.push(rep);

      console.log("los gifs", rep);

      embedUrl = rep.data.images.downsized.url;

      localStorage.setItem("gifs", JSON.stringify(gifs));

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

///////////////////// CONTADOR /////////////////

let timerBar = document.getElementById("timerBar");

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

////////////////// BOTONES LINKS PREVIEW /////////////////
let botonCopiarEnlace = document.getElementById("copiar_enlace");
let botonDescargar = document.getElementById("descargar");

botonCopiarEnlace.addEventListener("click", function () {
  navigator.clipboard.writeText(embedUrl).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error(err);
    }
  );
});

botonDescargar.addEventListener("click", function () {
  botonDescargar.setAttribute("href", URL.createObjectURL(gifCreadoBlob));
});

///////// BARRA DE CARGA ///////////////////

function arrancarBarraDeCarga(param) {
  let count = 0;
  setInterval(() => {
    param.children[count].style.backgroundColor = "#F7C9F3";
    count++;

    if (count == param.children.length) {
      for (let elemento of param.children) {
        elemento.style.backgroundColor = "#999999";
      }
      count = 0;
    }
  }, 1000);
}

function esconderBarraDeCarga() {
  barra.style.display = "none";
}

//////////////// Link página ///////////////

let linkaPaginaPrincipal = document.getElementById("back");

linkaPaginaPrincipal.setAttribute("href", window.location.origin);


