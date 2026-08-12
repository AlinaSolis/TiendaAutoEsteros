// database/migrations/021_create_views_and_triggers.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = ''
  async up() {
    // Vista: productos con stock
    await this.db.rawQuery(`
      CREATE OR REPLACE VIEW vista_productos_stock AS
      SELECT
        p.id,
        p.nombre,
        p.codigo,
        p.precio_venta,
        c.nombre as categoria,
        m.nombre as marca,
        COALESCE(SUM(i.cantidad), 0) as stock_total,
        p.stock_minimo,
        CASE
          WHEN COALESCE(SUM(i.cantidad), 0) <= p.stock_minimo THEN 'Bajo'
          WHEN COALESCE(SUM(i.cantidad), 0) <= p.stock_minimo * 2 THEN 'Medio'
          ELSE 'Alto'
        END as nivel_stock
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN marcas m ON p.marca_id = m.id
      LEFT JOIN inventario i ON p.id = i.producto_id
      WHERE p.activo = TRUE
      GROUP BY p.id, p.nombre, p.codigo, p.precio_venta, c.nombre, m.nombre, p.stock_minimo
    `)
    // Vista: ventas mensuales
    await this.db.rawQuery(`
      CREATE OR REPLACE VIEW vista_ventas_mensuales AS
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') as mes,
        COUNT(*) as total_ventas,
        SUM(total) as ventas_totales,
        AVG(total) as promedio_venta,
        COUNT(DISTINCT cliente_id) as clientes_unicos
      FROM ventas
      WHERE estado = 'Completada'
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY mes DESC
    `)
    // Vista: productos más vendidos
    await this.db.rawQuery(`
      CREATE OR REPLACE VIEW vista_productos_top AS
      SELECT
        p.id,
        p.nombre,
        p.codigo,
        COUNT(dv.id) as veces_vendido,
        SUM(dv.cantidad) as total_unidades,
        SUM(dv.total) as ingresos_totales,
        AVG(dv.precio_unitario) as precio_promedio
      FROM productos p
      JOIN detalle_ventas dv ON p.id = dv.producto_id
      JOIN ventas v ON dv.venta_id = v.id
      WHERE v.estado = 'Completada'
      GROUP BY p.id, p.nombre, p.codigo
      ORDER BY total_unidades DESC
      LIMIT 10
    `)
    // Trigger: actualizar stock después de venta
    await this.db.rawQuery(`
      DROP TRIGGER IF EXISTS after_venta_actualizar_stock
    `)
    await this.db.rawQuery(`
      CREATE TRIGGER after_venta_actualizar_stock
      AFTER INSERT ON detalle_ventas
      FOR EACH ROW
      BEGIN
        UPDATE inventario i
        SET i.cantidad = i.cantidad - NEW.cantidad
        WHERE i.producto_id = NEW.producto_id
        AND i.sucursal_id = (SELECT sucursal_id FROM ventas WHERE id = NEW.venta_id);
        INSERT INTO historial_movimientos (usuario_id, producto_id, tabla_afectada, registro_id, tipo_movimiento, datos_nuevos)
        VALUES (
          (SELECT usuario_id FROM ventas WHERE id = NEW.venta_id),
          NEW.producto_id,
          'inventario',
          NEW.venta_id,
          'VENTA',
          JSON_OBJECT('cantidad', NEW.cantidad, 'precio', NEW.precio_unitario)
        );
      END
    `)
    // Trigger: actualizar stock después de compra
    await this.db.rawQuery(`
      DROP TRIGGER IF EXISTS after_compra_actualizar_stock
    `)
    await this.db.rawQuery(`
      CREATE TRIGGER after_compra_actualizar_stock
      AFTER INSERT ON detalle_compras
      FOR EACH ROW
      BEGIN
        INSERT INTO inventario (producto_id, sucursal_id, cantidad)
        VALUES (NEW.producto_id, (SELECT sucursal_id FROM compras WHERE id = NEW.compra_id), NEW.cantidad)
        ON DUPLICATE KEY UPDATE cantidad = cantidad + NEW.cantidad;
        INSERT INTO historial_movimientos (usuario_id, producto_id, tabla_afectada, registro_id, tipo_movimiento, datos_nuevos)
        VALUES (
          (SELECT usuario_id FROM compras WHERE id = NEW.compra_id),
          NEW.producto_id,
          'inventario',
          NEW.compra_id,
          'COMPRA',
          JSON_OBJECT('cantidad', NEW.cantidad, 'precio', NEW.precio_unitario)
        );
      END
    `)
  }
  async down() {
    await this.db.rawQuery('DROP VIEW IF EXISTS vista_productos_stock')
    await this.db.rawQuery('DROP VIEW IF EXISTS vista_ventas_mensuales')
    await this.db.rawQuery('DROP VIEW IF EXISTS vista_productos_top')
    await this.db.rawQuery('DROP TRIGGER IF EXISTS after_venta_actualizar_stock')
    await this.db.rawQuery('DROP TRIGGER IF EXISTS after_compra_actualizar_stock')
  }
}