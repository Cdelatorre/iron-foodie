# Activar Cuenta

Queremos añadir la funcionalidad de "activación de cuenta" al proyecto.

Para ello:


1 - añade atributo `active` al modelo de usuario. default: `false`

2 - instala nodemailer

3 - envía un correo al email del usuario al registrarse (controlador `doRegister`)

Piensa... qué URL deberías mandar en el texto del correo ?

4 - añade una ruta que procese un GET en la URL que hayas puesto en el texto del correo

5 - en el controlador asociado.. busca al usuario en cuestión y modifica su campo `active` a TRUE

6 - impide que cualquier usuario NO ACTIVO pueda hacer login.. (tocar en `authController.doLogin`)

# Subida de ficheros

Vamos a subir imagenes para los restaurantes!

Echa un ojo a cómo lo hemos hecho para el avatar de los usuarios y replicalo para los restaurantes.

Crea tu cuenta en clodinary para ello!


