
const db = firebase.firestore();


const datos ={
  nombreDiscurso: '',
  nombreDiscursante: '',
  numeroDiscurso: '',
  fechaDiscurso: ''
} 
  function guardarDatos(valor){

      return db.collection("discursos").add({
    nombre: valor
  })
}
const formulario = document.querySelector('#formulario');
const nombreDiscurso = document.querySelector('#nombreDiscurso')
const nombreDiscursante = document.querySelector('#nombreDiscursante');
const numeroDiscurso = document.querySelector('#numeroDiscurso');
const fechaDiscurso = document.querySelector('#fechaDiscurso');
const botonGuardar = document.querySelector('#botonGuardar');
const buscar = document.querySelector('#buscar');
const busquedaDiscurso = document.querySelector('#busquedaDiscurso');
const tabla = document.querySelector('#tabla');
        // console.log(nombreDiscurso,nombreDiscursante,numeroDiscurso,fechaDiscurso);


numeroDiscurso.addEventListener('input',leerTexto)
nombreDiscurso.addEventListener('input',leerTexto)
nombreDiscursante.addEventListener('input',leerTexto)
fechaDiscurso.addEventListener('input',leerTexto)
// busquedaDiscurso.addEventListener('input',leerTexto)
        
          
  botonGuardar.addEventListener('click', function(){
      datos.value='';
      guardarDatos(datos).then(function(docRef){
        console.log('elemento agregado a base de datos' + docRef.id);
        datos.value ='';
    }).catch(function(error){
            console.log(error)
  })
} )

// function traerDatos (){db.collection('discursos').get()}
  
buscar.addEventListener('click', () =>{
db.collection("discursos").get().then((querySnapshot) => {
    tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
      //  doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data().nombre);
      const data = doc.data();
      // console.log(data)
      tabla.innerHTML += `<tr>
      <th scope="row">${data.nombre.numeroDiscurso}</th>
      <td scope="row">${data.nombre.nombreDiscurso}</td>
      <td scope="row">${data.nombre.nombreDiscursante}</td>
      <td scope="row">${data.nombre.fechaDiscurso}</td>
    </tr>`
    
  })
  
})
})


formulario.addEventListener('submit', function(evento){
    evento.preventDefault();

  const {nombreDiscurso, nombreDiscursante, fechaDiscurso, numeroDiscurso} = datos;

  if (nombreDiscurso ===''|| nombreDiscursante === '' || numeroDiscurso === ''|| fechaDiscurso ==='') {
      mostrarError('Todos los campos son obligatorios')
      
      return
  mostrarMensaje('Enviado correctamente')
  }
  });  
  
    function leerTexto (e){
          datos[e.target.id] = e.target.value;
          // console.log(datos);
      }

      function mostrarError(mensaje) {  /*funcion para mostrar error cuando no se rellenan los campos*/
      const error = document.createElement('P');/*creamos un parrafo con el mensaje en el html con JS*/
   
        error.textContent = mensaje;/*pasamos el mensaje de la funcion mostrarError*/
     error.classList.add('error'); /*creamos una clase llamada error para dar estilos al parrafo*/
        formulario.appendChild(error); /*sumamos al elemento padre formulario la clase error para dar estilo al parrafo*/
   
   // console.log(error)
    setTimeout(() => {
      error.remove();
    }, 5000);
   
   }
   

      function mostrarMensaje(mensaje){
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('correcto');
        formulario.appendChild(alerta);     
        setTimeout(() => {
                alerta.remove();
            }, 5000);
    }
