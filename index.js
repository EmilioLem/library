flatpickr("input[type=datetime-local]", {}); //fecha
const ordenDatos = ["codigo", "nombre", "Autor", "# de páginas", "Ubicación aprox"];
let libroR = []; //ordenDatos.length
let faseG=0; //Proceso de guradar libros
const miEntrada = document.getElementById("miEntrada");
const mainDisplay = document.getElementById("mainDisplay");
const misButtons = document.getElementById("misButtons");
let cancelarB = "<button id='opcB' onclick='resetear()'>Cancelar</button>";
let cadenota = "";

function work(event){
  if(event.keyCode===13 && miEntrada.value!==""){

    if(faseG===0 && 1===1){
      mainDisplay.innerHTML = "";
      misButtons.innerHTML = "";
      if(localStorage.getItem(miEntrada.value)){
        alert("Ya está registrado, damos opciones...");

      }
      else if("tratamos de"==="buscar titulos"){
        //en la base, ofrecemos opciones
      }
      else if(miEntrada.value==="/estado"){
        miEntrada.value = "";
        mainDisplay.innerHTML = `Hay registrados ${localStorage.length-1} libros`; //Mantener actualizado
      }
      else if(miEntrada.value==="/limpiar"){
        miEntrada.value="";
        localStorage.clear();
        mainDisplay.innerHTML = "Suerte!";
      }
      else if(miEntrada.value==="/ampliar"){
        miEntrada.value="";
        cadenota = "";
        for(let i=0; i<localStorage.length; i++){
          let keyTemp = localStorage.key(i);
          if(keyTemp!=="prestados" && keyTemp!=="otros"){
            cadenota += keyTemp + localStorage.getItem(keyTemp);
          };
        };
        miEntrada.placeholder = "conserva estos códigos";
        mainDisplay.innerHTML = cadenota;
        misButtons.innerHTML = "<h2>Ya se copió al portapapeles</h2><button id='opcB' onclick='copiarPortaPapeles()'>Volver a copiar al portapapeles</button>" + cancelarB;
        copiarPortaPapeles();
      }
      else if(miEntrada.value==="/ayuda" || miEntrada.value==="/Ayuda" || miEntrada.value==="/help" || miEntrada.value==="/Help"){
        miEntrada.value="";
        mainDisplay.innerHTML = "<h2>/estado<br>/limpiar<br>/ayuda<h2>";
        misButtons.innerHTML = cancelarB;
      }
      else if(miEntrada.value.substr(0,1)==='[' || miEntrada.value.length>20){ //Podríamos retirar una condicion para facilitar el guardado
          alert("Registrando libro por cadena rara/larga...");
      }
      else{
        mainDisplay.innerHTML = "<h3>Registrando libro...</h3>";
        guardaP();
      };
    }
    else if(faseG!==0){
      guardaP();
    }
  };
};

function guardaP(){
  mainDisplay.innerHTML += `<li>${ordenDatos[faseG]}: ${miEntrada.value}</li>`;
  libroR[faseG] = miEntrada.value;
  miEntrada.value = "";
  console.log(`faseG: ${faseG}, ordenDatos.length: ${ordenDatos.length}`);
  if(faseG<ordenDatos.length-1){
    faseG++;
    miEntrada.placeholder = ordenDatos[faseG];
    misButtons.innerHTML = cancelarB;
  }else{
    localStorage.setItem(libroR.shift(), JSON.stringify(libroR));
    resetear();
    mainDisplay.innerHTML = "<h2>Guardado correctamente</h2>";
  };
};

function resetear(){
  libroR=[];
  faseG=0;
  miEntrada.placeholder = ordenDatos[0];
  miEntrada.value = "";
  mainDisplay.innerHTML = "";
  misButtons.innerHTML = "";
  //Buscar enfocar el cursor al input
};

function displayInfo(codeTdisplay){
  mainDisplay.innerHTML = `<h2>El libro ${codeTdisplay} ya está registrado:</h2>\n${localStorage.getItem(codeTdisplay)}`;
};

function copiarPortaPapeles(){
  const listener = function(ev) {
    ev.preventDefault();
    ev.clipboardData.setData('text/plain', cadenota);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
};

//En una lista, tener los códigos de libros pedidos
//En listas distintas, cada libro.
//Permitir mostrar todos los datos en una sola cadena, para copiar y pegar en algún lugar seguro como respaldo (e investigar como copiarlo al portapapeles)
//Permitir hacer respaldos metiendo una sola cadena

