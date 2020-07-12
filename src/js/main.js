'use strict';
//Globales
let favouriteList=[];
let filteredFilm =[];
const btn = document.querySelector('.js-search-btn');
// const cross =document.querySelector ('.fa-times-circle');
const imgTemporary = 'https://via.placeholder.com/210x295/ffffff/666666/';

//Funciones.
// HTML de las películas.
function createFilm (obj){
  let article = '<article class="" id="art-' + obj.show.id + '">';
  article += '<p class="js-title">' + obj.show.name + '</p>';
  if (obj.show.image === null){
    article +='<img class="js-image-film" src="' + imgTemporary + '" alt="Carátula de la película">';
  }else {
    article +='<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  }
  if (favouriteList.findIndex(film => (film.show.id === obj.show.id))>=0){
    article += '<i class="fas fa-heart js-heart background"></i>';
  }else{
    article += '<i class="fas fa-heart js-heart"></i>';
  }
  article +='</article>';
  return article;
}

// HTML de los favoritos.
function createFavourites (obj){
  let list = '<li class="wrapper-li >';
  list += '<p class="">'+ obj.show.name + '</p>';
  if (obj.show.image === null){
    list +='<img class="js-image-film" src="' + imgTemporary + '" alt="Carátula de la película">';
  } else {
    list += '<img class="js-image-film" src="' + obj.show.image.medium + '" alt="Carátula de la película">';
  }
  list += '<i class="fas fa-times-circle" id="list-' + obj.show.id + '"></i>';
  list += '</li>';
  return list;
}

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
  // for (let i=0; i<array.length; i++){
  //   paintFilm(i);
  // }
}
function chargeFavourite (array){
  document.querySelector('.js-favourites').innerHTML = '';
  for (let item of array){
    paintFavourite (item);
  }
  let cross =document.querySelectorAll ('.fa-times-circle');
  for (let item of cross){
    item.addEventListener('click',removeFavs);
  }
}
// función para leer lo que escribe el usuario y activarlo con el botón de búsqeuda.
//Aquí vamos a hacer el Fetch para empezar a ver los resultados de lo que estamos pintando.

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
//creamos la lista de Favoritos. Una función en la que se cambie el color del corazón cuando se haga "click".

function changeHeart (ev){
  let id = parseInt(ev.currentTarget.id.substring(4));
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
//función con la que se pueden quitar los favoritos de la lista de favoritos

function removeFavs (ev){
  let id = parseInt(ev.currentTarget.id.substring(5));
  let index = favouriteList.findIndex(fav => fav.show.id === id);
  if (index >= 0){
    favouriteList.splice(index,1);
  }
  chargeFavourite(favouriteList);
  let article= document.querySelector('#art-'+id);
  if(article !== null){
    let heart = article.querySelector('.js-heart');
    heart.classList.remove('background');
  }
  localStorage.setItem('fav', JSON.stringify(favouriteList));
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