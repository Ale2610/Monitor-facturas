sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function(PageController) {
        'use strict';

        return PageController.extend('monitorfacturas.detallesfactura.ext.main.Main', {
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
                var sUrl = "#monitorfacturasdetallesfactura-display&/Facturas('" + facturaId + "')";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
            }, 

            formatter: {
                estadoToState: function (estado) {
                    if (estado === "Aprobado") {
                        return "Success";
                    } else if (estado === "Rechazado") {
                        return "Error";
                    } else {
                        return "Warning";
                    }
                },
                urgenteToState: function (urgente) {
                    return urgente ? "Error" : "Success";
                },
                urgenteToText: function (urgente) {
                    return urgente ? "Sí" : "No";
                }
            }
            
        });
    }
);
