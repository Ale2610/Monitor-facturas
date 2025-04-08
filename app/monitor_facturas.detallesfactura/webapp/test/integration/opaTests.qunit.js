sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/detallesfactura/test/integration/FirstJourney',
		'monitorfacturas/detallesfactura/test/integration/pages/DetalleFacturaMain'
    ],
    function(JourneyRunner, opaJourney, DetalleFacturaMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/detallesfactura') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDetalleFacturaMain: DetalleFacturaMain
                }
            },
            opaJourney.run
        );
    }
);