/* Es el portal de una inmobiliaria. Entrega 2
 En la entrega 1 era un sitio web sin login y se enviaba información por email, lo que se hace es solicitarle al usuario
 que ingrese su dirección de email y que la ingrese nuevamente para chequear que es la dirección correcta.
Para la entrega 2 se quitó la opción Vender y se agregó Operador Inmobiliario que tiene login.
Usuario: Juan
Password: 2222
*/

/* La función validar_correo no comprueba 100% si una dirección es válida. 
Sólo se comprueba que no empiece por @ (no por todos lo caracteres no válidos).
Que haya un solo @.
Que en la parte del dominio no empiece ni termine con ".", ni que haya ".." o más
*/
const propiedades_disponibles = [
    {
        id:"a1" ,
        barrio: "Aguada",
        tipo: "casa",
        modalidad: "venta",
        precio: 110000,
    },
    {
        id:"c1" ,
        barrio: "Carrasco",
        tipo: "apartamento",
        modalidad: "alquiler",
        precio: 22500,    
    },
    {
        id:"b1" ,
        barrio: "Buceo",
        tipo: "apartamento",
        modalidad: "venta",
        precio: 54000,    
    },
    {
        id:"a2" ,
        barrio: "Aguada",
        tipo: "apartamento",
        modalidad: "alquiler",
        precio: 16500,    
    },
    {
        id:"a3" ,
        barrio: "Aguada",
        tipo: "apartamento",
        modalidad: "alquiler",
        precio: 13500,    
    },
    {
    id:"a4" ,
    barrio: "Aguada",
    tipo: "apartamento",
    modalidad: "venta",
    precio: 223500,    
},
];

const barrios_habilitados = ["Aguada", "Buceo", "Carrasco"];

const operador_inmobiliario = {
    usuario: "Juan",
    password: "2222",
}

const tipo_de_propiedad = ["apartamento", "casa"];
const tipo_de_negocio = ["alquiler", "venta"];

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


//función para chequer que no esté el id usado
const id_no_disponible = (identificador) => {
    let id_usado;
    for (const prop of propiedades_disponibles) {
        if (prop.id === identificador) {
            id_usado = true;
            break;
        }
        else {
            id_usado = false;
        }
    }
    return id_usado;
}

// función para mostrar las propiedades que están en el barrio deseado y que estén para alquilar
const mostrar_para_alquilar = (barrio_elegido, opcion_elegida) => {
    let mensaje = `Las propiedades disponibles en el barrio ${barrio_elegido} son: \n`;
    let prop_a_mostrar = [];
    
    for (const prop of propiedades_disponibles) {
        if (prop.barrio === barrio_elegido && prop.modalidad === opcion_elegida) {
            prop_a_mostrar.push(prop);
        }
    }        
    if (prop_a_mostrar.length != 0) {
        for (elemento of prop_a_mostrar) {
            mensaje += `Código: ${elemento.id}\n Tipo: ${elemento.tipo}\n Precio: ${elemento.precio}\n-----------------------\n`;
        }
    }    
    else {
       mensaje = `No hay propiedades para alquilar en el barrio ${barrio_elegido}.\n`;
       
    } 
    
    return mensaje;
}

// función para mostrar las propiedades que están en el barrio deseado y que estén para la venta
const mostrar_para_comprar = (barrio_elegido, opcion_elegida) => {
    let mensaje = `Las propiedades disponibles en el barrio ${barrio_elegido} son: \n`;
    let prop_a_mostrar = [];
    
    for (const prop of propiedades_disponibles) {
        if (prop.barrio === barrio_elegido && prop.modalidad === opcion_elegida) {
            prop_a_mostrar.push(prop);
        }
    }        
    if (prop_a_mostrar.length != 0) {
        for (elemento of prop_a_mostrar) {
            mensaje += `Código: ${elemento.id}\n Tipo: ${elemento.tipo}\n Precio: ${elemento.precio}\n-----------------------\n`;
        }
    }    
    else {
       mensaje = `No hay propiedades a la venta en el barrio ${barrio_elegido}.\n`;
    } 
    
    return mensaje;
}

