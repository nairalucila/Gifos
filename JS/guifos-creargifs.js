///////////////// TEMAS  /////////////////////

const LINK_DIA = "../CSS/vista-crear-g-light.css";
let LINK_NOCHE = "../CSS/vista-crear-g-dark.css";
const link_logo_dark = "/assets/gifOF_logo_dark.png";
const link_logo_light = "/assets/gifOF_logo.png";
let logoTag = document.getElementById("logoTag");

let desplegable = document.getElementById("temas");
let botonTema = document.getElementById("temabtn");

//desplegar botonera
const btnSDay = document.getElementById("sailorD");
const btnSNight = document.getElementById("sailorN");

const DIA_THEME_NAME = "DIAS";
const NOCHE_THEME_NAME = "NOCHE";

let hojaEstilo = document.getElementById("themeId");

botonTema.addEventListener("click", function () {
  desplegable.style.display = "flex";
});

let temaActual = DIA_THEME_NAME;

btnSNight.addEventListener("click", function (ev) {
  if (temaActual === DIA_THEME_NAME) {
    hojaEstilo.setAttribute("href", LINK_NOCHE);
    logoTag.setAttribute("src", link_logo_dark);
    desplegable.style.display = "none";

    temaActual = DIA_THEME_NAME;
    localStorage.setItem("tema", hojaEstilo.setAttribute("href", LINK_NOCHE));
  }
});

localStorage.getItem("tema");

btnSDay.addEventListener("click", function (ev) {
  // si tema == noche
  if (temaActual === DIA_THEME_NAME) {
    hojaEstilo.setAttribute("href", LINK_DIA);
    logoTag.setAttribute("src", link_logo_light);
    desplegable.style.display = "none";

    temaActual = NOCHE_THEME_NAME;
    localStorage.setItem("tema", hojaEstilo.setAttribute("href", LINK_NOCHE));
    console.log("algo");
  }
});

botonTema.addEventListener("focusout", function (ev) {
  if (ev.relatedTarget === null) {
    desplegable.style.display = "none";
  } else {
    return;
  }
});

function extraerTemaNocheLocalStorage() {
  if (temaActual === NOCHE_THEME_NAME) {
    localStorage.getItem("tema", hojaEstilo.setAttribute("href", LINK_NOCHE));
  } else {
    localStorage.getItem("tema", hojaEstilo.setAttribute("href", LINK_DIA));
  }
}
extraerTemaNocheLocalStorage();

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

let botonCamara = document.getElementById("cambtn");
let botonListo = document.getElementById("boton_listo");

let mediaRecorder; //variable del media recorder

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

function record(stream) {
  video.srcObject = stream; //lo q tome de la camara lo pasa como string
  video.play();

  botonCaptura.addEventListener("click", function (ev) {
    ev.preventDefault();

    getTimer();

    // aca hay una var definida como falso. Cuando isRecoding es true, graba.
    isRecording = !isRecording;

    mediaRecorder = new RecordRTC(stream, {
      type: "gif",
      frameRate: 500,
      width: 832,
      height: 434,
      onGifRecordingStarted: function (e) {
      console.log("esta grabando");
      },
    });
    // mediaRecorder.ondataavailable = function(e) {
    //   videoData.push(e.data);
    // };

    mediaRecorder.startRecording();
    mediaRecorder.camera = stream;


    botonCamara.style.display = "none";
    botonListo.style.display = "block";
    botonListo.style.position = "relative";
    botonListo.classList.add("boton_cam");
    botonListo.style.backgroundColor = "#FF6161";
  });
}

///////// Pones listo ///////////////////////////////
let seccionCargaGif = document.getElementById("seccion_carga_gif");

botonListo.addEventListener("click", function () {
  timerBar.style.display = "flex";
  
  let barra = document.getElementById("barra");
  arrancarBarraDeCarga(barra)
  
  console.log("listoo");

  mediaRecorder.stopRecording(stopRecordingCallback);

  stopedInterval = true;
});

/////////////// SECCION SUBIR Y REPETIR ////////////////////////

let botonSubir = document.getElementById("boton_subir");
let botonRepetir = document.getElementById("repetir");

function stopRecordingCallback(e) {
 mediaRecorder.camera.stop();
  // mediaRecorder.resumeRecording()
  quitarBotonListo();
  let blob = this.getBlob();
  // let videoUrl = window.URL.createObjectURL(blob);
  // console.log(mediaRecorder)
  let videoEl = document.getElementById('video')
  console.log(this.toURL())
  console.log('LOOOOOOOOOOL', window.URL)
  // video.srcObject =this.getBlob()
  // video.play()
  // videoEl.play()
  // mediaRecorder.getDataURL(function(e) {
  //   videoEl.src= e
  // });
  // videoEl.play();
  //detiene la camara y se crea un formData
  let form = new FormData();
  form.append("file", mediaRecorder.getBlob(), "miGif.gif"); //a esta funcion se le pasan datos y el get blob contiene el gif

  console.log(form, "FORM");

  //////

  botonSubir.addEventListener("click", function () {
    esconderBarraDeCarga();
    seccionCargaGif.style.display = "block";


    let barraDos = document.getElementById("barraSubiendo");
    arrancarBarraDeCarga(barraDos);
    enviarGiphy(form) //cuando se hace click en boton subir - se ejcuta la funcion async que trae los datos del fetch con method post y body
      .then((rep) => {
        traerGifGuardarGaleria(rep.data.id);
        seccionCargaGif.style.display = "none";
      }); //aca accedemos al id del gif y se lo pasamos a la fun que guarda ls

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

//////////////////////// CONTADOR /////////////////

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
