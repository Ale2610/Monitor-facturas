sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/facturaorden/test/integration/FirstJourney',
		'monitorfacturas/facturaorden/test/integration/pages/FacturasMain'
    ],
    function(JourneyRunner, opaJourney, FacturasMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/facturaorden') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheFacturasMain: FacturasMain
                }
            },
            opaJourney.run
        );
    }
);