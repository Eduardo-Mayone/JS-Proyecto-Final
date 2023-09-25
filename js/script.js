/* Es el portal de una inmobiliaria.
 Dado que es un sitio web sin login y se intenta enviar información por email, lo que se hace es solicitarle al usuario
   que ingrese su dirección de email y que la ingrese nuevamente para chequear que es la dirección correcta.
*/

/* La función validar_correo no comprueba 100% si una dirección es válida. 
Sólo se comprueba que no empiece por @ (no por todos lo caracteres no válidos).
Que haya un solo @.
Que en la parte del dominio no empiece ni termine con ".", ni que haya ".." o más
*/

function validar_correo (direccion) {
    let correo_valido = false;
    let contador_arroba = 0;
    let direccion_array;
    let dominio_array;

    if ((!direccion.startsWith("@")) && (!direccion.endsWith("@"))) {  // chequeo que no empiece o termine con @, no voy a chequear otros caracteres, si no empieza con @ puede ser una dirección válida
        for (let i = 0; i < direccion.length; i++) { // recorre la dirección para comprobar que haya un solo @
            if (direccion.charAt(i)==="@") {
                contador_arroba++;
            }    
        }
        if (contador_arroba === 1) {   // si hay un solo @ puede ser una dirección válida
            direccion_array = direccion.split("@");
            if (((!direccion_array[1].startsWith(".")) && (!direccion_array[1].endsWith("."))) && (direccion_array[1].indexOf(".") !== -1)) {
                dominio_array = direccion_array[1].split(".");
                if ((dominio_array.length >=2) && (!dominio_array.includes(""))) { // chequeo que el punto separe al menos 2 strings y que no este "" que indicaría que hay 2 . seguidos
                    correo_valido = true;
                }
                else {
                    alert("No es una dirección válida");
                    correo_valido = false;

                }
            }
            else {
                alert("No es una dirección válida");
                correo_valido = false;
            }
        }
        else {
            alert("No es una dirección válida");
            correo_valido = false;
        } 
    }
    else {
        alert("No es una dirección válida");
        correo_valido = false;
    }
    return correo_valido;
}

/* La función nombre_barrio
   Como hay otro switch y las opciones fueron con letras, acepta la mayúscula y la minúscula (podría haber usado toUpperCase o toLowerCase me di cuenta tarde)
   Y devuelve el nombre del barrio.
*/

function nombre_barrio(letra_inicial){
    switch (letra_inicial) {
        case "a": case "A":  return "Aguada";
        case "b": case "B": return "Buceo";
        case "c": case "C": return "Carrasco";
        default: return "Nulo";
    }
    
}

const porcentaje = 0.03; // valor de la comisión
let direccion_email_2; // reingreso de la dirección de email
let barrio_alquilar; // opción elegida para el barrio donde alquilar
let barrio_comprar; // opción elegida para el barrio donde comprar
let valor_vender; // valor de la propiedad que uno desea vender
let continuar = true; // variable de control de while
let contador_email = 0; // variable de intentos de login, tanto para direccion_email_1 como para direccion_email_2

let direccion_email_1 = prompt("Ingrese su dirección de email");
while (continuar && contador_email < 3) {
    if (validar_correo(direccion_email_1)) {
        direccion_email_2 = prompt("Ingrese nuevamente su dirección de email");
        if (direccion_email_1 === direccion_email_2) {
            let opciones = prompt ("\"Bienvenido a Inmobiliaria XXXX\" \n ¿Qué desea hacer? \n 1 - Alquilar\n 2 - Comprar\n 3 - Vender\n 4 - Salir");

            while (opciones != "4") {

                switch (opciones) {
                case "1": barrio_alquilar = prompt("Indique en que barrio desea alquilar: \n A - Aguada \n B - Buceo \n C - Carrasco");
                          if (nombre_barrio(barrio_alquilar) !== "Nulo") {
                            alert ("Le enviaremos las propiedades disponibles en el barrio: " + nombre_barrio(barrio_alquilar) +".\n A la dirección de correo: " + direccion_email_1);
                            break;
                          }
                          else {
                            alert ("No contamos con propiedades en ese barrio.");
                            break;
                          }

                case "2": barrio_comprar = prompt("Indique en que barrio desea comprar: \n A - Aguada \n B - Buceo \n C - Carrasco");
                         if (nombre_barrio(barrio_comprar) !== "Nulo") {
                            alert ("Le enviaremos las propiedades disponibles en el barrio: " + nombre_barrio(barrio_comprar) +".\n A la dirección de correo: " + direccion_email_1);
                            break;
                         }
                         else {
                            alert ("No contamos con propiedades en ese barrio.");
                            break;
                         }    

                case "3": valor_vender = parseInt(prompt("Indique el precio solicitado y le indicaremos el monto de nuestra comisión"));
                          let chequeo_numero = isNaN(valor_vender);
                          if (!chequeo_numero && (valor_vender > 0)) {
                              const comision = (x,y) => x*y;
                              alert("Nuestra comisión es de USD " + comision(valor_vender,porcentaje));
                            break;
                          }
                          else {
                            alert("El valor ingresado no es un número válido");
                            break;
                          }

                default: alert ("Opción no válida");
                         break;

                }
                opciones = prompt ("\"Bienvenido a Inmobiliaria XXXX\" \n ¿Qué desea hacer? \n 1 - Alquilar\n 2 - Comprar\n 3 - Vender\n 4 - Salir");
           
            }
            continuar = false;  // elegí opción 4 y se quiere salir  
        }
        else {
            alert("Las direcciones ingresadas no coinciden");
            contador_email++;
            continue;
        }
    }
    
    else {
        direccion_email_1 = prompt("Ingrese su dirección de email");
        contador_email++;
    }
}
alert("Gracias por visitarnos");