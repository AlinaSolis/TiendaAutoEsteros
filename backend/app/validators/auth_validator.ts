// app/validators/auth_validator.ts
import vine from '@vinejs/vine'
// Validación de login
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
  })
)
// Validación de registro
export const registerValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim(),
    apellido: vine.string().minLength(2).maxLength(100).trim(),
    email: vine.string().email().trim().maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
    passwordConfirmation: vine.string().sameAs('password'),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    aceptaTerminos: vine.boolean().accepted(),
  })
)
// Validación de actualización de perfil
export const updateProfileValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    apellido: vine.string().minLength(2).maxLength(100).trim().optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    fotoPerfil: vine.string().trim().optional(),
  })
)
// Validación de refresh token
export const refreshTokenValidator = vine.compile(
  vine.object({
    refreshToken: vine.string().minLength(10),
  })
)
// Validación de cambio de contraseña
export const changePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(8).maxLength(255),
    newPassword: vine.string().minLength(8).maxLength(255),
    newPasswordConfirmation: vine.string().sameAs('newPassword'),
  })
)
// Validación de recuperación de contraseña
export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(255),
  })
)
// Validación de reset de contraseña
export const resetPasswordValidator = vine.compile(
  vine.object({
    token: vine.string().minLength(10),
    email: vine.string().email().trim().maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
    passwordConfirmation: vine.string().sameAs('password'),
  })
)