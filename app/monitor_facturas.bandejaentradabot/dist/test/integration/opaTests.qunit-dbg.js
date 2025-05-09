sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/bandejaentradabot/test/integration/FirstJourney',
		'monitorfacturas/bandejaentradabot/test/integration/pages/DetalleFacturaMain'
    ],
    function(JourneyRunner, opaJourney, DetalleFacturaMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/bandejaentradabot') + '/index.html'
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