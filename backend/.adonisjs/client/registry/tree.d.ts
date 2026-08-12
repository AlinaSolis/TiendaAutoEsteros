/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    logout: typeof routes['auth.logout']
    profile: typeof routes['auth.profile']
    updateProfile: typeof routes['auth.update_profile']
    changePassword: typeof routes['auth.change_password']
    refreshToken: typeof routes['auth.refresh_token']
  }
  users: {
    index: typeof routes['users.index']
    search: typeof routes['users.search']
    show: typeof routes['users.show']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
    toggleStatus: typeof routes['users.toggle_status']
  }
  roles: {
    index: typeof routes['roles.index']
    show: typeof routes['roles.show']
    store: typeof routes['roles.store']
    update: typeof routes['roles.update']
    destroy: typeof routes['roles.destroy']
  }
  clientes: {
    index: typeof routes['clientes.index']
    search: typeof routes['clientes.search']
    show: typeof routes['clientes.show']
    stats: typeof routes['clientes.stats']
    store: typeof routes['clientes.store']
    update: typeof routes['clientes.update']
    destroy: typeof routes['clientes.destroy']
  }
  productos: {
    index: typeof routes['productos.index']
    destacados: typeof routes['productos.destacados']
    ofertas: typeof routes['productos.ofertas']
    show: typeof routes['productos.show']
    store: typeof routes['productos.store']
    update: typeof routes['productos.update']
    destroy: typeof routes['productos.destroy']
  }
  ventas: {
    index: typeof routes['ventas.index']
    stats: typeof routes['ventas.stats']
    show: typeof routes['ventas.show']
    store: typeof routes['ventas.store']
    complete: typeof routes['ventas.complete']
    cancel: typeof routes['ventas.cancel']
  }
}
