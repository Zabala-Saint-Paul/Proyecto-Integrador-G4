let button = document.getElementById("contratar");
var p = localStorage.getItem("cPasajes");
if((p == null) || (p == "")){
    document.querySelector(".carritoCompras").innerHTML = "";
}
else{
    document.querySelector(".carritoCompras").innerHTML = p;
}
button.addEventListener("click",function(e){

    e.preventDefault();
    var pasajes = prompt("Agrega la cantidad de Pasajes");
    if(pasajes >= 0 ){
    localStorage.setItem("cPasajes",pasajes);
    console.log(localStorage);
    window.location.href = "/productCart";
    }
});

var nombreViaje = document.getElementById("nombreViaje").innerHTML
localStorage.setItem("nombreV", nombreViaje)
var precioPasaje = document.getElementById("precioPasaje").innerHTML
localStorage.setItem("precioV", precioPasaje)
console.log(localStorage)


