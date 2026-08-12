// app/controllers/user_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import { paginationValidator } from '#validators/common_validator'
export default class UsersController {
  /**
   * Obtener lista paginada de usuarios
   */
  async index({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(paginationValidator)
      const page = payload.page || 1
      const limit = payload.limit || 10
      const users = await User.query()
        .preload('rol')
        .orderBy('created_at', 'desc')
        .paginate(page, limit)
      return response.ok({
        status: 'success',
        data: users,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener usuarios',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Obtener un usuario por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.load('rol')
      return response.ok({
        status: 'success',
        data: user.serialize(),
      })
    } catch (error) {
      return response.notFound({
        status: 'error',
        message: 'Usuario no encontrado',
      })
    }
  }
  /**
   * Crear nuevo usuario
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createUserValidator)
      const user = await User.create(payload)
      await user.load('rol')
      return response.created({
        status: 'success',
        message: 'Usuario creado exitosamente',
        data: user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al crear usuario',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Actualizar usuario
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const payload = await request.validateUsing(updateUserValidator)
      user.merge(payload)
      await user.save()
      await user.load('rol')
      return response.ok({
        status: 'success',
        message: 'Usuario actualizado exitosamente',
        data: user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al actualizar usuario',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Eliminar usuario (soft delete o desactivar)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      // No permitir eliminar el usuario admin principal
      if (user.id === 1) {
        return response.forbidden({
          status: 'error',
          message: 'No se puede eliminar el usuario administrador principal',
        })
      }
      // Desactivar en lugar de eliminar
      user.activo = false
      await user.save()
      return response.ok({
        status: 'success',
        message: 'Usuario desactivado exitosamente',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al eliminar usuario',
        error: error.message,
      })
    }
  }
  /**
   * Buscar usuarios
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
      const users = await User.query()
        .where('nombre', 'LIKE', `%${term}%`)
        .orWhere('apellido', 'LIKE', `%${term}%`)
        .orWhere('email', 'LIKE', `%${term}%`)
        .preload('rol')
        .limit(10)
      return response.ok({
        status: 'success',
        data: users,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al buscar usuarios',
        error: error.message,
      })
    }
  }
  /**
   * Cambiar estado del usuario
   */
  async toggleStatus({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      if (user.id === 1) {
        return response.forbidden({
          status: 'error',
          message: 'No se puede desactivar el usuario administrador principal',
        })
      }
      user.activo = !user.activo
      await user.save()
      return response.ok({
        status: 'success',
        message: `Usuario ${user.activo ? 'activado' : 'desactivado'} exitosamente`,
        data: user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al cambiar estado del usuario',
        error: error.message,
      })
    }
  }
}