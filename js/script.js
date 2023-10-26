/* Es el portal de una inmobiliaria.
 En la entrega 1 era un sitio web sin login y se enviaba información por email, lo que se hace es solicitarle al usuario
 que ingrese su dirección de email y que la ingrese nuevamente para chequear que es la dirección correcta.
Para la entrega 2 se quitó la opción Vender y se agregó Operador Inmobiliario que tiene login.
Usuario: Juan
Password: 2222
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
console.log("en formulario");
}


function valido_email(e) {
    e.preventDefault();
    const email_1 = document.getElementById("email_1");
    const email_2 = document.getElementById("email_2");
    console.log("en valido email");
    console.log(email_1.value);
    console.log(email_2.value);

    if (email_1.value === email_2.value){
        mostrar_propiedades();
    }
    else {
        const mensaje = document.getElementById("mensaje_inicio");
        mensaje.innerHTML = `Las direcciones no coinciden`;
    }
}

function mostrar_propiedades() {
    const contenedor = document.querySelector('.box_propiedad');  
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
    console.log(listado)
}

function solicitarInformacion(id) {
    console.log ("solicito información");
    const info_propiedad = propiedades_disponibles.find((propiedad) => propiedad.id === id);
    // Si la propiedad no se agregó, incluirla
    if (info_propiedad && !listado.some((item) => item.id === id)) {
        listado.push(info_propiedad);
        localStorage.setItem('listado', JSON.stringify(listado));
        console.log(listado)
    }
    mostrarListadoPropiedades();

}

function mostrarListadoPropiedades() {
     const listado_elementos = document.querySelector('.lado_derecho');
     listado_elementos.innerHTML = '';
     const titulo = document.createElement("h3");
     titulo.innerHTML= `
     <h3>PROPIEDADES SELECCIONADAS</h3>
     `
     listado_elementos.appendChild(titulo);

     listado.forEach((item) => {
         const listadoItem = document.createElement('div');
         //listadoItem.classList.add('carrito-item');
         listadoItem.innerHTML = `
         <article class="listado_contenedor">
             <img src=${item.foto} alt='imagen de la propiedad en barrio ${item.barrio}'>
            <div class="listado_card">
                <p>Barrio: ${item.barrio} - Precio: $${item.precio}</p>
            </div>
             <a class="borrar-button" data-id="${item.id}"><span><i class="bi bi-trash"></i></span></a>
         </article>
       `;

//         const eliminarButton = carritoItem.querySelector('.borrar-button');
//         eliminarButton.addEventListener('click', () => {
//             borrarViaje(item.id);
//         });

         listado_elementos.appendChild(listadoItem);
     });

}










