# App Club 2 de Mayo

Aplicación para Club Dos de Mayo, en el contexto de PPS en la Facultad de Ingeniería, UNMdP. 2020


**Tech Stack**
  - Ionic
  - React
  - TypeScript
  - PouchDB
  - CouchDB

**Instalación**
  1) Clonar repo
  
    git clone https://github.com/porziopablo/AppClub.git
  2) Instalar dependencias
  
    npm install
  3) Correr server (Se utiliza puerto local 8100)
    
    ionic serve
    
**Tener en Cuenta**

  - Los usuarios de la aplicación se dividen en 'profesor' y 'profesor_root'. Ambos roles tienen acceso a todo lo relacionado con jugadores, asistencia y pagos, pero los root corresponden a los profesores de mayor importancia. Estos pueden aceptar las peticiones de nuevos usuarios que quieran registrarse en la app, darle el rol de root o quitárselo, y actualizar los datos de los usuarios.  

 - Para la carga del primer profesor en la base de datos, se puede ejecutar desde node.js el script de 'cargaPrimerProfe', el cual carga directamente un profesor con rol root en la BD. Luego este podrá ir aceptando y gestionando a los nuevos usuarios que quieran registrarse, sin necesidad de usar el script. 

 - Para el control de los usuarios en la base de datos _users, el documento _design/_auth de la base de datos _users debe estar, como se indica en el archivo auth.txt de este proyecto. Esto es una configuracion adicional que se le ha hecho a la configuracion por defecto del plugin pouchdb-authentication. Este plug-in es el que se utiliza para la gestión de usuarios, y esa configuración adicional permite controlar ciertos parámetros relacionados con los roles de los profesores. 
