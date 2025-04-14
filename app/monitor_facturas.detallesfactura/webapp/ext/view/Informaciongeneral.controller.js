sap.ui.define([
    "sap/fe/core/PageController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (PageController, Filter, FilterOperator, MessageToast) {
    "use strict";

    return PageController.extend("monitorfacturas.detallesfactura.ext.view.Informaciongeneral", {
        onInit: function () {
            var oPdfViewer = this.byId("pdfViewer");
            var sPath = sap.ui.require.toUrl("monitorfacturas/detallesfactura/pdfPrueba/factura123.pdf");
            oPdfViewer.setSource(sPath);
            var oView = this.getView();

            // Esperar a que el contexto esté disponible
            oView.attachEventOnce("modelContextChange", function () {
                var oContext = oView.getBindingContext();
                if (oContext) {
                    var numeroFactura = oContext.getProperty("NumeroFactura");

                    // Validar si existe número de factura
                    if (numeroFactura) {
                        var pdfUrl = "/pdfFactura/" + numeroFactura + ".pdf"; // Puedes ajustar esta ruta
                        var pdfViewer = oView.byId("pdfViewer");

                        if (pdfViewer) {
                            pdfViewer.setSource(pdfUrl);
                            pdfViewer.setTitle("Factura " + numeroFactura);
                            pdfViewer.downloadPDF = function () {
                                window.open(pdfUrl, "_blank");
                            };
                        }
                    } else {
                        MessageToast.show("No se encontró el número de factura.");
                    }
                }
            });
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