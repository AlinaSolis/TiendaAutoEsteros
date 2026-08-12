// app/controllers/venta_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Venta from '#models/venta'
import DetalleVenta from '#models/detalle_venta'
import { createVentaValidator, updateVentaValidator, completarVentaValidator } from '#validators/venta_validator'
import { paginationValidator, dateRangeValidator } from '#validators/common_validator'
export default class VentasController {
  /**
   * Obtener lista paginada de ventas
   */
  async index({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(paginationValidator)
      const page = payload.page || 1
      const limit = payload.limit || 10
      const query = Venta.query()
        .preload('cliente')
        .preload('usuario')
        .preload('sucursal')
        .preload('metodoPago')
        .preload('detalles', (query) => {
          query.preload('producto', (query) => {
            query.preload('categoria')
            query.preload('marca')
          })
        })
        .orderBy('created_at', 'desc')
      // Búsqueda
      if (payload.search) {
        query.where((builder) => {
          builder
            .where('folio', 'LIKE', `%${payload.search}%`)
            .orWhereHas('cliente', (query) => {
              query.where('nombre', 'LIKE', `%${payload.search}%`)
                .orWhere('apellido', 'LIKE', `%${payload.search}%`)
            })
        })
      }
      const ventas = await query.paginate(page, limit)
      return response.ok({
        status: 'success',
        data: ventas,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener ventas',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Obtener una venta por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const venta = await Venta.query()
        .where('id', params.id)
        .preload('cliente')
        .preload('usuario')
        .preload('sucursal')
        .preload('metodoPago')
        .preload('detalles', (query) => {
          query.preload('producto', (query) => {
            query.preload('categoria')
            query.preload('marca')
            query.preload('imagenes')
          })
        })
        .firstOrFail()
      return response.ok({
        status: 'success',
        data: venta,
      })
    } catch (error) {
      return response.notFound({
        status: 'error',
        message: 'Venta no encontrada',
      })
    }
  }
  /**
   * Crear nueva venta
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createVentaValidator)
      const user = auth.getUserOrFail()
      // Generar folio único
      const folio = `VEN-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      // Crear venta
      const venta = await Venta.create({
        clienteId: payload.clienteId,
        usuarioId: user.id,
        sucursalId: payload.sucursalId,
        metodoPagoId: payload.metodoPagoId,
        folio: folio,
        descuento: payload.descuento || 0,
        notas: payload.notas,
        subtotal: 0,
        iva: 0,
        total: 0,
        estado: 'Pendiente',
      })
      // Crear detalles
      let subtotal = 0
      for (const detalleData of payload.detalles) {
        const total = detalleData.cantidad * detalleData.precioUnitario
        const descuento = (detalleData.descuentoUnitario || 0) * detalleData.cantidad
        await DetalleVenta.create({
          ventaId: venta.id,
          productoId: detalleData.productoId,
          cantidad: detalleData.cantidad,
          precioUnitario: detalleData.precioUnitario,
          descuentoUnitario: detalleData.descuentoUnitario || 0,
          total: total - descuento,
        })
        subtotal += total - descuento
      }
      // Calcular totales
      venta.subtotal = subtotal
      venta.iva = subtotal * 0.16
      venta.total = venta.subtotal + venta.iva - venta.descuento
      await venta.save()
      // Cargar relaciones
      await venta.load('cliente')
      await venta.load('usuario')
      await venta.load('detalles', (query) => {
        query.preload('producto')
      })
      return response.created({
        status: 'success',
        message: 'Venta creada exitosamente',
        data: venta,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al crear venta',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Completar venta
   */
  async complete({ params, request, response }: HttpContext) {
    try {
      const venta = await Venta.findOrFail(params.id)
      const payload = await request.validateUsing(completarVentaValidator)
      // Verificar que la venta esté pendiente
      if (venta.estado !== 'Pendiente') {
        return response.conflict({
          status: 'error',
          message: 'La venta ya fue completada o cancelada',
        })
      }
      // Actualizar método de pago si se proporciona
      if (payload.metodoPagoId) {
        venta.metodoPagoId = payload.metodoPagoId
      }
      // Completar venta
      await venta.completar()
      // Cargar relaciones
      await venta.load('cliente')
      await venta.load('detalles', (query) => {
        query.preload('producto')
      })
      return response.ok({
        status: 'success',
        message: 'Venta completada exitosamente',
        data: venta,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al completar venta',
        error: error.messages || error.message,
      })
    }
  }
  /**
   * Cancelar venta
   */
  async cancel({ params, request, response }: HttpContext) {
    try {
      const venta = await Venta.findOrFail(params.id)
      const { motivo } = request.only(['motivo'])
      // Verificar que la venta esté pendiente
      if (venta.estado !== 'Pendiente') {
        return response.conflict({
          status: 'error',
          message: 'La venta ya fue completada o cancelada',
        })
      }
      await venta.cancelar()
      // Registrar motivo
      if (motivo) {
        venta.notas = venta.notas
          ? `${venta.notas}\nMotivo cancelación: ${motivo}`
          : `Motivo cancelación: ${motivo}`
        await venta.save()
      }
      return response.ok({
        status: 'success',
        message: 'Venta cancelada exitosamente',
        data: venta,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al cancelar venta',
        error: error.message,
      })
    }
  }
  /**
   * Obtener estadísticas de ventas
   */
  async stats({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(dateRangeValidator)
      const fechaInicio = payload.fechaInicio || new Date(new Date().setDate(1)) // Primer día del mes
      const fechaFin = payload.fechaFin || new Date()
      const stats = {
        totalVentas: await Venta.query()
          .where('estado', 'Completada')
          .whereBetween('created_at', [fechaInicio, fechaFin])
          .count('* as total'),
        totalIngresos: await Venta.query()
          .where('estado', 'Completada')
          .whereBetween('created_at', [fechaInicio, fechaFin])
          .sum('total as total'),
        promedioVenta: await Venta.query()
          .where('estado', 'Completada')
          .whereBetween('created_at', [fechaInicio, fechaFin])
          .avg('total as promedio'),
        ventasPendientes: await Venta.query()
          .where('estado', 'Pendiente')
          .count('* as total'),
        ventasHoy: await Venta.query()
          .where('estado', 'Completada')
          .whereDate('created_at', '=', new Date())
          .count('* as total'),
        ingresosHoy: await Venta.query()
          .where('estado', 'Completada')
          .whereDate('created_at', '=', new Date())
          .sum('total as total'),
      }
      return response.ok({
        status: 'success',
        data: stats,
      })
    } catch (error) {
      return response.badRequest({
        status: 'error',
        message: 'Error al obtener estadísticas',
        error: error.message,
      })
    }
  }
}