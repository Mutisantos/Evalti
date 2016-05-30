        // Cargar Cordova
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // Guardar el examen como un json
        //

        function existeExamen(id) {
            var existe = null;
            existe = window.localStorage.getItem(id);
            if (existe != null) {
                return true;
            }
            else {
                return false;
            }
        }

        function existePregunta(id) {
            var existe = null;
            existe = window.localStorage.getItem(id);
            if (existe != null) {
                return true;
            }
            else {
                return false;
            }
        }

        function guardarExamen(exam_json, id) {

            var existe = null;
            existe = window.localStorage.getItem(id);
            if (existe != null) {
                window.alert("Un exámen con el id " + id + " ya existe, utilice otro por favor.");
                return false;
            }
            else {
                window.localStorage.setItem(id, exam_json);
                window.alert("Se guarda con ID" + id + "el valor" + exam_json);
                return true;
            }
        }

        function guardarPregunta(preg_json, id) {
            window.localStorage.setItem(id, preg_json);
            return true;
        }

        function cargarPregunta(id) {
            pregunta = window.localStorage.getItem(id);
            var jason = JSON.parse(pregunta);
            return true;
        }



        function cargarExamen(id) {
            var existe = null;
            existe = window.localStorage.getItem(id);
            if (existe != null) {
                var jason = JSON.parse(existe);
                window.alert("El valor " + jason.exa_numero + "-" + jason.exa_tema + " fue encontrado");
            }
            else {
                window.alert("El valor con llave " + id + " no existe");
            }

        }

        function limpiarStorage() {
            window.localStorage.clear();
        }


        //Se guardan todas las preguntas de un examen
        var Preguntas = [];
        var cantPreguntas = 0;
        var maxNum = 0;

        function question(numero, enunciado, respuesta, valor, explicacion) {
            this.numero = numero;
            this.enunciado = enunciado;
            this.respuesta = respuesta;
            this.valor = valor;
            this.explicacion = explicacion;
        }

        function agregarPregunta() {
            var booleano = true;
            var inputs = document.getElementsByClassName("exam");
            for (var i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    booleano = false;
                }
            }
            if (!booleano) {
                var vicAudio = document.getElementById("audio2");
                vicAudio.play();
                return;
            }

            else {
                booleano = existeExamen(document.getElementById('numExam').value);
                if (booleano) {
                    alert("el número de examen ya existe en este equipo, prueba con otro");
                    return;
                }
                else {
                    document.getElementById('btn_agregar').style.visibility = "visible";
                    document.getElementById('btn_finalizar').style.visibility = "visible";

                    var pregunta = "<div class=\"divider blue darken-4\"></div>";
                    maxNum = document.getElementById('cantExam').value;
                    for (var i = 0; i < maxNum; i++) {
                        pregunta += "<form action=\"#\" class=\"col s12\" id = \"pregunta" + i + "\">" +
                            "<p class = \"center\"> Pregunta: " + (i + 1) + "</p>" +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"Enunciado" + (i + 1) + "\"required/> <label for=\"Enunciado" + (i + 1) + "\">Enunciado</label></div>" +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"opcion1Pregunta" + (i + 1) + "\"required/> <label for=\"opcion1Pregunta" + (i + 1) + "\">Opcion1</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"opcion2Pregunta" + (i + 1) + "\"required/> <label for=\"opcion2Pregunta" + (i + 1) + "\">Opcion2</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"opcion3Pregunta" + (i + 1) + "\"required/> <label for=\"opcion3Pregunta" + (i + 1) + "\">Opcion3</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"opcion4Pregunta" + (i + 1) + "\"required/> <label for=\"opcion4Pregunta" + (i + 1) + "\">Opcion4</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"number\" id=\"respuesta" + (i + 1) + "\"required/> <label for=\"respuesta" + (i + 1) + "\">Respuesta</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"number\"  id=\"valorPregunta" + (i + 1) + "\"required/> <label for=\"valorPregunta" + (i + 1) + "\">Valor</label> " +
                            "<div class=\"input-field col 4 s6\"><input class=\"validate\" type=\"text\"  id=\"Explicacion" + (i + 1) + "\"required/> <label for=\"Explicacion" + (i + 1) + "\">Explicacion</label> " +
                            "</form>" +
                            "<div class=\"divider blue darken-4\"></div>";
                    }
                    document.getElementById('preguntas').innerHTML = pregunta + "<br>";
                }
            }

        }

        function generarJSON() {
            var jsonArr = '{';
            jsonArr += '\"exa_numero\":' + document.getElementById('numExam').value + ',';
            jsonArr += '\"exa_autor\":\"' + document.getElementById('autorExam').value + '\",';
            jsonArr += '\"exa_tema\":\"' + document.getElementById('temaExam').value + '\",';
            jsonArr += '\"exa_materia\":\"' + document.getElementById('matExam').value + '\",';
            jsonArr += '\"exa_cantpregs\":' + document.getElementById('cantExam').value;
            jsonArr += '}';

            var bool = guardarExamen(jsonArr, "exa_num" + document.getElementById('numExam').value);
            if (!bool) {
                return;
            }
            //cargarExamen(document.getElementById('numExam').value); 
            var jsonPreg = [];
            for (var i = 0; i < maxNum; i++) {
                var cadena = '{\"preg_explicacion\":\"' + document.getElementById('Explicacion' + (i + 1)).value + '\",';
                cadena += '\"preg_valor\":' + document.getElementById('valorPregunta' + (i + 1)).value + ',';
                cadena += '\"preg_numero\":' + (i + 1) + ',';
                cadena += '\"preg_enunciado\":\"' + document.getElementById('Enunciado' + (i + 1)).value + '\",';
                cadena += '\"preg_opcion1\":\"' + document.getElementById('opcion1Pregunta' + (i + 1)).value + '\",';
                cadena += '\"preg_opcion2\":\"' + document.getElementById('opcion2Pregunta' + (i + 1)).value + '\",';
                cadena += '\"preg_opcion3\":\"' + document.getElementById('opcion3Pregunta' + (i + 1)).value + '\",';
                cadena += '\"preg_opcion4\":\"' + document.getElementById('opcion4Pregunta' + (i + 1)).value + '\",';
                cadena += '\"preg_answer\":' + document.getElementById('respuesta' + (i + 1)).value;
                cadena += '}';


                var preg_id = "exa_num" + document.getElementById('numExam').value + "preg_num" + (i + 1);
                console.log(cadena);
                guardarPregunta(cadena, preg_id);
                cargarPregunta(preg_id);
                var obj = JSON.parse(cadena);
                jsonPreg.push(obj);
            }
        }



        //metodo AJAX para asignar la carga de todas las preguntas pertenecientes a un examen, tomando el examen seleccionado

        function setNumExam() {
            $("#btn_preguntas").show(1000);
            numExam = '';
            var e = document.getElementById("selexamenes");
            numExam = e.options[e.selectedIndex].value; //document.getElementById('numExam').value;

        }




        $(document).ready(function() {
            $('select').material_select();
        });