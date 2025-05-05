sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/centralfacturas/test/integration/FirstJourney',
		'monitorfacturas/centralfacturas/test/integration/pages/FacturasMain'
    ],
    function(JourneyRunner, opaJourney, FacturasMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/centralfacturas') + '/index.html'
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