//Variables globales
const formularioUI  = document.querySelector("#formulario");
const listaUI = document.querySelector(".lista-actividades");
let arrayActividades  = [];

//Fucniones
const CrearActividad = (actividad) =>{
  let item = {
    actividad: actividad,
    state: false
  }
  arrayActividades.push(item);
  
  return item;
}

const GuardarDB = () => {
  localStorage.setItem('rutina',JSON.stringify(arrayActividades));
  PintarDB();
}

const PintarDB = () => {
  listaUI.innerHTML = '';
  arrayActividades = JSON.parse(localStorage.getItem('rutina'));

  if(arrayActividades === null){
    arrayActividades = [];
  }else{
    arrayActividades.forEach(element => {

      if(element.state){
        listaUI.innerHTML +=
          `
          <div class="alert alert-success" role="alert">
            <i class="material-icons float-left mr-2">
              accessibility_new
            </i>
            <b>${element.actividad}</b> - ${element.state}
            <span class="float-right">
              <i class="material-icons">check_circle</i>
              <i class="material-icons">delete</i>
            </span>
          </div>
          
          `
      } else{
        listaUI.innerHTML +=
          `
          <div class="alert alert-secondary" role="alert">
            <i class="material-icons float-left mr-2">
              accessibility_new
            </i>
            <b>${element.actividad}</b> - ${element.state}
            <span class="float-right">
              <i class="material-icons">check_circle</i>
              <i class="material-icons">delete</i>
            </span>
          </div>
          
          `
      }

   
    });
  }

}

//Eventos
formularioUI.addEventListener('submit',(e)=>{
  e.preventDefault();

  let actividadValue = document.querySelector("#actividad").value;
  
  if(actividadValue !== ""){
    
    CrearActividad(actividadValue);
    GuardarDB();

  }else{
    alert("Necesitas poner al menos una actividad");
  }
  
  formularioUI.reset();
  
});

document.querySelector('DOMContentLoaded',PintarDB());

listaUI.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e);
  if (e.target.innerText === "check_circle"){
      console.log('completado');
      let texto = e.path[2].childNodes[3].innerHTML;
      EditarDB(texto);
    
  } else if (e.target.innerText === "delete"){
      console.log('Remove the element');
      let texto = e.path[2].childNodes[3].innerHTML;
    // console.log(e.path[2].childNodes[3].innerHTML );
      EliminarDB(texto);
    
  }
});

const EliminarDB = (actividad) =>{

  arrayActividades.forEach((element, index)=>{

    if(element.actividad === actividad){
      indexArray = index;
    } 
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();
}

const EditarDB = (actividad)=>{
  let indexArray = arrayActividades.findIndex(elemento => elemento.actividad === actividad);
  arrayActividades[indexArray].state = true;
  GuardarDB();
}