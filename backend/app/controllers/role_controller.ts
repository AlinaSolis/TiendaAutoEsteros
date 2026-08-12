// app/controllers/role_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
export default class RolesController {
  /**
   * Obtener todos los roles
   */
  async index({ response }: HttpContext) {
    try {
      const roles = await Role.all()
      return response.ok({
        status: 'success',
        data: roles,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener roles',
        error: error.message,
      })
    }
  }
  /**
   * Obtener un rol por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      return response.ok({
        status: 'success',
        data: role,
      })
    } catch (error) {
      return response.notFound({
        status: 'error',
        message: 'Rol no encontrado',
      })
    }
  }
  /**
   * Crear nuevo rol
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'descripcion'])
      const role = await Role.create(data)
      return response.created({
        status: 'success',
        message: 'Rol creado exitosamente',
        data: role,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al crear rol',
        error: error.message,
      })
    }
  }
  /**
   * Actualizar rol
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      const data = request.only(['nombre', 'descripcion'])
      // No permitir modificar roles del sistema
      if (role.id <= 3) {
        return response.forbidden({
          status: 'error',
          message: 'No se pueden modificar los roles del sistema',
        })
      }
      role.merge(data)
      await role.save()
      return response.ok({
        status: 'success',
        message: 'Rol actualizado exitosamente',
        data: role,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al actualizar rol',
        error: error.message,
      })
    }
  }
  /**
   * Eliminar rol
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      // No permitir eliminar roles del sistema
      if (role.id <= 3) {
        return response.forbidden({
          status: 'error',
          message: 'No se pueden eliminar los roles del sistema',
        })
      }
      // Verificar si hay usuarios con este rol
      const userCount = await role.related('users').query().count('* as total')
      if (userCount[0].$extras.total > 0) {
        return response.conflict({
          status: 'error',
          message: 'No se puede eliminar el rol porque tiene usuarios asociados',
        })
      }
      await role.delete()
      return response.ok({
        status: 'success',
        message: 'Rol eliminado exitosamente',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al eliminar rol',
        error: error.message,
      })
    }
  }
}