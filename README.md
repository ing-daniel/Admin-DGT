# Admin DGT

Sitio de administración de Autos, Conductores y Multas

Antes de ejecutar el proyecto completo se tienen que tener en consideración los siguientes elementos instalados en la PC:

Back-End <br />
1 - Visual Studio que soporte ASP Core 2.1

Front-End <br />
1- Node Js vr 11.11.0 o superior <br />
2- Ancular CLI 1.7.4 o superior <br />

Instrucciones para ejecutar los proyectos. <br />

Back-End <br />
Para ejecutar la API es necesario correr las migraciones y ejecutar el proyecto. Para eso siga los siguientes pasos: <br />
1 - Abra el proyecto en Visual Studio <br />
2 - Ir a la pestaña del IDE "Herramientas" > "Administrador de Paquetes NuGet" > "Consola del Administrador de paquetes" <br />
3 - Dentro de la consola que se abrió buscar la opción en la parte superior "Proyecto Predeterminado" y seleccionar "Entidades" <br />
4 - Ejecutar el siguiente comandoe en la consola: "Update-Database" <br />
5 - Una vez aplicado el comando ejecutar la aplicación <br /> 

Front-End <br />
1 - Abrir proyecto con Visual Studio Code (Opcional) <br />
2 - Abrir la consola del IDE o la consola de CMD <br />
3 - Seleccionar la carpeta mediante la consola del Proyecto Front-End <br />
4 - Ejecutar el comando "npm install" <br />
5 - Abrir el archivo "environment.dev" con el IDE seleccionado ubicado dentro de la carpeta "src" > "environments" <br />
6 - Actualizar la variable "urlApi" con la ruta de la API que genero el Visual Studio  <br />
7 - Ejecutar el comando "ng serve -c dev" <br />
8 - Abrirl la ruta "http://localhost:4200/" en el explorador de preferencia 
