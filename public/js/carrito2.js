window.addEventListener("load", function(){

    if((p !== null) && (p !== "")){
        let nombreViaje = localStorage.getItem("nombreV");
        let precioPasaje = localStorage.getItem("precioV");
        let precioNum = precioPasaje.slice(2)
        let total = Number(precioNum) * Number(p)
        console.log(total)
        document.querySelector(".pasajes").innerHTML = p;
        document.querySelector(".nombreViaje").innerHTML = nombreViaje;
        document.querySelector(".precioPasaje").innerHTML = precioPasaje;
        document.querySelector(".precioTotal").innerHTML = "$"+total;
    }
});
let cancelar = document.getElementById("cancelar")
cancelar.addEventListener("click", function(){
    localStorage.clear()
    window.location.reload()
})

