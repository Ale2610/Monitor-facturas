using Monitor_FacturasService as service from '../../srv/service';
annotate service.DetalleFactura with @(
    UI.LineItem #tableMacro : [
    ]
);

annotate service.Facturas with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaContabilizacion,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaVencimiento,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor.Nombre1,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor.NIT,
        },
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura,
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : FormaPago,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor.NIT,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor.Nombre1,
        },
    ],
    UI.SelectionFields #filterBarMacro : [
        FechaFactura,
        NumeroFactura,
        Proveedor.NIT,
        Entrada.NumeroEntrada,
        OrdenCompra.NumeroOrden,
    ],
);

