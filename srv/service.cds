using {Monitor_Facturas as my} from '../db/schema.cds';

@path: '/service/Monitor_FacturasService'
service Monitor_FacturasService {

    @requires: ['facturas_user', 'admin']
    @mediaStream
    entity Facturas as projection on my.Facturas;
    
    action actualizarFactura(NumeroFactura : String, data : LargeString) returns String;

    @odata.draft.enabled
    @requires: ['ordencompra_user', 'admin']
    entity OrdenCompra as projection on my.OrdenCompra;

    type BulkInsertResponseOrden {
        mensaje : String;
    }

    action bulkInsertOrdenCompra(OrdenCompra : many OrdenCompra) returns BulkInsertResponseOrden;

    @requires: ['detalleordencompra_user', 'admin']
    entity DetalleOrdenCompra as projection on my.DetalleOrdenCompra;

    @requires: ['entrada_user', 'admin']
    entity Entrada as projection on my.Entrada;

    @requires: ['detalleentrada_user', 'admin']
    entity DetalleEntrada as projection on my.DetalleEntrada;

    @requires: ['detallefactura_user', 'admin']
    entity DetalleFactura as projection on my.DetalleFactura;

    @requires: ['proveedores_user', 'admin']
    entity Proveedores as projection on my.Proveedores;

    type BulkInsertResponse {
        mensaje : String;
    }

    action   bulkInsertProveedores(proveedores : many Proveedores) returns BulkInsertResponse;
    //API Noova
    function noova_documents()                                     returns many String;

    //API invoicesList Carvajal 
    
    action consultar_documentos(noce: String, created: String) returns String;

    //API Get documents Carvajal 
    action extraer_documentos(noce: String, created: String, data: String, documentNumber: String, documentPrefix: String, documentType: String, senderIdentification: String) returns String;

}


annotate Monitor_FacturasService with @requires: ['authenticated-user'];
