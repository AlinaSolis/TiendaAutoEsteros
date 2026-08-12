// app/validators/categoria_validator.ts
import vine from '@vinejs/vine'
// Crear categoría
export const createCategoriaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().unique(),
    descripcion: vine.string().maxLength(255).optional(),
    icono: vine.string().maxLength(100).optional(),
    color: vine.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
    activo: vine.boolean().optional(),
  })
)
// Actualizar categoría
export const updateCategoriaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    descripcion: vine.string().maxLength(255).optional(),
    icono: vine.string().maxLength(100).optional(),
    color: vine.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
    activo: vine.boolean().optional(),
  })
)