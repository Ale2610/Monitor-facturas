sap.ui.define([
    "sap/fe/core/PageController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (PageController, Filter, FilterOperator, MessageToast) {
    "use strict";

    return PageController.extend("monitorfacturas.detallesfactura.ext.view.Informaciongeneral", {

        onAfterRendering: function () {
            console.log("✔️ onAfterRendering ejecutado");
        
            // Asegúrate que el visor PDF esté presente después de renderizar
            setTimeout(() => {
                this.mostrarPdfEnIframe();
            }, 500); // Puedes ajustar el tiempo si aún es muy temprano
        },
        
        mostrarPdfEnIframe: function () {
            const oHtml = this.byId("pdfEmbed");
        
            const oContext = this.getView().getBindingContext();
            if (!oContext) {
                console.error("No hay contexto de factura");
                return;
            }
        
            const numeroFactura = oContext.getProperty("NumeroFactura");
            const oModel = this.getOwnerComponent().getModel();
            const sServiceUrl = oModel.sServiceUrl;
            const sUrl = sServiceUrl + "/Facturas('" + numeroFactura + "')/archivoPDF/$value";
        
            // Ya no usamos blob, ni base64. Solo usamos la URL directa
            const iframeHTML = `
                <iframe
                    src="${sUrl}"
                    width="100%"
                    height="800px"
                    style="border: none;"
                ></iframe>
            `;
        
            oHtml.setContent(iframeHTML);
        },
         
        onDetallePress: function (oEvent) {
            var oLink = oEvent.getSource();
            var oItem = oLink.getParent();
            var oContext = oItem.getBindingContext();
            var entradaId = oContext.getProperty("NumeroEntrada");

            var sUrl = "#monitorfacturasentradas-display&/Entrada('" + entradaId + "')";
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
                        MessageToast.show("No se encontró el material.");
                    }
                })
                .catch(function () {
                    MessageToast.show("Error al consultar DetalleOrdenCompra.");
                });
        }
    });
});