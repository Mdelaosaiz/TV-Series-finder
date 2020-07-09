'use strict';

//Pasos a seguri para crear el JS
   


// 1º crear el html de las películas (function getfilm ¿?)
   // '<article class="" id="art-' + object.id + '">
   // '<p class=""' + object.title + '</p>',
   // '<img class="" src="' + object.image + '" alt="Carátula de la película"',
   // '</article>'

// 2º crear otra función que PINTA el 1º paso en la página(de momento sin info dentro).
   // llama al article y lo mete con el innerHTML.

//3º RECORREMOS el array y llama a la función 2º para cada objeto y que, por fin, se vea en la pag.

//4º Aquí vamos a hacer el Fetch para empezar a ver los resultados de lo que estamos pintando ^^.(recuerda que hay que poner la url que se nos ha dado + lo que el usuario ponga en el input!!)

//5º ¡¡vamos a crear nuestra lista de Favoritos!!
   //creamos una función en la que :
   // 1º se le cambie el background (se le añade) cuando se haga "click". (¿dónde?, ya veremos si da tiempo)
   // 2º SIIIIIII... es la primera vez que se le da click, se añade a la LISTA DE FAVORITOS que tenemos VACÍA.
   // 3º si NOOOOO es la primera vez... se le quita de la lista (cuidado! hay que buscar su índice y quitarla con un splice).

// 6º Añadir listeners!!!
   // uno para el botón de buscar (cuidado!!!! se debería resetear en cada búsqueda)
   // otro para añadir a favoritos 
   // estaría bien otro para quitar de favoritos
   // el último, en el botón del reset de la lista de favoritos, para quitarlos a todos de una vez.
