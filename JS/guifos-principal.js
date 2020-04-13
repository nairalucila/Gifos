///////////// ELEMENTOS /////////////

const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_SEARCH = "http://api.giphy.com/v1/gifs/search";

const titulosSugeridos = document.getElementsByClassName("card-one");
const temas = document.getElementById("temas");
const botonTemas = document.getElementById("temabtn");

//////////// CAMPO BUSQUEDA //////////////

const botonBuscar = document.getElementById("buscador");
const campoBusqueda = document.getElementById("miBusqueda");
const sectionBusqueda = document.getElementById("formBusqueda");
const desplegar = document.getElementById("desplegable");

function clickBotonBuscar(evento) {
  evento.preventDefault();
  const valorInput = campoBusqueda.value;
  traeGifSearchYagregarTendencia(valorInput);
  cambiarNombreSpanTendencia(valorInput);
}

botonBuscar.onclick = clickBotonBuscar;

//////////// TRAER RESP DE SAILOR MOON ///////////////////

let btnMoonSearch = document.getElementById("moon");

function btnMoonClick() {
  traeGifSearchYagregarTendencia("sailor moon", 20, function (e) {
    console.log("prim", e);
    desplegar.style.visibility = "hidden";
  });
}

////////////// TRAER RESP OTTERS ////////////////////

let otters = document.getElementById("otters");

function traerGifsOtters() {
  traeGifSearchYagregarTendencia("baby otters", 20, function () {
    desplegar.style.visibility = "hidden";
  });
}

////////////// TRAER RESP PUPPY ////////////////
let puppys = document.getElementById("puppy");

function traerGifPuppy() {
  console.log("puppy");
  traeGifSearchYagregarTendencia("puppy", 20, function (e) {
    desplegar.style.visibility = "hidden";
  });
}

// click en input
sectionBusqueda.addEventListener("click", function (e) {
  desplegar.style.visibility = "unset";
});

sectionBusqueda.addEventListener("focusout", function (e) {
  console.log(e);

  if (e.relatedTarget === null) {
    desplegar.style.visibility = "hidden";
    return;
  }

  if (e.relatedTarget.id === "moon") {
    console.log("yupi");
    btnMoonClick();
    cambiarNombreSpanTendencia("sailor moon");
    return;
  }

  if (e.relatedTarget.id === "otters") {
    traerGifsOtters();
    cambiarNombreSpanTendencia("baby otter");
    return;
  }

  if (e.relatedTarget.id === "puppy") {
    traerGifPuppy();
    cambiarNombreSpanTendencia("puppy");
    return;
  }
});

////// boton buscar

campoBusqueda.addEventListener("focus", function () {
  botonBuscar.style.backgroundColor = "#F7C9F3";
});

campoBusqueda.addEventListener("focusout", () => {
  botonBuscar.style.backgroundColor = "#e6e6e6";
});

//////////////////////// TEMA /////////////////////

const linkNight = "../CSS/vista-nocturna.css";
const linkDay = "../CSS/vista-normal.css";
const DIA_THEME_NAME = "DIAS";
const NOCHE_THEME_NAME = "NOCHE";

//botones temas
const btnSDay = document.getElementById("sailorD");
const btnSNight = document.getElementById("sailorN");
const linkHojaEstilos = document.getElementById("themeId");

let linkLogoDark = "assets/gifOF_logo_dark.png";
let linkLogoLight = "assets/gifOF_logo.png";
let logoDarkImg = document.getElementById("logoDarkImg");

function traerTemaLocalStorage() {
  let temaAhora = localStorage.getItem("tema");

  if (temaAhora === "NIGHT") {
    linkHojaEstilos.setAttribute("href", linkNight);
    logoDarkImg.setAttribute("src", linkLogoDark);
  } else {
    linkHojaEstilos.setAttribute("href", linkDay);
    logoDarkImg.setAttribute("src", linkLogoLight);
  }
}
traerTemaLocalStorage();

btnSDay.addEventListener("click", function () {
  linkHojaEstilos.setAttribute("href", linkDay);
  temas.style.display = "none";
  logoDarkImg.setAttribute("src", linkLogoLight);
  localStorage.setItem("tema", "DEFAULT");
});
btnSNight.addEventListener("click", function () {
  linkHojaEstilos.setAttribute("href", linkNight);
  temas.style.display = "none";
  logoDarkImg.setAttribute("src", linkLogoDark);

  localStorage.setItem("tema", "NIGHT");
});

