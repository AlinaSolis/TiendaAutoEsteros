// app/validators/user_validator.ts
import vine from '@vinejs/vine'
// Crear usuario
export const createUserValidator = vine.compile(
  vine.object({
    rolId: vine.number().positive(),
    nombre: vine.string().minLength(2).maxLength(100).trim(),
    apellido: vine.string().minLength(2).maxLength(100).trim(),
    email: vine.string().email().trim().maxLength(255),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    password: vine.string().minLength(8).maxLength(255),
    activo: vine.boolean().optional(),
  })
)
// Actualizar usuario
export const updateUserValidator = vine.compile(
  vine.object({
    rolId: vine.number().positive().optional(),
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    apellido: vine.string().minLength(2).maxLength(100).trim().optional(),
    email: vine.string().email().trim().maxLength(255).optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    activo: vine.boolean().optional(),
    fotoPerfil: vine.string().url().optional(),
  })
)
// Actualizar perfil (usuario mismo)
export const updateProfileValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    apellido: vine.string().minLength(2).maxLength(100).trim().optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    fotoPerfil: vine.string().url().optional(),
  })
)