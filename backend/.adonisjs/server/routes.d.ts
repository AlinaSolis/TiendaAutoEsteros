import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.profile': { paramsTuple?: []; params?: {} }
    'auth.update_profile': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'auth.refresh_token': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.toggle_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.search': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'clientes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.index': { paramsTuple?: []; params?: {} }
    'productos.destacados': { paramsTuple?: []; params?: {} }
    'productos.ofertas': { paramsTuple?: []; params?: {} }
    'productos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.store': { paramsTuple?: []; params?: {} }
    'productos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.index': { paramsTuple?: []; params?: {} }
    'ventas.stats': { paramsTuple?: []; params?: {} }
    'ventas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.store': { paramsTuple?: []; params?: {} }
    'ventas.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.refresh_token': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'productos.store': { paramsTuple?: []; params?: {} }
    'ventas.store': { paramsTuple?: []; params?: {} }
    'ventas.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.profile': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.search': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.index': { paramsTuple?: []; params?: {} }
    'productos.destacados': { paramsTuple?: []; params?: {} }
    'productos.ofertas': { paramsTuple?: []; params?: {} }
    'productos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.index': { paramsTuple?: []; params?: {} }
    'ventas.stats': { paramsTuple?: []; params?: {} }
    'ventas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.profile': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.search': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.search': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.index': { paramsTuple?: []; params?: {} }
    'productos.destacados': { paramsTuple?: []; params?: {} }
    'productos.ofertas': { paramsTuple?: []; params?: {} }
    'productos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventas.index': { paramsTuple?: []; params?: {} }
    'ventas.stats': { paramsTuple?: []; params?: {} }
    'ventas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'auth.update_profile': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'productos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'users.toggle_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}