window.addEventListener("load", function(){
    let formulario = document.querySelector("form.editarProducto")

    formulario.addEventListener("submit", function(event){
        event.preventDefault()

        let campoName = document.querySelector("input.name");

        if(campoName.value == ""){
            alert("Debe ingresar un nombre para el producto")
            return
        };

        let campoPrice = document.querySelector("input.price");

        if(campoPrice.value == ""){
            alert("Debe ingresar un precio para el producto")
            return
        } else if(!campoPrice.value.includes("$")){
            alert("El precio debe contener el simbolo:"+" $")
            return
        };

        let campoFecha = document.querySelector("input.fecha");

        if(campoFecha.value == ""){
            alert("Debe ingresar una fecha para el producto")
            return
        };

        let campoCapacidad = document.querySelector("input.capacidad");

        if(campoCapacidad.value == ""){
            alert("Debe ingresar la capacidad de la nave")
            return
        };

        let campoDescription = document.querySelector("textarea.description");

        if(campoDescription.value == ""){
            alert("Debe ingresar una descricion del viaje")
            return
        };

        let campoImage = document.querySelector("input.image");

        if(campoImage.value == ""){
            alert("Debe subir una imagen para el viaje")
            return
        };

        formulario.submit();
    })
})