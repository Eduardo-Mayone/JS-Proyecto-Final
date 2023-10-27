/* Es el portal de una inmobiliaria.
Dado que con la lógica que fue pensado para la Entrega 1 y 2, no aplicaba para esta entrega, se tuvo que modificar sustancialmente.
La idea en la Entrega 2 era tener acceso a un visitante y a un operador inmobiliario.
Para esta entrega no llegué a implementar la parte del operador inmobiliario.
Además de que no queda bien que el inicio de la página sean 2 botones.
Pero se mantuvo la lógica del visitante teniendo que colocar su dirección de email para que se le pueda enviar información.
*/
//import { propiedades_disponibles } from "./helpers/data.js";

const propiedades_disponibles = [
    {
        id:"a1" ,
        barrio: "Aguada",
        tipo: "Casa",
        modalidad: "Venta",
        foto:"../assets/images/aguada_a1.jpg",
        precio: 110000,
    },
    {
        id:"c1" ,
        barrio: "Carrasco",
        tipo: "Apartamento",
        modalidad: "Alquiler",
        foto:"../assets/images/carrasco_c1.jpg",
        precio: 22500,    
    },
    {
        id:"b1" ,
        barrio: "Buceo",
        tipo: "Apartamento",
        modalidad: "Venta",
        foto:"../assets/images/buceo_b1.jpg",
        precio: 54000,    
    },
    {
        id:"a2" ,
        barrio: "Aguada",
        tipo: "Apartamento",
        modalidad: "Alquiler",
        foto:"../assets/images/aguada_a2.jpg",
        precio: 16500,    
    },
    {
        id:"a3" ,
        barrio: "Aguada",
        tipo: "Apartamento",
        modalidad: "Alquiler",
        foto:"../assets/images/aguada_a3.jpg",
        precio: 13500,    
    },
    {
    id:"a4" ,
    barrio: "Aguada",
    tipo: "Apartamento",
    modalidad: "Venta",
    foto:"../assets/images/aguada_a4.jpg",
    precio: 223500,    
},
];

let email_dir; // variable para capturar la dirección de correo del visitante

//Opción Visitante pide que ingrese el correo para luego enviarle la información de lo solicitado

let opcion_inicio_visitante = document.getElementById("boton_visitante");
opcion_inicio_visitante.addEventListener("click", pedirCorreo);

function pedirCorreo () {
    const formulario_visitante = document.querySelector(".formulario_visitante");
    formulario_visitante.innerHTML = `
    <form id="ingrese_email" class="ingreso_correo">
    <div>
        <label for="email_1">Ingrese Email</label>
        <input type="email" id="email_1" name="email_1">
    </div>
    <div>
        <label for="email_2">Reingrese su Email</label>
        <input type="email" id="email_2" name="email_2">
    </div>
    <button class="enviar" type="submit">Enviar</button>
</form>`;
document.getElementById("boton_operador").disabled = true;
despliego_formulario();

}


//Opción Operador Inmobiliario pide usuario y contraseña para agregar propiedad

// let opcion_inicio_operador = document.getElementById("boton_operador");
// opcion_inicio_operador.addEventListener("click", pedirUsuario);        

// function pedirUsuario () {
//     const formulario_operador = document.querySelector(".formulario_operador");
//     formulario_operador.innerHTML = `
//     <form id="ingrese_operador" class="ingreso_operador">
//     <div>
//         <label for="user">Usuario</label>
//         <input type="text" id="user">
//     </div>
//     <div>
//         <label for="clave">Contraseña</label>
//         <input type="password" id="clave">
//     </div>
//     <button type="submit">Enviar</button>
// </form>`;
// document.getElementById("boton_visitante").disabled = true;

// }

// Visitante chequeo que los correos sean iguales
  
function despliego_formulario () {

const formulario = document.getElementById("ingrese_email")
formulario.addEventListener("submit", valido_email);

}

