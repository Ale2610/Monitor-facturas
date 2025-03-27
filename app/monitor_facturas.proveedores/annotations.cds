using Monitor_FacturasService as service from '../../srv/service';
annotate service.Proveedores with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : CodigoSap,
            },
            {
                $Type : 'UI.DataField',
                Value : Tratamiento,
            },
            {
                $Type : 'UI.DataField',
                Value : Nombre1,
            },
            {
                $Type : 'UI.DataField',
                Value : Nombre2,
            },
            {
                $Type : 'UI.DataField',
                Value : Nombre3,
            },
            {
                $Type : 'UI.DataField',
                Value : Nombre4,
            },
            {
                $Type : 'UI.DataField',
                Value : Region,
            },
            {
                $Type : 'UI.DataField',
                Value : DescRegion,
            },
            {
                $Type : 'UI.DataField',
                Value : Municipio,
            },
            {
                $Type : 'UI.DataField',
                Value : Direccion,
            },
            {
                $Type : 'UI.DataField',
                Value : NIT,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TipoNit',
                Value : TipoNit,
            },
            {
                $Type : 'UI.DataField',
                Value : DescTipoNit,
            },
            {
                $Type : 'UI.DataField',
                Value : Personanatural,
            },
            {
                $Type : 'UI.DataField',
                Value : ConceptoBusqueda,
            },
            {
                $Type : 'UI.DataField',
                Value : Telefono,
            },
            {
                $Type : 'UI.DataField',
                Value : ClaseImpuesto,
            },
            {
                $Type : 'UI.DataField',
                Value : DescClaseImpuesto,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ConceptoBusqueda2',
                Value : ConceptoBusqueda2,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CondicionPago',
                Value : CondicionPago,
            },
            {
                $Type : 'UI.DataField',
                Value : DescCondicionPago,
            },
            {
                $Type : 'UI.DataField',
                Value : FechaInicio,
            },
            {
                $Type : 'UI.DataField',
                Label : 'FechaFin',
                Value : FechaFin,
            },
            {
                $Type : 'UI.DataField',
                Value : CorreoElectronico,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : NIT,
        },
        {
            $Type : 'UI.DataField',
            Value : CodigoSap,
        },
        {
            $Type : 'UI.DataField',
            Value : Tratamiento,
        },
        {
            $Type : 'UI.DataField',
            Value : Nombre1,
        },
        {
            $Type : 'UI.DataField',
            Value : CorreoElectronico,
        },
        {
            $Type : 'UI.DataField',
            Value : Personanatural,
        },
        {
            $Type : 'UI.DataField',
            Value : TipoNit,
            Label : 'TipoNit',
        },
        {
            $Type : 'UI.DataField',
            Value : Telefono,
        },
    ],
);

