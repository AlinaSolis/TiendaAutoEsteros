// app/validators/compra_validator.ts
import vine from '@vinejs/vine'
// Crear compra
export const createCompraValidator = vine.compile(
  vine.object({
    proveedorId: vine.number().positive(),
    usuarioId: vine.number().positive(),
    sucursalId: vine.number().positive(),
    notas: vine.string().maxLength(255).optional(),
    detalles: vine.array(
      vine.object({
        productoId: vine.number().positive(),
        cantidad: vine.number().integer().min(1),
        precioUnitario: vine.number().positive().decimal([0, 2]),
      })
    ).minLength(1),
  })
)
// Recibir compra
export const recibirCompraValidator = vine.compile(
  vine.object({
    fechaEntrega: vine.date().optional(),
  })
)