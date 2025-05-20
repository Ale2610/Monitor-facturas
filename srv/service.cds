using { Monitor_Facturas as my } from '../db/schema.cds';

@path : '/service/Monitor_FacturasService'
service Monitor_FacturasService {

    @mediaStream
    @mediaStream.mediaType : 'application/pdf'
    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity Facturas as projection on my.Facturas;

    action actualizarFactura(
        NumeroFactura : String,
        data : LargeString
    ) returns String;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity OrdenCompra as projection on my.OrdenCompra;

    type BulkInsertResponseOrden {
        mensaje : String;
    }

    action bulkInsertOrdenCompra(
        OrdenCompra : many OrdenCompra
    ) returns BulkInsertResponseOrden;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity DetalleOrdenCompra as projection on my.DetalleOrdenCompra;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity Entrada as projection on my.Entrada;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity DetalleEntrada as projection on my.DetalleEntrada;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity DetalleFactura as projection on my.DetalleFactura;

    entity Proveedores as projection on my.Proveedores;

    type BulkInsertResponse {
        mensaje : String;
    }

    action bulkInsertProveedores(
        proveedores : many Proveedores
    ) returns BulkInsertResponse;

    function noova_documents() returns many String;

    action consultar_documentos(
        noce : String,
        created : String
    ) returns String;

    action extraer_documentos(
        noce : String,
        created : String,
        data : String,
        documentNumber : String,
        documentPrefix : String,
        documentType : String,
        senderIdentification : String
    ) returns String;

    function getRoles() returns many String;

    action prueba() returns String;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity FacturaOrdenCompra as projection on my.FacturaOrdenCompra;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity DetalleFacturaOrden as projection on my.DetalleFacturaOrden;

    @requires: ['CentralFacturas', 'Comprador', 'Almacenista', 'Contabilidad']
    entity Usuarios as projection on my.Usuarios;
}



