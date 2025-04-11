using Monitor_FacturasService as service from '../../srv/service';
annotate service.DetalleOrdenCompra with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : Cantidad,
        },
        {
            $Type : 'UI.DataField',
            Value : DepartamentoEntrega,
        },
        {
            $Type : 'UI.DataField',
            Value : Direccion,
        },
        {
            $Type : 'UI.DataField',
            Value : NumeroMaterial_NumeroMaterial,
            Label : 'NumeroMaterial_NumeroMaterial',
        },
    ],
    UI.LineItem #tableMacro1 : [
    ],
);

