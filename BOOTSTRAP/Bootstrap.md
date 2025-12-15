# Bootstrap

Bootstrap es un framework de desarrollo front-end que permite crear sitios web responsives y modernos de manera utilizando HTML, CSS y JavaScript.

## Instalación de Bootstrap
Puedes instalar Bootstrap a través de CDN o integrarlo en tu proyecto descargando los archivos.

**Instalación a través de npm**

Si estás utilizando NPM, puedes instalar Bootstrap con el siguiente comando:
```bash
npm install bootstrap
```
Luego, importa Bootstrap en tu archivo JavaScript o CSS:
```bash
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```

**Instalación desde CDN**
```html
<link href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
```

**Descarga directa**
Descargar desde https://getbootstrap.com.

## Estructura básica

HTML básico con Bootstrap

Estructura básica de un archivo HTML que incluye Bootstrap.
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Proyecto Bootstrap</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-center">¡Hola, Bootstrap!</h1>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```


## Contenedores
Los contenedores son elementos que encapsulan el contenido y son esenciales para el sistema de cuadrículas. Puedes utilizar dos tipos de contenedores:

**Contenedor fijo**

Tiene un ancho máximo que se adapta a diferentes tamaños de pantalla.
```html
<div class="container">
<!-- Contenido -->
</div>
```

**Contenedor fluido**

Ocupa el 100% del ancho.
```html
<div class="container-fluid">
  <!-- Contenido -->
</div>
```

**Contenedores responsivos**
Los contenedores adaptables permiten especificar una clase con un ancho del 100% hasta alcanzar el punto de interrupción especificado. Tras ello, se aplican max-widths a cada punto de interrupción superior. Por ejemplo,  `.container-sm` es 100% ancho al principio hasta smalcanzar el punto de interrupción, donde se escalará con md, lg, xly xxl.
```html
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>
```

## Filas

Las filas (.row) son necesarias para agrupar columnas (.col). El sistema de cuadrículas se basa en 12 columnas.
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Columna 1</div>
    <div class="col-md-6">Columna 2</div>
  </div>
</div>
```

# Sistema de Grid
El sistema de cuadrícula de Bootstrap es una de sus características principales, que permite la creación de diseños receptivos que se adaptan fácilmente a diferentes tamaños de pantalla.

Está basado en un diseño de 12 columnas y utiliza clases predefinidas para especificar cómo deben comportarse los elementos en diferentes puntos de interrupción.

El sistema de grids usa 12 columnas por fila y es responsive.
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Columna 1 (6 columnas)</div>
    <div class="col-md-6">Columna 2 (6 columnas)</div>
  </div>
</div>
```

## Cuadrícula Básica

```html
<div class="container">
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
    </div>
    <div class="col">
    </div>
  </div>
</div>
```
Bootstrap maneja el relleno, el espaciado entre columnas y la alineación.


## Clases de columna

Bootstrap permite ajustar el comportamiento de las columnas en diferentes tamaños de pantalla:

- `col-*`: Extra pequeño (móviles)
- `col-sm-*`: Pequeño (pantallas ≥ 576px)
- `col-md-*`: Mediano (pantallas ≥ 768px)
- `col-lg-*`: Grande (pantallas ≥ 992px)
- `col-xl-*`: Extra grande (pantallas ≥ 1200px) 
- `col-xxl-*`: Extra extra grande (Bootstrap 5+, más de 1400px). 
- `col o col-auto`: Usa col para dividir equitativamente, o col-auto para que ocupe solo el espacio necesario para su contenido. 


## Alineamiento horizontal de columnas
En Bootstrap 5, se pueden usar las utilidades de alineación flexbox para alinear horizontalmente las columnas. Para hacerlo, se pueden usar las clases que se muestran en la siguiente tabla en el elemento .row que contiene las columnas.

| Clase                      | Descripción |
|----------------------------|-------------|
| .justify-content-start     | Alinea las columnas al inicio de la fila. |
| .justify-content-center    | Alinea las columnas al centro de la fila. |
| .justify-content-end       | Alinea las columnas al final de la fila. |
| .justify-content-between   | Distribuye el espacio entre las columnas de manera uniforme, con la primera columna al inicio y la última al final de la fila. |
| .justify-content-around    | Distribuye el espacio alrededor de las columnas de manera uniforme. |
| .justify-content-evenly    | Distribuye el espacio entre y alrededor de las columnas de manera uniforme. |


