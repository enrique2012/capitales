var app = {
	
	inicio: function(){
		app.iniciaBotones();
		app.iniciaFastClick();
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
	
	cambiaClase: function(seleccion){
		if (document.querySelector(seleccion).className ==''){
		document.querySelector(seleccion).className ='seleccionado';
		}
		else{
		document.querySelector(seleccion).className ='';
		}
	},
	
	
	comenzar: function(){
		
		var html = '<h3 class="centraTexto">Continentes seleccionados:<h3>';
		
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
		
		html+='</div>';
		
		html += '<hr>';

		
		tablero = document.querySelector('#tablero');
		tablero.innerHTML=html;
		
		app.marcador();
		
		//continuamos aqui llamando a app.pregunta...
		app.pregunta();

	},
	
	marcador: function(){
		var puntuacion = document.querySelector('#puntuacion');
		var html= '';
		html+='<h3>Puntos: <span id="p">'+ puntos + '</span></h3>';
		puntuacion.innerHTML = html;
		
		var vida = document.querySelector('#vida');
		var html= '';
		html+='<h3>Vidas: <span id="v">'+ vidas + '</span></h3>';
		vida.innerHTML = html;
	},
	
	
	pregunta: function(){
	
		var preguntas = document.querySelector('#preguntas');
		html = '';
		
		aleatorio = Math.floor(Math.random() * capitalesDelMundo.length);
		
		html+= '<h2>¿Cuál es la capital de...</h2>';
		html+= '<h2 class="seleccionado">'+capitalesDelMundo[aleatorio][0]+'</h2>'
		preguntas.innerHTML = html;
	
	}
	
	
	
	

		
		
	
};



if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
        app.inicio();
    }, false);
}
       
