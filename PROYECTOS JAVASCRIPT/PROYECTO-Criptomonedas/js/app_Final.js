const criptomonedasSelect = document.getElementById('criptomonedas');
const monedasSelect = document.getElementById('moneda');
const formulario = document.getElementById('formulario');

const objBusqueda ={
    moneda:'',
    criptomoneda:''
}

document.addEventListener ('DOMContentLoaded', () => {
    consultarcriptomonedas();
   
    formulario.addEventListener('submit', submitFormulario);
    monedasSelect.addEventListener('change', leerValor);
    criptomonedasSelect.addEventListener('change', leerValor);
} );

function consultarcriptomonedas(){
 const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => selectcriptomonedas(resultado.Data))
}

function selectcriptomonedas (criptomonedas){
 criptomonedas.forEach(element => {
    const {FullName, Name} = element.CoinInfo;
    
    const option = document.createElement('option');
    option.value =Name;
    option.textContent=FullName;
    criptomonedasSelect.appendChild(option);
 });
}

function leerValor(e){
    objBusqueda [e.target.name]=e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();

    //validar
    console.log(objBusqueda);
    const {moneda, criptomoneda} = objBusqueda;

    if (moneda==='' || criptomoneda===''){
        mostrarAlerta('Estos campos son obligatorios');
        return;
    }

    //consultar datos API
    consultarAPI();
 }

 function mostrarAlerta(msg){
    const existeMensaje = document.getElementsByClassName('error');
    
     if (existeMensaje.length === 0){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent=msg;
        formulario.appendChild(divMensaje);
        
      
      // Quitar el alert despues de 3 segundos
            setTimeout( () => {
                divMensaje.remove();
            }, 3000);
      }
 }

 function consultarAPI(){

    const {moneda, criptomoneda} =objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
     .then(respuesta => respuesta.json())
     .then(resultados => mostrarcotización(resultados.DISPLAY[criptomoneda][moneda]))
 }
 function mostrarcotización(cotizacion){
    console.log(cotizacion);
   const {PRICE,HIGHDAY}= cotizacion

   const precio = document.createElement('p');
   precio.classList.add('precio');
   precio.innerHTML=`El precio es: <span>${PRICE}</span>`;
   resultado.appendChild(precio); 

 }