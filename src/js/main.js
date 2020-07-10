'use strict';

// Creamos el html de las películas.
function createFilm (obj){
  let article = '<article class="" id="' + obj.show.id + '">';
  article += '<p class="js-title">' + obj.show.name + '</p>';
  article +='<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  article += '<i class="fas fa-heart js-heart"></i>';
  article +='</article>';
  return article;
  //hay que poner la imagen alternativa por si no tiene
  //  if (obj.show.image === null){
    //article +='<img class="js-image-film" src="' + imgTemporary + '" alt="Carátula de la película">'
    //}
}
// console.log(createFilm);
function createFavourites (obj){
  let list = '<li class="wrapper-li" id="list-' + obj.show.id + '">';
  list += '<p class="">'+ obj.show.name + '</p>';
  list += '<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  list += '<i class="fas fa-heart js-heart"></i>'
  list += '</li>';
  
  return list;
}

const imgTemporary = 'https://via.placeholder.com/210x295/ffffff/666666/';

//Hacemos otra función que PINTA el 1º paso en la página.

function paintFilm (obj){
  let searchedFilm = document.querySelector('.wrapper-films');
  searchedFilm.innerHTML += createFilm(obj);
}
//console.log(paintFilm);
function paintFavourite (obj){
  let searchedFilm = document.querySelector('.js-favourites');
  searchedFilm.innerHTML += createFavourites(obj);
}
//RECORREMOS el array y llamamos a la función 2º para cada objeto.

function chargeFilm (array){
  document.querySelector('.wrapper-films').innerHTML = '';
  for (let item of array){
    paintFilm (item);
  }
}
function chargeFavourite (array){
  document.querySelector('.js-favourites').innerHTML = '';
  for (let item of array){
    paintFavourite (item);
  }
}
//creamos la lista de Favoritos.
//creamos una función en la que: cambie el color del corazón (según esté en la lista) cuando se haga "click".

let favouriteList=[];
let filteredFilm =[];

function changeHeart (ev){
  let id = parseInt(ev.currentTarget.id);
  let heart = ev.currentTarget.querySelector('.js-heart');
  heart.classList.toggle('background');
  if(heart.classList.contains('background')){
    let favFilm = filteredFilm.find(film => (film.show.id === id));
    favouriteList.push(favFilm);
  }else{
    let index = favouriteList.findIndex(fav => fav.show.id === id);
    if (index >= 0){
      favouriteList.splice(index,1);
    }

  }
  chargeFavourite(favouriteList);
  localStorage.setItem('fav', JSON.stringify(favouriteList));
}

// función para leer lo que escribe el usuario y activarlo con el botón de búsqeuda.
//Aquí vamos a hacer el Fetch para empezar a ver los resultados de lo que estamos pintando.
const btn = document.querySelector('.js-search-btn');

function userSearch (ev){
  ev.preventDefault();
  const userFilm = document.querySelector('.js-user-Search').value;
  fetch('http://api.tvmaze.com/search/shows?q=' + userFilm )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      filteredFilm = data;
      chargeFilm (data);
      let articles= document.querySelectorAll('article');
      for (let article of articles){
        article.addEventListener('click',changeHeart);

      }
    });
}

// listeners
btn.addEventListener('click',userSearch);

// estaría bien otro para quitar de favoritos
// el último, en el botón del reset de la lista de favoritos, para quitarlos a todos de una vez.

// fucnión para recargar la página con la lista de favoritos cargada (si hay favoritos).
function loadPage (){
 let favs = localStorage.getItem('fav');
 if (favs !== null){
   favouriteList = JSON.parse(favs);
   chargeFavourite (favouriteList);
 }
}
window.onload = loadPage;