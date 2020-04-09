// SELECCIONAS ELEMENTOS

// api url
const API_KEY = "DsV5wrnJyENgZWApbRea3zpRa7YSeHgd";
const API_URL_SEARCH = "http://api.giphy.com/v1/gifs/search";

const titulosSugeridos = document.getElementsByClassName("card-one");
const temas = document.getElementById("temas");
const botonTemas = document.getElementById("temabtn");

////////////////////////////////////////////////////////////////////
///////////////////////////////////// CAMPO BUSQUEDA //////////////

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

//TRAER RESP DE SAILOR MOON

let btnMoonSearch = document.getElementById("moon");

function btnMoonClick() {
  traeGifSearchYagregarTendencia("sailor moon", 20, function (e) {
    console.log("prim", e);
    desplegar.style.visibility = "hidden";
  });
}

// btnMoonSearch.addEventListener('click', btnMoonCallback)

// TRAER RESP OTTERS

let otters = document.getElementById("otters");

function traerGifsOtters(){

  traeGifSearchYagregarTendencia('baby otters', 20, function(){
    
    desplegar.style.visibility = "hidden";
  })
};

// TRAER RESP PUPPY
let puppys = document.getElementById('puppy')

function traerGifPuppy(){
  console.log('puppy')
  traeGifSearchYagregarTendencia('puppy', 20, function(e){
  
    desplegar.style.visibility = 'hidden';
  })
}


// click en input
sectionBusqueda.addEventListener("click", function (e) {
  desplegar.style.visibility = "unset";
});


sectionBusqueda.addEventListener('focusout', function(e){
   console.log(e);

   if (e.relatedTarget === null){

    desplegar.style.visibility = 'hidden';
    return;
   }

   if (e.relatedTarget.id === 'moon'){
     console.log('yupi')
     btnMoonClick()
     cambiarNombreSpanTendencia('sailor moon')
     return;
    }
    
    if (e.relatedTarget.id ==='otters'){
      //console.log('otter')
      traerGifsOtters()
      cambiarNombreSpanTendencia('baby otter')
      return;
      
    }

    if(e.relatedTarget.id === 'puppy'){
      traerGifPuppy();
      cambiarNombreSpanTendencia('puppy')
      return;
    }

})

// boton buscar

campoBusqueda.addEventListener("focus", function () {
  botonBuscar.style.backgroundColor = "#F7C9F3";
});

campoBusqueda.addEventListener("focusout", () => {
  botonBuscar.style.backgroundColor = "#e6e6e6";
});

/////////////////////////////////////////////////////////////
////////////////////////////////// TEMA /////////////////////

const linkNight = "../CSS/vista-nocturna.css";
const linkDay = "../CSS/vista-normal.css";
const DIA_THEME_NAME = "DIAS";
const NOCHE_THEME_NAME = "NOCHE";

//botones temas
const btnSDay = document.getElementById("sailorD");
const btnSNight = document.getElementById("sailorN");

botonTemas.addEventListener("click", function () {
  temas.style.display = "flex";
});

let temaActual = DIA_THEME_NAME;

botonTemas.addEventListener("focusout", function () {
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

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TENDENCIA /////////////////////////////////////
//let botonVerMasGrillas = document.getElementById('card').children;

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
console.log('el boton', grillaSugeridos.children);

for (let index = 0; index < grillaSugeridos.children.length; index++) {
  const div = grillaSugeridos.children[index];
  const botonVerMas = div.children[1]
  
  botonVerMas.addEventListener('click', function(){
    const texto = div.children[0].children[0].textContent;
    
    let regexp = new RegExp('#([^\\s]*)','g');
    textoSinHashtag = texto.replace(regexp, '');
    console.log(textoSinHashtag)
    traeGifSearchYagregarTendencia(textoSinHashtag);
    cambiarNombreSpanTendencia(textoSinHashtag);
  });

}

function setearTituloSugeridos(param){

    for (let i =0; i < botonVerMasGrillas; i++){
    let botones = botonVerMasGrillas[i];
  
      botones.textContent = param[i].title;

          
  
    }
    
};


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

//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// SUGERIDOS //////////////////////////////

function traerGifsSugeridas(valor) {
  const urlSugeridos =
    "https://api.giphy.com/v1/gifs/trending?api_key=DsV5wrnJyENgZWApbRea3zpRa7YSeHgd&limit=&rating=G";

  fetch(urlSugeridos)
    .then(function (res) {
      return res.json();
    })

    .then((param) => {
      let imagenes = param.data;
      
      //console.log('leeme',param.data)
      setearSugueridos(imagenes);
      setearTituloSugeridos(imagenes);

      //ACA TENGO QUE HACER LO DEL TEXTO
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

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// LLAMADAS API ////////////////////////////
