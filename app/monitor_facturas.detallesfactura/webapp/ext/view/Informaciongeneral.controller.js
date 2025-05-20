sap.ui.define([
    "sap/fe/core/PageController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (PageController, Filter, FilterOperator, MessageToast, Fragment) {
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

        onSeleccionarComprador: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext();
        
            if (!oContext) {
                sap.m.MessageToast.show("No hay contexto de factura disponible.");
                return;
            }
        
            try {
                oContext.setProperty("Estado", "Validación Compras");
                await oModel.submitBatch("$auto");
        
                sap.m.MessageToast.show("Estado actualizado correctamente");
        
                // Lanza evento global antes de volver
                sap.ui.getCore().getEventBus().publish("Facturas", "ActualizarLista");

                // Luego vuelve atrás
                history.back();

            } catch (error) {
                console.error("Error al actualizar el estado:", error);
                sap.m.MessageBox.error("No se pudo actualizar el estado.");
            }
        },

        onSeleccionarAlmacenista: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext();
        
            if (!oContext) {
                sap.m.MessageToast.show("No hay contexto de factura disponible.");
                return;
            }
        
            try {
                oContext.setProperty("Estado", "Validación Almacenista");
                await oModel.submitBatch("$auto");
        
                sap.m.MessageToast.show("Estado actualizado correctamente");
        
                // Lanza evento global antes de volver
                sap.ui.getCore().getEventBus().publish("Facturas", "ActualizarLista");

                // Luego vuelve atrás
                history.back();

            } catch (error) {
                console.error("Error al actualizar el estado:", error);
                sap.m.MessageBox.error("No se pudo actualizar el estado.");
            }
        },
        
        onSeleccionarBot: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext();
        
            if (!oContext) {
                sap.m.MessageToast.show("No hay contexto de factura disponible.");
                return;
            }
        
            try {
                oContext.setProperty("Estado", "ERP Validando");
                await oModel.submitBatch("$auto");
        
                sap.m.MessageToast.show("Estado actualizado correctamente");
        
                // Lanza evento global antes de volver
                sap.ui.getCore().getEventBus().publish("Facturas", "ActualizarLista");

                // Luego vuelve atrás
                history.back();

            } catch (error) {
                console.error("Error al actualizar el estado:", error);
                sap.m.MessageBox.error("No se pudo actualizar el estado.");
            }
        },
        
        onSeleccionarContabilidad: function () {
            sap.m.MessageToast.show("Rol seleccionado: Contabilidad");
            // lógica adicional aquí
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

        onDetallePressOrdenIndividual: function (oEvent) {
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
        }, 

        onDetallePressOrden: function (oEvent) {
            var oLink = oEvent.getSource();
            var oItem = oLink.getParent();
            var oContext = oItem.getBindingContext();
            var OrdenId = oContext.getProperty("NumeroOrden");

            var sUrl = "#monitorfacturasordendecompra-display&/OrdenCompra('" + OrdenId + "')";
            window.open(sUrl, "_blank");
        }, 

        onInsertOrdenCompra: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oContext = oView.getBindingContext(); // Factura actual
        
            if (!oContext) {
                sap.m.MessageToast.show("No hay contexto de factura.");
                return;
            }
        
            const proveedorCodigoSap = oContext.getProperty("Proveedor/CodigoSap");
            const sNumeroFactura = oContext.getProperty("NumeroFactura");
        
            if (!proveedorCodigoSap || !sNumeroFactura) {
                sap.m.MessageToast.show("Datos incompletos en la factura.");
                return;
            }
        
            try {
                // 1. Obtener TODAS las órdenes del proveedor
                const todasContext = await oModel.bindList("/OrdenCompra", null, null, null, {
                    $filter: `Proveedor/CodigoSap eq '${proveedorCodigoSap}'`
                }).requestContexts();
        
                const todas = todasContext.map(ctx => ctx.getObject());
        
                // 2. Obtener órdenes YA asociadas a esta factura
                const asociadasContext = await oModel.bindList("/FacturaOrdenCompra", null, null, null, {
                    $filter: `Factura/NumeroFactura eq '${sNumeroFactura}'`
                }).requestContexts();
        
                const asociadas = asociadasContext.map(ctx => ctx.getObject().Orden_NumeroOrden);
        
                // 3. Filtrar órdenes NO asociadas
                const disponibles = todas.filter(o => !asociadas.includes(o.NumeroOrden));
        
                // 4. Agregar opción "Seleccionar"
                disponibles.unshift({ NumeroOrden: "", textoVisible: "Seleccionar" });
        
                // 5. Cargar modelos
                const ordenesModel = new sap.ui.model.json.JSONModel({ Ordenes: disponibles });
                oView.setModel(ordenesModel, "ordenesProveedor");
        
                const posicionesModel = new sap.ui.model.json.JSONModel({ Posiciones: [] });
                oView.setModel(posicionesModel, "detalleOrden");
        
            } catch (err) {
                console.error("Error al consultar órdenes:", err);
                sap.m.MessageToast.show("Error cargando órdenes disponibles.");
                return;
            }
        
            // 🔁 Mostrar fragmento
            if (this._oDialogInsertOrden) {
                this._oDialogInsertOrden.destroy(true);
                this._oDialogInsertOrden = null;
                this._fragmentId = null;
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        
            try {
                const sFragmentId = oView.createId("InsertOrdenCompraFragment");
        
                const oDialog = await sap.ui.core.Fragment.load({
                    id: sFragmentId,
                    name: "monitorfacturas.detallesfactura.ext.view.fragments.FragmentInsertOrdenCompra",
                    controller: this
                });
        
                this._fragmentId = sFragmentId;
                this._oDialogInsertOrden = oDialog;
                oView.addDependent(oDialog);
                oDialog.open();
        
                // Resetear selección
                setTimeout(() => {
                    const oSelect = sap.ui.core.Fragment.byId(this._fragmentId, "selectOrdenCompra");
                    if (oSelect) oSelect.setSelectedKey("");
        
                    const oList = sap.ui.core.Fragment.byId(this._fragmentId, "multiSelectPosiciones");
                    if (oList) oList.removeSelections(true);
                }, 0);
        
            } catch (err) {
                console.error("Error al cargar el fragmento:", err);
                sap.m.MessageBox.error("No se pudo abrir el formulario de orden.");
            }
        },        

        onOrdenSeleccionada: async function (oEvent) {
            const sNumeroOrden = oEvent.getSource().getSelectedKey();
            const oView = this.getView();
            const oModel = oView.getModel();
        
            if (!sNumeroOrden) {
                return;
            }
        
            try {
                // 1. Obtener todas las posiciones de la orden seleccionada
                const allPosicionesContext = await oModel.bindList("/DetalleOrdenCompra", null, null, null, {
                    $filter: `NumeroOrden/NumeroOrden eq '${sNumeroOrden}'`
                }).requestContexts();
        
                const allPosiciones = allPosicionesContext.map(ctx => ctx.getObject());
        
                // 2. Obtener las posiciones ya usadas en DetalleFacturaOrden
                const usadasContext = await oModel.bindList("/DetalleFacturaOrden", null, null, null, {
                    $filter: `Orden/NumeroOrden eq '${sNumeroOrden}'`
                }).requestContexts();
        
                const usadas = usadasContext.map(ctx => ctx.getObject().Posicion_ID); // suponiendo que la asociación se guarda como Posicion_ID
        
                // 3. Filtrar posiciones disponibles (no usadas)
                const disponibles = allPosiciones.filter(p => !usadas.includes(p.ID));
        
                // 4. Mostrar las posiciones restantes en el fragmento
                const posicionesModel = new sap.ui.model.json.JSONModel({ Posiciones: disponibles });
                oView.setModel(posicionesModel, "detalleOrden");
        
            } catch (err) {
                console.error("Error al cargar o filtrar posiciones:", err);
                sap.m.MessageToast.show("No se pudieron cargar las posiciones disponibles.");
            }
        },

        onGuardarOrdenCompra: async function () {
            const oView = this.getView();
            const oModel = oView.getModel(); // OData V4
            const oFacturaContext = oView.getBindingContext();
            const sNumeroFactura = oFacturaContext.getProperty("NumeroFactura");
        
            const oSelect = sap.ui.core.Fragment.byId(this._fragmentId, "selectOrdenCompra");
            const sNumeroOrden = oSelect?.getSelectedKey();
        
            if (!sNumeroOrden) {
                sap.m.MessageToast.show("Debe seleccionar una orden de compra.");
                return;
            }
        
            const oList = sap.ui.core.Fragment.byId(this._fragmentId, "multiSelectPosiciones");
            const aSelectedItems = oList.getSelectedItems();
        
            if (aSelectedItems.length === 0) {
                sap.m.MessageToast.show("Debe seleccionar al menos una posición.");
                return;
            }
        
            try {
                // 1. Verificar si ya existe FacturaOrdenCompra
                const aExistentes = await oModel.bindList("/FacturaOrdenCompra", null, null, null, {
                    $filter: `Factura/NumeroFactura eq '${sNumeroFactura}' and Orden/NumeroOrden eq '${sNumeroOrden}'`
                }).requestContexts();
        
                if (aExistentes.length === 0) {
                    const oListBinding = oModel.bindList("/FacturaOrdenCompra", null, null, null, {
                        $$groupId: "$auto"
                    });
        
                    oListBinding.create({
                        Factura_NumeroFactura: sNumeroFactura,
                        Orden_NumeroOrden: sNumeroOrden,
                        FechaAsignacion: new Date().toISOString().split("T")[0]
                    });
                }
        
                // 2. Consultar DetalleFacturaOrden existentes
                const aAsociacionesExistentes = await oModel.bindList("/DetalleFacturaOrden", null, null, null, {
                    $filter: `Factura/NumeroFactura eq '${sNumeroFactura}' and Orden/NumeroOrden eq '${sNumeroOrden}'`
                }).requestContexts();
        
                const idsExistentes = aAsociacionesExistentes.map(ctx => ctx.getObject().Posicion_ID);
        
                // 3. Insertar nuevas asociaciones
                const oDetalleBinding = oModel.bindList("/DetalleFacturaOrden", null, null, null, {
                    $$groupId: "$auto"
                });
        
                let nuevasAsociaciones = 0;
        
                for (const item of aSelectedItems) {
                    const oCtx = item.getBindingContext("detalleOrden");
                    const oPos = oCtx.getObject();
        
                    if (idsExistentes.includes(oPos.ID)) {
                        console.log("Ya existe:", oPos.ID);
                        continue;
                    }
        
                    oDetalleBinding.create({
                        Factura_NumeroFactura: sNumeroFactura,
                        Orden_NumeroOrden: sNumeroOrden,
                        Posicion_ID: oPos.ID
                    });
        
                    nuevasAsociaciones++;
                }
        
                // 4. Confirmar cambios
                await oModel.submitBatch("$auto");
        
                // 5. Mensaje
                if (nuevasAsociaciones > 0) {
                    sap.m.MessageToast.show(`${nuevasAsociaciones} posiciones asociadas correctamente.`);
                } else {
                    sap.m.MessageToast.show("Todas las posiciones ya estaban asociadas.");
                }
        
                // 6. Cerrar fragmento
                if (this._oDialogInsertOrden) {
                    this._oDialogInsertOrden.destroy(true);
                    this._oDialogInsertOrden = null;
                    this._fragmentId = null;
                }
        
                await oFacturaContext.refresh();
        
            } catch (err) {
                console.error("Error al guardar asociación:", err);
                sap.m.MessageBox.error("Ocurrió un error al asociar la orden a la factura.");
            }
        },        
        
        onCancelarOrdenCompra: function () {
            if (this._oDialogInsertOrden) {
                this._oDialogInsertOrden.close();
            }
        }, 

        onInsertEntrada: async function () {
            const oView = this.getView();
            const oModel = oView.getModel(); // OData V4
            const oFacturaContext = oView.getBindingContext();
        
            if (!oFacturaContext) {
                sap.m.MessageToast.show("No hay contexto de factura.");
                return;
            }
        
            const sNumeroFactura = oFacturaContext.getProperty("NumeroFactura");
            if (!sNumeroFactura) {
                sap.m.MessageToast.show("No se encontró el número de factura.");
                return;
            }
        
            try {
                // 1. Consultar órdenes asociadas a esta factura usando $expand
                const aContextos = await oModel.bindList("/FacturaOrdenCompra", null, null, null, {
                    $filter: `Factura/NumeroFactura eq '${sNumeroFactura}'`,
                    $expand: "Orden"
                }).requestContexts();
        
                // 2. Extraer órdenes expandidas
                const ordenesAsociadas = aContextos
                    .map(ctx => ctx.getObject()?.Orden)
                    .filter(o => !!o); // Quitar posibles undefined
        
                if (ordenesAsociadas.length === 0) {
                    sap.m.MessageToast.show("No hay órdenes asociadas a esta factura.");
                    return;
                }
        
                // 3. Crear modelo JSON con órdenes asociadas
                const oOrdenesModel = new sap.ui.model.json.JSONModel({ Ordenes: ordenesAsociadas });
                oView.setModel(oOrdenesModel, "ordenesFactura");
        
                // 4. Crear modelo vacío para detalleEntrada
                const oDetalleEntradaModel = new sap.ui.model.json.JSONModel({ Posiciones: [] });
                oView.setModel(oDetalleEntradaModel, "detalleEntrada");
        
                // 5. Destruir fragmento anterior si existe
                if (this._crearEntradaDialog) {
                    this._crearEntradaDialog.destroy(true);
                    this._crearEntradaDialog = null;
                    this._crearEntradaFragmentId = null;
                }
        
                // 6. Cargar y abrir fragmento
                const sFragmentId = oView.createId("CrearEntradaFragment");
                const oDialog = await sap.ui.core.Fragment.load({
                    id: sFragmentId,
                    name: "monitorfacturas.detallesfactura.ext.view.fragments.FragmentInsertEntrada",
                    controller: this
                });
        
                this._crearEntradaDialog = oDialog;
                this._crearEntradaFragmentId = sFragmentId;
        
                oView.addDependent(oDialog);
                oDialog.open();
            } catch (err) {
                console.error("Error cargando fragmento de entrada:", err);
                sap.m.MessageBox.error("No se pudo abrir el formulario de entrada.");
            }
        },         
        
        onGuardarEntrada: async function () {
            const oView = this.getView();
            const oModel = oView.getModel(); // OData V4
            const oFacturaContext = oView.getBindingContext();
            const sFragmentId = this._crearEntradaFragmentId;
        
            const oNumeroEntrada = sap.ui.core.Fragment.byId(sFragmentId, "numeroEntrada");
            const oSelectOrden = sap.ui.core.Fragment.byId(sFragmentId, "selectOrdenEntrada");
        
            const numeroEntrada = oNumeroEntrada?.getValue();
            const numeroOrden = oSelectOrden?.getSelectedKey();
            const numeroFactura = oFacturaContext?.getProperty("NumeroFactura");
            const fechaActual = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
        
            if (!numeroFactura || !numeroEntrada || !numeroOrden) {
                sap.m.MessageBox.warning("Complete todos los campos obligatorios.");
                return;
            }
        
            try {
                // Crear Entrada con asociaciones a Factura y Orden
                const entradaBinding = oModel.bindList("/Entrada", null, null, null, {
                    $$groupId: "$auto"
                });
        
                entradaBinding.create({
                    NumeroEntrada: numeroEntrada,
                    FechaEmision: fechaActual,
                    FechaRecepcion: fechaActual,
                    NumeroFactura_NumeroFactura: numeroFactura,
                    Orden_NumeroOrden: numeroOrden // asegúrate de que esta asociación exista
                });
        
                await oModel.submitBatch("$auto");
        
                if (this._crearEntradaDialog) {
                    this._crearEntradaDialog.destroy(true);
                    this._crearEntradaDialog = null;
                    this._crearEntradaFragmentId = null;
                }
        
                sap.m.MessageToast.show("Entrada registrada correctamente.");
        
                if (oFacturaContext) {
                    await oFacturaContext.refresh();
                }
        
            } catch (err) {
                console.error("Error al guardar entrada:", err);
                sap.m.MessageBox.error("No se pudo registrar la entrada.");
            }
        },
        
        onCancelarEntrada: function () {
            if (this._crearEntradaDialog) {
                this._crearEntradaDialog.destroy(true);
                this._crearEntradaDialog = null;
            }
        },

        onAbrirDialogoAdjuntos: function () {
            const oView = this.getView();
        
            if (!this._dialogAdjunto) {
                sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "monitorfacturas.detallesfactura.ext.view.fragments.DialogoAdjunto",
                    controller: this
                }).then((oDialog) => {
                    this._dialogAdjunto = oDialog;
                    oView.addDependent(this._dialogAdjunto);
                    this._dialogAdjunto.open();
                });
            } else {
                this._dialogAdjunto.open();
            }
        }, 
        onBeforeItemAdded: function (oEvent) {
            const oItem = oEvent.getParameter("item");
        
            // Guarda el archivo en la variable del controlador
            oItem.getFileObject().then(file => {
                this._archivoSeleccionado = file;
            });
        },
        
        onSubirAdjunto: async function () {
            const oFile = this._archivoSeleccionado;
            if (!oFile) {
                sap.m.MessageToast.show("Seleccione un archivo primero.");
                return;
            }
        
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target.result.split(",")[1];
                const nombreArchivo = oFile.name;
                const tipoArchivo = oFile.type;
        
                const oContext = this.getView().getBindingContext();
                const oModel = this.getView().getModel();
        
                const adjuntoBinding = oModel.bindList("Adjuntos", oContext, null, null, {
                    $$groupId: "$auto"
                });
        
                adjuntoBinding.create({
                    NombreArchivo: nombreArchivo,
                    TipoArchivo: tipoArchivo,
                    ArchivoBase64: base64
                });
        
                await oModel.submitBatch("$auto");
                sap.m.MessageToast.show("Documento adjunto cargado correctamente.");
                this.byId("dialogAdjunto").close();
        
                // Limpia el archivo y refresca la vista
                this._archivoSeleccionado = null;
                await oContext.refresh();
            };
        
            reader.readAsDataURL(oFile);
        },
        
        onCerrarDialogoAdjunto: function () {
            this.byId("dialogAdjunto").close();
        }        
        
        
    });
});
