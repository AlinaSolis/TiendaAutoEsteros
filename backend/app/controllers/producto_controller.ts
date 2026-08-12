// app/controllers/producto_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Producto from '#models/producto'
import {
  createProductoValidator,
  updateProductoValidator,
  filterProductosValidator
} from '#validators/producto_validator'
export default class ProductosController {
  /**
   * Obtener lista paginada de productos
   */
  async index({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(filterProductosValidator)
      const page = payload.page || 1
      const limit = payload.limit || 10
      const query = Producto.query()
        .preload('categoria')
        .preload('marca')
        .preload('imagenes')
        .orderBy('created_at', 'desc')
      // Filtros
      if (payload.categoriaId) {
        query.where('categoria_id', payload.categoriaId)
      }
      if (payload.marcaId) {
        query.where('marca_id', payload.marcaId)
      }
      if (payload.nombre) {
        query.where('nombre', 'LIKE', `%${payload.nombre}%`)
      }
      if (payload.codigo) {
        query.where('codigo', 'LIKE', `%${payload.codigo}%`)
      }
      if (payload.activo !== undefined) {
        query.where('activo', payload.activo)
      }
      if (payload.destacado !== undefined) {
        query.where('destacado', payload.destacado)
      }
      if (payload.precioMin) {
        query.where('precio_venta', '>=', payload.precioMin)
      }
      if (payload.precioMax) {
        query.where('precio_venta', '<=', payload.precioMax)
      }
      // Ordenamiento
      if (payload.orderBy) {
        const orderDir = payload.orderDir || 'asc'
        query.orderBy(payload.orderBy, orderDir)
      }
      // Stock bajo
      if (payload.stockBajo) {
        query.whereRaw(`
          EXISTS (
            SELECT 1 FROM inventario
            WHERE inventario.producto_id = productos.id
            AND inventario.cantidad <= inventario.stock_minimo
          )
        `)
      }
      const productos = await query.paginate(page, limit)
      // Agregar stock total a cada producto
      for (const producto of productos.all()) {
        const stockTotal = await producto.getStockTotal()
        ;(producto as any).stockTotal = stockTotal
      }
      return response.ok({
        status: 'success',
        data: productos,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener productos',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Obtener un producto por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const producto = await Producto.query()
        .where('id', params.id)
        .preload('categoria')
        .preload('marca')
        .preload('imagenes')
        .preload('inventario', (query) => {
          query.preload('sucursal')
        })
        .firstOrFail()
      // Calcular stock total
      const stockTotal = await producto.getStockTotal()
      ;(producto as any).stockTotal = stockTotal
      return response.ok({
        status: 'success',
        data: producto,
      })
    } catch (error) {
      return response.notFound({
        status: 'error',
        message: 'Producto no encontrado',
      })
    }
  }
  /**
   * Crear nuevo producto
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createProductoValidator)
      // Verificar código único
      const existente = await Producto.findBy('codigo', payload.codigo)
      if (existente) {
        return response.conflict({
          status: 'error',
          message: 'El código del producto ya existe',
        })
      }
      const producto = await Producto.create(payload)
      await producto.load('categoria')
      await producto.load('marca')
      return response.created({
        status: 'success',
        message: 'Producto creado exitosamente',
        data: producto,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al crear producto',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Actualizar producto
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const producto = await Producto.findOrFail(params.id)
      const payload = await request.validateUsing(updateProductoValidator)
      // Verificar código único (si se está cambiando)
      if (payload.codigo && payload.codigo !== producto.codigo) {
        const existente = await Producto.findBy('codigo', payload.codigo)
        if (existente) {
          return response.conflict({
            status: 'error',
            message: 'El código del producto ya existe',
          })
        }
      }
      producto.merge(payload)
      await producto.save()
      await producto.load('categoria')
      await producto.load('marca')
      return response.ok({
        status: 'success',
        message: 'Producto actualizado exitosamente',
        data: producto,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al actualizar producto',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Eliminar producto (soft delete)
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const producto = await Producto.findOrFail(params.id)
      // Verificar si tiene ventas
      const ventas = await producto.related('detalleVentas').query()
        .whereHas('venta', (query) => {
          query.whereNot('estado', 'Cancelada')
        })
        .count('* as total')
      if (ventas[0].$extras.total > 0) {
        return response.conflict({
          status: 'error',
          message: 'No se puede eliminar el producto porque tiene ventas asociadas',
        })
      }
      producto.activo = false
      await producto.save()
      return response.ok({
        status: 'success',
        message: 'Producto desactivado exitosamente',
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al eliminar producto',
        error: error.message,
      })
    }
  }
  /**
   * Productos destacados
   */
  async destacados({ response }: HttpContext) {
    try {
      const productos = await Producto.query()
        .where('destacado', true)
        .where('activo', true)
        .preload('categoria')
        .preload('marca')
        .preload('imagenes')
        .limit(10)
      return response.ok({
        status: 'success',
        data: productos,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener productos destacados',
        error: error.message,
      })
    }
  }
  /**
   * Productos en oferta
   */
  async ofertas({ response }: HttpContext) {
    try {
      const productos = await Producto.query()
        .whereNotNull('precio_oferta')
        .where('activo', true)
        .whereRaw('precio_oferta < precio_venta')
        .preload('categoria')
        .preload('marca')
        .preload('imagenes')
        .limit(10)
      return response.ok({
        status: 'success',
        data: productos,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener productos en oferta',
        error: error.message,
      })
    }
  }
}