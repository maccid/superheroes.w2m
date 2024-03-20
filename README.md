# SuperHeroes W2M

Prueba Técnica para World2Meet

## Conexión API

Para que el proyecto funcione con normalidad se puede simular el servicio REST API de dos maneras:

- Mediante JSON server, para ello se debe lanzar el siguiente comando dentro del proyecto `npm run api`. Esta opción afectará directamente al fichero _db.json_ localizado en la carpeta .docker/json-server.

- Mediante docker, es necesario tener docker y docker-compose en su Sistema Operativo y lanzar el siguiente comando dentro del proyecto `npm run docker`, el cual crea un contenedor que simula una REST API. Está opción no afecta al fichero _db.json_ debido a que una _copia_ de la base de datos, reseteando los datos cada vez que se levante el docker.

## Latencia de la red

Para ver correctamente las funcionalidades exigidas sería bueno ralentizar la red y hacer que la red funcione con un 3G lento para asi poder apreciar mejor funcionalides tales como el loader o la cancelación de peticiones cuando se lanza los eventos del filtro.

## Documentación

La documentación del proyecto y la toma de decisiones se muestra dentro del proyecto en la página de inicio.