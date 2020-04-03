// SELECCIONAS ELEMENTOS

// api url
const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_SEARCH = "http://api.giphy.com/v1/gifs/search";

let botonBuscar = document.getElementById("buscador");
const campoBusqueda = document.getElementById("miBusqueda");
const titulosSugeridos = document.getElementsByClassName("card-one");
const desplegar = document.getElementById("desplegable");
const temas = document.getElementById("temas");
const botonTemas = document.getElementById("temabtn");

//botones temas
const btnSDay = document.getElementById("sailorD");
const btnSNight = document.getElementById("sailorN");

//const sailorDay = document.getElementsByTagName("head")[0].children[2];
//const sailorNight = document.getElementById("sailorNight") //[0].children[3];

//console.log('holiwis', btnSNight);

// EVENTOS

botonBuscar.onclick = clickBotonBuscar;

campoBusqueda.addEventListener("focus", function() {
  botonBuscar.style.backgroundColor = "#F7C9F3";
});

campoBusqueda.addEventListener("focusout", () => {
  botonBuscar.style.backgroundColor = "#e6e6e6";
});

// despliega botones del buscador
campoBusqueda.addEventListener("click", function() {
  desplegar.style.display = "flex";
});

campoBusqueda.addEventListener("focusout", function() {
  desplegar.style.display = "none";
});

//desplegar boton de tema

botonTemas.addEventListener("click", function() {
  temas.style.display = "flex";
});

const linkNight = "../CSS/vista-nocturna.css";
const linkDay = "../CSS/vista-normal.css";
const DIA_THEME_NAME = 'DIAS'
const NOCHE_THEME_NAME = 'NOCHE'

let temaActual = DIA_THEME_NAME;

botonTemas.addEventListener("focusout", function() {

  const sailorDay = document.getElementById("themeId");

  if (temaActual === DIA_THEME_NAME) {
    sailorDay.setAttribute("href", linkNight);

    temaActual = NOCHE_THEME_NAME;
  } else {
    sailorDay.setAttribute("href", linkDay);

    temaActual = DIA_THEME_NAME;
  }

  temas.style.display = "none";
});

//--

// DECLARAS FUNCIONES

function clickBotonBuscar(evento) {
  evento.preventDefault();
  const valorInput = campoBusqueda.value;
  traerGuifsTendencia(valorInput);
  cambiarNombreSpan(valorInput);
}

// CAMBIOS EN DOM

function cambiarNombreSpan(valor) {
  let palabraTitulo = document.getElementById("tendencia").children[0];

  palabraTitulo.textContent = valor;
}

// conjuntoImagenes [datagif]

// TODO: function setearTituloTendencia(titulo) { tomas el domelement , seteas el texto  }

function setearTendenciaConGifs(conjuntoImagenes) {
  let bloqueTendencias = document.getElementById("grillaTendencia");

  for (let i = 0; i < bloqueTendencias.children.length; i++) {
    const section = bloqueTendencias.children[i];

    section.style.backgroundImage =
      "url(" + conjuntoImagenes[i].images.downsized.url + ")";
    section.style.backgroundSize = "cover";
    section.style.repeat = "no-repeat";
    section.style.position = "center";
  }
}

function setearSugueridos(param) {
  const grillaSugeridos = document.getElementById("grilla-sugeridos");

  for (let i = 0; i < grillaSugeridos.children.length; i++) {
    const div = grillaSugeridos.children[i];
    const card = div.children[0];
    //console.log('yo soy', i);
    card.children[0].textContent = "#" + param[i].title;

    div.style.backgroundImage = "url(" + param[i].images.downsized.url + ")";
    div.style.backgroundSize = "cover";
    div.style.repeat = "no-repeat";
    div.style.position = "center";

    //TODO: seleccionas el span y a ese span le cambias el texto con lo q tenga param
  }
}

// LLAMADAS API

function traerGuifsTendencia(palabra, limite = 20) {
  const urlTendencia =
    "http://api.giphy.com/v1/gifs/search?q=" +
    palabra +
    "&api_key=" +
    API_KEY +
    "&limit=" +
    limite;

  // TODO: setearTituloTendencia(palabra)

  fetch(urlTendencia)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(function(valor) {
      /// api explore
      // sacar la url original de data.images.origin.url

      let imagenes = valor.data;
      setearTendenciaConGifs(imagenes);
    })
    .catch(function(error) {
      console.log(error);
    });
}

traerGuifsTendencia();

function traerGifsSugeridas(valor) {
  const urlSugeridos =
    "https://api.giphy.com/v1/gifs/trending?api_key=DsV5wrnJyENgZWApbRea3zpRa7YSeHgd&limit=&rating=G";

  fetch(urlSugeridos)
    .then(function(res) {
      return res.json();
    })

    .then(param => {
      let imagenes = param.data;
      setearSugueridos(imagenes);

      //ACA TENGO QUE HACER LO DEL TEXTO
    })
    .catch(function(error) {
      console.log(error);
    });
}

traerGifsSugeridas();

//funcion

/**
let a = ['ff', 'ghg', 'ghh', 'jfd', 'fjhj'];

for(let i = 0; i < 10; i++){

    console.log('ahora yo soy i', i);

}*/
