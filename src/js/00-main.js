'use strict';

// Creamos el html de las películas.
function createFilm (obj){
  let article = '<article class="" id="art-' + obj.show.id + '">';
  article += '<p class="js-title">' + obj.show.name + '</p>';
  article +='<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  article += '<i class="fas fa-heart js-heart"></i>';
  article +='</article>';
  return article;
}
// console.log(createFilm);
function createFavourites (obj){
  let list = '<ul>';
  list += '<li class="" id="list-' + obj.show.id + '">';
  list += '<p class="">'+ obj.show.name + '</p>';
  list += '<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  list += '</li>';
  list += '</ul>';
  return list;


}
//Hacemos otra función que PINTA el 1º paso en la página.

function paintFilm (obj){
  let searchedFilm = document.querySelector('.wrapper-films');
  searchedFilm.innerHTML += createFilm(obj);
}
//console.log(paintFilm);

//RECORREMOS el array y llamamos a la función 2º para cada objeto.

function chargeFilm (array){
  document.querySelector('.wrapper-films').innerHTML = '';
  for (let item of array){
    paintFilm (item);
  }
}
//5º ¡¡vamos a crear nuestra lista de Favoritos!!
//creamos una función en la que :
// 1º se le cambie el background (se le añade) cuando se haga "click". (¿dónde?, ya veremos si da tiempo)
// 2º SIIIIIII... es la primera vez que se le da click, se añade a la LISTA DE FAVORITOS que tenemos VACÍA.
// 3º si NOOOOO es la primera vez... se le quita de la lista (cuidado! hay que buscar su índice y quitarla con un splice).
// let favouriteList=[];

function changeHeart (ev){
  let heart = ev.currentTarget.querySelector('.js-heart');
  heart.classList.toggle('background');
  //console.log (changeBackground);
  // if(heart.contains('color')){
  //   // favouriteList.push(¿?);
  // }else{

  // }
}

// función para leer lo que escribe el usuario y activarlo con el botón de búsqeuda.Aquí vamos a hacer el Fetch para empezar a ver los resultados de lo que estamos pintando.(recuerda que hay que poner la url que se nos ha dado + lo que el usuario ponga en el input!!)
const btn = document.querySelector('.js-search-btn');

function userSearch (ev){
  ev.preventDefault();
  const userFilm = document.querySelector('.js-user-Search').value;
  fetch('http://api.tvmaze.com/search/shows?q=' + userFilm )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      chargeFilm (data);
      let articles= document.querySelectorAll('article');
      for (let article of articles){
        article.addEventListener('click',changeHeart);

      }
    });
}
btn.addEventListener('click',userSearch);

// 6º Añadir listeners!!!
// uno para el botón de buscar (cuidado!!!! se debería resetear en cada búsqueda)
// otro para añadir a favoritos
// estaría bien otro para quitar de favoritos
// el último, en el botón del reset de la lista de favoritos, para quitarlos a todos de una vez.