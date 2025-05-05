using Monitor_FacturasService as service from '../../srv/service';
annotate service.DetalleFactura with @(
    UI.LineItem #tableMacro3 : [
        {
            $Type : 'UI.DataField',
            Value : Cantidad,
        },
        {
            $Type : 'UI.DataField',
            Value : Descripcion,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroMaterial,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura_NumeroFactura,
        },
    ]
);

annotate service.Facturas with @(
    UI.LineItem #tableMacro11 : [
    ],
    UI.LineItem #tableMacro12 : [
        {
            $Type : 'UI.DataField',
            Value : CodigoActividad,
        },
        {
            $Type : 'UI.DataField',
            Value : Clasificacion,
        },
        {
            $Type : 'UI.DataField',
            Value : Area,
        },
        {
            $Type : 'UI.DataField',
            Value : Descuento,
        },
        {
            $Type : 'UI.DataField',
            Value : Destinatario,
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentoFI,
        },
        {
            $Type : 'UI.DataField',
            Value : DescripcionDestinatario,
        },
    ],
);