Ejemplo:
```html
<div class="container">
  <div class="row justify-content-start">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
  <div class="row justify-content-end">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
  <div class="row justify-content-around">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
  <div class="row justify-content-between">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
  <div class="row justify-content-evenly">
    <div class="col-4">
      Una de dos columnas
    </div>
    <div class="col-4">
      Una de dos columnas
    </div>
  </div>
</div>
```

## Alineamiento vertical de columnas
En Bootstrap 5, puedes utilizar las utilidades de alineación flexbox para alinear verticalmente las columnas. Para hacerlo, puedes usar las clases `.align-items-*` en el elemento `.row` que contiene las columnas. Por ejemplo, para alinear las columnas al inicio, centro o final de la fila, puedes usar las clases `.align-items-start`, `.align-items-center` y `.align-items-end`, respectivamente.

También puedes alinear individualmente las columnas utilizando las clases `.align-self-*` en los elementos `.col`. Por ejemplo, para alinear una columna al inicio, centro o final de la fila, puedes usar las clases `.align-self-start`, `.align-self-center` y `.align-self-end`, respectivamente. Veamos una tabla descriptiva.

| Clase                | Descripción |
|----------------------|-------------|
| .align-items-start   | Alinea las columnas en la parte de arriba de la fila. |
| .align-items-center | Alinea las columnas en el centro de la fila. |
| .align-items-end    | Alinea las columnas en la parte de abajo de la fila. |
| .align-self-start   | Alinea individualmente una columna en la parte de arriba de la fila. |
| .align-self-center  | Alinea individualmente una columna al centro de la fila. |
| .align-self-end     | Alinea individualmente una columna en la parte de abajo de la fila. |


Ejemplo:
```html
 <style>
   .align-items-start{ height: 100px; background-color: green;}
  .align-items-center{ height: 100px; background-color: blue;}
  .align-items-end{ height: 100px; background-color: red;}
  .col{background-color: #e4e4e4; border: 1px solid grey;}
  </style>
<div class="container">
  <div class="row align-items-start">
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
  </div>
  <div class="row align-items-center">
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
  </div>
  <div class="row align-items-end">
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
    <div class="col">
      Una de tres columnas
    </div>
  </div>
</div>
```

# Ejemplo completo
```css
    body {
        background: #EEEFF2;
        color: #fff;
    }
    header {
        background: #cccfe7;
        padding: 20px;
    }
    main article {
        color: #000;
        background: #587b55;
        padding: 20px;
    }
    aside {
        background: #238399;
        padding: 20px;
    }
    footer {
        background: #d29693;
        padding: 20px;
    }
```

```html
 <div class="container">
		<header class="row">
			<div class="col">
				<h1>Header</h1>
				<p>12 Columnas</p>
			</div>
		</header>
		<main class="row">
			<article class="col-12 col-md-8">
				<h3>Article</h3>
				<p class="d-none d-md-block">8 Columnas</p>
				<p class="d-block d-md-none">12 Columnas</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum posuere sollicitudin. Nullam tempus, odio et convallis hendrerit, libero ligula sollicitudin mauris, non facilisis nibh justo id ante. Curabitur maximus bibendum rhoncus. Nullam posuere diam nunc. Morbi pellentesque lacus et turpis commodo aliquet. Sed nec ex mi. Sed ultricies eros et leo bibendum, sit amet egestas diam auctor.
				</p>
				<p>
					Ut sed dui ante. Quisque id auctor arcu. Etiam id sem porta, dignissim nisi at, ullamcorper tellus. Etiam malesuada risus nulla, a consectetur justo elementum sed. Nulla eleifend dolor eget ex pharetra, in dictum nulla dignissim. Etiam lacus risus, dictum sed nisi sed, vulputate molestie enim. Donec gravida tortor turpis, vitae dictum tellus auctor ac. Vestibulum suscipit lorem lacus, sit amet volutpat lorem volutpat eu. Nam in vehicula magna, eu pharetra justo.
				</p>
			</article>
			<aside class="col-12 col-md-4">
                <h3>Aside</h3>
                <p class="d-none d-md-block">4 Columnas</p>
                <p class="d-block d-md-none">12 Columnas</p>
			</aside>
		</main>
		<footer class="row">
			<div class="col-12">
				<h3>Footer</h3>
				<p>12 Columnas</p>
			</div>
		</footer>
	</div>
</div>
```