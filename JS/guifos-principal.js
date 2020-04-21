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
  traeGifSearchYagregarTendencia("puppy", 20, function (e) {
    desplegar.style.visibility = "hidden";
  });
}

// click en input
sectionBusqueda.addEventListener("click", function (e) {
  desplegar.style.visibility = "unset";
});

sectionBusqueda.addEventListener("focusout", function (e) {
  if (e.relatedTarget === null) {
    desplegar.style.visibility = "hidden";
    return;
  }

  if (e.relatedTarget.id === "moon") {
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

const linkNight = "CSS/vista-nocturna.css";
const linkDay = "CSS/vista-normal.css";
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

let open = false;
botonTemas.addEventListener("click", function () {
  if (open) {
    temas.style.display = "none";
    open = false;
  } else {
    temas.style.display = "flex";
    open = true;
  }
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
      console.error(error);
    });
}
const grillaSugeridos = document.getElementById("grilla-sugeridos");

for (let index = 0; index < grillaSugeridos.children.length; index++) {
  const div = grillaSugeridos.children[index];
  const botonVerMas = div.children[1];

  botonVerMas.addEventListener("click", function () {
    const texto = div.children[0].children[0].textContent;

    let regexp = new RegExp("#([^\\s]*)", "g");
    textoSinHashtag = texto.replace(regexp, "");
    traeGifSearchYagregarTendencia(textoSinHashtag);
    cambiarNombreSpanTendencia(textoSinHashtag);
  });
}

function cambiarNombreSpanTendencia(valor) {
  let palabraTitulo = document.getElementById("tendencia").children[0];

  palabraTitulo.textContent = valor;
}

let bloqueTendencias = document.getElementById("grillaTendencia");

function agregaGifsaTendencia(data) {
  for (let i = 0; i < bloqueTendencias.children.length; i++) {
    const section = bloqueTendencias.children[i];
    const palabra = data[i].title;

    section.style.backgroundImage = "url(" + data[i].images.downsized.url + ")";
    section.style.backgroundSize = "cover";
    section.style.backgroundRepeat = "no-repeat";
    section.style.backgroundPosition = "center";

    let cambios = bloqueTendencias.children[i].children[0].children[0];

    if (!palabra || palabra == " ") {
      cambios.textContent = "#GIF";
    } else {
      cambios.textContent = agregarHashtag(palabra);
    }

    bloqueTendencias.children[i].addEventListener("mouseenter", function () {
      bloqueTendencias.children[i].children[0].style.display = "flex";
    });

    bloqueTendencias.children[i].addEventListener("mouseleave", function () {
      bloqueTendencias.children[i].children[0].style.display = "none";
    });
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
    })
    .catch(function (error) {
      console.error(error);
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
let direccion = function () {
  const locationArray = window.location.href.split("/");
  locationArray.length = locationArray.length - 1;

  return locationArray.join("/");
};

locationMisGifs.setAttribute("href", direccion() + "/html/index-crear-g.html");
locationCreateGifs.setAttribute(
  "href",
  direccion() + "/html/index-crear-g.html"
);

//////////////// CONTADOR DE VISITAS /////////////////

let visitorCounter = document.getElementById("visitorCounter");

let n = localStorage.getItem("on_load_counter");

if (n === null) {
  n = 0;
}

n++;

localStorage.setItem("on_load_counter", n);

visitorCounter.innerHTML = n;

////// SECCION TENDENCIA //////

function agregarHashtag(oracion) {
  const palabras = oracion.split(" ");

  for (let i = 0; i < palabras.length; i++) {
    const palabra = "#" + palabras[i];
    palabras[i] = palabra;
  }

  return palabras.join(" ");
}
