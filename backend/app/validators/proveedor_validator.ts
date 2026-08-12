// app/validators/proveedor_validator.ts
import vine from '@vinejs/vine'
// Crear proveedor
export const createProveedorValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(3).maxLength(200).trim(),
    rfc: vine.string().regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/).optional().unique(),
    email: vine.string().email().trim().maxLength(255).optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    direccion: vine.string().maxLength(255).optional(),
    ciudad: vine.string().maxLength(100).optional(),
    estado: vine.string().maxLength(100).optional(),
    codigoPostal: vine.string().maxLength(10).optional(),
    pais: vine.string().maxLength(100).default('México'),
    contactoNombre: vine.string().maxLength(100).optional(),
    contactoTelefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    contactoEmail: vine.string().email().trim().maxLength(255).optional(),
    activo: vine.boolean().optional(),
  })
)
// Actualizar proveedor
export const updateProveedorValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(3).maxLength(200).trim().optional(),
    rfc: vine.string().regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/).optional(),
    email: vine.string().email().trim().maxLength(255).optional(),
    telefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    direccion: vine.string().maxLength(255).optional(),
    ciudad: vine.string().maxLength(100).optional(),
    estado: vine.string().maxLength(100).optional(),
    codigoPostal: vine.string().maxLength(10).optional(),
    pais: vine.string().maxLength(100).optional(),
    contactoNombre: vine.string().maxLength(100).optional(),
    contactoTelefono: vine.string().regex(/^[0-9+\-\s()]{10,20}$/).optional(),
    contactoEmail: vine.string().email().trim().maxLength(255).optional(),
    activo: vine.boolean().optional(),
  })
)