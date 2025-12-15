# Inicio rápido

Crea un nuevo index.htmlarchivo en la raíz de tu proyecto. Incluye la <meta name="viewport">etiqueta para que funcione correctamente en dispositivos móviles.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

Incluya el CSS y el JS de Bootstrap. Coloque la `<link>` etiqueta en el `<head>` para nuestro CSS y la `<script>` etiqueta para nuestro paquete de JavaScript (incluido Popper para posicionar menús desplegables, ventanas emergentes y descripciones emergentes) antes del cierre `</body>`.
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  </head>
  <body>
    <h1>Hello, world!</h1>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

 Abre la página en tu navegador para ver tu página Bootstrap.

## Creamos la estructura base de nuestro proyecto

```html
    <div class="container">
		<header class="row">
		</header>
		<main class="row">
			<article class="col-12 col-md-8">			
			</article>
			<aside class="col-12 col-md-4">            
			</aside>
		</main>
		<footer class="row">			
		</footer>
	</div>
```

A partir de aqui haremos uso de los componentes de Bootstrap: https://getbootstrap.com/docs/5.0/customize/components/

## Añadimos un menu en el header
El menú siempre va dentro de `header`, pero el menú es un componente `nav`.

Elegimos el componente que nos guste y lo ponemos en nuestro header: 
```html
<header class="row">
    <div class="col">
        <!--h1>Header</h1>
        <p>12 Columnas</p-->
                <!-- Columna menú -->
        <nav class="nav">
            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            <a class="nav-link" href="#">Servicios</a>
            <a class="nav-link" href="#">Contacto</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </nav>
    </div>
</header>
```

## Añadimos un formulario 

Elegimos un formulario que nos guste y un botón y lo ponemos en nuestra sección article:
```html
<article class="col-12 col-md-8">
    <!--h3>Article</h3>
    <p class="d-none d-md-block">8 Columnas</p>
    <p class="d-block d-md-none">12 Columnas</p-->
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <button type="button" class="btn btn-primary">Primary</button>
</article>
```

## Añadimos un Card

Elegimos un componente de tipo card que nos guste y lo ponemos en nuestra sección aside:
```html
<aside class="col-12 col-md-4">
    <!--h3>Aside</h3>
    <p class="d-none d-md-block">4 Columnas</p>
    <p class="d-block d-md-none">12 Columnas</p-->
    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
</aside>
```

## Añadimos enlaces de redes sociales en el footer

Elegimos un componente de tipo nav y lo ponemos en el footer:
```html
<footer class="row">
    <div class="col-12">
        <!--h3>Footer</h3>
        <p>12 Columnas</p-->
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Instagram</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">TikTok</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Linkedin</a>
            </li>
        </ul>
    </div>
</footer>
```
