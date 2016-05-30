//Se guardan todas las preguntas de un examen
        var Preguntas = [];
        var cantPreguntas = 0;

        function question(numero, enunciado, respuesta, valor, explicacion) {
            this.numero = numero;
            this.enunciado = enunciado;
            this.respuesta = respuesta;
            this.valor = valor;
            this.explicacion = explicacion;
        }

        //Método para ocultar los botones de otras opciones para evitar que el usuario cumpla con el flujo normal de la aplicación
        $(document).ready(function() {
            $("#btn_calificar").hide(1000);
            $("#btn_prueba").hide(1000);
        });



        //metodo AJAX para asignar la carga de todas las preguntas pertenecientes a un examen, tomando el examen seleccionado
        $(document).ready(function() {
            $("#btn_preguntas").click(function() {
                var urlBase = numExam;
                $.getJSON(urlBase, function(result) {
                    document.getElementById('preguntas').innerHTML = '';
                    Preguntas = [];
                    $.each(result, function(i, field) {
                        var preg = new question(field.preg_numero, field.preg_enunciado, field.preg_answer, field.preg_valor, field.preg_explicacion);
                        Preguntas.push(preg); //Meto cada pregunta para luego poder evaluar en la aplicación web
                        cantPreguntas += 1;
                        var pregunta = field.preg_numero + "." + field.preg_enunciado + "               Valor:" + field.preg_valor + " Punto(s)";
                        pregunta += "<br>";
                        pregunta += "<form action=\"#\" id = \"pregunta" + field.preg_numero + "\">" +
                            "<p>" +
                            "<input class=\"special\" name=\"group" + field.preg_numero + "\"type=\"radio\" name=\"Opcion1\" value=\"1\" id =\"opcion1Pregunta" + field.preg_numero + "\"/>" + field.preg_opcion1 + "<br>" +
                            "</p>" + "<p>" +
                            "<input class=\"special\" name=\"group" + field.preg_numero + "\"type=\"radio\" name=\"Opcion2\" value=\"2\" id =\"opcion2Pregunta" + field.preg_numero + "\"/>" + field.preg_opcion2 + "<br>" +
                            "</p>" + "<p>" +
                            "<input class=\"special\" name=\"group" + field.preg_numero + "\"type=\"radio\" name=\"Opcion3\" value=\"3\" id =\"opcion3Pregunta" + field.preg_numero + "\"/>" + field.preg_opcion3 + "<br>" +
                            "</p>" + "<p>" +
                            "<input class=\"special\" name=\"group" + field.preg_numero + "\"type=\"radio\" name=\"Opcion4\" value=\"4\" id =\"opcion4Pregunta" + field.preg_numero + "\"/>" + field.preg_opcion4 + "<br>" +
                            "</p>" + "<p id = \"explicacion" + field.preg_numero + "\">" +

                            "</form>";
                        $(document).ready(function() {
                            $('preguntas').material_select();
                        });
                        document.getElementById('preguntas').innerHTML += pregunta + "<br>";
                        $("#btn_calificar").show(1000);
                        $("#btn_prueba").show(1000);


                    });
                    if (Preguntas.length <= 0){
                        alert("La URL ingresada no ha arrojado ningun examen válido");
                        $("#btn_calificar").hide(1000);
                        $("#btn_prueba").hide(1000);
                    }

                });
            });
        });

        function setNumExam() {
            $("#btn_preguntas").show(1000);
            numExam = '';
            numExam = document.getElementById("urlExam").value; //document.getElementById('numExam').value;

        }

        function evaluar() {
            var puntajeFinal = 0;
            var puntajeTotal = 0;
            var i;
            for (i = 0; i < cantPreguntas; i++) {
                var ans = Preguntas[i].respuesta;
                var op1 = document.getElementById("opcion" + ans + "Pregunta" + (i + 1)).checked;
                puntajeTotal += Preguntas[i].valor;
                var cadenaExp = "explicacion" + (i + 1);
                document.getElementById(cadenaExp).innerHTML = Preguntas[i].explicacion;
                if (op1) {
                    alert("correcto");
                    puntajeFinal += Preguntas[i].valor;
                }
                else {
                    alert("incorrecto");
                }
            }
            alert("Obtuviste " + puntajeFinal + " puntos sobre " + puntajeTotal + " de puntos posibles");

        }


        $(document).ready(function() {
            $('select').material_select();
        });