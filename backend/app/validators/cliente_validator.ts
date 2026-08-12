// app/validators/cliente_validator.ts
import vine from '@vinejs/vine'
// Crear cliente
export const createClienteValidator = vine.compile(
  vine.object({
    usuarioId: vine.number().positive().optional(),
    nombre: vine.string().minLength(2).maxLength(100).trim(),
    apellido: vine.string().minLength(2).maxLength(100).trim(),
    email: vine.string().email().trim().maxLength(255),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    direccion: vine.string().maxLength(255).optional(),
    ciudad: vine.string().maxLength(100).optional(),
    estado: vine.string().maxLength(100).optional(),
    codigoPostal: vine.string().maxLength(10).optional(),
    pais: vine.string().maxLength(100).default('México'),
    rfc: vine.string().regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/).optional(),
    fechaNacimiento: vine.date().optional(),
    genero: vine.string().in(['M', 'F', 'Otro']).optional(),
  })
)
// Actualizar cliente
export const updateClienteValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).trim().optional(),
    apellido: vine.string().minLength(2).maxLength(100).trim().optional(),
    email: vine.string().email().trim().maxLength(255).optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    direccion: vine.string().maxLength(255).optional(),
    ciudad: vine.string().maxLength(100).optional(),
    estado: vine.string().maxLength(100).optional(),
    codigoPostal: vine.string().maxLength(10).optional(),
    pais: vine.string().maxLength(100).optional(),
    rfc: vine.string().regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/).optional(),
    fechaNacimiento: vine.date().optional(),
    genero: vine.string().in(['M', 'F', 'Otro']).optional(),
    activo: vine.boolean().optional(),
  })
)