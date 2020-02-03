/* Constructor de armas */
var Arma = function(nombre, potencia) {
  this.nombre = nombre;
  this.potencia = potencia;
}
Arma.prototype.atacar = function(objetivo) {
	console.log('¡Zas! ' + this.personaje.nombre + ' ataca con ' + this.nombre + ' y causa ' + this.potencia + ' puntos de daño a ' + objetivo.nombre);
	objetivo.vida = objetivo.vida - this.potencia;
	if(objetivo.vida <= 0) {
		console.log("¡¡" + objetivo.nombre + " ha muerto!!");
	}
}

var ArmaConMunicion = function(nombre, potencia, maxMunicion) {
	Arma.call(this, nombre, potencia);
	this.maxMunicion = maxMunicion;
	this.municion = maxMunicion;
}
ArmaConMunicion.prototype = Object.create(Arma.prototype);
ArmaConMunicion.prototype.constructor = ArmaConMunicion.constructor;
ArmaConMunicion.prototype.atacar = function(objetivo) {
	if (this.municion > 0) {
		this.municion--
		if(objetivo.vida != 0) {
			console.log('¡Bang! ' + this.nombre + ' causa ' + this.potencia + ' puntos de daño a ' + objetivo.nombre);
			objetivo.vida = objetivo.vida - this.potencia;
			if(objetivo.vida <= 0) {
				console.log("¡¡" + objetivo.nombre + " ha muerto!!");
				objetivo.vida == 0;
			}			
		} else {
			console.log(objetivo.nombre + " está muerto. Has perdido una bala.");
		}
	} else {
		console.log('¡Click! ¡No queda munición!');
	}
}
ArmaConMunicion.prototype.recargar = function() {
	this.municion = this.maxMunicion;
	console.log(this.nombre + ' recargada');
}

/* Clase criatura */
var Criatura = function(nombre){
	this.nombre = nombre,
	this.vida = 100;
}

/* Constructor persona */
var Persona = function(nombre) {
	Criatura.call(this, nombre);
}
Persona.prototype = Object.create(Criatura.prototype);
Persona.prototype.constructor = Persona.constructor;
Persona.prototype.atacar = function(objetivo) {
	if(this.arma) {
		this.arma.atacar(objetivo);
	} else {
		console.log('¡No se puede atacar porque no hay ningún arma equipada!');
	}
}
Persona.prototype.saludar = function () {
	console.log('Hola, me llamo ' + this.nombre);
}
Persona.prototype.equipar = function(arma) {
	console.log('Se ha equipado ' + arma.nombre);
	this.arma = arma;
	mochila.armas.push(arma);
	arma.personaje = this;
}
 
/* Constructor zombi */
var Zombi = function () {
	Criatura.call(this, "Zombi");
}
Zombi.prototype = Object.create(Criatura.prototype);
Zombi.prototype.constructor = Zombi.constructor;
Zombi.prototype.saludar = function () {
	console.log('Agggggg');
}

/* Mochila */
var mochila = {
  armas: []
}

var jugador = new Persona('Jesús');
var z = new Zombi();
 
var granada = new Arma('Granada',20)
var pistola = new ArmaConMunicion('Pistola',10,6);
console.log("Bienvenido a StuDOOM v1.0");

// Empieza la práctica
// Determinar que arma se ha pulsado y equiparla
$("#granada").click(function(){
	jugador.equipar(granada);
});

$("#pistola").click(function(){
	jugador.equipar(pistola);
});

$("body").keypress(function(event){
	let tecla = event.key;
	if (tecla=='d'){
		jugador.atacar(z);
	}else if(tecla=='r' && mochila.armas!=""){
		if (pistola.municion != pistola.maxMunicion){
			pistola.recargar();
		}else{
			console.log("No puedes recargar la pistola, porque tiene todas las balas o te has equipado la granada");
		}
	}else{
		console.log("No has pulsado la tecla correcta, o has intentado atacar sin armas");
	}
});