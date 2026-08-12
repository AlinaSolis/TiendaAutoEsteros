// app/validators/common_validator.ts
import vine from '@vinejs/vine'
// Validator para ID en URL
export const idValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().positive(),
    }),
  })
)
// Validator para paginación
export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().integer().min(1).optional(),
    limit: vine.number().integer().min(1).max(100).optional(),
    search: vine.string().trim().optional(),
    sortBy: vine.string().optional(),
    sortDir: vine.string().in(['asc', 'desc']).optional(),
  })
)
// Validator para fechas
export const dateRangeValidator = vine.compile(
  vine.object({
    fechaInicio: vine.date().optional(),
    fechaFin: vine.date().afterOrEqual('fechaInicio').optional(),
  })
)
// Validator para múltiples IDs
export const idsValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number().positive()).minLength(1),
  })
)
// Validator para búsqueda
export const searchValidator = vine.compile(
  vine.object({
    term: vine.string().minLength(2).trim(),
    scope: vine.string().optional(),
  })
)
// Validator para estado de entidad
export const statusValidator = vine.compile(
  vine.object({
    estado: vine.boolean(),
  })
)