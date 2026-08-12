// app/validators/inventario_validator.ts
import vine from '@vinejs/vine'
// Crear inventario
export const createInventarioValidator = vine.compile(
  vine.object({
    productoId: vine.number().positive(),
    sucursalId: vine.number().positive(),
    cantidad: vine.number().integer().min(0).default(0),
    stockMinimo: vine.number().integer().min(0).optional(),
    stockMaximo: vine.number().integer().min(0).optional(),
    ubicacion: vine.string().maxLength(100).optional(),
    lote: vine.string().maxLength(50).optional(),
    fechaVencimiento: vine.date().optional(),
  })
)
// Actualizar inventario
export const updateInventarioValidator = vine.compile(
  vine.object({
    cantidad: vine.number().integer().min(0).optional(),
    stockMinimo: vine.number().integer().min(0).optional(),
    stockMaximo: vine.number().integer().min(0).optional(),
    ubicacion: vine.string().maxLength(100).optional(),
    lote: vine.string().maxLength(50).optional(),
    fechaVencimiento: vine.date().optional(),
  })
)
// Ajuste de inventario
export const ajusteInventarioValidator = vine.compile(
  vine.object({
    cantidad: vine.number().integer().min(0),
    motivo: vine.string().maxLength(255),
  })
)