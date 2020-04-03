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
const btnSDay = document.getElementById("sailorDay");
const btnSNight = document.getElementById("sailorNight");

const sailorDay = document.getElementsByTagName("head")[0].children[2];
const sailorNight = document.getElementsByTagName("head")[0].children[3];

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

botonTemas.addEventListener("focusout", function() {
  temas.style.display = "none";
});

//--

btnSNight.addEventListener("click", function(evento) {
  evento.preventDefault();
  sailorDay.href = "";
  sailorNight.href = "www.google.com";
});

// DECLARAS FUNCIONES

function clickBotonBuscar(evento) {
  evento.preventDefault();
  const valorInput = campoBusqueda.value;
  console.log("click", campoBusqueda.value);
  traerGuifsTendencia(valorInput);
}

//Fetch Random

// function gifsRandom() {
//   let urlSearchRandom =
//     "https://api.giphy.com/v1/gifs/random?api_key=DsV5wrnJyENgZWApbRea3zpRa7YSeHgd&tag=random&rating=G";

//   fetch(urlSearchRandom)
//     .then(function(response) {
//       return response.json();
//     })

//     .then(function(random) {
//       let gifs = random.data;
//       console.log(gifs);

//       for (let i = 0; i < grillaSugeridos.children.length; i++) {
//         const gifsRnd = grillaSugeridos.children[i];

//         gifsRnd.style.backgroundImage =
//           "url(" + gifsRnd[i].id.embed_url.images.downsized + ")";
//         gifsRnd.style.backgroundSize = "cover";
//         gifsRnd.style.repeat = "no-repeat";
//         gifsRnd.style.position = "center";
//       }
//     })

//     .catch(function(error) {
//       console.log(error);
//     });
// }

// gifsRandom();

//fetch 2



// CAMBIOS EN DOM

// conjuntoImagenes [datagif]

function setearTendenciaConGifs(conjuntoImagenes) {

  let bloqueTendencias = document.getElementById("grillaTendencia");

  for (let i = 0; i < bloqueTendencias.children.length; i++) {
    const section = bloqueTendencias.children[i];
    console.log(section);

    section.style.backgroundImage =
      "url(" + conjuntoImagenes[i].images.downsized.url + ")";
    section.style.backgroundSize = "cover";
    section.style.repeat = "no-repeat";
    section.style.position = "center";
  }
}

function setearSugueridos(param){
  
  const grillaSugeridos = document.getElementById("grilla-sugeridos");
  
  

  for (let i = 0; i < grillaSugeridos.children.length; i++) {
    const div = grillaSugeridos.children[i];

    div.style.backgroundImage =
      "url(" + param[i].images.downsized.url + ")";
    div.style.backgroundSize = "cover";
    div.style.repeat = "no-repeat";
    div.style.position = "center";
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

  fetch(urlTendencia)
    .then(response => {
      console.log(response)
      return response.json();
    })
    .then(function(valor) {
      /// api explore
      // sacar la url original de data.images.origin.url

      let imagenes = valor.data;
      setearTendenciaConGifs(imagenes)
    })
    .catch(function(error) {
      console.log(error);
    });
}

traerGuifsTendencia("pony");

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

//funcion 