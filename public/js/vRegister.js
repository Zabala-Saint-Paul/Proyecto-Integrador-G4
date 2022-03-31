window.addEventListener("load", function(){
    let formulario = document.querySelector("form.regForm")

    formulario.addEventListener("submit", function(event){
        event.preventDefault()

        let campoUsuario = document.querySelector("input.usuario");

        if(campoUsuario.value == ""){
            alert("Debe ingresar un nombre de usuario")
            return
        };

        let campoCuit = document.querySelector("input.cuit");

        if(campoCuit.value == ""){
            alert("Debe ingresar un CUIT valido")
            return
        };

        let campoEmail = document.querySelector("input.email");

        if(campoEmail.value == ""){
            alert("Debe ingresar un correo electronico")
            return
        };

        let campoPassword = document.querySelector("input.password");

        if(campoPassword.value == ""){
            alert("Debe ingresar una contraseña")
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
