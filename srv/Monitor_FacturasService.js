module.exports = srv => {
    const { Proveedores } = cds.entities('Monitor_Facturas');
  
    srv.on('bulkInsertProveedores', async (req) => {
      const { proveedores } = req.data;
  
      if (!Array.isArray(proveedores) || proveedores.length === 0) {
        return req.error(400, 'Debe enviar una lista de proveedores válida.');
      }
  
      try {
        const tx = cds.transaction(req);
        await tx.run(INSERT.into(Proveedores).entries(proveedores));
  
        // ✅ Aquí devolvemos una respuesta con contenido
        return { mensaje: `Se insertaron ${proveedores.length} proveedores.` };
      } catch (error) {
        console.error('Error al insertar proveedores:', error);
        return req.error(500, `Error al insertar proveedores: ${error.message}`);
      }
    });
  };
  