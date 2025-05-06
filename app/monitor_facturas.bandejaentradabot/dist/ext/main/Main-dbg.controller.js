sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function(PageController) {
        'use strict';

        return PageController.extend('monitorfacturas.bandejaentradabot.ext.main.Main', {
            onInit: function () {
                const oList = this.byId("FacturaList");
                const oBinding = oList.getBinding("items");
            
                if (oBinding) {
                    const oFilter = new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.EQ, "ERP Validando");
                    oBinding.filter([oFilter]);
                } else {
                    // Si aún no hay binding, puedes esperar al attachEventOnce "updateFinished"
                    oList.attachEventOnce("updateFinished", () => {
                        const oBindingLater = oList.getBinding("items");
                        const oFilter = new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.EQ, "ERP Validando");
                        oBindingLater.filter([oFilter]);
                    });
                }
            },
            onDetallePress: function (oEvent) {
                oEvent.preventDefault(); // Previene acción por defecto
                oEvent.cancelBubble = true; // Previene burbujeo del evento
            
                var oButton = oEvent.getSource();
                var oItem = oButton.getParent();
                var oContext = oItem.getBindingContext();
                var facturaId = oContext.getProperty("NumeroFactura");
            
                var sHash = "monitorfacturasbandejaentradab-display&/Facturas('" + facturaId + "')";
            
                if (window.self !== window.top) {
                    window.location.hash = sHash;
                } else {
                    window.location.href = "launchpadPage.html#" + sHash;
                }
            }       
        });
    }
);
