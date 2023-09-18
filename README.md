

- `node_modules`
- `public`
  `
    
- `html`
  - `index.html`
  - `login.html`
  - `perfil.html`
  - `registro.html`
  - - `style.css`
- `src`
  - `controllers`
    - `autoController.js`
    - `usuarioController.js`
- `routes`
  - `autoRoutes.js`
  - `usuarioRoutes.js`
- `README.md`
- `index.js`
- `package-lock.json`
- `package.json`
- `.env` (si es necesario)
  (and database)

Funcionalidad básica para el registro y autenticación de usuarios, así como la gestión de autos disponibles para alquiler. 
Los usuarios pueden registrarse, iniciar sesión, ver autos disponibles y registrar nuevos autos en la base de datos.

# API de Gestión de Usuarios y Autos

Esta API proporciona funcionalidades para gestionar usuarios y autos en una base de datos MySQL. A continuación, se presenta un resumen de las características y endpoints disponibles:

## Endpoints para Usuarios:

- `POST /registro`: Permite a los usuarios registrarse proporcionando su nombre, correo electrónico y contraseña. La contraseña se almacena en la base de datos después de ser hasheada.
- `POST /inicio-sesion`: Permite a los usuarios iniciar sesión proporcionando su correo electrónico y contraseña. Se verifica la contraseña hasheada en la base de datos.

## Endpoints para Autos:

- `POST /autos/registrar`: Permite registrar nuevos autos proporcionando detalles como marca, modelo, matrícula, precio por día y disponibilidad.
- `GET /autos`: Obtiene la lista de autos.
- `PUT /autos/:id`: Actualiza la información de un auto específico.
- `DELETE /autos/:id`: Elimina un auto específico.

## Sesiones de Usuario:

- Se utiliza el módulo `express-session` para gestionar sesiones de usuario. Se guarda la información de inicio de sesión en la sesión del usuario.

## Rutas para Páginas HTML:

- Se sirven páginas HTML estáticas como la página de inicio, registro e inicio de sesión.

## Estilos CSS:

- Se proporciona un archivo de hoja de estilo CSS para dar estilo a las páginas HTML.

## Conexión a la Base de Datos:

- Se utiliza la librería `mysql2` para conectar y realizar consultas a una base de datos MySQL local.

## Seguridad:

- Las contraseñas se almacenan en la base de datos después de ser hasheadas para mayor seguridad.
- Se maneja el inicio de sesión y la autenticación de usuarios.

## Archivos Estáticos:

- Los archivos estáticos como imágenes y CSS se sirven desde la carpeta `/public`.

## Información Adicional:

- Se utiliza Bootstrap para el diseño de las páginas HTML.
- Se hace uso de las rutas de Express para manejar las solicitudes HTTP.

Este es un resumen general de lo que hace la API. Si tienes preguntas específicas o necesitas más detalles sobre alguna parte en particular, no dudes en preguntar.



 
  - ![model](https://github.com/binbashz/NEW-API-CAR-USER/assets/124454895/24696462-9c03-4490-b0ff-a63b3448eb05)
