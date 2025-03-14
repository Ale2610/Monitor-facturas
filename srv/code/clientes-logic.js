/**
 * 
 * @On(event = { "CREATE","UPDATE" }, entity = "Monitor_FacturasService.Clientes")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 * @param {Function} next - Callback function to the next handler
*/
module.exports = async function(request, next) {
	// Your code here

	//Obtener datos del cliente
	let TotalValorCompra = 0;
	let PuntosTotalRecompensa = 0;

	if(ClienteData.Compras){
		for (const Compras of ClienteData.Compras) {
			Compras.PuntosRecompensa = Math.floor(Compras.ValorCompra / 10);

			TotalValorCompra += Compras.ValorCompra;

			PuntosTotalRecompensa += Compras.PuntosRecompensa;
	}
}

	ClienteData.TotalValorCompra = TotalValorCompra; 
	ClienteData.PuntosTotalRecompensa = PuntosTotalRecompensa;


	ClienteData.PuntosTotalRecompensa -= ClienteData.PuntosTotalRecompensa
	

	if (ClienteData.PuntosTotalRecompensa < 0) {
		ClienteData.PuntosTotalRecompensa = 0;
}
}