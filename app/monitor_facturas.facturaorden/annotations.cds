using Monitor_FacturasService as service from '../../srv/service';
annotate service.Facturas with @(
    UI.LineItem #tableMacro2 : [
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
        {
            $Type : 'UI.DataField',
            Value : FechaContabilizacion,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaVencimiento,
        },
        {
            $Type : 'UI.DataField',
            Value : FormaPago,
        },
        {
            $Type : 'UI.DataField',
            Value : IndicadorImpuesto,
        },
        {
            $Type : 'UI.DataField',
            Value : IVA,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroIndicador,
        },
        {
            $Type : 'UI.DataField',
            Value : Posiciones,
        },
        {
            $Type : 'UI.DataField',
            Value : Proveedor_CodigoSap,
        },
        {
            $Type : 'UI.DataField',
            Value : TotalFactura,
        },
        {
            $Type : 'UI.DataField',
            Value : Urgente,
        },
    ],
    UI.LineItem #tableMacro3 : [
    ],
    UI.LineItem #tableMacro4 : [
    ],
);

