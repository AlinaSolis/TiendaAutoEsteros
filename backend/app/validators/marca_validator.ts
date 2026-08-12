// app/validators/marca_validator.ts
import vine from '@vinejs/vine'
// Crear marca
export const createMarcaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().unique(),
    descripcion: vine.string().maxLength(255).optional(),
    logo: vine.string().url().optional(),
    sitioWeb: vine.string().url().optional(),
    activo: vine.boolean().optional(),
  })
)
// Actualizar marca
export const updateMarcaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    descripcion: vine.string().maxLength(255).optional(),
    logo: vine.string().url().optional(),
    sitioWeb: vine.string().url().optional(),
    activo: vine.boolean().optional(),
  })
)