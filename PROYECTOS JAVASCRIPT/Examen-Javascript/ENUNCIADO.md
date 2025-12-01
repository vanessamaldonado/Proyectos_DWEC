# EXAMEN — Gestor de Gastos Personales en Javascript

## Duración: 
2 horas

## PARTE 1: Implementación de Funcionalidades mínimas para manejar el formulario (MAX 5 puntos)

Completa todos los **// TODO:** del archivo app.js proporcionado para que el proyecto funcione correctamente.

Funcionalidades mínimas requeridas:
- Crear y gestionar un array de gastos con los campos incluidos en el formulario del fichero HTML:
    - Concepto del gasto
    - Fecha del gasto
    - Importe (€)
    - Categoría (alimentación, transporte, ocio, otros)
- Permitir agregar, editar y eliminar registros correctamente.
- Validar los campos antes de registrar un gasto:
    - Ningún campo del formulario puede quedar vacío.
    - La fecha  del gasto no puede ser una fecha futura (mayor al día actual).
- Mostrar el listado de gastos ordenado por fecha más reciente.
- Calcular y mostrar el total gastado actualizado tras las distintas operaciones permitidas (agregar, editar y eliminar).
- Mostrar mensajes de confirmación o error en pantalla.

---

## Validación del campo importe del formulario (MAX 1 punto)
Realizar la validación correspondiente en javascript del campo **“Importe (€)”** para que solo se permitan números con decimales.
El valor introduccido debe ser mayor que 0€ y menor a 5.000€.
(No se permite usar type="number" en el HTML).

## Evitar duplicados (MAX 1 punto)
Realizar la validación correspondiente en javascript para no permitir dos gastos con el mismo concepto y fecha.

## Botón “Limpiar formulario” (MAX 1 punto)
Añadir e implementar la funcionalidad de un botón que borre los valores que hay en el formulario.

## Botón “Eliminar todos los gastos” con pregunta de confirmación (MAX 2 punto)
Añadir e implementar la funcionalidad de un botón que borre todos los gastos dados de alta.
Antes de eliminar, se deberá mostra un alert pidiendo confirmación al usuario Ejem: "¿Seguro que quieres borrar todos los gastos?", si el usuario confirma, se procederá a eliminar todos los gastos de la lista.

---
### ⚠️ **IMPORTANTE: ERRORES JAVASCRIPT**

Previo a la entrega, cada alumno debe comprobar la consola del navegador y asegurarse de que:

👉 **NO existe ningún error JavaScript en consola**

Se penalizará cualquier error de tipo:

- **ReferenceError**
- **SyntaxError**
- **TypeError**
- **Valores `undefined` inesperados**
- **Fallos en eventos o en el DOM**

> Aunque la funcionalidad parezca funcionar,  
> la presencia de errores en consola implica pérdida de puntuación,  
> ya que indica falta de control, falta de pruebas o mal uso del DOM.

### ⭐ Valoración positiva adicional
Se tendrá en cuenta cualquier iniciativa que mejore:

- la claridad del código
- su organización
- la limpieza o la indentación
- comentarios explicativos
- nombres de variables significativos
- uso adecuado del DOM y arrays
- soluciones creativas sin romper la plantilla y la estructura del proyecto
