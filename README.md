

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



Iniciar

|-- Cliente accede a la página de inicio
|   |-- Mostrar página de inicio
|   |-- Cliente hace clic en "Registro"
|   |   |-- Mostrar formulario de registro
|   |   |-- Cliente envía datos de registro
|   |   |   |-- Validar datos de registro
|   |   |   |   |-- Verificar si el usuario ya existe
|   |   |   |   |   |-- Mostrar mensaje de error si el usuario ya existe
|   |   |   |   |   |-- Hash de la contraseña
|   |   |   |   |   |-- Insertar nuevo usuario en la base de datos
|   |   |   |   |   |-- Mostrar mensaje de éxito
|   |   |-- Cliente hace clic en "Iniciar Sesión"
|   |   |   |-- Mostrar formulario de inicio de sesión
|   |   |   |-- Cliente envía datos de inicio de sesión
|   |   |   |   |-- Validar datos de inicio de sesión
|   |   |   |   |   |-- Buscar usuario en la base de datos
|   |   |   |   |   |   |-- Verificar contraseña con hash
|   |   |   |   |   |   |-- Mostrar mensaje de éxito si las credenciales son válidas
|   |   |   |   |   |   |-- Mostrar mensaje de error si las credenciales son inválidas
|   |   |-- Cliente cierra sesión
|   |   |   |-- Destruir la sesión actual
|   |   |   |-- Redirigir al cliente a la página de inicio
|-- Cliente accede a la página principal
|   |-- Mostrar página principal
|   |-- Cliente hace clic en "Autos Disponibles"
|   |   |-- Mostrar lista de autos disponibles
|   |   |-- Cliente selecciona un auto para alquilar
|   |   |   |-- Proceso de alquiler
|   |   |   |   |-- Cliente proporciona detalles del alquiler
|   |   |   |   |-- Registrar el alquiler en la base de datos
|   |   |   |   |-- Mostrar mensaje de éxito
|   |-- Cliente hace clic en "Perfil"
|   |   |-- Mostrar información del perfil del usuario
|   |   |-- Cliente realiza acciones en el perfil (cambiar contraseña, etc.)


Registro de Usuarios:

Los usuarios pueden registrarse proporcionando su nombre, dirección de correo electrónico y contraseña.
La contraseña se almacena en la base de datos después de aplicarle un hash para mayor seguridad.
La API verifica si el usuario ya existe antes de permitir el registro y muestra un mensaje de error si es necesario.
Si el registro es exitoso, se almacenan los datos del usuario en la base de datos.
Inicio de Sesión de Usuarios:

Los usuarios registrados pueden iniciar sesión proporcionando su correo electrónico y contraseña.
La API verifica si el correo electrónico y la contraseña coinciden con los registros en la base de datos.
Se utiliza la función de hash para comparar la contraseña proporcionada con la almacenada en la base de datos.
Si las credenciales son válidas, se inicia la sesión del usuario y se almacenan detalles de la sesión en cookies.
Se muestra un mensaje de éxito o error según el resultado de la autenticación.
Visualización de Autos Disponibles:

Se proporciona una página web que muestra una lista de autos disponibles para alquiler.
Cada auto tiene detalles como marca, modelo, matrícula y precio por día.
Los usuarios pueden hacer clic en un botón "Alquilar" para solicitar la reserva del auto.
Registro de Autos:

Los usuarios pueden registrar nuevos autos a través de la API proporcionando detalles como marca, modelo, matrícula, precio por día y disponibilidad.
Los datos del auto se almacenan en la base de datos para su posterior visualización en la lista de autos disponibles.
Cierre de Sesión:

Los usuarios pueden cerrar sesión en la aplicación, lo que eliminará sus datos de sesión almacenados.


 
  - ![model](https://github.com/binbashz/NEW-API-CAR-USER/assets/124454895/24696462-9c03-4490-b0ff-a63b3448eb05)
