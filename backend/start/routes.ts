// start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
// Importar controladores
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/user_controller')
const RolesController = () => import('#controllers/role_controller')
const ClientesController = () => import('#controllers/cliente_controller')
const ProductosController = () => import('#controllers/producto_controller')
const VentasController = () => import('#controllers/venta_controller')
// Rutas públicas (sin autenticación)
router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/register', [AuthController, 'register'])
// Rutas protegidas (con autenticación)
router.group(() => {
  // Auth
  router.post('/auth/logout', [AuthController, 'logout'])
  router.get('/auth/profile', [AuthController, 'profile'])
  router.put('/auth/profile', [AuthController, 'updateProfile'])
  router.put('/auth/change-password', [AuthController, 'changePassword'])
  router.post('/auth/refresh-token', [AuthController, 'refreshToken'])
  // Users
  router.get('/users', [UsersController, 'index'])
  router.get('/users/search', [UsersController, 'search'])
  router.get('/users/:id', [UsersController, 'show'])
  router.post('/users', [UsersController, 'store'])
  router.put('/users/:id', [UsersController, 'update'])
  router.delete('/users/:id', [UsersController, 'destroy'])
  router.patch('/users/:id/toggle-status', [UsersController, 'toggleStatus'])
  // Roles
  router.get('/roles', [RolesController, 'index'])
  router.get('/roles/:id', [RolesController, 'show'])
  router.post('/roles', [RolesController, 'store'])
  router.put('/roles/:id', [RolesController, 'update'])
  router.delete('/roles/:id', [RolesController, 'destroy'])
  // Clientes
  router.get('/clientes', [ClientesController, 'index'])
  router.get('/clientes/search', [ClientesController, 'search'])
  router.get('/clientes/:id', [ClientesController, 'show'])
  router.get('/clientes/:id/stats', [ClientesController, 'stats'])
  router.post('/clientes', [ClientesController, 'store'])
  router.put('/clientes/:id', [ClientesController, 'update'])
  router.delete('/clientes/:id', [ClientesController, 'destroy'])
  // Productos
  router.get('/productos', [ProductosController, 'index'])
  router.get('/productos/destacados', [ProductosController, 'destacados'])
  router.get('/productos/ofertas', [ProductosController, 'ofertas'])
  router.get('/productos/:id', [ProductosController, 'show'])
  router.post('/productos', [ProductosController, 'store'])
  router.put('/productos/:id', [ProductosController, 'update'])
  router.delete('/productos/:id', [ProductosController, 'destroy'])
  // Ventas
  router.get('/ventas', [VentasController, 'index'])
  router.get('/ventas/stats', [VentasController, 'stats'])
  router.get('/ventas/:id', [VentasController, 'show'])
  router.post('/ventas', [VentasController, 'store'])
  router.post('/ventas/:id/complete', [VentasController, 'complete'])
  router.post('/ventas/:id/cancel', [VentasController, 'cancel'])
}).use(middleware.auth({ guards: ['access_tokens'] }))