<h1>Migración de proyecto de prueba de login y registro de El Hub de Seguridad.</h1>
Se mueve el backend de PHP a NodeJs con Express, y el diseño en html a SPA con VueJs <br>
El prefix para los hashes generados en php es "$2y$", mientras que por el mismo metodo(bcrypt) pero en nodejs es "$2a$". Para validar los datos encriptados desde ambos backends, se realiza un intercambio de prefix. El resto del salt y hash se realiza de la misma forma, por lo que la validación no tiene problemas.
