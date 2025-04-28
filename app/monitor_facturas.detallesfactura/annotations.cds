using Monitor_FacturasService as service from '../../srv/service';
annotate service.Facturas with @(
    UI.LineItem #tableMacro5 : [
        {
            $Type : 'UI.DataField',
            Value : Area,
        },
        {
            $Type : 'UI.DataField',
            Value : Clasificacion,
        },
        {
            $Type : 'UI.DataField',
            Value : DescripcionDestinatario,
        },
        {
            $Type : 'UI.DataField',
            Value : Destinatario,
        },
        {
            $Type : 'UI.DataField',
            Value : Estado,
        },
    ],
    UI.LineItem #tableMacro6 : [
        {
            $Type : 'UI.DataField',
            Value : Destinatario,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor_CodigoSap,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroIndicador,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura,
        },
    ],
    UI.SelectionFields #filterBarMacro1 : [
        NumeroFactura,
        Proveedor_CodigoSap,
    ],
);

annotate service.DetalleFactura with @(
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : NumeroMaterial,
        },
        {
            $Type : 'UI.DataField',
            Value : Descripcion,
        },
        {
            $Type : 'UI.DataField',
            Value : Cantidad,
        },
        {
            $Type : 'UI.DataField',
            Value : ValorTotal,
        },
        {
            $Type : 'UI.DataField',
            Value : ValorUnitario,
        },
    ]
);

annotate service.OrdenCompra with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : ClasePedido,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaCreacion,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroOrden,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor_CodigoSap,
        },
        {
            $Type : 'UI.DataField',
            Value : UsuarioCreador,
        },
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : FechaCreacion,
        },
        {
            $Type : 'UI.DataField',
            Value : ClasePedido,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroOrden,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor_CodigoSap,
        },
        {
            $Type : 'UI.DataField',
            Value : UsuarioCreador,
        },
    ],
);

annotate service.Facturas with {
    Proveedor @Common.Text : Proveedor_CodigoSap
};

