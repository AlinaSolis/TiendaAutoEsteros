// app/controllers/cliente_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente'
import { createClienteValidator, updateClienteValidator } from '#validators/cliente_validator'
import { paginationValidator } from '#validators/common_validator'
export default class ClientesController {
  /**
   * Obtener lista paginada de clientes
   */
  async index({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(paginationValidator)
      const page = payload.page || 1
      const limit = payload.limit || 10
      const query = Cliente.query()
        .where('activo', true)
        .orderBy('created_at', 'desc')
      // Búsqueda
      if (payload.search) {
        query.where((builder) => {
          builder
            .where('nombre', 'LIKE', `%${payload.search}%`)
            .orWhere('apellido', 'LIKE', `%${payload.search}%`)
            .orWhere('email', 'LIKE', `%${payload.search}%`)
        })
      }
      const clientes = await query.paginate(page, limit)
      return response.ok({
        status: 'success',
        data: clientes,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener clientes',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Obtener un cliente por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.query()
        .where('id', params.id)
        .where('activo', true)
        .firstOrFail()
      await cliente.load('usuario')
      await cliente.load('ventas')
      return response.ok({
        status: 'success',
        data: cliente,
      })
    } catch (error) {
      return response.notFound({
        status: 'error',
        message: 'Cliente no encontrado',
      })
    }
  }
  /**
   * Crear nuevo cliente
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createClienteValidator)
      const cliente = await Cliente.create(payload)
      return response.created({
        status: 'success',
        message: 'Cliente creado exitosamente',
        data: cliente,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al crear cliente',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Actualizar cliente
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      const payload = await request.validateUsing(updateClienteValidator)
      cliente.merge(payload)
      await cliente.save()
      return response.ok({
        status: 'success',
        message: 'Cliente actualizado exitosamente',
        data: cliente,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al actualizar cliente',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Eliminar cliente (soft delete)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      // Verificar si tiene ventas activas
      const ventasActivas = await cliente.related('ventas')
        .query()
        .whereNotIn('estado', ['Completada', 'Cancelada'])
        .count('* as total')
      if (ventasActivas[0].$extras.total > 0) {
        return response.conflict({
          status: 'error',
          message: 'No se puede eliminar el cliente porque tiene ventas pendientes',
        })
      }
      cliente.activo = false
      await cliente.save()
      return response.ok({
        status: 'success',
        message: 'Cliente desactivado exitosamente',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al eliminar cliente',
        error: error.message,
      })
    }
  }
  /**
   * Obtener estadísticas del cliente
   */
  async stats({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      const stats = {
        totalCompras: await cliente.related('ventas').query()
          .where('estado', 'Completada')
          .count('* as total'),
        totalGastado: await cliente.related('ventas').query()
          .where('estado', 'Completada')
          .sum('total as total'),
        puntos: cliente.puntos,
        nivel: cliente.nivel,
        favoritos: await cliente.related('favoritos').query().count('* as total'),
      }
      return response.ok({
        status: 'success',
        data: stats,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener estadísticas del cliente',
        error: error.message,
      })
    }
  }
  /**
   * Buscar clientes
   */
  async search({ request, response }: HttpContext) {
    try {
      const { term } = request.qs()
      if (!term || term.length < 2) {
        return response.badRequest({
          status: 'error',
          message: 'El término de búsqueda debe tener al menos 2 caracteres',
        })
      }
      const clientes = await Cliente.query()
        .where('activo', true)
        .where((builder) => {
          builder
            .where('nombre', 'LIKE', `%${term}%`)
            .orWhere('apellido', 'LIKE', `%${term}%`)
            .orWhere('email', 'LIKE', `%${term}%`)
            .orWhere('telefono', 'LIKE', `%${term}%`)
        })
        .limit(10)
      return response.ok({
        status: 'success',
        data: clientes,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al buscar clientes',
        error: error.message,
      })
    }
  }
}