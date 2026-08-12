// app/validators/venta_validator.ts
import vine from '@vinejs/vine'
// Crear venta
export const createVentaValidator = vine.compile(
  vine.object({
    clienteId: vine.number().positive(),
    usuarioId: vine.number().positive(),
    sucursalId: vine.number().positive(),
    metodoPagoId: vine.number().positive(),
    descuento: vine.number().positive().decimal([0, 2]).optional(),
    notas: vine.string().maxLength(255).optional(),
    detalles: vine.array(
      vine.object({
        productoId: vine.number().positive(),
        cantidad: vine.number().integer().min(1),
        precioUnitario: vine.number().positive().decimal([0, 2]),
        descuentoUnitario: vine.number().positive().decimal([0, 2]).optional(),
      })
    ).minLength(1),
  })
)
// Actualizar venta (solo estado y notas)
export const updateVentaValidator = vine.compile(
  vine.object({
    estado: vine.string().in(['Pendiente', 'Completada', 'Cancelada', 'Reembolsada']).optional(),
    notas: vine.string().maxLength(255).optional(),
    metodoPagoId: vine.number().positive().optional(),
  })
)
// Completar venta
export const completarVentaValidator = vine.compile(
  vine.object({
    metodoPagoId: vine.number().positive(),
  })
)
// Cancelar venta
export const cancelarVentaValidator = vine.compile(
  vine.object({
    motivo: vine.string().maxLength(255).optional(),
  })
)