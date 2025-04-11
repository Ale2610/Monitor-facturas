sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/m/MessageToast'
    ],
    function(PageController, MessageToast) {
        'use strict';
        
        return PageController.extend('monitorfacturas.facturasxml.ext.main.Main', {
            onButtonPress: function () {
                
                
                //const { Factura } = cds.entities;
                //MessageToast.show("¡Botón presionado!");

                //Consultar facturas existentes 

                var requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };
                
                fetch("/service/Monitor_FacturasService/noova_documents", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error en la respuesta del backend: " + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        let nvdocFile = data.value;
                        console.log(nvdocFile);
                        
                        console.log("Datos obtenidos:", data);
                        MessageToast.show("Consulta exitosa");
                    })
                    .catch(error => {
                        console.error("Error en la consulta:", error);
                        MessageToast.show("Error al consultar el backend");
                        sap.m.MessageBox.error("Error en la API: " + error.message);
                    });
                
                                   
                                    /*
                                    var oModel = this.getView().getModel(); 
                                    console.log("Modelo OData:", oModel);
                                    var oTable = this.byId("myTable"); // Obtener la tabla


                                    let nvdocFile = 
                                    try {
                                        // Convertir Base64 a binario
                                        const binaryString = atob(nvdocFile);
                                        const bytes = new Uint8Array(binaryString.length);
                                        for (let i = 0; i < binaryString.length; i++) {
                                            bytes[i] = binaryString.charCodeAt(i);
                                        }
                                    
                                        // Decodificar a texto (UTF-8)
                                        const xmlDecoded = new TextDecoder("utf-8").decode(bytes);
                                        console.log(xmlDecoded);
                                    
                                        // Expresiones regulares para extraer información clave
                                        const regexID = /<cbc:ID>([^<]+)<\/cbc:ID>/;
                                        const regexIssueDate = /<cbc:IssueDate>([^<]+)<\/cbc:IssueDate>/;
                                        const regexIssueTime = /<cbc:IssueTime>([^<]+)<\/cbc:IssueTime>/;
                                        const regexSupplierName = /<cac:AccountingSupplierParty>.*?<cbc:RegistrationName>([^<]+)<\/cbc:RegistrationName>/s;
                                        const regexSupplierNIT = /<cac:AccountingSupplierParty>.*?<cbc:CompanyID[^>]*>([^<]+)<\/cbc:CompanyID>/s;
                                        const regexSupplierAddress = /<cac:AccountingSupplierParty>.*?<cbc:Line>([^<]+)<\/cbc:Line>/s;
                                        const regexSupplierPhone = /<cac:AccountingSupplierParty>.*?<cbc:Telephone>([^<]+)<\/cbc:Telephone>/s;
                                        const regexSupplierEmail = /<cac:AccountingSupplierParty>.*?<cbc:ElectronicMail>([^<]+)<\/cbc:ElectronicMail>/s;
                                        
                                        const regexCustomerName = /<cac:AccountingCustomerParty>.*?<cbc:RegistrationName>([^<]+)<\/cbc:RegistrationName>/s;
                                        const regexCustomerNIT = /<cac:AccountingCustomerParty>.*?<cbc:CompanyID[^>]*>([^<]+)<\/cbc:CompanyID>/s;
                                        const regexCustomerAddress = /<cac:AccountingCustomerParty>.*?<cbc:Line>([^<]+)<\/cbc:Line>/s;
                                        const regexCustomerEmail = /<cac:AccountingCustomerParty>.*?<cbc:ElectronicMail>([^<]+)<\/cbc:ElectronicMail>/s;
                                        
                                        const regexTotalAmount = /<cbc:PayableAmount currencyID="COP">([^<]+)<\/cbc:PayableAmount>/;
                                        const regexTaxAmount = /<cbc:TaxAmount currencyID="COP">([^<]+)<\/cbc:TaxAmount>/;
                                        const regexInvoiceReference = /<cac:InvoiceDocumentReference>\s*<cbc:ID>([^<]+)<\/cbc:ID>/;
                                        const regexUUID = /<cbc:UUID schemeName="CUFE-SHA384">([^<]+)<\/cbc:UUID>/;
                                        const regexValidationStatus = /<cbc:Description>(Documento validado por la DIAN)<\/cbc:Description>/;
                                        const regexValidationDate = /<cbc:ValidationDate>([^<]+)<\/cbc:ValidationDate>/;
                                        const regexValidationTime = /<cbc:ValidationTime>([^<]+)<\/cbc:ValidationTime>/;
                                        
                                        const regexProductLines = /<cac:CreditNoteLine>(.*?)<\/cac:CreditNoteLine>/gs;
                                        const regexProductID = /<cbc:ID>([^<]+)<\/cbc:ID>/;
                                        const regexProductDescription = /<cbc:Description>([^<]+)<\/cbc:Description>/;
                                        const regexProductQuantity = /<cbc:CreditedQuantity[^>]*>([^<]+)<\/cbc:CreditedQuantity>/;
                                        const regexProductUnitPrice = /<cbc:PriceAmount currencyID="COP">([^<]+)<\/cbc:PriceAmount>/;
                                        const regexProductSubtotal = /<cbc:LineExtensionAmount currencyID="COP">([^<]+)<\/cbc:LineExtensionAmount>/;
                                    
                                        // Extraer valores con regex
                                        const id = xmlDecoded.match(regexID)?.[1] || "No encontrado";
                                        const issueDate = xmlDecoded.match(regexIssueDate)?.[1] || "No encontrado";
                                        const issueTime = xmlDecoded.match(regexIssueTime)?.[1] || "No encontrado";
                                        
                                        const supplierName = xmlDecoded.match(regexSupplierName)?.[1] || "No encontrado";
                                        const supplierNIT = xmlDecoded.match(regexSupplierNIT)?.[1] || "No encontrado";
                                        const supplierAddress = xmlDecoded.match(regexSupplierAddress)?.[1] || "No encontrado";
                                        const supplierPhone = xmlDecoded.match(regexSupplierPhone)?.[1] || "No encontrado";
                                        const supplierEmail = xmlDecoded.match(regexSupplierEmail)?.[1] || "No encontrado";
                                        
                                        const customerName = xmlDecoded.match(regexCustomerName)?.[1] || "No encontrado";
                                        const customerNIT = xmlDecoded.match(regexCustomerNIT)?.[1] || "No encontrado";
                                        const customerAddress = xmlDecoded.match(regexCustomerAddress)?.[1] || "No encontrado";
                                        const customerEmail = xmlDecoded.match(regexCustomerEmail)?.[1] || "No encontrado";
                                    
                                        const totalAmount = xmlDecoded.match(regexTotalAmount)?.[1] || "No encontrado";
                                        const taxAmount = xmlDecoded.match(regexTaxAmount)?.[1] || "No encontrado";
                                        const invoiceReference = xmlDecoded.match(regexInvoiceReference)?.[1] || "No encontrado";
                                        const uuid = xmlDecoded.match(regexUUID)?.[1] || "No encontrado";
                                        const validationStatus = xmlDecoded.match(regexValidationStatus)?.[1] || "No validado";
                                        const validationDate = xmlDecoded.match(regexValidationDate)?.[1] || "No encontrado";
                                        const validationTime = xmlDecoded.match(regexValidationTime)?.[1] || "No encontrado";
                                    
                                        // Extraer productos
                                        const products = [];
                                        const productMatches = xmlDecoded.match(regexProductLines);
                                        if (productMatches) {
                                            productMatches.forEach((productXML) => {
                                                const productID = productXML.match(regexProductID)?.[1] || "No encontrado";
                                                const productDescription = productXML.match(regexProductDescription)?.[1] || "No encontrado";
                                                const productQuantity = productXML.match(regexProductQuantity)?.[1] || "No encontrado";
                                                const productUnitPrice = productXML.match(regexProductUnitPrice)?.[1] || "No encontrado";
                                                const productSubtotal = productXML.match(regexProductSubtotal)?.[1] || "No encontrado";
                                    
                                                products.push({
                                                    ID: productID,
                                                    Descripción: productDescription,
                                                    Cantidad: productQuantity,
                                                    PrecioUnitario: productUnitPrice,
                                                    Subtotal: productSubtotal,
                                                });
                                            });
                                        }

                                        const posiciones = products.length;
                                    
                                        // Mostrar en consola
                                        console.log("=== Información General ===");
                                        console.log("ID del Documento:", id);
                                        console.log("Fecha de Emisión:", issueDate);
                                        console.log("Hora de Emisión:", issueTime);
                                        
                                        console.log("\n=== Información del Proveedor ===");
                                        console.log("Nombre:", supplierName);
                                        console.log("NIT:", supplierNIT);
                                        console.log("Dirección:", supplierAddress);
                                        console.log("Teléfono:", supplierPhone);
                                        console.log("Correo Electrónico:", supplierEmail);
                                    
                                        console.log("\n=== Información del Cliente ===");
                                        console.log("Nombre:", customerName);
                                        console.log("NIT:", customerNIT);
                                        console.log("Dirección:", customerAddress);
                                        console.log("Correo Electrónico:", customerEmail);
                                    
                                        console.log("\n=== Información de la Nota de Crédito ===");
                                        console.log("Total a Pagar:", totalAmount);
                                        console.log("IVA Total:", taxAmount);
                                        console.log("Factura Asociada:", invoiceReference);
                                        console.log("UUID:", uuid);
                                        
                                        console.log("\n=== Validación de la DIAN ===");
                                        console.log("Estado de Validación:", validationStatus);
                                        console.log("Fecha de Validación:", validationDate);
                                        console.log("Hora de Validación:", validationTime);
                                    
                                        console.log("\n=== Detalles de los Productos ===");
                                        products.forEach((product, index) => {
                                            console.log(`Producto ${index + 1}:`);
                                            console.log("ID:", product.ID);
                                            console.log("Descripción:", product.Descripción);
                                            console.log("Cantidad:", product.Cantidad);
                                            console.log("Precio Unitario:", product.PrecioUnitario);
                                            console.log("Subtotal:", product.Subtotal);
                                            console.log("------------------------------");
                                        });

                                        const factura = {
                                            NumeroFactura: invoiceReference,
                                            FechaFactura: issueDate,
                                            FechaContabilizacion: issueDate, // Usamos la misma fecha
                                            FechaVencimiento: issueDate, // Ajusta según lógica de pago
                                            FormaPago: "Transferencia", // Si hay un campo en el XML, agrégalo aquí
                                            Proveedor: { NIT: "NIT6085" },
                                            Posiciones: String(posiciones.length), // Total de productos en la factura
                                            TotalFactura: totalAmount,
                                            IVA: taxAmount,
                                            IndicadorImpuesto: "IVA",
                                            NumeroIndicador: "01", // Ajustar si hay otro en el XML
                                            Destinatario: customerNIT,
                                            DescripcionDestinatario: customerName,
                                            Clasificacion: "General",
                                            Estado: validationStatus,
                                            Urgente: true,
                                            Area: "Gerencia",

                                        }

                                        console.log(factura);

                                        oModel.bindList("/Facturas").requestContexts().then(console.log).catch(console.error);

                                                                                // Insertar la nueva factura en la base de datos
                                        var oContext = oModel.bindList("/Facturas").create(factura);

                                        // Manejar el éxito o error de la inserción
                                        oContext.created().then(function () {
                                            sap.m.MessageToast.show("Factura creada exitosamente");
                                            console.log("Factura insertada:", factura);

                                            window.location.reload();
                                            if (oTable) {
                                                var oBinding = oTable.getBinding("items");  // Asegúrate de que el binding sea "items" si es una lista de items
                                                if (oBinding) {
                                                    oBinding.refresh();
                                                    oTable.getModel().refresh(true);  // Asegúrate de que el modelo también se actualice
                                                }
                                            }
                                        }).catch(function (error) {
                                            console.error("Error al crear la factura:", error);
                                        });
                                      
                        
                                    
                                    } catch (error) {
                                        console.error("Error al decodificar Base64:", error.message);
                                    }    */

                                    
                                    
            },
            
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
                var sUrl = "#monitorfacturasfacturasxml-display&/Facturas(NumeroFactura='" + facturaId + "',IsActiveEntity=true)";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
            }

            
        });
    }
);