// función para comprobar que el email y su reingreso es el mismo
function valido_email(e) {
    e.preventDefault();
    const email_1 = document.getElementById("email_1");
    const email_2 = document.getElementById("email_2");
    console.log("en valido email");
    console.log(email_1.value);
    console.log(email_2.value);

    if (email_1.value === email_2.value){
        email_dir = email_1.value;
        mostrar_propiedades();
        const borro_mensaje_error = document.getElementById("mensaje_inicio");
        borro_mensaje_error.innerHTML = "";
    }
    else {
        const mensaje = document.getElementById("mensaje_inicio");
        mensaje.innerHTML = `Las direcciones no coinciden`;
    }
}

// muestra todas la propiedades disponibles
function mostrar_propiedades() {
console.log("estoy en mostrar propiedad");    
    const contenedor = document.querySelector('.box_propiedad');
    contenedor.innerHTML ="";  
    for (const propiedad of propiedades_disponibles) {
        contenedor.innerHTML += `
        <article id=${propiedad.id} class="box">
        
            <div class="propiedad_body">
                <h3>${propiedad.tipo} en barrio: ${propiedad.barrio}</h3>
                <img src= ${propiedad.foto} alt= "imagen propiedad">
                <h3>En ${propiedad.modalidad}</h3>
                <h3>Valor: <i>$${propiedad.precio}</i></h3>
                <button class= "boton_solicitar" onclick="solicitarInformacion('${propiedad.id}')">Solicitar Información</button>
            
            </div>
        </article>`;
    }
}

let listado= [];

if (localStorage.getItem('listado')) {
    listado = JSON.parse(localStorage.getItem('listado'));
}

// agrega en listado las propiedades sobre las cuales se quiere información
function solicitarInformacion(id) {
    const info_propiedad = propiedades_disponibles.find((propiedad) => propiedad.id === id);
console.log("en solicitar informacion");
console.log(info_propiedad);    
    // Si la propiedad no se agregó, incluirla
    if (info_propiedad && (!listado.some((item) => item.id === id))){
        // cambio el id para que no queden 2 elementos con el mismo id
        listado.push(info_propiedad);
        listado.id = "duplicado_" + info_propiedad.id;
        localStorage.setItem('listado', JSON.stringify(listado));
console.log(listado);
    }
    mostrarListadoPropiedades();
}

// muestra las propiedades seleccionadas en la sección lado derecho de la página
function mostrarListadoPropiedades() {

     const listado_elementos = document.querySelector('.lado_derecho');
     listado_elementos.innerHTML = '';
     const titulo = document.createElement("h3");
     titulo.innerHTML= `
     <h3>PROPIEDADES SELECCIONADAS</h3>
     <h3> Le enviaremos la información a: ${email_dir}</h3>
     `
     listado_elementos.appendChild(titulo);

     listado.forEach((item) => {

         const listadoItem = document.createElement('div');
         // agrego id al div para poder borrarlo
         listadoItem.setAttribute("id", `${item.id}`);

         listadoItem.innerHTML = `
         <article class="listado_contenedor">
            <img src=${item.foto} alt='imagen de la propiedad en barrio ${item.barrio}'>
            <div class="listado_card">
                <p>Barrio: ${item.barrio} </p>
                <p>Precio: $${item.precio}</p>
            </div>
            <a class="boton_eliminar" data-id="${item.id}">Eliminar</a>
         </article>
       `;

         const eliminarButton = listadoItem.querySelector('.boton_eliminar');
         eliminarButton.addEventListener('click', () => {
             borrar_propiedad(listadoItem.id);
         });

         listado_elementos.appendChild(listadoItem);
     });

}

function borrar_propiedad(id) {

    const index = listado.findIndex((item) => item.id === id);

    if (index !== -1) {
        listado.splice(index, 1);
        localStorage.setItem('listado', JSON.stringify(listado));

        const itemElement = document.getElementById(id);

        if (itemElement) {
            itemElement.remove();
        }
        mostrar_propiedades();
        mostrarListadoPropiedades();
    }


}








