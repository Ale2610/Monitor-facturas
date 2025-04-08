sap.ui.define([
    "sap/fe/core/PageController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (PageController, Filter, FilterOperator) {
    "use strict";

    return PageController.extend("monitorfacturas.detallesfactura.ext.view.Informaciongeneral", {
        onDetallePress: function(oEvent) {

            var oLink = oEvent.getSource();

            // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
            var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
            var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

            // Obtener un valor específico desde el contexto, como el número de entrada
            var entradaId = oContext.getProperty("NumeroEntrada");

            // Ahora puedes usar facturaId para navegar o realizar otras acciones
            console.log(entradaId);
            // Abrir la aplicación de Facturas en una nueva ventana
            var sUrl = "#monitorfacturasentradas-display&/Entrada('"+entradaId+"')";
            
            // Usar window.open para abrir la URL en una nueva ventana
            window.open(sUrl, "_blank");
        },

        onDetallePressOrden: function (oEvent) {
            var oLink = oEvent.getSource();
            var oItem = oLink.getParent();
            var oContext = oItem.getBindingContext();
            var numeroMaterial = oContext.getProperty("NumeroMaterial");
        
            var oModel = this.getView().getModel(); // ODataModel v4
        
            var sFilter = "NumeroMaterial eq '" + numeroMaterial + "'";
        
            oModel.bindList("/DetalleOrdenCompra", null, null, null, { $filter: sFilter })
                .requestContexts()
                .then(function (aContexts) {
                    if (aContexts.length > 0) {
                        var oData = aContexts[0].getObject();
                        var id = oData.ID;
                        var sUrl = "#monitorfacturasdetalleorden-display&/DetalleOrdenCompra(ID=" + id + ",IsActiveEntity=true)";
                        window.open(sUrl, "_blank");
                    } else {
                        sap.m.MessageToast.show("No se encontró el material.");
                    }
                })
                .catch(function () {
                    sap.m.MessageToast.show("Error al consultar DetalleOrdenCompra.");
                });
        }        
        
    });
});
