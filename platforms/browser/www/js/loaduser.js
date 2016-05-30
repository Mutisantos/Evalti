        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function comprobarUsuario() {
            var u = document.getElementById('u').value;
            var c = document.getElementById('c').value;
            var value1 = window.localStorage.getItem("usuario" + u);
            var value2 = window.localStorage.getItem("contra" + c);
            if (value1 != null && value2 != null) {
                window.localStorage.setItem("loggedUser", u); //Guardaré un registro del usuario actualmentel loggeado
                window.location.href = "menuPrincipal.html";
            }
            else {
                window.alert("Verifique usuario y contraseña");
            }
        }