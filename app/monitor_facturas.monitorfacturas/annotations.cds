using Monitor_FacturasService as service from '../../srv/service';
annotate service.Facturas with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
                Value : NumeroFactura,
            },
            {
                $Type : 'UI.DataField',
                Value : Posiciones,
            },
            {
                $Type : 'UI.DataField',
                Value : Proveedor_NIT,
            },
            {
                $Type : 'UI.DataField',
                Value : Proveedor.Nombre1,
            },
            {
                $Type : 'UI.DataField',
                Value : TotalFactura,
            },
            {
                $Type : 'UI.DataField',
                Value : IVA,
            },
            {
                $Type : 'UI.DataField',
                Value : IndicadorImpuesto,
            },
            {
                $Type : 'UI.DataField',
                Value : NumeroIndicador,
            },
            {
                $Type : 'UI.DataField',
                Value : Destinatario,
            },
            {
                $Type : 'UI.DataField',
                Value : DescripcionDestinatario,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Información general',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Posiciones',
            ID : 'Detalledelafactura',
            Target : 'DetalleFactura/@UI.LineItem#Detalledelafactura',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Ordenes de compra',
            ID : 'Ordenesdecompra',
            Target : 'OrdenCompra/@UI.LineItem#Ordenesdecompra',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Entrada',
            ID : 'Entrada',
            Target : 'Entrada/@UI.LineItem#Entrada',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : NumeroFactura,
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
    ],
);

annotate service.DetalleFactura with @(
    UI.LineItem #Detalledelafactura : [
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
            Value : ValorUnitario,
        },
        {
            $Type : 'UI.DataField',
            Value : ValorTotal,
        },
    ]
);

annotate service.OrdenCompra with @(
    UI.LineItem #Ordenesdecompra : [
        {
            $Type : 'UI.DataField',
            Value : NumeroOrden,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaEmision,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaRecepcion,
        },
    ]
);

annotate service.Entrada with @(
    UI.LineItem #Entrada : [
        {
            $Type : 'UI.DataField',
            Value : NumeroEntrada,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaEmision,
        },
        {
            $Type : 'UI.DataField',
            Value : FechaRecepcion,
        },
    ]
);

