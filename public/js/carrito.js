
window.addEventListener("load", function(){
    let btn = document.getElementById("contratar");
    btn.addEventListener("click",function(e){

        e.preventDefault();
        var pasajes = prompt("Agrega la cantidad de Pasajes");
        localStorage.setItem("cPasajes",pasajes);
        var p = localStorage.getItem("cPasajes");
        // Al hacer click en "agregar al carrito", salta este prompt

        // Muestro por pantalla el prompt
        document.querySelector(".carritoCompras").innerHTML = "("+p+")";
        // Guarda el valor del prompt


        console.log(localStorage);
    
    });
})


