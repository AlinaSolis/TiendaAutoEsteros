// app/controllers/auth_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import {
  loginValidator,
  registerValidator,
  updateProfileValidator,
  changePasswordValidator,
} from '#validators/auth_validator'

export default class AuthController {
  /**
   * Login de usuario
   */
  async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginValidator)
      // Intentar autenticar
      const user = await User.verifyCredentials(payload.email, payload.password)
      // Generar token (guard: access_tokens)
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '7 days',
      })
      // Actualizar último login
      user.ultimoLogin = DateTime.now()
      await user.save()
      return response.ok({
        status: 'success',
        message: 'Login exitoso',
        data: {
          user: user.serialize(),
          token: token,
        },
      })
    } catch (error) {
      return response.unauthorized({
        status: 'error',
        message: 'Credenciales inválidas',
        error: error.message,
      })
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      // Crear usuario
      const user = await User.create({
        nombre: payload.nombre,
        apellido: payload.apellido,
        email: payload.email,
        password: payload.password,
        telefono: payload.telefono,
        rolId: 2, // Rol por defecto: Empleado
      })
      return response.created({
        status: 'success',
        message: 'Usuario registrado exitosamente',
        data: user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al registrar usuario',
        error: error.messages || error.message,
      })
    }
  }

  /**
   * Logout de usuario
   */
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const currentToken = user.currentAccessToken
      if (currentToken) {
        await User.accessTokens.delete(user, currentToken.identifier)
      }
      return response.ok({
        status: 'success',
        message: 'Logout exitoso',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al cerrar sesión',
        error: error.message,
      })
    }
  }

  /**
   * Obtener perfil del usuario
   */
  async profile({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await user.load('rol')
      return response.ok({
        status: 'success',
        data: user.serialize(),
      })
    } catch (error) {
      return response.unauthorized({
        status: 'error',
        message: 'Usuario no autenticado',
      })
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(updateProfileValidator)
      user.merge(payload)
      await user.save()
      return response.ok({
        status: 'success',
        message: 'Perfil actualizado exitosamente',
        data: user.serialize(),
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al actualizar perfil',
        error: error.messages || error.message,
      })
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword({ auth, request, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(changePasswordValidator)
      // Verificar contraseña actual
      await User.verifyCredentials(user.email, payload.currentPassword)
      // Actualizar contraseña
      user.password = payload.newPassword
      await user.save()
      return response.ok({
        status: 'success',
        message: 'Contraseña actualizada exitosamente',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al cambiar contraseña',
        error: error.message,
      })
    }
  }

  /**
   * Emitir un nuevo token para el usuario ya autenticado
   * (reemplaza al "refresh" de JWT; con access_tokens simplemente
   * se emite un token nuevo y se revoca el actual)
   */
  async refreshToken({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const currentToken = user.currentAccessToken
      const newToken = await User.accessTokens.create(user, ['*'], {
        expiresIn: '7 days',
      })
      if (currentToken) {
        await User.accessTokens.delete(user, currentToken.identifier)
      }
      return response.ok({
        status: 'success',
        data: { token: newToken },
      })
    } catch (error) {
      return response.unauthorized({
        status: 'error',
        message: 'No se pudo renovar el token',
        error: error.message,
      })
    }
  }
}
