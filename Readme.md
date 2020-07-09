# Módulo 2: Ejercicio de evaluación final

## Enunciado 

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite des/marcar las series como favoritas y guardarlas en local storage. 
Vamos de definir los distintos hitos del ejercicio: 

## Estructura
La aplicación de búsqueda de series consta de dos partes: 
1. Un campo de texto y un botón para buscar series por su título. 
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título. 

## Funcionamiento

### La búsqueda
- Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para búsqueda de series.  
- Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda. - Por cada show contenido en el resultado de la búsqueda se pintará una tarjeta donde mostramos una imagen de la serie y el título. Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. 

### Los favoritos 
Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente: 
- El color de fondo y el de fuente se intercambian, indicando que es una serie favorita. 
- Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas. 
- Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

### Almacenamiento local 
Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse. 

### BONUS

#### Borrar favoritos
Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar como favorito al hacer clic sobre una serie del lado de la derecha. 
si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparecerá ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados). 
Para rematar, al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez. 

