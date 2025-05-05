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

            const oViewModel = new sap.ui.model.json.JSONModel({
                modoEdicion: false
            });
            this.getView().setModel(oViewModel, "view");
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

        editarFactura: function () {
            const oContext = this.getView().getBindingContext();
            if (!oContext) {
                console.error("No hay contexto de factura");
                return;
            }
        
            const camposEditables = {
                Estado: oContext.getProperty("Estado"),
                Urgente: oContext.getProperty("Urgente"),
                Descuento: oContext.getProperty("Descuento"),
                Comentario: oContext.getProperty("Comentario"),
                FechaFactura: oContext.getProperty("FechaFactura"),
                FechaContabilizacion: oContext.getProperty("FechaContabilizacion"),
                FechaVencimiento: oContext.getProperty("FechaVencimiento"),
                FechaRecepcion: oContext.getProperty("FechaRecepcion"),
                FormaPago: oContext.getProperty("FormaPago"),
                CodigoActividad: oContext.getProperty("CodigoActividad"),
                Clasificacion: oContext.getProperty("Clasificacion"),
                Area: oContext.getProperty("Area"),
                Sede: oContext.getProperty("Sede"),
                DocumentoMIRO: oContext.getProperty("DocumentoMIRO"),
                DocumentoFI: oContext.getProperty("DocumentoFI")
            };
        
            this.getView().getModel("view").setProperty("/datosOriginales", camposEditables);
            this.getView().getModel("view").setProperty("/modoEdicion", true);
        },
    
        onGuardar: function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext();
            const oDatosOriginales = oView.getModel("view").getProperty("/datosOriginales");
        
            let hayCambios = false;
        
            Object.entries(oDatosOriginales).forEach(([key, originalValue]) => {
                const currentValue = oContext.getProperty(key);
                if (currentValue !== originalValue) {
                    hayCambios = true;
                }
            });
        
            if (!hayCambios) {
                sap.m.MessageToast.show("No hay cambios para guardar.");
                return;
            }
        
            oModel.submitBatch("$auto").then(() => {
                oView.getModel("view").setProperty("/modoEdicion", false);
                oView.getModel("view").setProperty("/datosOriginales", null);
                sap.m.MessageToast.show("Cambios guardados correctamente.");
            }).catch((err) => {
                console.error("Error al guardar cambios:", err);
                sap.m.MessageBox.error("Error al guardar los cambios.");
            });
        },        

        onCancelar: function () {
            const oView = this.getView();
            const oContext = oView.getBindingContext(); // este es un BindingContext V4
            const oDatosOriginales = oView.getModel("view").getProperty("/datosOriginales");
        
            if (!oContext || !oDatosOriginales) {
                sap.m.MessageToast.show("No se pueden restaurar los datos.");
                return;
            }
        
            // Restaurar cada campo editable
            Object.entries(oDatosOriginales).forEach(([key, value]) => {
                oContext.setProperty(key, value); // ✅ forma válida en V4
            });
        
            oView.getModel("view").setProperty("/modoEdicion", false);
            oView.getModel("view").setProperty("/datosOriginales", null);
        
            sap.m.MessageToast.show("Cambios descartados.");
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