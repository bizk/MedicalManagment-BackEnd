# MedicalManagment-BackEnd
Esta aplicaciond e backend consiste en una aplicacion para la gestion de turnos, medicos y usuarios de un centro medico.
**Autor:** [Yanzon, Carlos Santiago](https://www.linkedin.com/in/carlos-santiago-yanzon/)

## Resumen
Esta aplicacion fue desarrollada para la materia **Aplicaciones Distribuidas** de la carrera **Ingenieria Informatica** en la **Universidad Argentina De la Empresa - UADE**

Para correr con la documentacion de los endpoints correr la aplicacion en local y dirigirse al endpoint `/docs` o dirigirse al siguiente enlace (Puede que para el tiempo en que usted lea esto ya no se encuentre hosteado) [Documentacion Online](https://medical-managment-backend.herokuapp.com/docs/ "Documentacion Online")

------------

## Proyecto
Para correr el proyecto se necesita un archivo `.env` en la carpeta raiz del proyecto con la informacion para conectarse a la base de datos de su preferencia (Se uso MySql para el desarrollo de esa aplicacion). 

**Ejemplo de archivo .env**
```
USER=root
PASSWORD=secretpassword
HOST=localhost
DB=database
DIALECT=mysql
```
#### Correr el proyecto

Una vez generado el archivo `.env` y situado en la carpeta raiz con la base de datos corriendo. 

1. Asegurarse de tener instalado una version de nodeJs
2. Correr el comando `npm install` -> esperar a que termine la instalacion y descarga de las dependencias
3. Correr el comando `npm start` Se creara la instancia API Rest y se ejecutaran comandos en la base de datos acorde a la informacion detallada en el archivo `.env`

### Tecnologias utilizadas

#### [Sequelize](https://sequelize.org/ "Sequelize")
Esta tecnologia es un ORM en NodeJS para Postgres, MySQL, MariaDB, SQLite y Microsoft SQL Permitiendo un desarrollo rapido y facil sin depender de la base de datos.

#### [Swagger](https://swagger.io/ "Swagger")
Swagger es una herramienta que permite la generacion de documentacion de apis rest, muy utilizada a nivel mundial por prestigiosas empresas tecnologicas. Permite la generacion de una pagina web interactiva con la documentacion y las llamadas a la api.
El archivo se encuentra en la carpeta `/resources/swagger.yaml`

### Estructura del proyecto
El proyecto parte de `server.js` donde se crea la api rest a la cual se haran las llamadas. `package.json` posee la informacionde  las dependencias necesarias.
- `/resources` esta - carpeta posee los recursos extras utilizados por el proyecto pero no necesarios para su funcionamiento.
- `/api` es la raiz de nuestro proyecto
- `/api/models` aqui existen los modelos que seran creados en la base de datos, para cada archivo se crea un modelo, en el archivo `/api/models/index.js` se encuentran las relaciones entre cada modelo
- `/routes` Se encuentran todas las rutas utilizadas por la API Rest y por la cual se conectan con los controladores
- `/test` Archivos para la creacion de tests
- `/api/controller/` Se encuentran los controladores con las llamadas para cada modelo, es decir las operaciones que se desean hacer con la informacion.
