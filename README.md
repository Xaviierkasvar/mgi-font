MGI Frontend
Prueba Técnica: Desarrollo de un Módulo de Gestión de Inventarios

Este proyecto es el frontend del módulo de gestión de inventarios, desarrollado para interactuar con el backend del sistema MSI. Fue construido usando React y Bootstrap, proporcionando una interfaz de usuario moderna y responsiva.

Características
Autenticación: Implementa login y logout de usuarios.
CRUD de Productos: Permite la creación, lectura, actualización y eliminación de productos.
Interfaz de Usuario: Usa Bootstrap 5 para estilizar componentes y tablas.
Validaciones en Frontend: Validaciones de campos para prevenir el envío de formularios incompletos o con datos incorrectos.
Requisitos Previos
Antes de comenzar, asegúrate de tener lo siguiente instalado:

Node.js (versión 14 o superior)
npm o yarn
Git
Instalación
Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local.

Clona el repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/mgi-front.git
cd mgi-front
Instala las dependencias:

bash
Copiar código
npm install
o si prefieres usar yarn:

bash
Copiar código
yarn install
Configura las variables de entorno:

Asegúrate de tener el archivo .env en la raíz del proyecto con la siguiente configuración:

plaintext
Copiar código
REACT_APP_API_URL=http://localhost:8000/api
JWT_SECRET=tu_secreto_jwt
Inicia el servidor de desarrollo:

bash
Copiar código
npm start
o con yarn:

bash
Copiar código
yarn start
Esto iniciará la aplicación en modo de desarrollo. Abre http://localhost:3000 en tu navegador para ver la aplicación en funcionamiento.

Uso
Login:

Accede a la página de login e introduce las credenciales proporcionadas.
Si el login es exitoso, serás redirigido al módulo CRUD de productos.
Gestión de Productos:

Usa la interfaz para crear, editar o eliminar productos.
Cada operación hace una solicitud al backend para mantener los datos sincronizados.
Backend
Este proyecto está diseñado para consumir los endpoints de la API del backend de MSI. Asegúrate de que el backend esté corriendo y disponible en la URL configurada en el archivo .env.

Repositorio del backend: MSI Backend
Contribución
Si deseas contribuir al proyecto:

Realiza un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz un commit (git commit -am 'Añadir nueva funcionalidad').
Sube la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.