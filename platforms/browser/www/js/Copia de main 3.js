var app = {
	
	model: {
		"record": [
					{"nombre" : "Enric 01", "hiScore" : 5000},
				    {"nombre" : "Enric 02", "hiScore" : 3000},
				    {"nombre" : "Enric 03", "hiScore" : 1000}
				  ]
	},
	
	
	firebaseConfig : {
	  apiKey: "AIzaSyDvjk0qdiAp6quIt3gkCBfL7aBrQ9wY618",
	  authDomain: "capitales-del-mundo-d73f8.firebaseapp.com",
	  databaseURL: "https://capitales-del-mundo-d73f8.firebaseio.com",
	  projectId: "capitales-del-mundo-d73f8",
	  storageBucket: "capitales-del-mundo-d73f8.appspot.com",
	  messagingSenderId: "306538298140",
	  appId: "1:306538298140:web:e2439e4909464f8b"
	},
	
	
	inicio: function(){
		
		app.iniciaFastClick();
		app.iniciaFirebase();
		app.iniciaBotones();
		
	},
		
	iniciaBotones: function(){
		
		var botonAfrica = document.querySelector('#africa');
		var botonAmerica = document.querySelector('#america');
		var botonAsia = document.querySelector('#asia');
		var botonEuropa = document.querySelector('#europa');
		var botonOceania = document.querySelector('#oceania');
		

		botonAfrica.addEventListener('click',function(){app.cambiaClase('#africa');},false);
		botonAmerica.addEventListener('click',function(){app.cambiaClase('#america');},false);
		botonAsia.addEventListener('click',function(){app.cambiaClase('#asia');},false);
		botonEuropa.addEventListener('click',function(){app.cambiaClase('#europa');},false);
		botonOceania.addEventListener('click',function(){app.cambiaClase('#oceania');},false);
		
		var botonComenzar = document.querySelector('#comenzar');
		
		botonComenzar.addEventListener('click',app.comenzar,false);
		
		
	},
	
	
	iniciaFastClick: function () {
    FastClick.attach(document.body);
		
  	},
	
	iniciaFirebase: function() {
    firebase.initializeApp(app.firebaseConfig);
  	},
	
	
	cambiaClase: function(seleccion){
		if (document.querySelector(seleccion).className ==''){
		document.querySelector(seleccion).className ='seleccionado';
		seleccionado.play();
		}
		else{
		document.querySelector(seleccion).className ='';
		noSeleccionado.play();
		}
	},
	
	
	comenzar: function(){
		
		
		var html = '<p class="centraTexto">Continentes seleccionados:<p>';
		
		//capitalesDelMundo segun seleccion ...
		
		html+='<div class="centraTexto">';
		
	
					
		if (document.querySelector('#africa').className){
			capitalesDelMundo = capitalesDelMundo.concat(africa);
			html += '<button class="botonMini">África</button>';
		};
		if (document.querySelector('#america').className){
			capitalesDelMundo = capitalesDelMundo.concat(america);
			html += '<button class="botonMini">América</button>'
		};
		if (document.querySelector('#asia').className){
			capitalesDelMundo = capitalesDelMundo.concat(asia);
			html += '<button class="botonMini">Asia</button>'
		};
		if (document.querySelector('#europa').className){
			capitalesDelMundo = capitalesDelMundo.concat(europa);
			html += '<button class="botonMini">Europa</button>'
		};
		if (document.querySelector('#oceania').className){
			capitalesDelMundo = capitalesDelMundo.concat(oceania);
			html += '<button class="botonMini">Oceanía</button>'
			
		};
		
	
		
		/*extraemos en el array capitalesSeleccionadas
		 solamente las capitales para utilizar 
		 como opciones de respuesta*/
		
		var i;
		for(i = 0; i < capitalesDelMundo.length; i++){
			capitalesSeleccionadas[i] = capitalesDelMundo[i][1];
		};
		
		console.log(capitalesDelMundo.length);
		
		
		
		// si no hay ningun continente seleccionado, no comienza.
		if(capitalesDelMundo.length != 0){
		
			html+='</div>';

			

			comenzar.play();

			tablero = document.querySelector('#tablero');
			tablero.innerHTML=html;

			app.marcador();

			app.pregunta();
		
		}else{
			alert('Tienes que seleccionar al menos un continente...')
		};

	},
	
	marcador: function(){
		var puntuacion = document.querySelector('#puntuacion');
		var html= '';
		html+='<p>Puntos: <span id="p">'+ puntos + '</span></p>';
		puntuacion.innerHTML = html;
		
		var vida = document.querySelector('#vida');
		var html= '';
		html+='<p>Vidas: <span id="v">'+ vidas + '</span></p>';
		vida.innerHTML = html;
	},
	
	
	pregunta: function(){
	
		var preguntas = document.querySelector('#preguntas');
		html = '<hr>';
		
		pais = Math.floor(Math.random() * capitalesDelMundo.length);
		
		html+= '<p>¿Cuál es la capital de...</p>';
		html+= '<h2 class="pregunta">'+capitalesDelMundo[pais][0]+'</h2>'
		preguntas.innerHTML = html;
		
		unidades = 100;
		//contador de tiempo de respuesta...
		contador = window.setInterval(function(){unidades--;}, 100);
		
		console.log('unidades =' + unidades);
	
		app.respuesta();
	
	},
	
	
	// generar opciones de respuesta...
	
	respuesta: function(){
	
		console.log(capitalesSeleccionadas[pais]);
		
		html = '';
		
		html+= '<button id="respuesta1"></button>';
		html+= '<button id="respuesta2"></button>';
		html+= '<button id="respuesta3"></button>';
		var respuestas = document.querySelector('#respuestas');	
		respuestas.innerHTML = html;
		
		var respuesta1 = document.querySelector('#respuesta1');
		var respuesta2 = document.querySelector('#respuesta2');
		var respuesta3 = document.querySelector('#respuesta3');
		
		respuestaCorrecta= Math.floor(Math.random() * 3)+1;
		console.log(respuestaCorrecta);
				
		var capitalCorrecta = capitalesDelMundo[pais][1];
		console.log(capitalesDelMundo[pais][1]);

		
		console.log(capitalesSeleccionadas.length);
		
		var capitalAleatoria1, capitalAleatoria2;
		
		
		
		//para evitar que la capital correcta y las capitales aleatorias sean iguales...
		do {
			capitalAleatoria1 = Math.floor(Math.random() * capitalesSeleccionadas.length);
  			capitalAleatoria2 = Math.floor(Math.random() * capitalesSeleccionadas.length);
			}
		while (capitalesSeleccionadas[capitalAleatoria1] == capitalCorrecta || capitalesSeleccionadas[capitalAleatoria2] == capitalCorrecta || capitalAleatoria1 == capitalAleatoria2);
		
		
		console.log(pais, capitalAleatoria1, capitalAleatoria2);
		
		
		
		if (respuestaCorrecta == 1){
			respuesta1.innerHTML = capitalCorrecta;
			respuesta2.innerHTML = capitalesSeleccionadas[capitalAleatoria1];
			respuesta3.innerHTML = capitalesSeleccionadas[capitalAleatoria2];
		}else if(respuestaCorrecta == 2){
			respuesta1.innerHTML = capitalesSeleccionadas[capitalAleatoria1];
			respuesta2.innerHTML = capitalCorrecta;
			respuesta3.innerHTML = capitalesSeleccionadas[capitalAleatoria2];
		}else{
			respuesta1.innerHTML = capitalesSeleccionadas[capitalAleatoria1];
			respuesta2.innerHTML = capitalesSeleccionadas[capitalAleatoria2];
			respuesta3.innerHTML = capitalCorrecta;
		};
		
		respuesta1.addEventListener('click',function(){app.compruebaRespuesta('#respuesta1');},false);
		respuesta2.addEventListener('click',function(){app.compruebaRespuesta('#respuesta2');},false);
		respuesta3.addEventListener('click',function(){app.compruebaRespuesta('#respuesta3');},false);
		
		
		//eliminamos el pais de 'capitalesDelMundo' para no repetir pregunta
		capitalesDelMundo.splice(pais, 1);
		
		//si ya no quedan paises termina el juego
		if(capitalesDelMundo.length == 0){
			app.finJuego();
		}
	
		console.log(capitalesDelMundo.length);
	},
	
	
	compruebaRespuesta: function(seleccion){
		
		if (seleccion == '#respuesta1'){respuesta = 1};
		if (seleccion == '#respuesta2'){respuesta = 2};
		if (seleccion == '#respuesta3'){respuesta = 3};
		
		if (respuesta == respuestaCorrecta){
			document.querySelector(seleccion).className = 'acierto';
			if (unidades<=0){unidades = 10;};
			puntos = puntos + unidades; 
			app.imprimePuntos();
		}else{
			document.querySelector(seleccion).className = 'fallo';
			vidas -= 1;
			app.imprimeVidas();
			if (vidas == 0){app.finJuego();};
		}
		
		
		clearInterval(contador);
		console.log("unidades = "+ unidades);
		
		
		//nueva pregunta...con una pausa
		
		setTimeout("app.pregunta()", 300);
		
	},
	
	
	
	imprimePuntos: function(){
		
		acierto.play();
		
		var p = document.querySelector('#p');
		p.innerHTML = puntos;
		
		console.log(respuesta, respuestaCorrecta);
		
		
		
	},
	
	imprimeVidas: function(){
		
		fallo.play();
		
		var v = document.querySelector('#v');
		v.innerHTML = vidas;
		
		console.log(respuesta, respuestaCorrecta);
		
		
	
	},
	
	
	
	finJuego: function(){
		
		
		//imprimir puntuacion
		var html = '';
		var todo = document.querySelector('#todo');
		
		totalPuntos = puntos + vidas * 1000;
		
		
		html+='<h2 class="centraTexto">TU RESULTADO:</h2>';
		html+='<table><tr><th>Puntos: </th><td>' + puntos + '</td></th>';
		html+='<tr><th>Vidas '+vidas+' X 1000: </th><td>' + vidas*1000+ '</td></th>';
		html+='<tr><th>Total:</th><td class="acierto">'+ totalPuntos +'</td></th></table>';
		
		//comprobar si la puntuacion es nuevo record
		
		//si es nuevo record, grabarlo en el archivo de firebase
		
		//imprimir records
		var record = app.model.record;
		
		html+='<hr>';
		html+='<h2 class="centraTexto">HISCORE:</h2>';
		html+='<table>';
		html+='<tr><th>'+ record[0].nombre +'</th><td>'+ record[0].hiScore + '</td></tr>';
		html+='<tr><th>'+ record[1].nombre +'</th><td>'+ record[1].hiScore + '</td></tr>';
		html+='<tr><th>'+ record[2].nombre +'</th><td>'+ record[2].hiScore + '</td></tr>';
		html+='</table>';
		
		
		todo.innerHTML = html;
		
		
		
	},
	

	
};



if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        app.inicio();
    }, false);
}
       
