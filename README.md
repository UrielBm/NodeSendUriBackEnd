# Api de Node Send Uri

-esta es una Api de prueba realizada con Node.js y el framework de Express para evaluar y probar los conocimientos del lenguaje de JavaScript.

-Realizada por : Uriel Benítez Medina ;)
-Github [link de GitHub](https://github.com/UrielBm)

## Demo

El demo de la Api la puedes encontrar en [Api Courflix](https://node-send-uri.herokuapp.com/).

## rutas genericas

**https://node-send-uri.herokuapp.com/** _endpoint de bienvenida_

## rutas links 

**https://node-send-uri.herokuapp.com/links** _endpoint para ver todas las url de los archivos_

**https://node-send-uri.herokuapp.com/link/:url** _endpoint para ver un los datos del link mediante su id de Url_

**https://node-send-uri.herokuapp.com/verify/:url** _endpoint para verificación del password del archivo protegido_

**https://node-send-uri.herokuapp.com/link"** _endpoint para crear un registro del archivo subido metodo post_


### para hacer registro de productos

Para hacer un registro de usuario EXITOSAMENTE debes ocupar los paramentros requeridos:

```
"name": "Pechuga empanizada" ***requerido***
"original_name": 60 ***requerido***
"downloads": "pechuga empanizada con chilaquiles" ***NO REQUERIDO***
"password": " password para proteger el archivo de descarga" ***NO REQUERIDO***
"author": " id del Usuario quien subio el archivo" ***NO REQUERIDO***
"url" "la url del archivo" 
```

**_Para hacer updates de productos necesitas el id y los campos para actulizar_**
