sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/compradorbandejaentrada/test/integration/FirstJourney',
		'monitorfacturas/compradorbandejaentrada/test/integration/pages/DetalleFacturaMain'
    ],
    function(JourneyRunner, opaJourney, DetalleFacturaMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/compradorbandejaentrada') + '/index.html'
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