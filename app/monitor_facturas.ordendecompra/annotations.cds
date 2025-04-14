using Monitor_FacturasService as service from '../../srv/service';
annotate service.OrdenCompra with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : NumeroOrden,
            },
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
                Value : UsuarioCreador,
            },
            {
                $Type : 'UI.DataField',
                Value : NumeroFactura_NumeroFactura,
            },
            {
                $Type : 'UI.DataField',
                Value : Proveedor_CodigoSap,
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
            Label : 'Detalle orden de compra',
            ID : 'Detalleordendecompra',
            Target : 'DetalleOrdenCompra/@UI.LineItem#Detalleordendecompra',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : NumeroOrden,
        },
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
            Value : UsuarioCreador,
        },
    ],
);

annotate service.OrdenCompra with {
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

annotate service.DetalleOrdenCompra with @(
    UI.LineItem #Detalleordendecompra : [
        {
            $Type : 'UI.DataField',
            Value : NombreMaterial,
        },
        {
            $Type : 'UI.DataField',
            Value : GrupoArticulos,
        },
        {
            $Type : 'UI.DataField',
            Value : Direccion,
        },
        {
            $Type : 'UI.DataField',
            Value : TipoMaterial,
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
            Value : DepartamentoEntrega,
        },
        {
            $Type : 'UI.DataField',
            Value : MunicipioEntrega,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroMaterial_NumeroMaterial,
            Label : 'NumeroMaterial_NumeroMaterial',
        },
        {
            $Type : 'UI.DataField',
            Value : Estado,
        },
    ]
);

