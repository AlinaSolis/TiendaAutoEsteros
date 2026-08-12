# TiendaAutoEsteros

Sistema de gestión para tienda de autoestéreos. Backend con AdonisJS 6 + MySQL. Frontend en desarrollo.

## Requisitos previos

Antes de clonar el proyecto, asegúrate de tener instalado:

- **Node.js** v20 o superior
- **MySQL** (o XAMPP / phpMyAdmin)
- **Git**
- **VS Code** (recomendado)

## Instalación

### 1. Clonar el proyecto

```bash
git clone <URL-del-repositorio>
cd TiendaAutoEsteros
```

### 2. Crear la base de datos

En phpMyAdmin (o desde consola MySQL), crea una base de datos vacía:

```sql
CREATE DATABASE tienda_autoestereos;
```

### 3. Configurar el backend

```bash
cd backend
npm install
```

Copia el archivo `.env.example` a `.env` y ajusta tus credenciales de MySQL:

```bash
cp .env.example .env
```

Edita `.env` con tu usuario y contraseña de MySQL:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_DATABASE=tienda_autoestereos
```

### 4. Crear las tablas (migrations)

```bash
node ace migration:run
```

Esto crea automáticamente las 22 tablas del sistema (roles, usuarios, clientes, productos, ventas, etc.). No necesitas importar ningún archivo `.sql` a mano.

### 5. (Opcional) Cargar datos de ejemplo

En phpMyAdmin, sobre la base `tienda_autoestereos`, ejecuta el script:

```
02_reinsertar_datos_ejemplo.sql
```

Esto agrega roles, categorías, marcas, proveedores, un usuario administrador y clientes de prueba.

### 6. Levantar el servidor

```bash
node ace serve --watch
```

El backend quedará disponible en `http://localhost:3333` (o el puerto que indique la terminal).

### 7. Configurar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Verificar que todo está bien

```bash
node ace migration:status   # Las 22 migrations deben estar en "completed"
node ace list:routes        # Debe mostrar todas las rutas de la API
```

## Estructura del proyecto

```
TiendaAutoEsteros/
├── backend/          # API REST con AdonisJS 6
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── validators/
│   ├── database/
│   │   └── migrations/
│   └── start/
│       └── routes.ts
└── frontend/         # Cliente (en desarrollo)
```

## Notas

- La carpeta `node_modules` **no** está incluida en el repositorio; se genera con `npm install`.
- El archivo `.env` tampoco está incluido (contiene contraseñas); usa `.env.example` como plantilla.