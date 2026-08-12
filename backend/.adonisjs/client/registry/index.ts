/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/auth/register',
    tokens: [{"old":"/auth/register","type":0,"val":"auth","end":""},{"old":"/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.profile': {
    methods: ["GET","HEAD"],
    pattern: '/auth/profile',
    tokens: [{"old":"/auth/profile","type":0,"val":"auth","end":""},{"old":"/auth/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['auth.profile']['types'],
  },
  'auth.update_profile': {
    methods: ["PUT"],
    pattern: '/auth/profile',
    tokens: [{"old":"/auth/profile","type":0,"val":"auth","end":""},{"old":"/auth/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['auth.update_profile']['types'],
  },
  'auth.change_password': {
    methods: ["PUT"],
    pattern: '/auth/change-password',
    tokens: [{"old":"/auth/change-password","type":0,"val":"auth","end":""},{"old":"/auth/change-password","type":0,"val":"change-password","end":""}],
    types: placeholder as Registry['auth.change_password']['types'],
  },
  'auth.refresh_token': {
    methods: ["POST"],
    pattern: '/auth/refresh-token',
    tokens: [{"old":"/auth/refresh-token","type":0,"val":"auth","end":""},{"old":"/auth/refresh-token","type":0,"val":"refresh-token","end":""}],
    types: placeholder as Registry['auth.refresh_token']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.search': {
    methods: ["GET","HEAD"],
    pattern: '/users/search',
    tokens: [{"old":"/users/search","type":0,"val":"users","end":""},{"old":"/users/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['users.search']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'users.toggle_status': {
    methods: ["PATCH"],
    pattern: '/users/:id/toggle-status',
    tokens: [{"old":"/users/:id/toggle-status","type":0,"val":"users","end":""},{"old":"/users/:id/toggle-status","type":1,"val":"id","end":""},{"old":"/users/:id/toggle-status","type":0,"val":"toggle-status","end":""}],
    types: placeholder as Registry['users.toggle_status']['types'],
  },
  'roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/roles',
    tokens: [{"old":"/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.index']['types'],
  },
  'roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/roles/:id',
    tokens: [{"old":"/roles/:id","type":0,"val":"roles","end":""},{"old":"/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.show']['types'],
  },
  'roles.store': {
    methods: ["POST"],
    pattern: '/roles',
    tokens: [{"old":"/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.store']['types'],
  },
  'roles.update': {
    methods: ["PUT"],
    pattern: '/roles/:id',
    tokens: [{"old":"/roles/:id","type":0,"val":"roles","end":""},{"old":"/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.update']['types'],
  },
  'roles.destroy': {
    methods: ["DELETE"],
    pattern: '/roles/:id',
    tokens: [{"old":"/roles/:id","type":0,"val":"roles","end":""},{"old":"/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.destroy']['types'],
  },
  'clientes.index': {
    methods: ["GET","HEAD"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.index']['types'],
  },
  'clientes.search': {
    methods: ["GET","HEAD"],
    pattern: '/clientes/search',
    tokens: [{"old":"/clientes/search","type":0,"val":"clientes","end":""},{"old":"/clientes/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['clientes.search']['types'],
  },
  'clientes.show': {
    methods: ["GET","HEAD"],
    pattern: '/clientes/:id',
    tokens: [{"old":"/clientes/:id","type":0,"val":"clientes","end":""},{"old":"/clientes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clientes.show']['types'],
  },
  'clientes.stats': {
    methods: ["GET","HEAD"],
    pattern: '/clientes/:id/stats',
    tokens: [{"old":"/clientes/:id/stats","type":0,"val":"clientes","end":""},{"old":"/clientes/:id/stats","type":1,"val":"id","end":""},{"old":"/clientes/:id/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['clientes.stats']['types'],
  },
  'clientes.store': {
    methods: ["POST"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.store']['types'],
  },
  'clientes.update': {
    methods: ["PUT"],
    pattern: '/clientes/:id',
    tokens: [{"old":"/clientes/:id","type":0,"val":"clientes","end":""},{"old":"/clientes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clientes.update']['types'],
  },
  'clientes.destroy': {
    methods: ["DELETE"],
    pattern: '/clientes/:id',
    tokens: [{"old":"/clientes/:id","type":0,"val":"clientes","end":""},{"old":"/clientes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clientes.destroy']['types'],
  },
  'productos.index': {
    methods: ["GET","HEAD"],
    pattern: '/productos',
    tokens: [{"old":"/productos","type":0,"val":"productos","end":""}],
    types: placeholder as Registry['productos.index']['types'],
  },
  'productos.destacados': {
    methods: ["GET","HEAD"],
    pattern: '/productos/destacados',
    tokens: [{"old":"/productos/destacados","type":0,"val":"productos","end":""},{"old":"/productos/destacados","type":0,"val":"destacados","end":""}],
    types: placeholder as Registry['productos.destacados']['types'],
  },
  'productos.ofertas': {
    methods: ["GET","HEAD"],
    pattern: '/productos/ofertas',
    tokens: [{"old":"/productos/ofertas","type":0,"val":"productos","end":""},{"old":"/productos/ofertas","type":0,"val":"ofertas","end":""}],
    types: placeholder as Registry['productos.ofertas']['types'],
  },
  'productos.show': {
    methods: ["GET","HEAD"],
    pattern: '/productos/:id',
    tokens: [{"old":"/productos/:id","type":0,"val":"productos","end":""},{"old":"/productos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['productos.show']['types'],
  },
  'productos.store': {
    methods: ["POST"],
    pattern: '/productos',
    tokens: [{"old":"/productos","type":0,"val":"productos","end":""}],
    types: placeholder as Registry['productos.store']['types'],
  },
  'productos.update': {
    methods: ["PUT"],
    pattern: '/productos/:id',
    tokens: [{"old":"/productos/:id","type":0,"val":"productos","end":""},{"old":"/productos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['productos.update']['types'],
  },
  'productos.destroy': {
    methods: ["DELETE"],
    pattern: '/productos/:id',
    tokens: [{"old":"/productos/:id","type":0,"val":"productos","end":""},{"old":"/productos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['productos.destroy']['types'],
  },
  'ventas.index': {
    methods: ["GET","HEAD"],
    pattern: '/ventas',
    tokens: [{"old":"/ventas","type":0,"val":"ventas","end":""}],
    types: placeholder as Registry['ventas.index']['types'],
  },
  'ventas.stats': {
    methods: ["GET","HEAD"],
    pattern: '/ventas/stats',
    tokens: [{"old":"/ventas/stats","type":0,"val":"ventas","end":""},{"old":"/ventas/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['ventas.stats']['types'],
  },
  'ventas.show': {
    methods: ["GET","HEAD"],
    pattern: '/ventas/:id',
    tokens: [{"old":"/ventas/:id","type":0,"val":"ventas","end":""},{"old":"/ventas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ventas.show']['types'],
  },
  'ventas.store': {
    methods: ["POST"],
    pattern: '/ventas',
    tokens: [{"old":"/ventas","type":0,"val":"ventas","end":""}],
    types: placeholder as Registry['ventas.store']['types'],
  },
  'ventas.complete': {
    methods: ["POST"],
    pattern: '/ventas/:id/complete',
    tokens: [{"old":"/ventas/:id/complete","type":0,"val":"ventas","end":""},{"old":"/ventas/:id/complete","type":1,"val":"id","end":""},{"old":"/ventas/:id/complete","type":0,"val":"complete","end":""}],
    types: placeholder as Registry['ventas.complete']['types'],
  },
  'ventas.cancel': {
    methods: ["POST"],
    pattern: '/ventas/:id/cancel',
    tokens: [{"old":"/ventas/:id/cancel","type":0,"val":"ventas","end":""},{"old":"/ventas/:id/cancel","type":1,"val":"id","end":""},{"old":"/ventas/:id/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['ventas.cancel']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
