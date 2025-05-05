sap.ui.define(
    [
        'sap/fe/core/PageController',
        "sap/m/MessageToast"
    ],
    function(PageController, MessageToast) {
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
            },

            timeUTC : function() {
                var horaLocal = new Date(); // Obtener la hora actual en el sistema

                // Asumiendo que la hora local está en UTC (si el sistema está en otra zona horaria, se ajustará)
                var horaBogota = new Date(horaLocal.getTime() - horaLocal.getTimezoneOffset() * 60000);  // Convertir la hora local a UTC-0 (ajustando la zona horaria local)
                
                // Ahora sumamos 5 horas para ajustar a la hora de Bogotá (UTC-5)
                horaBogota.setHours(horaBogota.getHours() + 5);  // Ajuste manual para UTC-5 (Bogotá)
                
                // Ahora convertimos la hora de Bogotá a UTC correctamente
                console.log(horaBogota.toISOString()); 
                return(horaBogota.toISOString());
            }, 

            createdNonce : function() {
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0;
                    const v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            
                console.log(uuid);
                var base64Encoded = btoa(uuid); // btoa() convierte la cadena a Base64
                return base64Encoded;
            }, 

            getInvoicesList : async function() {
                var created = this.timeUTC();
                var nonce = this.createdNonce();
            
                try {
                    const response = await fetch("/service/Monitor_FacturasService/consultar_documentos", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            noce: nonce,
                            created: created
                        })
                    });
            
                    const result = await response.text();
                    console.log("Respuesta SOAP:", result);
            
                    // Buscar todos los bloques <availableDocument>...</availableDocument>
                    const matches = result.match(/<availableDocument>[\s\S]*?<\/availableDocument>/g);
            
                    const listaDocumentos = [];
            
                    if (matches && matches.length > 0) {
                        matches.forEach(docStr => {
                            const documentNumber = docStr.match(/<documentNumber>(.*?)<\/documentNumber>/)?.[1] || "";
                            const documentPrefix = docStr.match(/<documentPrefix>(.*?)<\/documentPrefix>/)?.[1] || "";
                            const documentType = docStr.match(/<documentType>(.*?)<\/documentType>/)?.[1] || "";
                            const senderIdentification = docStr.match(/<senderIdentification>(.*?)<\/senderIdentification>/)?.[1] || "";
            
                            listaDocumentos.push({
                                documentNumber,
                                documentPrefix,
                                documentType,
                                senderIdentification
                            });
                        });
                    }
            
                    console.log("📋 Documentos extraídos:", listaDocumentos);
                    MessageToast.show(`Consulta realizada. ${listaDocumentos.length} documentos disponibles.`);
            
                    return listaDocumentos;  // <<<<<< Aquí sí devuelve correctamente
            
                } catch (err) {
                    console.error("Error al consultar:", err);
                    MessageToast.show("Error en consulta SOAP");
                    return [];  // <<<<<< Siempre devuelve algo
                }
            },            

            getDocuments: async function () {
            
                var listaFacturas = await this.getInvoicesList();
            
                for (const documento of listaFacturas) {
                    var created = this.timeUTC();
                    var nonce = this.createdNonce();
                    console.log("Número de documento:", documento.documentNumber);
                    console.log("Prefijo de documento:", documento.documentPrefix);
                    console.log("Tipo de documento:", documento.documentType);
                    console.log("Identificación del remitente:", documento.senderIdentification);
            
                    try {
                        const response = await fetch("/service/Monitor_FacturasService/extraer_documentos", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                noce: nonce,
                                created: created,
                                data: 'SIGNED_XML',
                                documentNumber: documento.documentNumber,
                                documentPrefix: documento.documentPrefix,
                                documentType: documento.documentType,
                                senderIdentification: documento.senderIdentification
                            })
                        });
            
                        const result = await response.text();
                        console.log("Respuesta SOAP:", result);
                        await this.extraerFactura(result);
            
                    } catch (error) {
                        console.error("❌ Error al extraer documentos:", error);
                    }
                }
            },
            
            extraerFactura: async function(xmlBase64) {
                try {
                    // Decodificar de Base64 a texto XML
                    const xmlDecoded = atob(xmlBase64);
            
                    // Ahora xmlDecoded contiene el XML como texto
                    console.log('XML decodificado:', xmlDecoded);
                } catch (error) {
                    console.error('Error al decodificar el XML:', error);
                }
            },

            insertarFactura: async function(facturaData) {

                var factura = {
                    "FechaContabilizacion": "2025-04-28",
                    "FechaFactura": "2025-04-28",
                    "FechaVencimiento": "2025-05-28",
                    "FechaRecepcion": "2025-04-27",
                    "FormaPago": "Contado",
                    "NumeroFactura": "FAC-123456",
                    "Proveedor": { CodigoSap: "CodigoSap8014" },  // ⚡ Muy importante: Association se envía así
                    "Posiciones": "1,2,3",
                    "TotalFactura": "1000",
                    "ValorFinal": "950",
                    "IVA": "50",
                    "IndicadorImpuesto": "IVA19",
                    "NumeroIndicador": "1234",
                    "Destinatario": "Centro Principal",
                    "DescripcionDestinatario": "Sede Norte",
                    "CodigoActividad": "123ABC",
                    "Clasificacion": "Servicios",
                    "Estado": "Pendiente",
                    "Urgente": false,
                    "Area": "Compras",
                    "Sede": "Bogotá",
                    "Comentario": "Factura correspondiente a servicios de abril",
                    "DocumentoMIRO": "",
                    "DocumentoFI": "",
                    "FacturaElec": true,
                    "Descuento": false,
                    "archivoPDF": null // Si vas a cargar el PDF, aquí debes pasar el archivo en base64
                }
                
                console.log('Inserción de factura en proceso...');
                try {
                    // Consumir el servicio OData
                    await fetch("/service/Monitor_FacturasService/Facturas", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(factura)
                    });
            
                    console.log('Factura insertada exitosamente');
                } catch (error) {
                    console.error('Error al insertar la factura:', error);
                }
            },
            
            onBuscarFactura: function (oEvent) {
                const sQuery = oEvent.getParameter("query");
                this._aplicarFiltros(sQuery);
            },
            
            onFiltrarEstadoUrgente: function () {
                const sQuery = this.byId("searchFactura").getValue();
                this._aplicarFiltros(sQuery);
            },
            
            _aplicarFiltros: function (sSearchText) {
                const estado = this.byId("filtroEstado").getSelectedKey();
                const urgente = this.byId("filtroUrgente").getSelectedKey();
            
                const aFiltros = [];
            
                // Filtro por búsqueda en NúmeroFactura
                if (sSearchText) {
                    aFiltros.push(new sap.ui.model.Filter("NumeroFactura", sap.ui.model.FilterOperator.Contains, sSearchText));
                }
            
                // Filtro por estado
                if (estado) {
                    aFiltros.push(new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.EQ, estado));
                }
            
                // Filtro por urgencia
                if (urgente) {
                    aFiltros.push(new sap.ui.model.Filter("Urgente", sap.ui.model.FilterOperator.EQ, urgente));
                }
            
                // ✅ SOLUCIÓN: Obtener el binding dinámicamente
                const oList = this.byId("FacturaList"); // Asegúrate que este es el ID real de tu <List>
                const oBinding = oList.getBinding("items");
            
                if (oBinding) {
                    oBinding.filter(aFiltros);
                } else {
                    console.warn("No se encontró el binding de la lista");
                }
            }
            
        });
    }
);
