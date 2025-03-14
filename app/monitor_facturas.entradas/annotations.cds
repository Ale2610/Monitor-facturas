using Monitor_FacturasService as service from '../../srv/service';
annotate service.Entrada with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : FechaEmision,
            },
            {
                $Type : 'UI.DataField',
                Value : FechaRecepcion,
            },
            {
                $Type : 'UI.DataField',
                Value : NumeroEntrada,
            },
            {
                $Type : 'UI.DataField',
                Label : 'NumeroFactura_NumeroFactura',
                Value : NumeroFactura_NumeroFactura,
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
            Label : 'Detalle entrada',
            ID : 'Detalleentrada',
            Target : 'DetalleEntrada/@UI.LineItem#Detalleentrada',
        },
    ],
    UI.LineItem : [
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
        {
            $Type : 'UI.DataField',
            Label : 'NumeroFactura_NumeroFactura',
            Value : NumeroFactura_NumeroFactura,
        },
    ],
);

annotate service.Entrada with {
    NumeroFactura @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Facturas',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : NumeroFactura_NumeroFactura,
                ValueListProperty : 'NumeroFactura',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'FechaContabilizacion',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'FechaFactura',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'FechaVencimiento',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'FormaPago',
            },
        ],
    }
};

annotate service.DetalleEntrada with @(
    UI.LineItem #Detalleentrada : [
        {
            $Type : 'UI.DataField',
            Value : NumeroMaterial,
        },
        {
            $Type : 'UI.DataField',
            Value : NombreMaterial,
        },
        {
            $Type : 'UI.DataField',
            Value : Cantidad,
        },
    ]
);

