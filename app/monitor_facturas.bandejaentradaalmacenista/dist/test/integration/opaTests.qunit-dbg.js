sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/bandejaentradaalmacenista/test/integration/FirstJourney',
		'monitorfacturas/bandejaentradaalmacenista/test/integration/pages/DetalleFacturaMain'
    ],
    function(JourneyRunner, opaJourney, DetalleFacturaMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/bandejaentradaalmacenista') + '/index.html'
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