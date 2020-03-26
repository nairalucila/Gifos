// API URL
const API_KEY = 'DsV5wrnJyENgZWApbRea3zpRa7YSeHgd';
const API_URL_SEARCH = 'http://api.giphy.com/v1/gifs/search';

// "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
//            URL      + ENDPOINT      ? PARAMS=VALOR & PARAM=OTROVALOR

// SELECCIONAS ELEMENTOS

let botonBuscar = document.getElementById('buscador');
const campoBusqueda = document.getElementById('miBusqueda');
const grillaSugeridos = document.getElementById('grilla-sugeridos');
const titulosSugeridos = document.getElementsByClassName('card-one');



// DECLARAS FUNCIONES

function clickBotonBuscar(evento) {
  evento.preventDefault();
  const valorInput = campoBusqueda.value;
  console.log('click', campoBusqueda.value);
  traerGifsBuscador(valorInput);
}


function traerGifsBuscador(valor) {

  fetch(API_URL_SEARCH + '?q=' + valor + '&api_key=' + API_KEY + '&limit=' + 20)

    .then(function (res) {
      return res.json();
    })

    .then( (param) =>  {
      // let imagen = param.data[0].images.downsized.url; // string q es una url y la guarda en test
     
      
      let imagenes = param.data;
      
      for (let i = 0; i < grillaSugeridos.children.length; i++) {
        const div = grillaSugeridos.children[i];
        
        div.style.backgroundImage = 'url(' + imagenes[i].images.downsized.url + ')';
        div.style.backgroundSize = 'cover';
        div.style.repeat = 'no-repeat';
        div.style.position = 'center';
        //console.log(div, 'lol');
     
      };
      
         
      
    for (let j = 0; j < titulosSugeridos.children.length; j++) {
        
         const titulo = titulosSugeridos.children[j];
        console.log(titulo);
         titulo.textContext = ''; 
    
        //console.log(titulo, 'lol');
      }

      

      

      //ACA TENGO QUE HACER LO DEL TEXTO

    })
    .catch(function (error) {
      console.log(error);
    });
}

//fetch 2
// busqueda seria a una url asi : api-url + q= +  valueofinput + ' &api_key=' + api-key

const urlTendencia = 'https://api.giphy.com/v1/gifs/trending?api_key=DsV5wrnJyENgZWApbRea3zpRa7YSeHgd&limit=&rating=G';
let bloqueTendencias = document.getElementById('grillaTendencia');

function traerGuifsTendencia() {

  fetch(urlTendencia)

    .then(response => {
      return response.json();
    })

    .then(function (valor) {
      /// api explore
      // sacar la url original de data.images.origin.url
      
      let imagenes = valor.data;

      for (let i = 0; i < bloqueTendencias.children.length; i++) {
        const section = bloqueTendencias.children[i];
        console.log(section);
        
        section.style.backgroundImage = 'url(' + imagenes[i].images.downsized.url + ')';
        section.style.backgroundSize = 'cover';
        section.style.repeat = 'no-repeat';
        section.style.position = 'center';

      //   console.log(div, 'lala');
      }




    })
    .catch(function (error) {
      console.log(error);
    });



}

traerGuifsTendencia();


// declaracion vs ejecucion : Declarar es decir que va a hacer la funcion  ejecutar es ordenar que se ejecute ese codigo con los ()
// asignar es mediante el = guardar el valor en alguna variable

// EVENTOS
botonBuscar.onclick = clickBotonBuscar;

campoBusqueda.addEventListener('focus', function () {
  botonBuscar.style.backgroundColor = '#F7C9F3';
});

campoBusqueda.addEventListener('focusout', () => {

  botonBuscar.style.backgroundColor = '#e6e6e6';
});







/**
 * 
 * NAVEGADOR  Aplicacion 
 * 
 * WEB API 
 * DOM
 * TIMEOUT
 * 
 * 
 * parte del DOM  de web
 * document.algo
 * 
 * 
 * EVENTOS , son eventos q ocurren con l interaccion 
 * 
 * mouseover
 * mouseleave
 * click
 * focus
 * dbclick
 * 
 * la agregas a todo el archivo
 * document.addEventListener
 * 
 * agregas una funcion a un el particular
 * element.onclick = function () {}
 * 
 * 
 */