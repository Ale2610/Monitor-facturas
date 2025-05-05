sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function(PageController) {
        'use strict';

        return PageController.extend('monitorfacturas.facturaorden.ext.main.Main', {

            onDetallePress: function(oEvent) {

                var oLink = oEvent.getSource();
    
                // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
                var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
                var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

                // Obtener un valor específico desde el contexto, como el número de factura
                var facturaId = oContext.getProperty("NumeroFactura");

                // Ahora puedes usar facturaId para navegar o realizar otras acciones
                console.log(facturaId);
                // Abrir la aplicación de Facturas en una nueva ventana
                var sUrl = "#monitorfacturasfacturasxml-display&/Facturas('"+facturaId+"')";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
            }

        });
    }
);
