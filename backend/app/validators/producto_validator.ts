// app/validators/producto_validator.ts
import vine from '@vinejs/vine'
// Crear producto
export const createProductoValidator = vine.compile(
  vine.object({
    categoriaId: vine.number().positive(),
    marcaId: vine.number().positive(),
    codigo: vine.string().minLength(3).maxLength(50).trim().unique(),
    nombre: vine.string().minLength(3).maxLength(200).trim(),
    descripcion: vine.string().optional(),
    precioCompra: vine.number().positive().decimal([0, 2]),
    precioVenta: vine.number().positive().decimal([0, 2]),
    precioOferta: vine.number().positive().decimal([0, 2]).optional(),
    stockMinimo: vine.number().integer().min(0).default(5),
    stockMaximo: vine.number().integer().min(0).default(100),
    peso: vine.number().positive().decimal([0, 2]).optional(),
    dimensiones: vine.string().maxLength(100).optional(),
    garantiaMeses: vine.number().integer().min(0).default(0),
    especificaciones: vine.object({}).optional(),
    activo: vine.boolean().optional(),
    destacado: vine.boolean().optional(),
  })
)
// Actualizar producto
export const updateProductoValidator = vine.compile(
  vine.object({
    categoriaId: vine.number().positive().optional(),
    marcaId: vine.number().positive().optional(),
    codigo: vine.string().minLength(3).maxLength(50).trim().optional(),
    nombre: vine.string().minLength(3).maxLength(200).trim().optional(),
    descripcion: vine.string().optional(),
    precioCompra: vine.number().positive().decimal([0, 2]).optional(),
    precioVenta: vine.number().positive().decimal([0, 2]).optional(),
    precioOferta: vine.number().positive().decimal([0, 2]).optional(),
    stockMinimo: vine.number().integer().min(0).optional(),
    stockMaximo: vine.number().integer().min(0).optional(),
    peso: vine.number().positive().decimal([0, 2]).optional(),
    dimensiones: vine.string().maxLength(100).optional(),
    garantiaMeses: vine.number().integer().min(0).optional(),
    especificaciones: vine.object({}).optional(),
    activo: vine.boolean().optional(),
    destacado: vine.boolean().optional(),
  })
)
// Buscar productos con filtros
export const filterProductosValidator = vine.compile(
  vine.object({
    categoriaId: vine.number().positive().optional(),
    marcaId: vine.number().positive().optional(),
    nombre: vine.string().trim().optional(),
    codigo: vine.string().trim().optional(),
    precioMin: vine.number().positive().optional(),
    precioMax: vine.number().positive().optional(),
    activo: vine.boolean().optional(),
    destacado: vine.boolean().optional(),
    stockBajo: vine.boolean().optional(),
    page: vine.number().integer().min(1).optional(),
    limit: vine.number().integer().min(1).max(100).optional(),
    orderBy: vine.string().in(['id', 'nombre', 'precioVenta', 'createdAt']).optional(),
    orderDir: vine.string().in(['asc', 'desc']).optional(),
  })
)