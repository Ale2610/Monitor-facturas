using { Monitor_Facturas as my } from '../db/schema.cds';

@path : '/service/Monitor_FacturasService'
service Monitor_FacturasService
{
    @odata.draft.enabled
    entity Facturas as
        projection on my.Facturas;

    entity OrdenCompra as
        projection on my.OrdenCompra;

    entity DetalleOrdenCompra as
        projection on my.DetalleOrdenCompra;

    entity Entrada as
        projection on my.Entrada;

    entity DetalleEntrada as
        projection on my.DetalleEntrada; 

    entity DetalleFactura as
        projection on my.DetalleFactura;
    
    entity Proveedores as
        projection on my.Proveedores;
}

annotate Monitor_FacturasService with @requires :
[
    'authenticated-user'
];
