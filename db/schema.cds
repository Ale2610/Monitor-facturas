namespace Monitor_Facturas;

entity Facturas
{
    FechaContabilizacion : Date
        @title : 'Fecha de contabilización';
    FechaFactura : Date
        @title : 'Fecha de factura';
    FechaVencimiento : Date
        @title : 'Fecha de vencimiento';
    FechaRecepcion : Date
        @title : 'Fecha de recepción';
    FormaPago : String(255)
        @title : 'Forma de pago';
    key NumeroFactura : String(255)
        @title : 'No. de factura';
    Proveedor : Association to one Proveedores
        @title : 'Codigo Proveedor';
    Posiciones : String(255)
        @title : 'Posiciones';
    TotalFactura : String(255)
        @title : 'Total de factura';
    ValorFinal : String(255)
        @title : 'Valor final a pagar';
    IVA : String(255)
        @title : 'IVA';
    IndicadorImpuesto : String(255)
        @title : 'Indicador de impuesto';
    NumeroIndicador : String(255)
        @title : 'Número indicador';
    Destinatario : String(255)
        @title : 'Destinatario';
    DescripcionDestinatario : String(255)
        @title : 'Descripción del destinatario';
    CodigoActividad : String(255) 
        @title : 'Código de actividad';
    Clasificacion : String(255)
        @title : 'Clasificación';
    Estado : String(255)
        @title : 'Estado';
    Urgente : Boolean
        @title : 'Urgente';
    Area : String(255)
        @title : 'Área';
    Sede : String(255)
        @title : 'Sede';
    Comentario : String(255)
        @title : 'Comentario';
    DocumentoMIRO : String(255)
        @title : 'Documento MIRO';
    DocumentoFI : String(255)
        @title : 'Documento FI';
    FacturaElec : Boolean
        @title : 'Factura Electrónica';
    Descuento : Boolean 
        @title : 'Descuento pronto pago';
    @Core.MediaType : 'application/pdf'
    @Core.ContentDisposition.Filename : 'Factura.pdf'
    @Core.ContentDisposition.Type : 'inline'
    archivoPDF : LargeBinary;
    DetalleFactura : Composition of many DetalleFactura on DetalleFactura.NumeroFactura = $self;
    OrdenCompra : Composition of many OrdenCompra on OrdenCompra.NumeroFactura = $self;
    Entrada : Composition of many Entrada on Entrada.NumeroFactura = $self;
}

entity OrdenCompra
{
    key ID : UUID;
    FechaCreacion : String(255)
        @title : 'Fecha de creación';
    ClasePedido : String(255)
        @title : 'Clase de pedido';
    NumeroOrden : String(255)
        @title : 'Número de orden';
    Proveedor : Association to one Proveedores
        @title : 'Proveedor';
    UsuarioCreador : String(255)
        @title : 'Usuario creador';
    DetalleOrdenCompra : Composition of many DetalleOrdenCompra on DetalleOrdenCompra.NumeroOrden = $self;
    NumeroFactura : Association to one Facturas
        @title : 'Número Factura';
}

entity DetalleOrdenCompra
{
    key ID : UUID;
    NumeroMaterial : Association to one DetalleFactura;
    NombreMaterial : String(255)
        @title : 'Nombre de material';
    GrupoArticulos : String(255)
        @title : 'Grupo de articulos';
    TipoMaterial : String(255)
        @title : 'Tipo de material';
    Cantidad : String(255)
        @title : 'Cantidad';
    ValorUnitario : String(255)
        @title : 'Valor unitario';
    NumeroOrden : Association to one OrdenCompra
        @title : 'Número de orden';
    DepartamentoEntrega : String(255)
        @title : 'Departamento de entrega';
    MunicipioEntrega : String(255)
        @title : 'Municipio de entrega';
    Direccion : String(255)
        @title : 'Dirección';
    Estado : Boolean
        @title : 'Estado';
}

entity Entrada
{
    FechaEmision : Date
        @title : 'Fecha de emisión';
    FechaRecepcion : Date
        @title : 'Fecha de recepción';
    key NumeroEntrada : String(255)
        @title : 'Número de entrada';
    NumeroFactura : Association to one Facturas
        @title : 'Número de factura';
    DetalleEntrada : Composition of many DetalleEntrada on DetalleEntrada.NumeroEntrada = $self;
}

entity DetalleEntrada
{
    key NumeroMaterial : String(255)
        @title : 'Número de material';
    NombreMaterial : String(255)
        @title : 'Nombre de material';
    Cantidad : String(255)
        @title : 'Cantidad';
    NumeroEntrada : Association to one Entrada
        @title : 'Número de Entrada';
}

entity DetalleFactura
{
    key NumeroMaterial : String(255)
        @title : 'Número de material';
    Descripcion : String(255)
        @title : 'Descripción';
    Cantidad : String(255)
        @title : 'Cantidad';
    ValorUnitario : String(255)
        @title : 'Valor unitario';
    ValorTotal : String(255)
        @title : 'Valor total';
    NumeroFactura : Association to one Facturas
        @title : 'Número de factura';
}

entity Proveedores
{
    key CodigoSap : String(255)
        @title : 'Código SAP';
    Tratamiento : String(255)
        @title : 'Tratamiento';
    Nombre1 : String(255)
        @title : 'Nombre 1';
    Nombre2 : String(255)
        @title : 'Nombre 2';
    Nombre3 : String(255)
        @title : 'Nombre 3';
    Nombre4 : String(255)
        @title : 'Nombre 4';
    Region : String(255)
        @title : 'Región';
    DescRegion : String(255)
        @title : 'Descripción de región';
    Municipio : String(255)
        @title : 'Municipio';
    Direccion : String(255)
        @title : 'Dirección';
    NIT : String(255)
        @title : 'NIT';
    OrdenCompra : Composition of many OrdenCompra on OrdenCompra.Proveedor = $self;
    TipoNit : String(255)
        @tilte : 'Tipo NIT';
    DescTipoNit : String(255)
        @title : 'Descripción tipo NIT';
    Personanatural : String(255)
        @title : 'Persona natural';
    ConceptoBusqueda : String(255)
        @title : 'Concepto de busqueda';
    Telefono : String(255)
        @title : 'Teléfono';
    ClaseImpuesto : String(255)
        @title : 'Clase de impuesto';
    DescClaseImpuesto : String(255)
        @title : 'Descripción de clase de impuesto';
    ConceptoBusqueda2 : String(255)
        @tilte : 'Concepto de busqueda 2';
    CondicionPago : String(255)
        @tilte : 'Condición de pago';
    DescCondicionPago : String(255)
        @title : 'Descripción condición de pago';
    FechaInicio : String(255)
        @title : 'Fecha de inicio';
    FechaFin : String(255)
        @tilte : 'Fecha de fin';
    CorreoElectronico : String(255)
        @title : 'Correo electronico';
}
