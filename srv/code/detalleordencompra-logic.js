/**
 * 
 * @Before(event = { "CREATE" }, entity = "Monitor_FacturasService.DetalleOrdenCompra")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function (request) {
	const { data } = request;
  
	const db = await cds.connect.to('db'); // conexión al servicio de base de datos
	const { OrdenCompra, DetalleFactura } = cds.entities('Monitor_Facturas');
  
	const idOrdenCompra = data.NumeroOrden_ID; // UUID de la orden
	const numeroMaterial = data.NumeroMaterial_NumeroMaterial; // Clave del detalle factura
  
	// Paso 1: Obtener la orden de compra
	const orden = await db.run(
	  SELECT.one
		.from(OrdenCompra)
		.columns('ID', 'NumeroFactura_NumeroFactura')
		.where({ ID: idOrdenCompra })
	);
  
	if (!orden) {
	  return request.error(400, `La orden de compra con ID ${idOrdenCompra} no existe.`);
	}
  
	const numeroFactura = orden.NumeroFactura_NumeroFactura;
	if (!numeroFactura) {
	  return request.error(400, `La orden de compra no tiene una factura asociada.`);
	}
  
	// Paso 2: Verificar si el número de material existe en los detalles de la factura
	const detalleExiste = await db.run(
	  SELECT.one
		.from(DetalleFactura)
		.where({
		  NumeroFactura_NumeroFactura: numeroFactura,
		  NumeroMaterial: numeroMaterial
		})
	);
  
	if (!detalleExiste) {
	  return request.error(400, `El material ${numeroMaterial} no está en los detalles de la factura ${numeroFactura}.`);
	}
  
	// Si todo está correcto, continúa el flujo normal de inserción
  };
  