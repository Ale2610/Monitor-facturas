using {Monitor_Facturas as my} from '../db/schema.cds';

@path: '/service/Monitor_FacturasService'
service Monitor_FacturasService {
   @mediaStream: {
        mediaType: 'archivoPDF'
        }
    @mediaStream
    entity Facturas as projection on my.Facturas;
    
    action actualizarFactura(NumeroFactura : String, data : LargeString) returns String;

    @odata.draft.enabled
    entity OrdenCompra as projection on my.OrdenCompra;

    type BulkInsertResponseOrden {
        mensaje : String;
    }

    action bulkInsertOrdenCompra(OrdenCompra : many OrdenCompra) returns BulkInsertResponseOrden;

    entity DetalleOrdenCompra as projection on my.DetalleOrdenCompra;

    entity Entrada as projection on my.Entrada;

    entity DetalleEntrada as projection on my.DetalleEntrada;

    entity DetalleFactura as projection on my.DetalleFactura;

    entity Proveedores as projection on my.Proveedores;

    type BulkInsertResponse {
        mensaje : String;
    }

    action bulkInsertProveedores(proveedores: array of Proveedores) returns BulkInsertResponse;
    //API Noova
    function noova_documents()                                     returns many String;

    //API invoicesList Carvajal 
    
    action consultar_documentos(noce: String, created: String) returns String;

    //API Get documents Carvajal 
    action extraer_documentos(noce: String, created: String, data: String, documentNumber: String, documentPrefix: String, documentType: String, senderIdentification: String) returns String;

    function getRoles() returns array of String;

    action prueba() returns String;
}


annotate Monitor_FacturasService with @requires: ['authenticated-user'];