botonTemas.addEventListener("click", function () {
  temas.style.display = "flex";
});

botonTemas.addEventListener("focusout", function (ev) {
  if (ev.relatedTarget === null) {
    temas.style.display = "none";
  } else {
    return;
  }
});
let temaActual = DIA_THEME_NAME;

//////////////////////// TENDENCIA ///////////////////////

function traeGifSearchYagregarTendencia(palabra, limite = 20, callback) {
  const urlTendencia =
    "http://api.giphy.com/v1/gifs/search?q=" +
    palabra +
    "&api_key=" +
    API_KEY +
    "&limit=" +
    limite;

  fetch(urlTendencia)
    .then((response) => {
      return response.json();
    })
    .then(function (valor) {
      let imagenes = valor.data;
      agregaGifsaTendencia(imagenes);

      if (callback) {
        callback();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
const grillaSugeridos = document.getElementById("grilla-sugeridos");
console.log("el boton", grillaSugeridos.children);

for (let index = 0; index < grillaSugeridos.children.length; index++) {
  const div = grillaSugeridos.children[index];
  const botonVerMas = div.children[1];

  botonVerMas.addEventListener("click", function () {
    const texto = div.children[0].children[0].textContent;

    let regexp = new RegExp("#([^\\s]*)", "g");
    textoSinHashtag = texto.replace(regexp, "");
    console.log(textoSinHashtag);
    traeGifSearchYagregarTendencia(textoSinHashtag);
    cambiarNombreSpanTendencia(textoSinHashtag);
  });
}

function setearTituloSugeridos(param) {
  for (let i = 0; i < botonVerMasGrillas; i++) {
    let botones = botonVerMasGrillas[i];

    botones.textContent = param[i].title;
  }
}

function cambiarNombreSpanTendencia(valor) {
  let palabraTitulo = document.getElementById("tendencia").children[0];

  palabraTitulo.textContent = valor;
}

function agregaGifsaTendencia(data) {
  let bloqueTendencias = document.getElementById("grillaTendencia");

  for (let i = 0; i < bloqueTendencias.children.length; i++) {
    const section = bloqueTendencias.children[i];

    section.style.backgroundImage = "url(" + data[i].images.downsized.url + ")";
    section.style.backgroundSize = "cover";
    section.style.backgroundRepeat = "no-repeat";
    section.style.backgroundPosition = "center";
  }
}

traeGifSearchYagregarTendencia();

///////////////////////////// SUGERIDOS //////////////////////////////

function traerGifsSugeridas(valor) {
  const urlSugeridos =
    "https://api.giphy.com/v1/gifs/trending?api_key=DsV5wrnJyENgZWApbRea3zpRa7YSeHgd&limit=&rating=G";

  fetch(urlSugeridos)
    .then(function (res) {
      return res.json();
    })

    .then((param) => {
      let imagenes = param.data;

      setearSugueridos(imagenes);
      setearTituloSugeridos(imagenes);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setearSugueridos(param) {
  for (let i = 0; i < grillaSugeridos.children.length; i++) {
    const div = grillaSugeridos.children[i];
    const card = div.children[0];

    card.children[0].textContent = "# " + param[i].title;

    div.style.backgroundImage = "url(" + param[i].images.downsized.url + ")";
    div.style.backgroundSize = "cover";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundPosition = "center";
  }
}

traerGifsSugeridas();

//////////////// Link página ///////////////

let locationMisGifs = document.getElementById("misGifs");
let locationCreateGifs = document.getElementById("createGifs");

locationMisGifs.setAttribute(
  "href",
  window.location.origin + "/html/index-crear-g.html"
);
locationCreateGifs.setAttribute(
  "href",
  window.location.origin + "/html/index-crear-g.html"
);

/////////////////////////// VISITAS ////////////////////////

let tituloPagina = document.getElementById("h2Encabezado");
let numeroVisitas = document.getElementById("visitas");

console.log("leem", numeroVisitas);

let count = 100.0;

setInterval(() => {
  numeroVisitas.textContent = numeroVisitas[count];
  count++;
}),
  500;
