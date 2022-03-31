window.addEventListener("load", function(){
    let formulario = document.querySelector("form.formlogin")

    formulario.addEventListener("submit", function(event){
        event.preventDefault()

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

        formulario.submit();
    })
})

