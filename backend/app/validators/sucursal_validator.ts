// app/validators/sucursal_validator.ts
import vine from '@vinejs/vine'
// Crear sucursal
export const createSucursalValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(3).maxLength(100).trim(),
    direccion: vine.string().minLength(5).maxLength(255).trim(),
    ciudad: vine.string().minLength(2).maxLength(100).trim(),
    estado: vine.string().minLength(2).maxLength(100).trim(),
    codigoPostal: vine.string().minLength(5).maxLength(10).trim(),
    pais: vine.string().maxLength(100).default('México'),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    email: vine.string().email().trim().maxLength(255).optional(),
    horarioAtencion: vine.string().maxLength(255).optional(),
    latitud: vine.number().min(-90).max(90).optional(),
    longitud: vine.number().min(-180).max(180).optional(),
    activo: vine.boolean().optional(),
  })
)
// Actualizar sucursal
export const updateSucursalValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(3).maxLength(100).trim().optional(),
    direccion: vine.string().minLength(5).maxLength(255).trim().optional(),
    ciudad: vine.string().minLength(2).maxLength(100).trim().optional(),
    estado: vine.string().minLength(2).maxLength(100).trim().optional(),
    codigoPostal: vine.string().minLength(5).maxLength(10).trim().optional(),
    pais: vine.string().maxLength(100).optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    email: vine.string().email().trim().maxLength(255).optional(),
    horarioAtencion: vine.string().maxLength(255).optional(),
    latitud: vine.number().min(-90).max(90).optional(),
    longitud: vine.number().min(-180).max(180).optional(),
    activo: vine.boolean().optional(),
  })
)