let direccion_email_1 = prompt("Ingrese su dirección de email");
while (continuar && contador_email < 3) {
    if (validar_correo(direccion_email_1)) {
        direccion_email_2 = prompt("Ingrese nuevamente su dirección de email");
        if (direccion_email_1 === direccion_email_2) {
            let opciones = prompt ("\"Bienvenido a Inmobiliaria XXXX\" \n ¿Qué desea hacer? \n 1 - Alquilar\n 2 - Comprar\n 3 - Operador Inmobiliario\n 4 - Salir");

            while (opciones != "4") {

                switch (opciones) {
                case "1": barrio_alquilar = prompt("Indique en que barrio desea alquilar: \n A - Aguada \n B - Buceo \n C - Carrasco");
                          if (nombre_barrio(barrio_alquilar) !== "Nulo") {
                           alert (`${mostrar_para_alquilar(nombre_barrio(barrio_alquilar), "alquiler")}Esta información se enviará a: ${direccion_email_1}`);
                           break;
                          }
                          else {
                            alert ("No contamos con propiedades en ese barrio.");
                            break;
                          }

                case "2": barrio_comprar = prompt("Indique en que barrio desea comprar: \n A - Aguada \n B - Buceo \n C - Carrasco");
                         if (nombre_barrio(barrio_comprar) !== "Nulo") {
                            alert (`${mostrar_para_comprar(nombre_barrio(barrio_comprar), "venta")}Esta información se enviará a: ${direccion_email_1}`);
                            break;
                         }
                         else {
                            alert ("No contamos con propiedades en ese barrio.");
                            break;
                         }    

                case "3":  const usuario = prompt ("Ingrese su usuario de Operador Inmobiliario");
                           const contrasena = prompt ("Ingrese su contraseña");

                           if ( usuario === operador_inmobiliario.usuario && contrasena === operador_inmobiliario.password) {
                             alert ("Bienvenido al Portal");
                             const ingresar_id = () => {
                                    let identificador = prompt("Ingrese el id de la propiedad");
                                    if (identificador === "" || id_no_disponible(identificador)) {  // chequeo que el campo no esté vacío y que el id esté disponible
                                        alert ("Id no válido");
                                        return ingresar_id();
                                    }
                                    return identificador;
                                }

                             const ingresar_barrio = () => {
                                    let nom_barrio = prompt("Ingrese el barrio de la propiedad");
                                    if (nom_barrio === "" || !barrios_habilitados.includes(nom_barrio)) {  // chequeo que el campo no esté vacío y que el barrio sea válido
                                        alert ("Barrio no válido");
                                        return ingresar_barrio();
                                    }
                                    return nom_barrio;
                                }

                             const ingresar_tipo = () => {
                                    let tipo_propiedad = prompt("Ingrese si es casa o apartamento");
                                    if (tipo_propiedad === "" || !(tipo_de_propiedad.includes(tipo_propiedad))) {  // chequeo que el campo no esté vacío y que la propiedad sea válida
                                        alert ("Tipo no válido");
                                        return ingresar_tipo();
                                    }
                                    return tipo_propiedad;
                                }

                                const ingresar_modalidad = () => {
                                    let modalidad = prompt("Ingrese si es para alquiler o venta");
                                    if (modalidad === "" || !(tipo_de_negocio.includes(modalidad))) {  // chequeo que el campo no esté vacío y que el negocio sea válido
                                        alert ("Negocio no válido");
                                        return ingresar_modalidad();
                                    }
                                    return modalidad;
                                }

                                const ingresar_precio = () => {
                                    let precio_ingresado = parseFloat(prompt("Ingrese el precio de la propiedad"));
                                    if (isNaN(precio_ingresado)) {  // chequeo que el campo sea un número
                                        alert ("Ingrese un número");
                                        return ingresar_precio();
                                    }
                                    return precio_ingresado;
                                }

                                propiedades_disponibles.push({
                                    id: ingresar_id(),
                                    barrio: ingresar_barrio(),
                                    tipo: ingresar_tipo(),
                                    modalidad: ingresar_modalidad(),
                                    precio: ingresar_precio(),                            
                                });
                                break;
                          }
                          else {
                            alert("usuario o contraseña incorrecta");
                          }

                default: alert ("Opción no válida");
                         break;

                }
                opciones = prompt ("\"Bienvenido a Inmobiliaria XXXX\" \n ¿Qué desea hacer? \n 1 - Alquilar\n 2 - Comprar\n 3 - Operador Inmobiliario\n 4 - Salir");
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