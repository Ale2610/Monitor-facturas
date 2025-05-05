sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/bandejaentradacontabilidad/test/integration/FirstJourney',
		'monitorfacturas/bandejaentradacontabilidad/test/integration/pages/DetalleFacturaMain'
    ],
    function(JourneyRunner, opaJourney, DetalleFacturaMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/bandejaentradacontabilidad') + '/index.html'
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