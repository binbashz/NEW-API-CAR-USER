

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

Fin



 
  - ![model](https://github.com/binbashz/NEW-API-CAR-USER/assets/124454895/24696462-9c03-4490-b0ff-a63b3448eb05)
