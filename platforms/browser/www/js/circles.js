var Obstaculos = [];
var Objetivos = [];



function aleatorio(){ return Math.floor((Math.random()*15)); } 

function ColorAleatorio(){
	 var posibilidades=["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
 	 var rojo = posibilidades[aleatorio()]+posibilidades[aleatorio()]; 
	 var verde = posibilidades[aleatorio()]+posibilidades[aleatorio()]; 
	 var color = "#"+rojo+verde+"00";
	 return color; 
} 


function circulo(x,y,r){
	this.x = x;
	this.y = y;
	this.r = r;
	
}

function drawCircles(width, height){ 
	
	
	var canvas = document.getElementById('lienzo'); 
	var ctx = canvas.getContext('2d'); 
	ctx.clearRect(0,0,width,height); 
	var nCirculos = Math.floor((Math.random()*10)+14); 
	console.log("Numero de Circulos: "+nCirculos);
	Obstaculos = [];
	Objetivos = [];
	
	
	
	for (var i = 0; i<nCirculos;i++){
	    var iradio = 	Math.floor((Math.random()*40)+30); 
	    var coordy =	Math.floor((Math.random()*height)-80);
	    var coordx =	Math.floor((Math.random()*width)-60);
	    var icolor = 	ColorAleatorio();
	    ctx.beginPath();
	    ctx.fillStyle = icolor;
	    ctx.arc(coordx,coordy,iradio,0,2*Math.PI);
	    ctx.fill();
	    var circ = new circulo(coordx,coordy,iradio);
	    Obstaculos.push(circ);
	}
	
	ctx.beginPath();
	ctx.fillStyle = "#FFFFFF"; 
	ctx.arc (0, height, 50,0,2*Math.PI);
	ctx.fill();
	ctx.beginPath();
	var circ = new circulo(0,height,50);
       ctx.arc (width, 0, 50,0,2*Math.PI);
	ctx.fill();
	var meta = new circulo(width,0,50);
	Objetivos.push(meta); 
	MovimientoMouse();

} 

function PosicionCursor(evt) {
    var lienzo = document.getElementById('lienzo'); 
    var rect = lienzo.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}



function MovimientoMouse(){
     var canvas = document.getElementById('lienzo');
     var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = PosicionCursor(evt);
	 var longitud = Obstaculos.length;
	 console.log(longitud);
	 for(var i = 0; i <longitud;i++){
		var circulo = Obstaculos[i];	
		var distanciax = (mousePos.x-circulo.x)*(mousePos.x-circulo.x);
        	var distanciay = (mousePos.y-circulo.y)*(mousePos.y-circulo.y);
		var distanciaTotal = Math.sqrt(distanciax+distanciay);
		
		var meta = Objetivos[0];
		var llegada = Math.sqrt((mousePos.x-meta.x)*(mousePos.x-meta.x)+(mousePos.y-circulo.y)*(mousePos.y-circulo.y));	
		if(distanciaTotal <= circulo.r && llegada>meta.r ){
		   var vicAudio=document.getElementById("audio2");
		   vicAudio.play();
		   alert("Juego Terminado");
		   context.clearRect(0,0,canvas.width,canvas.height);
		   Obstaculos = [];
		   Objetivos = [];
		}
		if (mousePos.x > canvas.width || mousePos.y > canvas.height || mousePos.y <= 0 ){
		    var vicAudio=document.getElementById("audio2");
		    vicAudio.play();
		    alert("Fuera de los límites");
		    context.clearRect(0,0,canvas.width,canvas.height);
		    Obstaculos = [];
		    Objetivos = [];
		}
	 }
      }, false);

      canvas.addEventListener('click',function(evt) {
        var mousePos = PosicionCursor(evt);
	 var longitud = Objetivos.length;
	 console.log(longitud);
	 
	 for(var i = 0; i <longitud;i++){
		var circulo = Objetivos[i];	
		var distanciax = (mousePos.x-circulo.x)*(mousePos.x-circulo.x);
        	var distanciay = (mousePos.y-circulo.y)*(mousePos.y-circulo.y);
		var distanciaTotal = Math.sqrt(distanciax+distanciay);
		if(distanciaTotal <= circulo.r){
		   var vicAudio=document.getElementById("audio1");
		   vicAudio.play();	   
		   alert("Victoria");
		   context.clearRect(0,0,canvas.width,canvas.height);
		   Obstaculos = [];
		   Objetivos = [];
		}
	 }
      }, false);




}
