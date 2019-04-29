# Admin DGT

Sitio de administración de Autos, Conductores y Multas

Antes de ejecutar el proyecto completo se tienen que tener en consideración los siguientes elementos instalados en la PC:

Back-End
1 - Visual Studio que soporte ASP Core 2.1

Front-End
1- Node Js vr 11.11.0 o superior
2- Ancular CLI 1.7.4 o superior

Instrucciones para ejecutar los proyectos.

Back-End
Para ejecutar la API es necesario correr las migraciones y ejecutar el proyecto. Para eso siga los siguientes pasos:
1 - Abra el proyecto en Visual Studio
2 - Ir a la pestaña del IDE "Herramientas" > "Administrador de Paquetes NuGet" > "Consola del Administrador de paquetes"
3 - Dentro de la consola que se abrió buscar la opción en la parte superior "Proyecto Predeterminado" y seleccionar "Entidades"
4 - Ejecutar el siguiente comandoe en la consola: "Update-Database"
5 - Una vez aplicado el comando ejecutar la aplicación

Front-End
1 - Abrir proyecto con Visual Studio Code (Opcional)
2 - Abrir la consola del IDE o la consola de CMD
3 - Seleccionar la carpeta mediante la consola del Proyecto Front-End
4 - Ejecutar el comando "npm install"
5 - Abrir el archivo "environment.dev" con el IDE seleccionado ubicado dentro de la carpeta "src" > "environments"
6 - Actualizar la variable "urlApi" con la ruta de la API que genero el Visual Studio 
7 - Ejecutar el comando "ng serve -c dev"
8 - Abrirl la ruta "http://localhost:4200/" en el explorador de preferencia 
