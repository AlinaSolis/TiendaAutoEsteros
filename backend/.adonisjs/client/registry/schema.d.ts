/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/auth/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'auth.profile': {
    methods: ["GET","HEAD"]
    pattern: '/auth/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['profile']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['profile']>>>
    }
  }
  'auth.update_profile': {
    methods: ["PUT"]
    pattern: '/auth/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['updateProfile']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['updateProfile']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.change_password': {
    methods: ["PUT"]
    pattern: '/auth/change-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').changePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').changePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.refresh_token': {
    methods: ["POST"]
    pattern: '/auth/refresh-token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['refreshToken']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['refreshToken']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/common_validator').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.search': {
    methods: ["GET","HEAD"]
    pattern: '/users/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['search']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['show']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user_validator').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user_validator').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user_validator').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user_validator').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['destroy']>>>
    }
  }
  'users.toggle_status': {
    methods: ["PATCH"]
    pattern: '/users/:id/toggle-status'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['toggleStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['toggleStatus']>>>
    }
  }
  'roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/role_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/role_controller').default['index']>>>
    }
  }
  'roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/role_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/role_controller').default['show']>>>
    }
  }
  'roles.store': {
    methods: ["POST"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/role_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/role_controller').default['store']>>>
    }
  }
  'roles.update': {
    methods: ["PUT"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/role_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/role_controller').default['update']>>>
    }
  }
  'roles.destroy': {
    methods: ["DELETE"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/role_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/role_controller').default['destroy']>>>
    }
  }
  'clientes.index': {
    methods: ["GET","HEAD"]
    pattern: '/clientes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/common_validator').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clientes.search': {
    methods: ["GET","HEAD"]
    pattern: '/clientes/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['search']>>>
    }
  }
  'clientes.show': {
    methods: ["GET","HEAD"]
    pattern: '/clientes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['show']>>>
    }
  }
  'clientes.stats': {
    methods: ["GET","HEAD"]
    pattern: '/clientes/:id/stats'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['stats']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['stats']>>>
    }
  }
  'clientes.store': {
    methods: ["POST"]
    pattern: '/clientes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/cliente_validator').createClienteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/cliente_validator').createClienteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clientes.update': {
    methods: ["PUT"]
    pattern: '/clientes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/cliente_validator').updateClienteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/cliente_validator').updateClienteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clientes.destroy': {
    methods: ["DELETE"]
    pattern: '/clientes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cliente_controller').default['destroy']>>>
    }
  }
  'productos.index': {
    methods: ["GET","HEAD"]
    pattern: '/productos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/producto_validator').filterProductosValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'productos.destacados': {
    methods: ["GET","HEAD"]
    pattern: '/productos/destacados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['destacados']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['destacados']>>>
    }
  }
  'productos.ofertas': {
    methods: ["GET","HEAD"]
    pattern: '/productos/ofertas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['ofertas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['ofertas']>>>
    }
  }
  'productos.show': {
    methods: ["GET","HEAD"]
    pattern: '/productos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['show']>>>
    }
  }
  'productos.store': {
    methods: ["POST"]
    pattern: '/productos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/producto_validator').createProductoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/producto_validator').createProductoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'productos.update': {
    methods: ["PUT"]
    pattern: '/productos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/producto_validator').updateProductoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/producto_validator').updateProductoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'productos.destroy': {
    methods: ["DELETE"]
    pattern: '/productos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/producto_controller').default['destroy']>>>
    }
  }
  'ventas.index': {
    methods: ["GET","HEAD"]
    pattern: '/ventas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/common_validator').paginationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ventas.stats': {
    methods: ["GET","HEAD"]
    pattern: '/ventas/stats'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/common_validator').dateRangeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['stats']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['stats']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ventas.show': {
    methods: ["GET","HEAD"]
    pattern: '/ventas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['show']>>>
    }
  }
  'ventas.store': {
    methods: ["POST"]
    pattern: '/ventas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/venta_validator').createVentaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/venta_validator').createVentaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ventas.complete': {
    methods: ["POST"]
    pattern: '/ventas/:id/complete'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/venta_validator').completarVentaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/venta_validator').completarVentaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['complete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['complete']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ventas.cancel': {
    methods: ["POST"]
    pattern: '/ventas/:id/cancel'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['cancel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/venta_controller').default['cancel']>>>
    }
  }
}
