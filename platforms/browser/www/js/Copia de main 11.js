var app = {
	
	
	
	firebaseConfig : {
	  	apiKey: "AIzaSyDvjk0qdiAp6quIt3gkCBfL7aBrQ9wY618",
		authDomain: "capitales-del-mundo-d73f8.firebaseapp.com",
		databaseURL: "https://capitales-del-mundo-d73f8.firebaseio.com",
		projectId: "capitales-del-mundo-d73f8",
		storageBucket: "capitales-del-mundo-d73f8.appspot.com",
		messagingSenderId: "306538298140",
		appId: "1:306538298140:web:b2afecf2576f11a6"
	},
	
	
	
	inicio: function(){
		
		app.iniciaFastClick();
		app.iniciaFirebase();
		app.obtenerHiScore();
		app.iniciaJuego();
		//app.iniciaBotones();
		
	},
	
	iniciaFastClick: function () {
    FastClick.attach(document.body);
		
  	},
	
	iniciaFirebase: function() {
    firebase.initializeApp(app.firebaseConfig);
  	},
	
	
	obtenerHiScore: function(){
		
		ref = firebase.database().ref('hiscore/');
		
		//lee nombre en firebase
		
		ref.child('nombre').once('value', function(snapshot){
		hiScoreNombre = snapshot.val();
		});
		
		ref.child('puntos').once('value', function(snapshot){
		hiScorePuntos = snapshot.val();
		});
		
	},
	
		
	grabarHiScore: function(){
		
		ref = firebase.database().ref('hiscore/');
		ref.set({
      		nombre: hiScoreNombre,
      		puntos: hiScorePuntos
  	  	});
		
		
	},
	
	iniciaJuego: function(){
		
		
		var html ='';
		html+='<div id="todo">';
				html+='<div id="tablero">';
					html+='<h2 class="centraTexto">CAPITALES DEL MUNDO</h2>';
					html+='<h3 class="centraTexto">Elige continentes: </h3>';
					html+='<button id="africa">África</button>';
					html+='<button id="america">América</button>';
					html+='<button id="asia">Asia</button>';
					html+='<button id="europa">Europa</button>';
					html+='<button id="oceania">Oceanía</button>';
					html+='<button id="comenzar" class="comenzar">COMENZAR</button>';
			console.log(hiScoreNombre,hiScorePuntos);
				html+='</div>';
			html+='<div id="puntuacion"></div>';
			html+='<div id="vida"></div>';
			html+='<div id="preguntas"></div>';
			html+='<div id="respuestas"></div>';
		html+='</div>'
		
		document.body.innerHTML = html
		
		//reinicia variables
		
		capitalesDelMundo = [];
		capitalesSeleccionadas=[];
		vidas = 3;
		puntos = 0;
		
		comenzar.play();
		
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
	
		html+='<div class="centraTexto">';
		
		//capitalesDelMundo segun seleccion ...
					
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
			
			//mostrar hiscore
			
			html+='<p class="centraTexto mayusculas ">HISCORE : ' + hiScoreNombre + '--->' + hiScorePuntos + '</p>';

			

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
		
		var pausa;
		
		if (seleccion == '#respuesta1'){respuesta = 1};
		if (seleccion == '#respuesta2'){respuesta = 2};
		if (seleccion == '#respuesta3'){respuesta = 3};
		
		if (respuesta == respuestaCorrecta){
			document.querySelector(seleccion).className = 'acierto';
			if (unidades<=0){unidades = 10;};
			puntos = puntos + unidades; 
			app.imprimePuntos();
			pausa = 200;
		}else{
			document.querySelector(seleccion).className = 'fallo';
			
			//senalar la respuesta correcta
			
			if (respuestaCorrecta ==1){ document.querySelector('#respuesta1').className = 'acierto'};
			if (respuestaCorrecta ==2){ document.querySelector('#respuesta2').className = 'acierto'};
			if (respuestaCorrecta ==3){ document.querySelector('#respuesta3').className = 'acierto'};
		
			pausa = 1000;
			
			//actuallizar vidas
			
			vidas -= 1;
			app.imprimeVidas();
			
			
		}
		
		
		clearInterval(contador);
		console.log("unidades = "+ unidades);
		
		
		//nueva pregunta...con una pausa
		
		setTimeout(
			function(){
				if (vidas == 0){app.finJuego()}
				else{app.pregunta()};
			}
			, pausa);
		
		
		
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
		
		console.log(hiScoreNombre);
		console.log(hiScorePuntos);
		
		//imprimir puntuacion
		var html = '';
		var todo = document.querySelector('#todo');
		
		totalPuntos = puntos + vidas * 1000;
		
		
		html+='<h3 class="centraTexto">TU RESULTADO:</h3>';
		html+='<table><tr><th>Puntos: </th><td>' + puntos + '</td></th>';
		html+='<tr><th>Vidas '+vidas+' X 1000: </th><td>' + vidas*1000+ '</td></th>';
		html+='<tr><th>Total:</th><td class="acierto">'+ totalPuntos +'</td></th></table>';
		
		
		if(totalPuntos > hiScorePuntos){
			ganador.play();
			do{
			hiScoreNombre = prompt('introduce tu nombre(máximo 12 caracteres): ');
			}
			while(hiScoreNombre.length == 0 || hiScoreNombre.length >12);
			
			
			hiScorePuntos = totalPuntos;
			
			//grabar nombre y puntos en firebase
			
			app.grabarHiScore();
			
			
		}else{perdedor.play();};
		
		
		html+='<hr>';
		html+='<button class="centraTexto">$$$ HISCORE $$$</button>';
		html+='<h3 class="centraTexto mayusculas">' + hiScoreNombre + ' ---> ' + hiScorePuntos + '</h3>';
		html+='<button class="centraTexto">$$$ HISCORE $$$</button>';
		html+='<button id="nuevoJuego" class="comenzar">Jugar de nuevo</button>';
		
		todo.innerHTML = html;
		
		var botonNuevoJuego = document.querySelector('#nuevoJuego');
		
	
		botonNuevoJuego.addEventListener('click',app.iniciaJuego,false);
	},
	

	
};



if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        app.inicio();
    }, false);
}
       
