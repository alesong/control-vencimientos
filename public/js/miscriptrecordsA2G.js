// Creamos un objeto JSON que contiene los datos de los jugadores
var datos = [
  {
    "nombre": "Chamapua",
    "record": "62.941.025",
    "headshot": "8",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "LaTusa",
    "record": "36.457.778",
    "headshot": "8",
    "imgPath": "img/avatar/tusa.png"
  },
  {
    "nombre": "Aleson",
    "record": "56.007.476",
    "headshot": "32",
    "imgPath": "img/avatar/aleson.png"
  },
  {
    "nombre": "JSK",
    "record": "59.071.805",
    "headshot": "8",
    "imgPath": "img/avatar/jsk.png"
  },
  {
    "nombre": "ErikaDR",
    "record": "43.908.053",
    "headshot": "3",
    "imgPath": "img/avatar/erika.png"
  },
  {
    "nombre": "VICHUG",
    "record": "21.198.138",
    "headshot": "3",
    "imgPath": "img/avatar/vichug.png"
  },
  {
    "nombre": "Sicario",
    "record": "12.895.211",
    "headshot": "3",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Danna",
    "record": "42.824.698",
    "headshot": "3",
    "imgPath": "img/avatar/danna.png"
  },
  {
    "nombre": "Ericd HzGz",
    "record": "19.479.912",
    "headshot": "3",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Ronin",
    "record": "6.911.158",
    "headshot": "3",
    "imgPath": "img/avatar/angel.png"
  },
  {
    "nombre": "El Roberth",
    "record": "17.005.890",
    "headshot": "5",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Jazmin",
    "record": "46.594.350",
    "headshot": "3",
    "imgPath": "img/avatar/jazmin.png"
  },
  {
    "nombre": "Yram Aobsil",
    "record": "18.237.203",
    "headshot": "5",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "EnemigoJuan",
    "record": "61.447.856",
    "headshot": "42",
    "imgPath": "img/avatar/flores.png"
  },
  {
    "nombre": "JchitaFan",
    "record": "56.760.581",
    "headshot": "3",
    "imgPath": "img/avatar/juanchita.png"
  },
  {
    "nombre": "ChapulineoF",
    "record": "0",
    "headshot": "27",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "NRG Roberto",
    "record": "65.813.668",
    "headshot": "26",
    "imgPath": "img/avatar/roberto.png"
  },
  {
    "nombre": "Yuka",
    "record": "11.383.477",
    "headshot": "3",
    "imgPath": "img/avatar/yuka.png"
  },
  {
    "nombre": "Teminator",
    "record": "14.466.861",
    "headshot": "0",
    "imgPath": "img/avatar/terminator.png"
  },
  {
    "nombre": "Ever",
    "record": "44.392.737",
    "headshot": "0",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Regalos",
    "record": "6.566.524",
    "headshot": "0",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Carlos JJ",
    "record": "10.178.119",
    "headshot": "0",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Reicito",
    "record": "0",
    "headshot": "0",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Karelys",
    "record": "0",
    "headshot": "0",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Ericd HzGz",
    "record": "12.051.714",
    "headshot": "9",
    "imgPath": "img/avatar/avatar.png"
  },
  {
    "nombre": "Netoo",
    "record": "67.071.593",
    "headshot": "6",
    "imgPath": "img/avatar/avatar.png"
  }
];

// Seleccionamos el elemento div con la clase ficha usando un selector de CSS
var ficha = document.querySelector(".ficha");

// Creamos una función que se encarga de mostrar los datos de un jugador aleatorio en la ficha
function mostrarDatos() {
  // Obtenemos un índice aleatorio entre 0 y la longitud del arreglo de datos
  var indice = Math.floor(Math.random() * datos.length);
  // Accedemos al objeto JSON que corresponde al índice aleatorio
  var jugador = datos[indice];
  // Seleccionamos el elemento img que está dentro del elemento div con la clase ficha
  var imagen = document.querySelector(".ficha img");
  // Si existe el elemento img, lo eliminamos usando el método removeChild() del elemento padre
  if (imagen) {
    ficha.removeChild(imagen);
  }

  // Creamos un nuevo elemento img
  var imagen = document.createElement("img");
  // Le asignamos el valor de la propiedad imgPath como su atributo src
  imagen.src = jugador.imgPath;
  // Insertamos el nuevo elemento img dentro del elemento div con la clase ficha, antes de los párrafos
  ficha.insertBefore(imagen, ficha.firstChild);
  // Asignamos las propiedades del objeto JSON al contenido de los párrafos HTML usando la propiedad innerHTML
  ficha.children[1].innerHTML = "Â2𝗚🎭" + jugador.nombre;
  ficha.children[2].innerHTML = "RÉCORD: " + jugador.record;
  ficha.children[3].innerHTML = "HS: " + jugador.headshot;
  $(".total").html(datos.length);
}

// Llamamos a la función mostrarDatos una vez al cargar la página
mostrarDatos();

// Llamamos a la función mostrarDatos cada 5 segundos usando la función setInterval
setInterval(mostrarDatos, 6000);
