//Primero vamos a crear la clase Vehicle. Esta clase será la base para todos los vehículos. 
// Cada vehículo deberá guardar la marca del vehículo, el modelo del vehículo, el año de fabricación,
// el kilometraje, tambien deberá indicar si el vehículo está en mantenimiento (por defecto será que no).
//Además, la clase deberá tener las siguientes funcionalidades: comenzar mantenimiento, que cambiará el estado 
//del vehículo para indicar si esta o no mantenimiento y mostrará un mensaje indicando que el vehículo está en mantenimiento
//Finalizar mantenimiento, que finalizará el mantenimiento del vehículo y mostrará un mensaje indicando que el mantenimiento ha terminado.


//Despues vamos a crear tres clases que heredarán de Vehicle:
//la clase coche, moto y camión que además de los atributos y funciones de Vehicle, tendrá un atributo adicional 
//para guardar el tipo de combustible. El método iniciar mantenimiento se sobrescribirá para añadir un mensaje que
//indique que se esta realizando en el mantenimiento, ej: el cambio de aceite y la revisión de frenos.


//Por ultimo vamos a tener la clase taller, que servirá para gestionar múltiples vehículos. 
// La clase deberá guardar el nombre del taller, un array con todos los vehículos registrados y además tendra
//las siguientes funcionalidades: permitir añadir un vehiculo al registro, devolver la lista de todos los vehiculos
//registrados y eliminar un vehículo de la lista

// Para manejar la interfaz del formulario, utilizaremos el DOM.

//Necesitamos realizar la correspondiente validación de datos:

//Antes de crear un vehículo, debemos asegurarnos de que los datos introducidos por el usuario sean válidos.
//Hay que comprobar si un campo está vacío o solo contiene espacios
//Comprobar si el año es un número entero entre 1900 y el año siguiente
//Comprobar si un valor es un número mayor o igual a 0
//Comprobar que todos los campos obligatorios tengan datos
//Que el año y el kilometraje sean válidos
//Que el campo extra (combustible, cilindrada o carga máxima) sea válido
//Si algún dato es incorrecto, se mostrará un mensaje de error y no se creará el vehículo.

//añadiremos botones para interactuar con los vehículos desde la lista de vehiculos registrados
//Botón “Mantenimiento” → inicia el estado de mantenimiento del vehículo
//Botón “Finalizar” → finaliza el estado de mantenimiento del vehiculo
//Botón “Borrar” → elimina el vehículo del listado
//Cuando un vehículo esté en mantenimiento, cambiaremos el estilo para que se diferencie del resto.